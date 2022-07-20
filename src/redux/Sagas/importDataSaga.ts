import {  delay, select, takeEvery } from "@redux-saga/core/effects"
import { TransactionType } from "../../types"
import { addData } from "../api"
import { importData } from "../Slices/importDataSlice"


export function* importDataSaga() {
  const data: TransactionType[] = yield select((store) => store.import.data)
  for (const transaction of data) {
    yield delay(1000);
    yield addData(transaction)
  }
}

export function* rootImportDataSaga() {
  yield takeEvery(importData.type, importDataSaga)
}