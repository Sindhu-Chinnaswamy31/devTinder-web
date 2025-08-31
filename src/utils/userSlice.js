import { createSlice } from "@reduxjs/toolkit";
// Load user from localStorage when Redux starts
const storedUser = localStorage.getItem("user");
let parsedUser = null;
if (storedUser && storedUser !== "undefined") {
  try {
    parsedUser = JSON.parse(storedUser);
  } catch (e) {
    console.error("Invalid user in localStorage", e);
    localStorage.removeItem("user"); // clear corrupted data
  }
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: parsedUser
    },
    reducers: {
        addUser: (state, action) => {
           state.user = action.payload;
           localStorage.setItem("user", JSON.stringify(action.payload)); 
        },
        removeUser: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    }
});


export default userSlice.reducer;
export const { addUser, removeUser} = userSlice.actions;