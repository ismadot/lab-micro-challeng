import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import api from "../../services/api";
import {
  fetchSetsRequest,
  fetchSetsSuccess,
  fetchSetsFailure,
  fetchSetDetailsRequest,
  fetchSetDetailsSuccess,
  fetchSetDetailsFailure,
} from "../slices/setsSlice";
import { Set } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchSetsSaga() {
  try {
    const response: AxiosResponse<Set[]> = yield call(api.get, "/set");
    yield put(fetchSetsSuccess({sets: response.data}));
  } catch (error: unknown) {
    console.error("Fetch sets error:", error);
    yield put(fetchSetsFailure());
  }
}

function* fetchSetDetailsSaga({ payload }: PayloadAction<{ setId: string }>) {
  try {
    const response: AxiosResponse<Set> = yield call(api.get, `/set/${payload.setId}`);
    yield put(fetchSetDetailsSuccess(response.data));
  } catch (error: unknown) {
    console.error("Fetch set details error:", error);
    yield put(fetchSetDetailsFailure());
  }
}

// Watcher saga
export function* setSaga() {
  yield takeLatest(fetchSetsRequest.type, fetchSetsSaga);
  yield takeLatest(fetchSetDetailsRequest.type, fetchSetDetailsSaga);
}
