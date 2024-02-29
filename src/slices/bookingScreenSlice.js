import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../services/firebase";

const initialState = {
  rezervations: [],
  hotelsData: [],
  roomTypeData: [],
  data: [{ rezervations: [], hotelsData: [], roomTypeData: [] }],
  newData: [{ rezervation: {}, hotelData: {}, roomType: {} }],
  status: "idle",
  error: null,
};
export const getRezervations = createAsyncThunk(
  "bookingScreen/getRezervations",
  async () => {
    const rezervationsRef = collection(db, "rezervations");
    const q = query(
      rezervationsRef,
      where("userId", "==", auth.currentUser.uid)
    );
    const snapshot = await getDocs(q);
    const rezervations = snapshot.docs.map((docs) => {
      const id = docs.id;
      const rezervationsData = docs.data();
      return {
        id: id,
        hotelId: rezervationsData.hotelId,
        roomTypeId: rezervationsData.roomTypeId,
        guestCount: rezervationsData.guestCount,
        childCount: rezervationsData.childCount,
        adultCount: rezervationsData.adultCount,
        checkInDate: rezervationsData.checkInDate,
        checkOutDate: rezervationsData.checkOutDate,
        roomCount: rezervationsData.roomCount,
        totalPrice: rezervationsData.totalPrice,
        userId: rezervationsData.userId,
      };
    });
    const hotelsDataPromises = rezervations.map(async (item) => {
      try {
        const hotelDoc = await getDoc(item.hotelId);
        const dataHotel = hotelDoc.data();
        return {
          country: dataHotel.country,
          city: dataHotel.city,
          location: dataHotel.location,
          image: dataHotel.image,
          description: dataHotel.description,
          rating: dataHotel.rating,
          name: dataHotel.name,
        };
      } catch (error) {
        console.error("e", error);
        throw error; // Hata oluşursa dışarıya at
      }
    });

    // Tüm asenkron işlemlerin tamamlanmasını bekleyin ve sonuçları alın
    const hotelsData = await Promise.all(hotelsDataPromises);

    const roomTypeDataPromises = rezervations.map(async (item) => {
      try {
        const roomTypeDoc = await getDoc(item.roomTypeId);
        const dataRoomType = roomTypeDoc.data();
        return {
          capacity: dataRoomType.capacity,
          description: dataRoomType.description,
          hotelId: dataRoomType.hotelId,
          name: dataRoomType.name,
          numberOfRoom: dataRoomType.numberOfRoom,
          price_per_night: dataRoomType.price_per_night,
        };
      } catch (error) {
        console.error("e", error);
        throw error; // Hata oluşursa dışarıya at
      }
    });

    // Tüm asenkron işlemlerin tamamlanmasını bekleyin ve sonuçları alın
    const roomTypeData = await Promise.all(roomTypeDataPromises);
    const data = [
      {
        rezervations: rezervations,
        hotelsData: hotelsData,
        roomTypeData: roomTypeData,
      },
    ];
    const newData = [];
    data.forEach((item) => {
      const length = Math.max(
        item.rezervations.length,
        item.hotelsData.length,
        item.roomTypeData.length
      );
      for (let i = 0; i < length; i++) {
        const rezervation = item.rezervations[i] || {};
        const hotelData = item.hotelsData[i] || {};
        const roomType = item.roomTypeData[i] || {};
        newData.push({
          rezervation,
          hotelData,
          roomType,
        });
      }
    });
    return newData;
  }
);

export const getHotelDataOfRezervations = createAsyncThunk(
  "bookingScreen/getHotelDataOfRezervations",
  async (hotelId) => {
    const hotelsRef = collection(db, "hotels");
    const q = query(hotelsRef, where("id", "==", hotelId));
    const snapshot = await getDocs(q);
    const hotels = snapshot.docs.map((docs) => {
      const id = docs.id;
      const hotelsData = docs.data();
      return {
        id: id,
        country: hotelsData.country,
        city: hotelsData.city,
        location: hotelsData.location,
        image: hotelsData.image,
        description: hotelsData.description,
        rating: hotelsData.rating,
        name: hotelsData.name,
      };
    });
    return hotels;
  }
);
const bookingScreenSlice = createSlice({
  name: "bookingScreen",
  initialState: initialState,
  reducers: {
    setRezervations: (state, action) => {
      state.rezervations = action.payload;
    },
    setHotelsData: (state, action) => {
      state.hotelsData = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setNewData: (state, action) => {
      state.newData = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getRezervations.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getRezervations.rejected, (state, action) => {
      state.status = "failed";
      state.status = action.error.message;
    });
    builder.addCase(getRezervations.fulfilled, (state, action) => {
      state.status = "idle";
      state.newData = action.payload;
    });
    builder.addCase(getHotelDataOfRezervations.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getHotelDataOfRezervations.rejected, (state, action) => {
      state.status = "failed";
      state.status = action.error.message;
    });
    builder.addCase(getHotelDataOfRezervations.fulfilled, (state, action) => {
      state.status = "idle";
      state.hotelsData = action.payload;
    });
  },
});

export const selectRezervations = (state) => state.bookingScreen.rezervations;
export const selectHotelsData = (state) => state.bookingScreen.hotelsData;
export const selectData = (state) => state.bookingScreen.data;
export const selectNewData = (state) => state.bookingScreen.newData;
export const selectStatus = (state) => state.bookingScreen.status;
export const selectError = (state) => state.bookingScreen.error;
export const { setRezervations, setHotelsData, setData } =
  bookingScreenSlice.actions;
export default bookingScreenSlice;
