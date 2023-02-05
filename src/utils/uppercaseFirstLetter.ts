function firstLetterToUpperCaseHelper(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function firstLetterToUpperCase(string: string) {
  let returnString = "";
  const splitString = string.split(" ");

  splitString.forEach((word) => {
    returnString += firstLetterToUpperCaseHelper(word) + " ";
  });

  return returnString;
}
