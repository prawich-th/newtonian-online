import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import NoPermission from "../../components/NoPermission";

const UploadImage = () => {
  const [permission, setPermission] = useState(false);
  const [eicName, setEicName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState<Blob | string>("");
  const [name, setname] = useState("");
  const [path, setPath] = useState("");
  const [members, setMembers] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const loggedInLift = () => {
    setPermission(true);
  };

  const f_path = searchParams.get("f_path")?.slice(1);
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

  useEffect(() => {
    console.log(f_path);
    if (f_path) {
      setPath(
        f_path
          .split("/")
          .slice(0, f_path.split("/").length - 1)
          .join("/")
      );
      setname(f_path.split("/").reverse()[0]);
    }
  }, [f_path]);

  const submitHandler = () => {
    let isError = false;
    setIsLoading(true);

    if (isError) return;

    const importAPI = new Promise<string>((reslove, reject) => {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("path", path);
      formData.append("filename", name);

      axios
        .post("https://apis.news.newton.ac.th/api/eics/upload-img", formData, {
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

  if (!permission) return <NoPermission loggedInLift={loggedInLift} />;

  return (
    <div className="u-article__wrapper">
      <div className="u-article">
        <div className="u-article__title">
          <h1>Upload Image</h1>
          <p>Upload an image as {eicName} - have sufficient permission</p>
        </div>
        <div className="import__area">
          <div className="import__form" onSubmit={(e) => e.preventDefault()}>
            <div className="import__form--action">
              <h3>Upload Image</h3>
            </div>
            <div className="import__form--field">
              <p>File Name *nospace, nouppercase</p>
              <input
                type="text"
                placeholder="cover.webp"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>{" "}
            <div className="import__form--field">
              <p>Pathname *nospace, nouppercase</p>
              <input
                type="text"
                placeholder="/articles/newtonmusical"
                name="path"
                value={path}
                onChange={(e) => setPath(e.target.value)}
              />
            </div>{" "}
            <div className="import__form--field">
              <p>File (image)</p>
              <input
                onChange={(event) => {
                  // @ts-ignore
                  setImage(event.target.files[0]);
                }}
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg"
              ></input>
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

export default UploadImage;
