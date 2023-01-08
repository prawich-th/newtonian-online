export default () => (
  <div className="u-article__wrapper">
    <div className="u-article">
      <h1>401 | Unauthorised</h1>
      <p>
        This device is unknown to the server, please contact the technical team
        to setup yout device.{" "}
        <a
          onClick={() => {
            localStorage.setItem("token", prompt("Please insert token") ?? "");
          }}
        >
          For Technical Team
        </a>
      </p>
    </div>
  </div>
);
