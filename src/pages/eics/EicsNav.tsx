import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import ImageC from "../../components/ImageC";
import Loading from "../../components/Loading";
import NoPermission from "../../components/NoPermission";
import nth from "../../utilities/nth";

const EicsNav = () => {
  const [permission, setPermission] = useState(false);
  const [eicName, setEicName] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://apis.news.newton.ac.th/api/auth/getUser", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setEicName(res.data.name);
        if (res.data.permission >= 2) setPermission(true);
      });
  }, [refresh]);

  if (!isLoading) return <Loading />;
  if (!permission) return <NoPermission />;

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
          <Link to={"/eics/members"}>Members (MMS)</Link> <br />
          <Link to={"/eics/issues"}>Issues (ISSMS)</Link>
          <br />
          <Link to={"/eics/articles"}>Articles (AMS)</Link> <br />
          <Link to={"/eics/upload-img"}>Upload Image</Link>
          <Link to={"/eics/new-member"}>New Member</Link>
          <br />
        </div>
      </div>
    </div>
  );
};

export default EicsNav;
