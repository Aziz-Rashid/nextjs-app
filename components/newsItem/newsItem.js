import ContentLoader from 'react-content-loader'
const NewsItem = ({title, date, content, link, isLoading, author}) => {
    return (
        <div 
        className="news-item-wrapper"
        key={title}>
        {
            isLoading ? 
            <ContentLoader 
            speed={1}
            viewBox="0 0 410 124"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            style={{ width: '100%', height:'100%' }}
            >
                <rect x="3" y="12" rx="3" ry="3" width="88" height="6" /> 
                <rect x="5" y="25" rx="3" ry="3" width="52" height="6" /> 
                <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
                <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
                <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
                <rect x="342" y="95" rx="6" ry="6" width="68" height="19" />
        </ContentLoader> : 
            <div className='news-item'>
                <h1 className='news-item__title'>{title} </h1>
                <div className='news-item__date-author-box'>
                    <h2 className='news-item__date'>
                    {(new Date(date)).toLocaleDateString("en-US", {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                    </h2>
                    {
                        author ? <h2 className='news-item__author'>{author}</h2> : null
                    }
                    
                </div>
            
                <p className='news-item__content'>{content}</p>
                <a className='news-item__btn' href={link} target="_blank" rel="noreferrer">Read more</a>
            </div>
        }
        <style jsx>{`

        .news-item__title{
          text-align: start;
          font-size: 1.2rem;
          font-style: normal;
          padding: 0;
          margin: 0;
        }

          .news-item-wrapper{
              width: 100%;
              height: 100%;
              padding: 1rem;
              position: relative;
              padding: 3px;
              border-radius: 10px;
             
              margin-bottom: 3rem;
            ${!isLoading ?
            'background-image: linear-gradient(to right,#6717cd,#2871fa);box-shadow: 0 0 10px rgba(0,0,0,0.1);' 
            : ''}
          }
   
          .news-item{
              height:100%;
              padding: 2rem;
              border-radius: 5px;
              color:#1b202d;
              display: flex;
              flex-direction: column;
              background-color: white;
              border-radius: 10px;
          }
          .news-item__date-author-box{
              display:flex;
              align-items:center;
              margin-bottom:none;
          }
    
         
          .news-item__date{
            margin-right:15px;
            }
            .news-item__author,
            .news-item__date{
            font-size: 1rem;
            }
          
          .news-item__content{
              font-size: 1.1rem;
              font-family:"Roboto",Arial,Helvetica,sans-serif
          }
          
          .news-item__btn {
              text-decoration:none;
              color: #fff;
              background-image: linear-gradient(to right,#6717cd,#2871fa);
              border: none;
              padding: 0.7rem 1rem;
              border-radius: 5px;
              font-weight: bold;
              cursor: pointer;
              z-index: 1;
              position:absolute;
              right:10px;
              bottom:10px;

            }
         
            .news-item__btn:hover {
              color: #fff;
              background-image: linear-gradient(to right,#2871fa,#6717cd);

            }
        
            
      `}</style>
        </div>
        
    )
}

export default NewsItem