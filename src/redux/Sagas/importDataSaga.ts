import {  delay, select, takeEvery } from "@redux-saga/core/effects"
import { TransactionType } from "../../types"
import { addData } from "../api"
import { importData, importDataSuccess } from "../Slices/importDataSlice"


export function* importDataSaga() {
  const data: TransactionType[] = yield select((store) => store.import.data)
  for (const transaction of data) {
    yield delay(1000);
    const isImporting: boolean =  yield select((store) => store.import.isImporting)
    if (isImporting) {
      yield addData(transaction)
    }
  }
  yield importDataSuccess()
}

export function* rootImportDataSaga() {
  yield takeEvery(importData.type, importDataSaga)
}