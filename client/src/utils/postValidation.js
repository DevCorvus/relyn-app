import val from "validator";

export const postValidation = (name, value, setValidation) => {
  if (name === "body") {
    const trimmedValue = val.trim(value);
    if (val.isLength(trimmedValue, { min: 1, max: 500 })) {
      setValidation(prevState => ({ ...prevState, body: "" }));
    } else {
      setValidation(prevState => ({ ...prevState, body: "Invalid Content" }));
    }
  }

  else if (name === "imageUrl" && value) {
    const imageRegex = /\.(jpg|jpeg|png|webp|bmp|gif)/i;
    if (val.isURL(value) && imageRegex.test(value)) {
      setValidation(prevState => ({ ...prevState, imageUrl: "" }));
    } else {
      setValidation(prevState => ({ ...prevState, imageUrl: "It isn't an Image URL" }));
    }
  } else {
    setValidation(prevState => ({ ...prevState, imageUrl: "" }));
  }
};