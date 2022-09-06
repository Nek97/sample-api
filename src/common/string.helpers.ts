/**
 * This function will remove specific characters from the start and the end of the string
 * "\nSomething\n" => "Something"
 * @param str string to be cleaned
 * @param char char to be removed from the start and the end of the string
 * @returns the cleaned string
 */
export function removeStartEndCharIfPresent(str: string, char: string) {
  if (str && str.startsWith(char)) {
    str = str.substring(1);
  }
  if (str && str.endsWith(char)) {
    str = str.slice(0, str.length - 1);
  }
  return str;
}

/**
 * This function will remove specific characters from the start and the end of the string, other than replace 2 double quotes with only 1
 * "\n\"Something\"" => "Something"
 * @param stringList array of strings to be cleaned
 * @param charList list of char to be removed, the order will define how the characters will be removed, default ['\n', '"']
 * @returns the strings array
 */
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
