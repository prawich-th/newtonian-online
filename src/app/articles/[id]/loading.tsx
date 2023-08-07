import Skeleton from "@/components/Skeleton";

const LoadingArticle = () => {
  return (
    <div className="article">
      <div className="article__wrapper">
        <div className="article__heading">
          <Skeleton height={8} />
          <Skeleton height={3} />
          <Skeleton height={40} />
          <Skeleton height={2} margin={0.75} />
          <Skeleton height={2} margin={0.75} />
          <Skeleton height={2} margin={0.75} />
          <Skeleton height={2} margin={0.75} />
        </div>
      </div>
    </div>
  );
};

export default LoadingArticle;
