export function capitalizeFirstLetter(text: string) {
  const firstLetter = text.slice(0, 1);
  const otherLetters = text.slice(1, text.length);

  return firstLetter.toUpperCase() + otherLetters;
}
