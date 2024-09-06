import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface UserState {
  users: User[];
}

const storedUsers = localStorage.getItem("users");
const initialState: UserState = {
  users: storedUsers ? JSON.parse(storedUsers) : [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    clearUsers: (state) => {
      state.users = [];
      localStorage.removeItem("users");
    },
  },
});

export const { setUsers, clearUsers } = userSlice.actions;
export default userSlice.reducer;
