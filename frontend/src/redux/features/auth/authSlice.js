import { createSlice } from "@reduxjs/toolkit";

const nameFromLocalStorage = localStorage.getItem("name");
let name = null;
if (nameFromLocalStorage) {
  try {
    name = JSON.parse(nameFromLocalStorage);
  } catch (e) {
    console.warn("Couldn't parse name from local storage: ", e.message);
  }
}
const initialState = {
  isLoggedIn: false,
  name,
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      const name =
        typeof action.payload === "string"
          ? action.payload
          : action.payload.name;
      localStorage.setItem("name", JSON.stringify(name));
      state.name = name;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
