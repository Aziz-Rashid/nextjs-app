import { Header, Footer, Subscribe } from "../components";

const Layout = ({ children, courses = [] }) => {
  return (
    <>
      <Header courses={courses} />
      {children}
      <Subscribe />
      <Footer />
    </>
  );
};

export default Layout;
