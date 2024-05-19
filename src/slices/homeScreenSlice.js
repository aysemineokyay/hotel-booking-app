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
  hotels: [],
  roomTypes: [],
  hotel: {},
  data: [{ roomTypes: [], hotel: {} }],
  status: "idle",
  error: null,
  favorites: [],
  users: [{ favorites: [] }],
};

export const getHotels = createAsyncThunk("homeScreen/getHotels", async () => {
  const hotelsRef = collection(db, "hotels");
  const snapshot = await getDocs(hotelsRef);
  const hotels = snapshot.docs.map((docs) => {
    const id = docs.id;
    const ref = docs.ref;
    const hotelsData = docs.data();
    return {
      ref: ref,
      id: id,
      country: hotelsData.country,
      city: hotelsData.city,
      location: hotelsData.location,
      image: hotelsData.image,
      description: hotelsData.description,
      rating: hotelsData.rating,
      name: hotelsData.name,
      detail_images: hotelsData.detail_images,
    };
  });

  return hotels;
});

export const getHotelsAndRoomTypes = createAsyncThunk(
  "homeScreen/getHotelsAndRoomTypes",
  async (ref) => {
    const roomTypesRef = collection(db, "roomTypes");
    const q = query(roomTypesRef, where("hotelId", "==", ref));
    const snapshot = await getDocs(q);
    const roomTypes = snapshot.docs.map((docs) => {
      const id = docs.id;
      const roomTypesData = docs.data();
      return {
        id: id,
        capacity: roomTypesData.capacity,
        description: roomTypesData.description,
        hotelId: roomTypesData.hotelId,
        name: roomTypesData.name,
        numberOfRoom: roomTypesData.numberOfRoom,
        price_per_night: roomTypesData.price_per_night,
      };
    });
    const hotelsDataPromises = roomTypes.map(async (item) => {
      try {
        const hotelDoc = await getDoc(item.hotelId);
        const dataHotel = hotelDoc.data();
        const id = hotelDoc.id;
        return {
          id: id,
          country: dataHotel.country,
          city: dataHotel.city,
          location: dataHotel.location,
          image: dataHotel.image,
          description: dataHotel.description,
          rating: dataHotel.rating,
          name: dataHotel.name,
          detail_images: dataHotel.detail_images,
        };
      } catch (error) {
        console.error("error", error);
        throw error; // Hata oluşursa dışarıya at
      }
    });

    // Tüm asenkron işlemlerin tamamlanmasını bekleyin ve sonuçları alın
    const hotelsData = await Promise.all(hotelsDataPromises);

    const data = [
      {
        hotel: hotelsData[0],
        roomTypes: roomTypes,
      },
    ];
    return data;
  }
);
export const getUsers = createAsyncThunk("homeScreen/getUsers", async () => {
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
});

export const getFavorites = createAsyncThunk(
  "homeScreen/getFavorites",
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

const homeScreenSlice = createSlice({
  name: "homeScreen",
  initialState: initialState,
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
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
    builder.addCase(getHotels.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getHotels.rejected, (state, action) => {
      state.status = "failed";
      state.status = action.error.message;
    });
    builder.addCase(getHotels.fulfilled, (state, action) => {
      state.status = "idle";
      state.hotels = action.payload;
    });
    builder.addCase(getHotelsAndRoomTypes.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getHotelsAndRoomTypes.rejected, (state, action) => {
      state.status = "failed";
      state.status = action.error.message;
    });
    builder.addCase(getHotelsAndRoomTypes.fulfilled, (state, action) => {
      state.status = "idle";
      state.data = action.payload;
    });
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

export const selectHotels = (state) => state.homeScreen.hotels;
export const selectData = (state) => state.homeScreen.data;
export const selectFavorites = (state) => state.homeScreen.favorites;
export const selectUsers = (state) => state.homeScreen.users;
export const selectStatus = (state) => state.homeScreen.status;
export const selectError = (state) => state.homeScreen.error;
export const {
  setHotels,
  setData,
  setUsers,
  setFavorites,
  addFavorite,
  deleteFavorite,
} = homeScreenSlice.actions;
export default homeScreenSlice;
