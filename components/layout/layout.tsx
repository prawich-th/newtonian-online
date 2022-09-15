import Header from "./header";

const Layout: React.FC<{ children: any }> = (props) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
