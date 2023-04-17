import { configureStore } from "@reduxjs/toolkit";
import { dictReducer } from "../slices/dicts";
import { userDictsReducer } from "../slices/userDicts";
import { authReducer } from "../slices/auth";


const store = configureStore({
    reducer: {
        Dictionaries: dictReducer,
        UserDictionaries:userDictsReducer,
        auth: authReducer
    }
});

export default store;