import { call, put, select, takeEvery } from "@redux-saga/core/effects"
import { TransactionType } from "../types"
import { addData, deleteData, getData, updateData } from "./api"
import { addTransaction,
  fetchTransactions,
  fetchTransactionsSuccess,
  removeTransaction,
  toggleStatus 
} from "./transactionsSlice"


export function* fetchTransactionsSaga() {
  const data: TransactionType[] = yield call(getData)
  yield put(fetchTransactionsSuccess(data))
}

export function* addTransactionSaga() {
  const data: TransactionType = yield select((store) => store.transactions.currentTr)
console.log(data)
  yield addData(data)
}

export function* updateTransactionSaga() {
  const data: TransactionType = yield select((store) => store.transactions.currentTr)

  yield updateData(data)
}

export function* deleteTransactionSaga() {
  const { transactionid }  = yield select((store) => store.transactions.currentTr)
  console.log(transactionid)
  yield deleteData(transactionid)
}

export function* rootTransactionsSaga() {
  yield takeEvery(fetchTransactions.type, fetchTransactionsSaga)
  yield takeEvery(removeTransaction.type, deleteTransactionSaga)
  yield takeEvery(addTransaction.type, addTransactionSaga)
  yield takeEvery(toggleStatus.type, updateTransactionSaga)
}