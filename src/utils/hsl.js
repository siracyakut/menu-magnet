const getHSL = (color) => {
  const hsl =
    (parseInt(color.substring(1, 3), 16) * 299 +
      parseInt(color.substring(3, 5), 16) * 587 +
      parseInt(color.substring(5, 7), 16) * 114) /
    1000;

  return hsl > 128 ? "#000000" : "#ffffff";
};

export default getHSL;
