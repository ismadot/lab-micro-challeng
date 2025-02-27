import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import api from "../../services/api";
import {
  fetchCardsRequest,
  fetchCardsSuccess,
  fetchCardsFailure,
  fetchCardDetailsRequest,
  fetchCardDetailsSuccess,
  fetchCardDetailsFailure,
} from "../slices/cardsSlice";
import { Card, CardDetails, FetchCardsResponse } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchCardsSaga({ payload }: PayloadAction<{ setId: string }>) {
  try {
    const response: AxiosResponse<Card[]> = yield call(api.get, `/card/${payload.setId}`);
    yield put(fetchCardsSuccess({cards:response.data}));
  } catch (error: unknown) {
    console.error("Fetch cards error:", error);
    yield put(fetchCardsFailure());
  }
}

function* fetchCardDetailsSaga({ payload }: PayloadAction<{ cardId: string }>) {
  try {
    const response: AxiosResponse<CardDetails> = yield call(
      api.get,
      `/card/details/${payload.cardId}`
    );
    yield put(fetchCardDetailsSuccess(response.data));
  } catch (error: unknown) {
    console.error("Fetch card details error:", error);
    yield put(fetchCardDetailsFailure());
  }
}

// Watcher saga
export function* cardSaga() {
  yield takeLatest(fetchCardsRequest.type, fetchCardsSaga);
  yield takeLatest(fetchCardDetailsRequest.type, fetchCardDetailsSaga);
}
