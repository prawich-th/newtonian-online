"use client";

import { redirect } from "next/navigation";
import { EicContext } from "./eicProvider";
import { useEffect, useState } from "react";
import Loading from "../articles/loading";

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

  return <EicContext.Provider value={userData}>{children}</EicContext.Provider>;
}
