export function removeStartEndCharIfPresent(str: string, char: string) {
  if (str && str.startsWith(char)) {
    str = str.substring(1);
  }
  if (str && str.endsWith(char)) {
    str = str.slice(0, str.length - 1);
  }
  return str;
}

export function cleanStringList(stringList: string[], charList = ['\n', '"']) {
  for (let i = 0; i < stringList.length; i++) {
    for (let j = 0; j < charList.length; j++) {
      stringList[i] = removeStartEndCharIfPresent(
        stringList[i],
        charList[j],
      ).replace('""', '"');
    }
  }
  return stringList;
}
