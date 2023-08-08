"use client";

import Link from "next/link";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="not-found__wrapper">
      <div className="not-found">
        <h1>
          <em>404 | Article Not Found</em>
        </h1>
        <p>
          The requested article does not exists. <br />
          <Link href={"/"}>Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Error;
