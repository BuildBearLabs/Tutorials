import { createSlice } from "@reduxjs/toolkit";

// Function to get user state from localStorage
const getUserStateFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem('userState');
      return storedState ? JSON.parse(storedState) : {
        address: null,
        isLogin: false,
        availableBalance: 0
      };
    }
    return {
        address: null,
        isLogin: false,
        availableBalance: 0
      };
  };


export const userSlice = createSlice({
  name: "user",
  initialState: getUserStateFromLocalStorage(),
  reducers: {
    setUser: (state, action) => {
      state.address = action.payload.address;
      state.availableBalance = action.payload.availableBalance;
      state.isLogin = true;

      localStorage.setItem("userState", JSON.stringify({
        address: action.payload.address,
        isLogin: true,
        availableBalance: action.payload.availableBalance
      }));
    },

    removeUser: (state, action) => {
      state.address = null;
      state.isLogin = false;
      state.availableBalance = 0;

      localStorage.setItem("userState", JSON.stringify({
        address: null,
        isLogin: false,
        availableBalance: 0
      }));
    },
    updateBalance: (state, action) => {
      state.availableBalance = action.payload;
    }
  }
});

export const { setUser, removeUser, updateBalance } = userSlice.actions;
export default userSlice.reducer;
