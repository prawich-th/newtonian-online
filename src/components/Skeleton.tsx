const Skeleton: React.FC<{
  height: number;
  margin?: number;
  width?: number;
}> = (props) => {
  return (
    <span
      className="skeleton"
      style={{
        width: `${props.width ?? 100}%`,
        height: `${props.height}rem`,
        margin: `0 0 ${props.margin ?? 1}rem 0`,
        background: "var(--signature-white)",
      }}
    ></span>
  );
};

export default Skeleton;
