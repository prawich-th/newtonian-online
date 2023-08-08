import Head from "next/head";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="not-found__wrapper">
      <Head>
        <title>Not Found | The Newtonian</title>
      </Head>
      <div className="not-found">
        <h1>
          <em>404 | Not Found</em>
        </h1>
        <p>
          the requested url connot be found <Link href={"/"}>back home</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
