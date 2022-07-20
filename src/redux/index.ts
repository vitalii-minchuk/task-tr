import { combineReducers, configureStore } from "@reduxjs/toolkit"
import transactionsReducer from "./Slices/transactionsSlice"
import importReducer from "./Slices/importDataSlice"
import dialogsReducer from "./Slices/openModalSlice"
import logger from "redux-logger"
import createSagaMiddleware from "@redux-saga/core"
import { all, fork } from "@redux-saga/core/effects"
import { rootTransactionsSaga } from "./Sagas/transactionsSaga"
import { rootImportDataSaga } from "./Sagas/importDataSaga"

const combinedReducer = combineReducers({
  transactions: transactionsReducer,
  import: importReducer,
  dialogs: dialogsReducer
})

const rootSaga = function* rootGenerator() {
  yield all([fork(rootTransactionsSaga), fork(rootImportDataSaga)])
}

const sagaMMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware()
    return [...defaultMiddleware, sagaMMiddleware, logger]
  }
})

sagaMMiddleware.run(rootSaga)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch