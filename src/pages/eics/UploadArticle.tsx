import axios, { Axios, AxiosResponse } from "axios";
import { FormEventHandler, useEffect, useRef, useState } from "react";

const catergories = [
  {
    name: "Letter",
    id: "letter",
  },
  {
    name: "Interview",
    id: "Interview",
  },
  {
    name: "School Update",
    id: "SchoolUpdate",
  },
  {
    name: "Advice / Essay",
    id: "AdviceEssay",
  },
  {
    name: "Fiction",
    id: "Fiction",
  },
  {
    name: "Performing Arts",
    id: "PerformingArts",
  },
  {
    name: "Visual Arts",
    id: "VisualArts",
  },
  {
    name: "Review",
    id: "Review",
  },
  {
    name: "Business by NBS",
    id: "NBS",
  },
];

const UploadArticle = () => {
  const [permission, setPermission] = useState(false);
  const [eicName, setEicName] = useState("Prawich Thawansakdivudhi");
  const [isLoading, setIsLoading] = useState(true);

  const [content, setContent] = useState("");

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      // axios
      //   .get("https://apis.news.newton.ac.th/auth/verify", {
      //     headers: {
      //       authorization: "Bearer " + token,
      //     },
      //   })
      //   .then((res: AxiosResponse) => {
      //     console.log(res);
      //   });
      setIsLoading(false);
      setPermission(true);
    } else setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(content);
  }, [content]);

  if (!permission)
    return (
      <div className="u-article__wrapper">
        <div className="u-article">
          <h1>401 | Unauthorised</h1>
          <p>
            This device is unknown to the server, please contact the technical
            team to setup yout device.{" "}
            <a
              onClick={() => {
                localStorage.setItem(
                  "token",
                  prompt("Please insert token") ?? ""
                );
              }}
            >
              For Technical Team
            </a>
          </p>
        </div>
      </div>
    );

  return (
    <div className="u-article__wrapper">
      <div className="u-article">
        <div className="u-article__title">
          <h1>Upload Article For Eics</h1>
          <p>Uplad an article as {eicName}</p>
        </div>
        <form className="eics__form" onSubmit={(e) => e.preventDefault()}>
          <div className="eics__form--field">
            <p>Article Name</p>
            <input
              type="text"
              placeholder="Oam and Shang: The two great minds behind the Newton Musical"
            />
          </div>
          <div className="eics__form--field">
            <p>Writer's Name</p>
            <select>
              <option value="">Yanitta Iewwongcharoen (Krapook)</option>
              <option value="">Weesuda Cheepluesak (Milin)</option>
              <option value="">Sakulya Kovitgoolkri (Jean)</option>
              <option value="">Nattawut Titirojanawat (Reain)</option>
              <option value="">Pakitsaree Koysantisook (Proud)</option>
              <option value="">Ananya Gadiraju (One)</option>
              <option value="">Prawich Thawansakdivudhi (T)</option>
              <option value="">Boonruk Saenghirunwattana (Shang)</option>
            </select>
          </div>

          <div className="eics__form--field">
            <p>Categories</p>
            <select>
              {catergories &&
                catergories.map((cur) => (
                  <option value={cur.id}>{cur.name}</option>
                ))}
            </select>
          </div>
          <div className="eics__form--field eics__form--area">
            <p>Content</p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              cols={200}
              rows={330}
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UploadArticle;
