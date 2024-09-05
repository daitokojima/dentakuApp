// 3桁ごとカンマ区切りに表示
export function numberWithCommas(words: string) {
  const [integerSection, decimalSection] = words.split(".");

  const formattedInteger = integerSection.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalSection
    ? `${formattedInteger}.${decimalSection}`
    : formattedInteger;
}
