import { useMemo } from "react"
import { TransactionType } from "../types"

export const useMapTables = (list: TransactionType[]) => {
  const table = new Map()

  const options = useMemo(() => getTypes(list), [list])

  table.set("AllAll", options?.all)
  table.set("AllPending", options?.allPending)
  table.set("AllCompleted", options?.allCompleted)
  table.set("AllCancelled", options?.allCancelled)
  table.set("WithdrawalAll", options?.withdrawal)
  table.set("WithdrawalPending", options?.withdrawalPending)
  table.set("WithdrawalCompleted", options?.withdrawalCompleted)
  table.set("WithdrawalCancelled", options?.withdrawalCancelled)
  table.set("RefillAll", options?.refill)
  table.set("RefillPending", options?.refillPending)
  table.set("RefillCompleted", options?.refillCompleted)
  table.set("RefillCancelled", options?.refillCancelled)

  return table
}

const getTypes = (data: TransactionType[]) => {
  if (!data?.length) return
  let options = {
    all: [...data] as TransactionType[],
    allPending: [] as TransactionType[],
    allCompleted: [] as TransactionType[],
    allCancelled: [] as TransactionType[],
    withdrawal: [] as  TransactionType[],
    withdrawalPending: [] as  TransactionType[],
    withdrawalCompleted: [] as  TransactionType[],
    withdrawalCancelled: [] as  TransactionType[],
    refill: [] as  TransactionType[],
    refillPending: [] as  TransactionType[],
    refillCompleted: [] as  TransactionType[],
    refillCancelled: [] as  TransactionType[],
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].status === "Pending") {
      options.allPending.push(data[i])
    } else if (data[i].status === "Completed") {
      options.allCompleted.push(data[i])
    } else {
      options.allCancelled.push(data[i])
    }
    if (data[i].type === "Withdrawal") {
      options.withdrawal.push(data[i])
      if (data[i].status === "Pending") {
        options.withdrawalPending.push(data[i])
      } else if (data[i].status === "Completed") {
        options.withdrawalCompleted.push(data[i])
      } else {
        options.withdrawalCancelled.push(data[i])
      }
    } else {
      options.refill.push(data[i])
      if (data[i].status === "Pending") {
        options.refillPending.push(data[i])
      } else if (data[i].status === "Completed") {
        options.refillCompleted.push(data[i])
      } else {
        options.refillCancelled.push(data[i])
      }
    }
  }

  return options
}