
export const to2decimal = number => {
  let num = (Math.round(number * 100) / 100).toFixed(2)
  return Number(num)
}

export const convert = (amount, rate, convertTo) => {
  if(convertTo === 'CFA'){
    let CFA = (amount * 5000) / rate;
    return to2decimal(CFA)
  }
  if(convertTo === 'GMD'){
    let GMD = amount * (rate / 5000)
    return to2decimal(GMD)
  }
}
