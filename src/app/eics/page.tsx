"use client";

import Link from "next/link";
import { useEicContext } from "./eicProvider";

const EicsNav = () => {
  const { name: eicName } = useEicContext();

  return (
    <div className="issues-eics__wrapper">
      <div className="issues-eics">
        <div className="issues-eics__title--ui">
          <h1>The Newtonian Online Management System</h1>
          <p>You are currently signed in as {eicName}</p>
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link href={"/eics/members"}>Members (MMS)</Link> <br />
          <Link href={"/eics/issues"}>Issues (ISSMS)</Link>
          <br />
          <Link href={"/eics/articles"}>Articles (AMS)</Link> <br />
          <Link href={"/eics/import-article"}>Import Article</Link> <br />
          <Link href={"/eics/upload-img"}>Upload Image</Link> <br />
          <Link href={"/eics/new-member"}>New Member</Link> <br />
          <a
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </a>
          <br />
        </div>
      </div>
    </div>
  );
};

export default EicsNav;
