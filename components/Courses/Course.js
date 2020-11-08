import Link from "next/link";

export const Course = ({ cours }) => {
  const { title, slug, price, img } = cours;
  return (
    <article>
      <Link href={"/courses/[id]/[sub]/[title]"} as={`/courses/${slug}`} >
        <a className="card">
          <div className="img-wrapper">
            <img src={img} alt="" />
          </div>
          <h1>{title}</h1>
          <p className="price">
            <span>{price}</span>
            <span>MORE INFORMATION</span>
          </p>
        </a>
      </Link>
      <style jsx>
        {`
          article {
            width: 260px;
            background: #fff;
            box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            margin: 15px;
            position: relative;
            padding-bottom: 1.5em;
            max-height: 300px;
          }
          .img-wrapper {
            height: 130px;
          }
          img {
            border-radius: 5px;
            width: 100%;
          }
          h1 {
            font-size: 1rem;
            font-weight: normal;
            margin-bottom: 0;
            color: rgba(0, 0, 0, 0.8);
          }
          a {
            color: inherit;
            text-decoration: none;
            padding: 15px;
            display: block;
          }
          .price {
            margin: 0;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            padding: 0.5em;
            background-image: linear-gradient(to right, #6717cd, #2871fa);
            color: white;
          }
        `}
      </style>
    </article>
  );
};
