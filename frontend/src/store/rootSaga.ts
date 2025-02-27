import { all } from "redux-saga/effects";
import { setSaga }  from "../store/sagas/setSaga";
import { cardSaga }  from "../store/sagas/cardSaga";

export default function* rootSaga() {
  yield all([setSaga(),cardSaga()]);
}
