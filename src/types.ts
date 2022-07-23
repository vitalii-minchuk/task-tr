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
  import: boolean
}

export type CurrentDialogType = "import" | "addNewTr" | "delTr" | "editTr" | null

export type AmountFilterType ={
  from: number
  to: number
}