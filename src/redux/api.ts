import axios from "axios"
import { TransactionType } from "../types"

const baseUrl = "https://627e94bb271f386ceffad340.mockapi.io/items/transactions"

export const getData = async () => {
  const response = await axios.get<TransactionType[]>(baseUrl)
  return response.data
}

export const deleteData = (id: string) => {
  axios.delete(`${baseUrl}/${id}`)
}

export const addData = (item: TransactionType) => {
  axios.post(`${baseUrl}/`, item)
}

export const updateData = (item: TransactionType) => {
  axios.put(`${baseUrl}/${item.transactionid}`, item)
}

export const getByType = async (type: string) => {
  const response = await axios.get(`${baseUrl}?type=${type}`)
  return response.data
}

export const getByStatus = async (status: string) => {
  const response = await axios.get(`${baseUrl}?status=${status}`)
  return response.data
}

export const getByName = async (string: string) => {
  const response = await axios.get(`${baseUrl}?clientname=${string}`)
  return response.data
}