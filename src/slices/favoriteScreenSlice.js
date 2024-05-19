import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../services/firebase";

const initialState = {
  status: "idle",
  error: null,
  favorites: [],
  users: [{ favorites: [] }],
};

export const getUsers = createAsyncThunk(
  "favoriteScreen/getUsers",
  async () => {
    const usersRef = collection(db, "users");
    const email = auth.currentUser.email;
    const q = query(usersRef, where("email", "==", email));
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map((docs) => {
      const id = docs.id;
      const usersData = docs.data();
      return {
        id: id,
        email: usersData.email,
        favorites: usersData.favorites,
        userName: usersData.userName,
      };
    });
    return users;
  }
);

export const getFavorites = createAsyncThunk(
  "favoriteScreen/getFavorites",
  async () => {
    const usersRef = collection(db, "users");
    const email = auth.currentUser.email;
    const q = query(usersRef, where("email", "==", email));
    const snapshot = await getDocs(q);
    const favorites = snapshot.docs.map((docs) => {
      const id = docs.id;
      const usersData = docs.data();
      return usersData.favorites;
    });
    return favorites[0];
  }
);

export const addFavorites = async (data) => {
  const uid = auth.currentUser.uid;
  await updateDoc(doc(db, "users", `${uid}`), {
    favorites: arrayUnion(data),
  });
};

export const deleteFavorites = async (data) => {
  const uid = auth.currentUser.uid;
  await updateDoc(doc(db, "users", `${uid}`), {
    favorites: arrayRemove(data),
  });
};

const favoriteScreenSlice = createSlice({
  name: "favoriteScreen",
  initialState: initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      const uid = auth.currentUser.uid;
      updateDoc(doc(db, "users", `${uid}`), {
        favorites: arrayUnion(action.payload),
      });
      state.users[0].favorites.push(action.payload);
    },
    deleteFavorite: (state, action) => {
      const uid = auth.currentUser.uid;
      updateDoc(doc(db, "users", `${uid}`), {
        favorites: arrayRemove(action.payload),
      });
      state.users[0].favorites.filter((item) => {
        item !== action.payload;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(getUsers.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = "failed";
      state.status = action.error.message;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.status = "idle";
      state.users = action.payload;
    });
    builder.addCase(getFavorites.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getFavorites.rejected, (state, action) => {
      state.status = "failed";
      state.status = action.error.message;
    });
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      state.status = "idle";
      state.favorites = action.payload;
    });
  },
});

export const selectFavorites = (state) => state.favoriteScreen.favorites;
export const selectUsers = (state) => state.favoriteScreen.users;
export const selectStatus = (state) => state.favoriteScreen.status;
export const selectError = (state) => state.favoriteScreen.error;
export const { setUsers, setFavorites, addFavorite, deleteFavorite } =
  favoriteScreenSlice.actions;
export default favoriteScreenSlice;
