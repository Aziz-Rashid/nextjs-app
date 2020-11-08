import React from 'react'
import Link from 'next/link'

function Service() {
  return (
    <section>
      <div className='wrapper'>
        <h1 className="title">Customer Service</h1>
        <Link href="/privacy-policy">
          <a>Privacy Policy</a>
        </Link>
        <Link href="/terms-of-service" >
          <a>Terms of Service</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </div>
      <style jsx>{`
        .title {
          font-size: 1.2rem;
          text-transform: uppercase;
          margin: 2rem 0;       
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          width: max-content;
          margin: auto;
        }
        a {
          color: inherit;
          text-decoration: none;
          margin-bottom: 21px;
        }
        a:hover {
          color: #000;
          font-weight: bold;
        }
        @media (max-width: 600px){
          margin-right: 10px;
        }
      `}</style>
    </section>
  );
}

export default Service
