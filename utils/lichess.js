export const getRatingString = (rating, prov) => {
  return `${rating}${prov ? "?" : ""}`;
}