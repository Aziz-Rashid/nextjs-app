const { slugify } = require("../../lib");
const {
  fetchYoutubePlaylist,
  fetchYoutubePlaylistItems,
  fetchYoutubeLastVideos,
  fetchVideos,
} = require("./youtube");

const getYoutubeVideos = async () => {
  console.log("begin init videos..................");
  let playlist = [];
  let videos = [];
  try {
    const list = await fetchYoutubePlaylist();
    if (!list.length) return;

    const filteredList = list
      .filter((el) => el.id !== "PL8t4TUsxwM2WanXIQmEauicvt7bl7Vju-")
      .map((el) => ({
        id: el.id,
        slug: slugify(el.snippet.title),
        publishedAt: el.snippet.publishedAt,
        title: el.snippet.title,
        description: el.snippet.description,
        thumbnail: el.snippet.thumbnails.medium.url,
      }));
    let loop = filteredList.length;
    for (const list of filteredList) {
      process.stdout.write("Downloading video left " + loop-- + " \r");
      // if (loop < 51) break;
      const fetchVids = await fetchYoutubePlaylistItems(list.id);
      if (fetchVids.length > 0) {
        const vidsIds = fetchVids
          .filter((el) => el.contentDetails.videoPublishedAt !== undefined)
          .map((el) => el.contentDetails.videoId);
        const fetchVideosDetails = await fetchVideos(vidsIds);
        const videosDetails = fetchVideosDetails
          .map((el) => ({
            id: el.id,
            slug: slugify(el.snippet.title),
            playlistId: list.slug,
            publishedAt: el.snippet.publishedAt,
            title: el.snippet.title,
            // description: el.snippet.description.slice(0, 100),
            thumbnail: el.snippet.thumbnails.medium.url,
            duration: el.contentDetails.duration,
            viewCount: el.statistics.viewCount,
          }))
          .filter((el, i, arr) => arr.findIndex((v) => v.id === el.id) === i)
          .sort(
            (a, b) =>
              new Date(a.publishedAt).getTime() -
              new Date(b.publishedAt).getTime()
          );

        playlist = [
          ...playlist,
          {
            ...list,
            videos: [...videosDetails],
            viewCount: videosDetails.reduce(
              (acc, curr) => acc + curr.viewCount * 1,
              0
            ),
          },
        ];
        videos = [...videos, ...videosDetails];
      }
    }

    // check if there is new videos; this is possible only if the video is not in playlist
    const fetchLastvideos = await fetchYoutubeLastVideos();
    const newVideos = fetchLastvideos.filter(
      (lastvid) => !videos.find((vid) => vid.id === lastvid.id.videoId)
    );
    console.log("new videos =", newVideos.length);
    if (newVideos.length > 0) {
      const fetchedVideos = await fetchVideos(
        newVideos.map((vid) => vid.id.videoId)
      );
      // console.log(fetchedVideos);
      videos = [
        ...videos,
        ...fetchedVideos.map((el) => ({
          id: el.id,
          slug: slugify(el.snippet.title),
          playlistId: null,
          publishedAt: el.snippet.publishedAt,
          title: el.snippet.title,
          // description: el.snippet.description,
          thumbnail: el.snippet.thumbnails.medium.url,
          duration: el.contentDetails.duration,
          viewCount: el.statistics.viewCount,
        })),
      ];
      // .filter((el, i, arr) => arr.findIndex((v) => v.id === el.id) === i);
    }
    playlist = playlist
      .filter((list) => list.videos.length > 0)
      .sort((a, b) => {
        return a.videos[0].publishedAt > b.videos[0].publishedAt ? -1 : 1;
      });
    videos.sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
    console.log("end init videos............................");

    // console.log(playlist[0]);
    return { playlist, videos };
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getYoutubeVideos };
