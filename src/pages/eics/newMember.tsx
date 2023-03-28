import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NoPermission from "../../components/NoPermission";

const NewMember = () => {
  const [permission, setPermission] = useState(false);
  const [eicName, setEicName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [name, setname] = useState("");
  const [path, setPath] = useState("");
  const [member, setMember] = useState({
    name: "",
    nickname: "",
    role: "",
    year: +"",
    track: "",
    bio: "",
  });
  const loggedInLift = () => {
    setPermission(true);
  };

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");

    if (!token) return setIsLoading(false);

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
    setIsLoading(false);
  }, []);

  const submitHandler = () => {
    let isError = false;
    setIsLoading(true);

    if (isError) return;

    const importAPI = new Promise<string>((reslove, reject) => {
      axios
        .post("https://apis.news.newton.ac.th/api/eics/new-member", member, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((data: AxiosResponse) => {
          console.log(data.data);
          reslove(data.data);
        })
        .catch((err: AxiosError) => {
          // @ts-ignore
          reject(err.response.data.message);
        });
    });

    toast.promise(importAPI, {
      loading: "Awaiting Response From The Newtonian API",
      success: (msg: string) => {
        return msg;
      },
      error: (err) => err,
    });
  };

  useEffect(() => {
    console.log(member);
  }, [member]);
  if (!permission) return <NoPermission loggedInLift={loggedInLift} />;

  return (
    <div className="u-article__wrapper">
      <div className="u-article">
        <div className="u-article__title">
          <h1>Create Member Profile</h1>
          <p>Create member profile as {eicName} - have sufficient permission</p>
        </div>
        <div className="import__area">
          <div className="import__form" onSubmit={(e) => e.preventDefault()}>
            <div className="import__form--action">
              <h3>Information</h3>
            </div>
            <div className="import__form--field">
              <p>Name + Lastname</p>
              <input
                type="text"
                placeholder="Prawich Thawansakdivudhi"
                name="name"
                value={member.name}
                onChange={(e) => setMember({ ...member, name: e.target.value })}
              />
            </div>{" "}
            <div className="import__form--field">
              <p>Nickname</p>
              <input
                type="text"
                placeholder="T"
                name="nickname"
                value={member.nickname}
                onChange={(e) =>
                  setMember({ ...member, nickname: e.target.value })
                }
              />
            </div>
            <div className="import__form--field">
              <p>Year</p>
              <input
                type="text"
                placeholder="11"
                name="year"
                value={member.year}
                defaultValue={11}
                onChange={(e) =>
                  setMember({ ...member, year: +e.target.value })
                }
              />
            </div>{" "}
            <div className="import__form--field">
              <p>Track</p>
              <select
                value={member.track}
                onChange={(e) =>
                  setMember({ ...member, track: e.target.value })
                }
              >
                <option></option>
                <option value={"Medical"}>Medical</option>
                <option value={"Computer Science"}>Computer Science</option>
                <option value={"Newton Business School"}>
                  Newton Business School
                </option>
                <option value={"Humanities"}>Humanities</option>
              </select>
            </div>{" "}
            <div className="import__form--field">
              <p>Role</p>
              <input
                type="text"
                placeholder="Head Technician"
                name="role"
                value={member.role}
                onChange={(e) => setMember({ ...member, role: e.target.value })}
              />
            </div>
            <div className="import__form--field">
              <p>Bio</p>
              <textarea
                placeholder="Hi!, It's me the one and only technical director in the Newton Sixth Form School... "
                name="bio"
                value={member.bio}
                onChange={(e) => setMember({ ...member, bio: e.target.value })}
              />
            </div>
          </div>
        </div>

        <button onClick={submitHandler} className="import__form--btn">
          submit
        </button>
      </div>
    </div>
  );
};

export default NewMember;
