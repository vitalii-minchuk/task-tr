import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CurrentDialogType, OpenDialogsType } from "../../types"

type TransactionState = {
  dialogs: OpenDialogsType
  currentDialog: CurrentDialogType
}

const initialState: TransactionState = {
  dialogs: {
    addNewTr: false,
    delTr: false,
    editTr: false,
    import: false
  },
  currentDialog: null
}

const openModalSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    openDialog(state, action: PayloadAction<CurrentDialogType>) {
      state.currentDialog = action.payload
      for (let key in state.dialogs) {
        if (key === action.payload) {
          state.dialogs[key] = true
        }
      }
    },
    closeDialog(state, action: PayloadAction<CurrentDialogType>) {
      state.currentDialog = null
      for (let key in state.dialogs) {
        if (key === action.payload) {
          state.dialogs[key] = false
        }
      }
    },
  }
})

export const { openDialog, closeDialog } = openModalSlice.actions
export default openModalSlice.reducer