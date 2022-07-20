import { combineReducers, configureStore } from "@reduxjs/toolkit"
import transactionsReducer from "./transactionsSlice"
import logger from "redux-logger"
import createSagaMiddleware from "@redux-saga/core"
import { all, fork } from "@redux-saga/core/effects"
import { rootTransactionsSaga } from "./transactionsSaga"

const combinedReducer = combineReducers({
  transactions: transactionsReducer
})

const rootSaga = function* rootGenerator() {
  yield all([fork(rootTransactionsSaga)])
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