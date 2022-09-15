import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <h2>404 | Not Found</h2>
      <p>
        the page requested cannot be found. <Link href={"/"}>back home</Link>
      </p>
    </>
  );
};

export default NotFound;
