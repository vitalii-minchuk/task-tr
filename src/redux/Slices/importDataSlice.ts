import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TransactionType } from "../../types"

type TransactionState = {
  data: TransactionType[]
  isImporting: boolean
  currentData: TransactionType | null
}

const initialState: TransactionState = {
  data: [],
  isImporting: false,
  currentData: null
}

const importDataSlice = createSlice({
  name: "import",
  initialState,
  reducers: {
    importData(state) {
      state.isImporting = true
    },
    downloadData(state, action: PayloadAction<TransactionType[]>) {
      state.data.push(...action.payload)
    },
    importDataSuccess(state) {
      state.isImporting = false
    },
  }
})

export const { importData, downloadData, importDataSuccess } = importDataSlice.actions
export default importDataSlice.reducer