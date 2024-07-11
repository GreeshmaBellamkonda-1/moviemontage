// userSlice.js

import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
  name: "user",
  initialState: {
    uid:null,
  },
  reducers: {
    login: (state, action) => {
      console.log("Action payload:", action.payload);


      const { uid } = action.payload;

      state.user = {
        uid,
      };
    },
    signup: (state, action) => {
      console.log("Action payload:", action.payload);


      const { uid } = action.payload;

      // Update the user state with the provided data
      state.user = {
        uid,
      };
    },
  },
});

export const { login, signup} = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
