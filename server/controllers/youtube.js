const { google } = require("googleapis");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_KEY
});

const fetchYoutubePlaylist = async () => {
  const params = {
    part: "snippet,contentDetails",
    maxResults: 50,
    channelId: "UCtX6emDHsqY6Ro4fGUcI1og"
  };
  const vid = [];
  try {
    do {
      const res = await youtube.playlists.list(params);
      vid.push(...res.data.items);
      params.pageToken = res.data.nextPageToken;
    } while (params.pageToken !== undefined);
  } catch (error) {
    console.error(error);
  }
  return vid;
};
const fetchYoutubePlaylistItems = async id => {
  const params = {
    part: "snippet,contentDetails",
    maxResults: 50,
    playlistId: id
  };
  const vid = [];
  try {
    do {
      const res = await youtube.playlistItems.list(params);
      vid.push(...res.data.items);
      params.pageToken = res.data.nextPageToken;
    } while (params.pageToken !== undefined);
  } catch (error) {
    console.error(error);
  }
  return vid;
};

const fetchYoutubeLastVideos = async () => {
  const params = {
    part: "snippet",
    channelId: "UCtX6emDHsqY6Ro4fGUcI1og",
    maxResults: 50,
    order: "date"
  };
  try {
    const res = await youtube.search.list(params);
    return res.data.items;
  } catch (error) {
    console.error(error);
  }
};

const fetchVideos = async (arrIds = []) => {
  const ids = arrIds.slice();
  const params = {
    part: "snippet,contentDetails,statistics"
  };
  const vid = [];
  try {
    while (ids.length > 0) {
      const id = ids.splice(0, 50);
      params.id = id.join(',');
      const res = await youtube.videos.list(params);
      vid.push(...res.data.items);
    }
  } catch (error) {
    console.error(error);
  }
  return vid;
};

module.exports = {
  fetchYoutubeLastVideos,
  fetchYoutubePlaylist,
  fetchYoutubePlaylistItems,
  fetchVideos
};
