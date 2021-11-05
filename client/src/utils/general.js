export const numberFormatter = (num) => {
  const numberSuffixer = (numberToSuffix, suffix) => {
    const integer = Math.floor(numberToSuffix);
    const decimal = Number(String(numberToSuffix).split(".")[1]);
    if (integer < 100 && decimal !== 0) return integer + "." + decimal + suffix;
    return integer + suffix;
  };

  if (num < 999) {
    return num;
  } else if (num >= 1000 && num < 1000000) {
    const fixedNumber = (num / 1000).toFixed(1);
    return numberSuffixer(fixedNumber, "k");
  } else {
    const fixedNumber = (num / 1000000).toFixed(1);
    return numberSuffixer(fixedNumber, "M");
  }
};

export const capitalizeText = (text) => {
  if (typeof text !== "string") throw new Error("text parameter must be an string");
  let textCapitalized = text.toLowerCase();
  textCapitalized.replace(textCapitalized[0], textCapitalized[0].toUpperCase());
  return textCapitalized;
};

export const urlPusher = (url, queries) => {
  let completeUrl = url;
  const queryNames = Object.keys(queries);

  queryNames.forEach(query => {
    if (queries[query]) {
      completeUrl += "".concat("&", query, "=", queries[query].split(" ").join("+"));
    }
  });

  return completeUrl;
};