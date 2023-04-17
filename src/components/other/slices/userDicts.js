import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios.js"


export const fetchUserDict = createAsyncThunk('dictionary/fetchUserDict', async (req, res) => {
    const {data} = await axios.get('/user/dictionary');
    return data
})

export const fetchCreateUserDict = createAsyncThunk('dictionary/fetchCreateUserDict', async (params) => {
  const {data} = await axios.post('/user/dictionary', params)
  return data
})



const initialState = {
    usersDict: {
        dicts:[],
        groups:[],
        levels: {
          levelOne: [],
          levelTwo: [],
          levelthree: []
        },
        status: 'loading',
    },
};

const userDictSlice = createSlice({
    name: 'UserDictionaries',
    initialState,
    reducers: {
      toggleGroup: (state, action) => {
        const { index } = action.payload;
        state.usersDict.groups = state.usersDict.groups.map((group, i) =>
          i === index ? { ...group, isOpen: !group.isOpen } : group
        );
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserDict.pending, (state) => {
            state.usersDict.dicts = [];
            state.usersDict.status = 'loading';
          })
          .addCase(fetchUserDict.fulfilled, (state, action) => {
            const newGroups = action.payload.map(item => {
              return {group:String(item.groups), isOpen: false}
            });
            const newDicts = action.payload.map(item => {
              return item
            })
            state.usersDict.dicts = newDicts
            state.usersDict.groups = newGroups;
            state.usersDict.status = 'loaded';
          })
          .addCase(fetchUserDict.rejected, (state) => {
            state.usersDict.dicts = [];
            state.usersDict.status = 'error';
          });
    }});

export const userDictsReducer = userDictSlice.reducer;

export const {toggleGroup} = userDictSlice.actions;