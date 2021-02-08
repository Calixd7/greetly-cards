export function calculateFontSizes () {
  const sizeOptions = []

  for (let i = 16; i <= 98; i += 2) {
    sizeOptions.push(i)
  }
  return sizeOptions
}

export function calculateOpacityOptions () {
  const opacityOptions = []

  for (let i = 1; i < 10; i++) {
    opacityOptions.push(i / 10)
  }
  return opacityOptions
}

// export function CountCards (cards) {
//   setCardListLength(cards.length)
// }
