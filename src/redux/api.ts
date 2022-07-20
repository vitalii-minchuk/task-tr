import axios from "axios"
import { TransactionType } from "../types"

const baseUrl = "https://627e94bb271f386ceffad340.mockapi.io/items/transactions/"

export const getData = async () => {
  const response = await axios.get<TransactionType[]>(baseUrl)
  return response.data
}

export const deleteData = async (id: string) => {
  axios.delete(`${baseUrl}${id}`)
}

export const addData = async (item: TransactionType) => {
  axios.post(`${baseUrl}/`, item)
}

export const updateData = async (item: TransactionType) => {
  axios.put(`${baseUrl}/${item.transactionid}`, item)
}