const Out: React.FC<{ link: string; msg?: string }> = (props) => {
  return (
    <div className="loading__wrapper">
      <div className="loading">
        <i
          className="bx bx-link"
          style={{ fontSize: "5rem", color: "var(--signature-grey)" }}
        ></i>
        <span>
          <h3>Outbound Traffic</h3>
          {props.msg && <h4>{props.msg}</h4>}
          <h4>
            Redirecting you to {props.link} <br />
            You will no longer be under The Newtonian Online policy.
          </h4>
          <a href={props.link} target="_blank">
            <button>Continue</button>
          </a>
        </span>
      </div>
    </div>
  );
};

export default Out;
