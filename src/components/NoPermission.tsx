import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

export default (props: { loggedInLift: () => void }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    let isError = false;
    // setIsLoading(true);

    if (isError) return;

    const importAPI = new Promise<string>((reslove, reject) => {
      axios
        .post(
          "https://apis.news.newton.ac.th/api/auth/signin",
          { username: name, password: password },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((data: AxiosResponse) => {
          console.log(data.data);
          localStorage.setItem("token", data.data.token);
          props.loggedInLift();
          reslove(data.data);
        })
        .catch((err: AxiosError) => {
          // @ts-ignore
          reject(err.response.data.message);
        });
    });

    toast.promise(importAPI, {
      loading: "Awaiting Response From The Newtonian API",
      success: "Successfully Loggedin, PLEASE RELOAD THE PAGE",
      error: (err) => err,
    });
  };

  return (
    <div className="u-article__wrapper">
      <div className="u-article">
        <h1>401 | Unauthorised</h1>
        <p>This device is unknown to the server, please login to continue.</p>

        <div className="import__area">
          <div className="import__form" onSubmit={(e) => e.preventDefault()}>
            <div className="import__form--action">
              <h3>Login</h3>
            </div>
            <div className="import__form--field">
              <p>Name</p>
              <input
                type="text"
                placeholder="Prawich Thawansakdivudhi"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>{" "}
            <div className="import__form--field">
              <p>Password</p>
              <input
                type="password"
                placeholder="********"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>{" "}
            <button onClick={submitHandler} className="import__form--btn">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
