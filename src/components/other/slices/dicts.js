import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios.js"


export const fetchGlobalDict = createAsyncThunk('dictionary/fetchGlobalDicts', async (groups) => {
    const {data} = await axios.get(`/dictionary/${groups}/dict`);
    return data
})

export const fetchGroups = createAsyncThunk('dictionary/fetchGroups', async (req, res) => {
    const {data} = await axios.get('/dictionary/groups');
    return data
})


const initialState = {
    globalDict: {
        dicts:[],
        status: 'loading',
    },
};

const dictSlice = createSlice({
    name: 'Dictionaries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchGlobalDict.pending, (state) => {
            state.globalDict.status = 'loading';
          })
          .addCase(fetchGlobalDict.fulfilled, (state, action) => {
            
            state.globalDict.dicts = state.globalDict.dicts.concat(action.payload);
            state.globalDict.status = 'loaded';
          })
          .addCase(fetchGlobalDict.rejected, (state) => {
            state.globalDict.dicts = [];
            state.globalDict.status = 'error';
          });
    }});

export const dictReducer = dictSlice.reducer;

export const { addItem } = dictSlice.actions;