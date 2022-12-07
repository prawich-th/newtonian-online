export default function (datestring: string) {
  const date = new Date(datestring).toLocaleDateString("en-UK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const d = +date.split(" ")[0];
  const my = date.split(" ").splice(1).join(" ");

  if (d > 3 && d < 21) return `${d}th ${my}`;
  switch (d % 10) {
    case 1:
      return `${d}st ${my}`;
    case 2:
      return `${d}nd ${my}`;
    case 3:
      return `${d}rd ${my}`;
    default:
      return `${d}th ${my}`;
  }
}
