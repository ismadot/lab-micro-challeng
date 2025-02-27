import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, CardDetails, FetchCardsResponse, FetchSetsResponse } from "../types";

type baseStateType<D, E = null> = {
  data: D | null;
  loading: boolean;
  error: E | boolean;
};

const baseState = {
  data: null,
  loading: false,
  error: false,
};

interface CardsState {
  fetchSets: baseStateType<FetchSetsResponse>;
  fetchCards: baseStateType<FetchCardsResponse>;
  fetchCardDetails: baseStateType<CardDetails>;
}

const initialState: CardsState = {
  fetchSets: baseState,
  fetchCards: baseState,
  fetchCardDetails: baseState,
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    fetchSetsRequest(state) {
      state.fetchSets.loading = true;
      state.fetchSets.error = false;
    },
    fetchSetsSuccess(state, action: PayloadAction<FetchSetsResponse>) {
      state.fetchSets.data = action.payload;
      state.fetchSets.loading = false;
    },
    fetchSetsFailure(state) {
      state.fetchSets.loading = false;
      state.fetchSets.error = true;
    },

    fetchCardsRequest(state, action: PayloadAction<{ setId: string }>) {
      state.fetchCards.loading = true;
      state.fetchCards.error = false;
    },
    fetchCardsSuccess(state, action: PayloadAction<FetchCardsResponse>) {
      state.fetchCards.data = action.payload;
      state.fetchCards.loading = false;
    },
    fetchCardsFailure(state) {
      state.fetchCards.loading = false;
      state.fetchCards.error = true;
    },

    fetchCardDetailsRequest(state, action: PayloadAction<{ cardId: string }>) {
      state.fetchCardDetails.loading = true;
      state.fetchCardDetails.error = false;
    },
    fetchCardDetailsSuccess(state, action: PayloadAction<CardDetails>) {
      state.fetchCardDetails.data = action.payload;
      state.fetchCardDetails.loading = false;
    },
    fetchCardDetailsFailure(state) {
      state.fetchCardDetails.loading = false;
      state.fetchCardDetails.error = true;
    },
  },
});

export const {
  fetchSetsRequest,
  fetchSetsSuccess,
  fetchSetsFailure,
  fetchCardsRequest,
  fetchCardsSuccess,
  fetchCardsFailure,
  fetchCardDetailsRequest,
  fetchCardDetailsSuccess,
  fetchCardDetailsFailure,
} = cardsSlice.actions;

export default cardsSlice.reducer;
