"use client";

import { redirect } from "next/navigation";
import { EicContext } from "./eicProvider";
import { useEffect, useState } from "react";
import Loading from "../articles/loading";
import { Toaster } from "react-hot-toast";

export default function EicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://apis.news.newton.ac.th/api/auth/getUser", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((data) => {
        console.log(data.status);
        if (data.status !== 200) {
          return redirect("/eics/auth");
        }

        return data.json();
      })
      .then((user) => {
        setUserData(user);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Toaster
        containerStyle={{
          fontSize: "1.5rem",
        }}
      />
      <EicContext.Provider value={userData}>{children}</EicContext.Provider>
    </>
  );
}
