export type PostType = {
  id: number
  body: string
  title: string
}

export type TransactionType = {
  transactionid: string
  type: string
  status: string
  clientname: string
  amount: string
}

export type OpenDialogsType = {
  addNewTr: boolean
  delTr: boolean
  editTr: boolean
}

export type CurrentDialogType = "addNewTr" | "delTr" | "editTr" | null