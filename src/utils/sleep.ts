export default (time: number) => {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      console.log("night!");
      return reslove("done");
    }, time);
  });
};
