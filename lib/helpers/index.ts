// 3桁ごとカンマ区切りに表示
export function numberWithCommas(words: string) {
  return words.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
