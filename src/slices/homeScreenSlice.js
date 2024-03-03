import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../services/firebase";

const initialState = {
  hotels: [],
  roomTypes: [],
  hotel: {},
  data: [{ roomTypes: [], hotel: {} }],
  status: "idle",
  error: null,
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
  },
});

export const selectHotels = (state) => state.homeScreen.hotels;
export const selectData = (state) => state.homeScreen.data;
export const selectStatus = (state) => state.homeScreen.status;
export const selectError = (state) => state.homeScreen.error;
export const { setHotels, setData } = homeScreenSlice.actions;
export default homeScreenSlice;
