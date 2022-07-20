import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TransactionType } from "../types"

type TransactionState = {
  transactions: TransactionType[]
  currentTr: TransactionType | null
  isLoading: boolean
}

const initialState: TransactionState = {
  transactions: [],
  currentTr: null,
  isLoading: false
}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    fetchTransactions(state) {
      state.isLoading = true
    },
    fetchTransactionsSuccess(state, action: PayloadAction<TransactionType[]> ) {
      state.transactions = action.payload
      state.isLoading = false
    },
    addTransaction(state, action: PayloadAction<TransactionType>) {
      state.transactions.push({
        transactionid: action.payload.transactionid,
        amount: action.payload.amount,
        clientname: action.payload.clientname,
        status: action.payload.status,
        type: action.payload.type
      })
      state.currentTr = state.transactions[state.transactions.length - 1]
    },
    toggleStatus(state, action: PayloadAction<TransactionType>) {
      const toggledTransaction = state.transactions.find(el => el.transactionid === action.payload.transactionid)
      if (toggledTransaction) {
        toggledTransaction.status = action.payload.status
      }
    },
    removeTransaction(state, action: PayloadAction<string>) {
      state.transactions = state.transactions.filter(el => el.transactionid !== action.payload)
    },
    setCurrentTr(state, action: PayloadAction<TransactionType>) {
      state.currentTr = action.payload
    }
  }
})

export const { addTransaction,
  removeTransaction,
  toggleStatus,
  fetchTransactions,
  fetchTransactionsSuccess,
  setCurrentTr } = transactionsSlice.actions
export default transactionsSlice.reducer