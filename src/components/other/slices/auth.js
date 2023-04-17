import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios.js"


export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/me');
    return data
});

export const fetcRegister = createAsyncThunk('auth/fetcRegister', async (params) => {
    const {data} = await axios.post('/auth/registration', params);
    return data
});


const initialState = {
    UserData: null, 
    status: 'loading'
};

const authSlice = createSlice({
    name: 'UserData',
    initialState,
    reducers: {
        logout: (state) => {
            state.UserData = null
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserData.pending, (state) => {
            state.status = 'loading';
            state.UserData = null
          })
          .addCase(fetchUserData.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.UserData = action.payload
          })
          .addCase(fetchUserData.rejected, (state) => {
            state.UserData = null;
            state.status = 'error';
          })
          .addCase(fetchAuthMe.pending, (state) => {
            state.status = 'loading';
            state.UserData = null
          })
          .addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.UserData = action.payload
          })
          .addCase(fetchAuthMe.rejected, (state) => {
            state.UserData = null;
            state.status = 'error';
          })
          .addCase(fetcRegister.pending, (state) => {
            state.status = 'loading';
            state.UserData = null
          })
          .addCase(fetcRegister.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.UserData = action.payload
          })
          .addCase(fetcRegister.rejected, (state) => {
            state.UserData = null;
            state.status = 'error';
          });
          
    }});


export const boolAuthResult = (state) => Boolean(state.auth.UserData);

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;