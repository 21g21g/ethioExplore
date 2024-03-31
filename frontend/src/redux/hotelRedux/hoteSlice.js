import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    hotelData: JSON.parse(localStorage.getItem("hotel")) || [],
    detailHotel: [],
    hotelType: JSON.parse(localStorage.getItem("hoteltype")) || [],
    featuredHotel: JSON.parse(localStorage.getItem("feature")) || [],
    singleData: [],
    searchCity: JSON.parse(localStorage.getItem("city")) || [],
    searched: JSON.parse(localStorage.getItem("search")) || [],
    roomData: JSON.parse(localStorage.getItem("roomdata")) || [],
    startDate:
      JSON.parse(localStorage.getItem("startdate")) || new Date().toISOString(), //i use toIsoString method because inorder to change the date into json format because the state stored in redux is must be seralizable.
    endDate:
      JSON.parse(localStorage.getItem("enddate")) || new Date().toISOString(),
    loading: false,
    error: null,
    min: null,
    max: null,
    city: JSON.parse(localStorage.getItem("cit")) || " ",
    numbers: {
      adult: parseInt(localStorage.getItem("adult")) || null,
      children: parseInt(localStorage.getItem("child")) || null,
      room: parseInt(localStorage.getItem("room")) || null,
    },
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
    setRoomData(state, action) {
      state.roomData = action.payload;
    },
    setStartDate(state, action) {
      state.selectedDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
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
  },
});

export const hotelSliceactions = hotelSlice.actions;
export default hotelSlice;
