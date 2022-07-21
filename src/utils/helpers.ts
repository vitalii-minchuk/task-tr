import { TransactionType } from "../types"

export const getOrderNumber = (arr: TransactionType[]): string => {

  if (arr.length) {
    const array: Array<number> = []

    arr.forEach((item => {
        array.push(Number(item.transactionid))
      }
    ))
    
    return String(Math.max(...array) + 1)
  }
 
  return "1"
}

export const convertMoney = (money: number): string => {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  })
  
  return formatter.format(money)
}

export const getNumberOfPages = (num: number): Array<number> => {
  let arr: Array<number> = []

  for (let i = 1; i <= num; i ++) {
    arr.push(i)
  }
  
  return arr
}