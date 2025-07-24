export const convertIsoStringToDateTime = (isoString) => {
  return isoString.slice(0, 10) + " " + isoString.slice(11, 19);
};
