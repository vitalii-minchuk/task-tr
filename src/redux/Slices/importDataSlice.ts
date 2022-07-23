import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TransactionType } from "../../types"

type TransactionState = {
  data: TransactionType[]
  isImporting: boolean
}

const initialState: TransactionState = {
  data: [],
  isImporting: false,
}

const importDataSlice = createSlice({
  name: "import",
  initialState,
  reducers: {
    importData(state) {
      state.isImporting = true
    },
    choseAnotherData(state) {
      state.data = []
    },
    downloadData(state, action: PayloadAction<TransactionType[]>) {
      state.data.push(...action.payload)
    },
    importDataSuccess(state) {
      state.isImporting = false
      state.data = []
    },
    cancelImport(state) {
      state.isImporting = false
      state.data = []
    }
  }
})

export const { importData,
  downloadData,
  choseAnotherData,
  importDataSuccess,
  cancelImport } = importDataSlice.actions
export default importDataSlice.reducer