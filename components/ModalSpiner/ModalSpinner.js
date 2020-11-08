export const ModalSpinner = ({position, top, left, width, height}) => {
  return (
    <div className="container">
      <div className="donutSpinner"></div>
      <style jsx>{`
        .container {
          position: ${position || "fixed"};
          top: ${top || 0};
          left: ${left || 0};
          height: ${height || "100vh"};
          width: ${width || "100vw"};
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          background: rgba(255,255,255, 0.1);
        }
        .donutSpinner {
         
          border: 4px solid hsl(222, 100%, 95%);;
          border-left-color: hsl(243, 80%, 62%);
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: donut-spin 1.2s linear infinite;
      }
      
      @keyframes donut-spin {
          0% {
              transform: rotate(0deg);
          }
          100% {
              transform: rotate(360deg);
          }
      }
      
      `}</style>
    </div>
  );
};
