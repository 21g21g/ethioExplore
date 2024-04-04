import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    loading: false,
    error: null,
    view:false,
    min: null,
    max: null,
    city: JSON.parse(localStorage.getItem("cit")) || " ",
    options: {
      adult: 1,
      children: 0,
      room: 1,
    },
    dates: [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ],
    hotelData: [],
    detailHotel: [],
    hotelType: [],
    featuredHotel: [],
    singleData: [],
    searchCity: [],
    searched: [],
    roomData: [],
  },

  reducers: {
    hotelfetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    hotelfetchSuccess(state, action) {
      state.hotelData = action.payload;
      state.loading = false;
      state.error = null;
    },
    hotelfetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    hoteltypefetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    hoteltypefetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    hotelfethtypeSuccess(state, action) {
      state.hotelType = action.payload;
      state.loading = false;
      state.error = null;
    },
    featuredHotelStart(state) {
      state.loading = true;
      state.error = null;
    },
    featuredHotelFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    featuredHotelSuccess(state, action) {
      state.featuredHotel = action.payload;
      state.error = null;
      state.loading = false;
    },
    setOptions: (state, action) => {
      state.options = action.payload;
    },
    setDates: (state, action) => {
      state.dates = action.payload;
    },
    updateOptions(state, action) {
      const { name, operation } = action.payload;
      state.options = {
        ...state.options,
        [name]:
          operation === "i" ? state.options[name] + 1 : state.options[name] - 1,
      };
    },
    updateDates(state, action) {
      state.dates = [action.payload.selection];
    },

    setCity(state, action) {
      state.city = action.payload;
    },
    setMin(state, action) {
      state.min = action.payload;
    },
    setSearched(state, action) {
      state.searched = action.payload;
    },
    setMax(state, action) {
      state.max = action.payload;
    },
    filteredHotelStart(state) {
      state.loading = true;
      state.error = null;
    },
    filteredHotelFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    filteredHotelSuccess(state, action) {
      state.filteredHotel = action.payload;
      state.loading = false;
      state.error = null;
    },
    setsingleDatastart(state) {
      state.loading = true;
      state.error = null;
    },
    setsingleDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setsingleDataSuccess(state, action) {
      state.singleData = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
    setsearchCityStart(state) {
      state.loading = true;
      state.error = null;
    },
    setsearchCityFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setsearchCitySuccess(state, action) {
      state.searchCity = action.payload;
      state.loading = false;
      state.error = null;
    },
    setAdult(state, action) {
      state.numbers.adult = action.payload;
    },
    setChildren(state, action) {
      state.numbers.children = action.payload;
    },
    setRoom(state, action) {
      state.numbers.room = action.payload;
    },
    setDetailHotel(state, action) {
      state.detailHotel = action.payload;
    },
    setView(state, action) {
      state.view=action.payload
    }
  },
});

export const hotelSliceactions = hotelSlice.actions;
export default hotelSlice;
