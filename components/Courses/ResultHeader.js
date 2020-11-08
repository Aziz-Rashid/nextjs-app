import {SortButtons} from './SortButtons'

export const ResultHeader = (props) =>{
  const {page, limit, total, ...rest} = props
  return(
    <div className="container">
      <div className="title-container">
      <h1 className="title">Search Result: </h1>
      <p className="sub-title">
        Showing {page < 1 ? 1 : page * limit + 1} to{" "}
        {page < 1
          ? limit
          : (page + 1) * limit < total
          ? (page + 1) * limit
          : total}{" "}
        of {total} courses
      </p>
      </div>
      <SortButtons
        {...rest}
      />
      <style jsx>{`
      .container {
        padding-left: 20px;
        padding-top: 10px;
        margin-left: ${props.marginLeft || 0};
      }
      .title-container{
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        padding: 1rem 0;s
      }
       .title {
        text-transform: uppercase;
        font-size: 1rem;
        margin: 0;
        margin-right: .8rem;

      }
      .sub-title {
        margin: 0;
        font-size: 0.8rem;
        font-style: italic;
      }
      @media (max-width: 900px){
        .container{
          margin-left: 3rem;
        }
      }
      @media (max-width: 600px){
        .container {
          margin-left: 0;
          padding-left: 0;
        }
        .title-container {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0;
        }
        .title {
          margin-right: 0;
        }
      }
      `}</style>
    </div>
  )
}