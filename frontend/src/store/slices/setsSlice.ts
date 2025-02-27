import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Set, FetchSetsResponse } from "../types";

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

interface SetsState {
  fetchSets: baseStateType<FetchSetsResponse>;
  fetchSetDetails: baseStateType<Set>;
}

const initialState: SetsState = {
  fetchSets: baseState,
  fetchSetDetails: baseState,
};

const setsSlice = createSlice({
  name: "sets",
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

    fetchSetDetailsRequest(state, action: PayloadAction<{ setId: string }>) {
      state.fetchSetDetails.loading = true;
      state.fetchSetDetails.error = false;
    },
    fetchSetDetailsSuccess(state, action: PayloadAction<Set>) {
      state.fetchSetDetails.data = action.payload;
      state.fetchSetDetails.loading = false;
    },
    fetchSetDetailsFailure(state) {
      state.fetchSetDetails.loading = false;
      state.fetchSetDetails.error = true;
    },
  },
});

export const {
  fetchSetsRequest,
  fetchSetsSuccess,
  fetchSetsFailure,
  fetchSetDetailsRequest,
  fetchSetDetailsSuccess,
  fetchSetDetailsFailure,
} = setsSlice.actions;

export default setsSlice.reducer;
