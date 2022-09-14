import Header from "./header";

const Layout: React.FC<{ children: any }> = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
