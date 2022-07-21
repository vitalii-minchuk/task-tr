import { call, put, select, takeEvery } from "@redux-saga/core/effects"
import { TransactionType } from "../../types"

import {
  addData,
  deleteData,
  getByName,
  getByStatus,
  getByType,
  getData,
  updateData
} from "../api"
import { addTransaction,
  fetchTransactions,
  fetchTransactionsSuccess,
  filterByStatus,
  filterByStatusSuccess,
  filterByType,
  removeTransaction,
  requestFailure,
  searchByName,
  searchByNameSuccess,
  toggleStatus 
} from "../Slices/transactionsSlice"

export function* fetchTransactionsSaga() {
  try {
    const data: TransactionType[] = yield call(getData)
    yield put(fetchTransactionsSuccess(data))
  } catch (error: any) {
    yield put(requestFailure(error.message))
  }
}

export function* addTransactionSaga() {
  try {
    const data: TransactionType = yield select((store) => store.transactions.currentTr)
    yield addData(data)
    
  } catch (error: any) {
    yield put(requestFailure(error.message))
  }
}

export function* updateTransactionSaga() {
  try {
    const data: TransactionType = yield select((store) => store.transactions.currentTr)
    yield updateData(data)
  } catch (error: any) {
    yield put(requestFailure(error.message))
  }
}

export function* deleteTransactionSaga() {
  try {
    const { transactionid }  = yield select((store) => store.transactions.currentTr)
    yield deleteData(transactionid)
  } catch (error: any) {
    yield put(requestFailure(error.message))
  }
}

export function* filterByStatusSaga() {
  try {
    const status: string = yield select((store) => store.transactions.filter)
    const data: TransactionType[] = yield getByStatus(status)
    yield put(filterByStatusSuccess(data))
  } catch (error: any) {
    yield put(requestFailure(error.message))
  }
}

export function* filterByTypeSaga() {
  try {
    const type: string = yield select((store) => store.transactions.filter)
    const data: TransactionType[] = yield getByType(type)
    yield put(filterByStatusSuccess(data))
  } catch (error: any) {
    yield put(requestFailure(error.message))
  }
}

export function* searchByNameSaga() {
  try {
    const string: string = yield select((store) => store.transactions.filter)
    const data: TransactionType[] = yield getByName(string)
    yield put(searchByNameSuccess(data))
  } catch (error: any) {
    yield put(requestFailure(error.message))
  }
}

export function* rootTransactionsSaga() {
  yield takeEvery(fetchTransactions.type, fetchTransactionsSaga)
  yield takeEvery(removeTransaction.type, deleteTransactionSaga)
  yield takeEvery(addTransaction.type, addTransactionSaga)
  yield takeEvery(toggleStatus.type, updateTransactionSaga)
  yield takeEvery(filterByStatus.type, filterByStatusSaga)
  yield takeEvery(filterByType.type, filterByTypeSaga)
  yield takeEvery(searchByName.type, searchByNameSaga)
}