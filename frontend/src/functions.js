export function calculateFontSizes () {
  const sizeOptions = []

  for (let i = 16; i <= 98; i += 2) {
    sizeOptions.push(i)
  }
  return sizeOptions
}

// export function CountCards (cards) {
//   setCardListLength(cards.length)
// }
