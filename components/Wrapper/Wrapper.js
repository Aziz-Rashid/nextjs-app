export const Wrapper = ({ children }) => {
  return (
    <div className="wrapper">
      {children}
      <style jsx>{`
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
      `}</style>
    </div>
  );
};

