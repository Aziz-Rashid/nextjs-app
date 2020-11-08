import Head from 'next/head'
import { getBaseUrl } from "../lib";
import React, { useState, useRef ,useEffect } from "react";
import Router, { withRouter } from 'next/router'
import { Pagination } from "../components/Pagination";
import { ModalSpinner}  from '../components/ModalSpiner';
import NewsItem from '../components/newsItem/newsItem';

const News = (props) => {
    const [isLoading, setLoading] = useState(false); //State for the loading indicator
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
    const ref = useRef();
    useEffect(() => { //After the component is mounted set router event handlers
        Router.events.on('routeChangeStart', startLoading); 
        Router.events.on('routeChangeComplete', stopLoading);

        return () => {
            Router.events.off('routeChangeStart', startLoading);
            Router.events.off('routeChangeComplete', stopLoading);
        }
    }, [])
    
    const pagginationHandler = (page) => {
        const currentPath = props.router.pathname;
        const currentQuery = {...props.router.query};
        currentQuery.page = (page * 1) + 1;
        props.router.push({
            pathname: currentPath,
            query: {page:currentQuery.page}
        });
        //scroll after change
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          }, ref.current.offsetTop) 
    };

    return (
        <div >
            <Head>
                <title>influencers news</title>
                <meta 
                name="description"
                content="watch the moti interview and learn how to become an influencer"
                />
            </Head>
            <section className="section" ref={ref}>
                <h1>influencers news</h1>
                <div className="news-wrapper" >
                    {isLoading ? <ModalSpinner />: null}
                    {
                        props.news.map(news => <NewsItem 
                            key={news.id} 
                            title={news.title} 
                            date={news.date} 
                            content={news.content} 
                            link={news.link}
                            author={news.author}
                            isLoading={isLoading}
                            />)
                    } 
                </div>
                <div className="pagination-wrapper">
                <Pagination
                  page={props.currentPage - 1}
                  onChange={pagginationHandler}
                  total={Math.ceil(props.total / props.limit)}
                  url={"/news?page="}
                />
              </div>
              <style jsx>{`
              .section {
                padding-top: 2rem;
                padding-bottom: 2rem;
                scroll:smote
              }
              h1 {
                text-align: center;
                text-transform: uppercase;
                font-style: oblique;
                color: #1b202d;
                font-size: 1.8rem;
                lettre-spacing: 0.1em;
              }
    
                .news-wrapper{
                    width: 80%;
                    padding: 1.5rem;
                    margin: auto;
                    background-color: #FFFFFF;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
               
            `}</style>
            </section>
        </div>
)}



//Fetching news in get Intial Props to make the app seo friendly
export async function getServerSideProps({ query }) {
    let news = {}
        const baseUrl = getBaseUrl();
        const page = query.page * 1 || 1; //if page empty we request the first page
        const limit = query.limit * 1 || 10; 
    try{
        // Fetch news
        const fetchNews = await fetch(`${baseUrl}/api/news?page=${page}&limit=${limit}`)
        if (fetchNews.status === 200) {
             news = await fetchNews.json()
        }
  
    }catch(err){
        console.log(err)
        return { props: { error: 500 } };
    }
    
    return { props: {
        currentPage: page,
        limit:limit,
        total:news.total,
        news: news.news
    }}
}
    

export default withRouter(News)