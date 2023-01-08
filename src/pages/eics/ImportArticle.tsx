import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import NoPermission from "../../components/NoPermission";

const catergories = [
  {
    name: "Advice / Essay",
    id: "AdviceEssay",
  },
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

const ImportArticle = () => {
  const [permission, setPermission] = useState(false);
  const [eicName, setEicName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);
  const [formValue, setFormValue] = useState([
    {
      headline: "",
      writerId: 0,
      issueNo: 1,
      category: "",
      docId: "",
      cover: "/articles/",
    },
    // {
    //   headline: "",
    //   writerId: 0,
    //   issueNo: 0,
    //   categories: "",
    //   docId: "",
    //   cover: "/articles/",
    // },
  ]);
  const [content, setContent] = useState("");

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
    axios
      .get("https://apis.news.newton.ac.th/api/eics/get-members?sfilter=ACTI", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res: AxiosResponse) => {
        setMembers(res.data.members);
      });
    if (localStorage.getItem("data")) {
      setFormValue(JSON.parse(localStorage.getItem("data")!));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(content);
  }, [content]);

  const changeHandler = (i: number, e: ChangeEvent) => {
    const d = [...formValue];
    // @ts-ignore
    d[i][e.target.name] = e.target.value;

    localStorage.setItem("data", JSON.stringify(d));
    setFormValue(d);
  };

  const deleteHandler = (i: number) => {
    if (!formValue[i])
      return toast.error(`Import Number ${i} does not exists!`);

    if (formValue.length === 1)
      return toast.error("You must have atleast 1 Import");

    const values = [...formValue];
    values.splice(i, 1);
    setFormValue(values);
    console.log(formValue);
  };

  const addHandler = () => {
    const d = [
      ...formValue,
      {
        headline: "",
        writerId: 0,
        issueNo: 1,
        category: "",
        docId: "",
        cover: "/articles/",
      },
    ];

    setFormValue(d);
  };

  const submitHandler = () => {
    let isError = false;
    setIsLoading(true);
    console.log(formValue);

    localStorage.removeItem("data");

    formValue.every((article, i) => {
      if (
        !article.category ||
        !article.cover ||
        !article.docId ||
        !article.headline ||
        !article.issueNo ||
        !article.writerId
      ) {
        isError = true;
        toast.error(`decalred import no ${i + 1} is not complete`);
        return false;
      }
      return true;
    });

    if (isError) return;

    const importAPI = new Promise<string[]>((reslove, reject) => {
      if (formValue[0].headline === "") return;
      axios
        .post(
          "https://apis.news.newton.ac.th/api/eics/import-article",
          { articles: formValue },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
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
      success: (msg: string[]) => {
        msg.map((l) => {
          if (l.startsWith("Success")) {
            toast.success(l);
          } else toast.error(l);
        });

        return "Success";
      },
      error: (err) => err,
    });
  };

  if (!permission) return <NoPermission />;

  return (
    <div className="u-article__wrapper">
      <div className="u-article">
        <div className="u-article__title">
          <h1>Import Article</h1>
          <p>Uplad an article as {eicName} - have sufficient permission</p>
        </div>
        <div className="import__area">
          {formValue.map((f, index) => (
            <div
              className="import__form"
              key={index}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="import__form--action">
                <h3>Number {index + 1}</h3>
                <button
                  style={{ width: "2rem", textAlign: "center" }}
                  onClick={() => deleteHandler(index)}
                  className="import__form--btn"
                >
                  -
                </button>
              </div>

              <div className="import__form--field">
                <p>Article Headline</p>
                <input
                  type="text"
                  placeholder="Oam and Shang: The two great minds behind the Newton Musical"
                  name="headline"
                  value={f.headline}
                  onChange={(e) => changeHandler(index, e)}
                />
              </div>
              <div className="import__form--field">
                <p>Cover Image</p>
                <input
                  type="text"
                  placeholder="/path/to/image/on/server"
                  name="cover"
                  value={f.cover}
                  onChange={(e) => changeHandler(index, e)}
                />
              </div>
              <div className="import__form--field">
                <p>Issue No.</p>
                <input
                  type="number"
                  placeholder="0"
                  name="issueNo"
                  value={f.issueNo}
                  onChange={(e) => changeHandler(index, e)}
                />
              </div>
              <div className="import__form--field">
                <p>Writer</p>
                <select
                  name="writerId"
                  value={f.writerId}
                  onChange={(e) => changeHandler(index, e)}
                >
                  <option></option>
                  {members.map((m) => {
                    return (
                      <option key={m.id} value={+m.id}>
                        {m.name} ({m.nickname})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="import__form--field">
                <p>Category</p>
                <select
                  name="category"
                  value={f.category}
                  onChange={(e) => changeHandler(index, e)}
                >
                  <option></option>

                  {catergories &&
                    catergories.map((cur) => (
                      <option key={cur.id} value={cur.id}>
                        {cur.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="import__form--field ">
                <p>Google Document Id</p>
                <input
                  name="docId"
                  value={f.docId}
                  onChange={(e) => changeHandler(index, e)}
                  type="text"
                  placeholder="1LwaIzCyfEnmMKm1EmP5nYHZy2ZlE6MlI9qT_ZUMdRCc"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          style={{ width: "2rem", textAlign: "center" }}
          onClick={addHandler}
          className="import__form--btn"
        >
          +
        </button>
        <button onClick={submitHandler} className="import__form--btn">
          submit
        </button>
      </div>
    </div>
  );
};

export default ImportArticle;
