import { useState } from "react";

const Members = () => {
  const [important, setImportant] = useState([
    {
      name: "Yanitta Iewwongcharoen (Krapook)",
      image: "/members/image.jpeg",
      year: "13",
      track: "Humanity",
      position: ["Editor-in-chief"],
    },
    {
      name: "Yanitta Iewwongcharoen (Krapook)",
      image: "/members/image.jpeg",
      year: "13",
      track: "Humanity",
      position: ["Editor-in-chief"],
    },
  ]);

  return (
    <div className="members__wrapper">
      <div className="members">
        <section className="members__important">
          {important &&
            important.map((cur) => (
              <div className="members__important--card">
                <img
                  src={cur.image}
                  alt=""
                  className="members__important--image"
                />
                <h3>{cur.name}</h3>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
};

export default Members;
