import Header from "./Header";

const Layout: React.FC<{ children: any }> = (props) => {
  console.log(props);
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
