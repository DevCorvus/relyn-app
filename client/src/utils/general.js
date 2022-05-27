export const numberFormatter = (num) => {
  const numberSuffixer = (numberToSuffix, suffix) => {
    const integer = Math.floor(numberToSuffix);
    const decimal = Number(String(numberToSuffix).split('.')[1]);

    if (integer < 100 && decimal !== 0) return integer + '.' + decimal + suffix;
    return integer + suffix;
  };

  if (num < 999) {
    return num;
  } else if (num >= 1000 && num < 1000000) {
    const fixedNumber = (num / 1000).toFixed(1);
    return numberSuffixer(fixedNumber, 'k');
  } else {
    const fixedNumber = (num / 1000000).toFixed(1);
    return numberSuffixer(fixedNumber, 'M');
  }
};

export const capitalizeText = (text) => {
  if (typeof text !== 'string')
    throw new Error('text parameter must be an string');

  let textCapitalized = text.toLowerCase();
  textCapitalized.replace(textCapitalized[0], textCapitalized[0].toUpperCase());

  return textCapitalized;
};

export const appendUrlParams = (url, params) => {
  const searchParams = new URLSearchParams(params).toString();
  return url + '?' + searchParams;
};
