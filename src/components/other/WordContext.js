import React, { createContext, useReducer } from 'react';

const initialState = {
    firstlevel: [],
    secondLevel: [],
    thirdLevel: []
};

function addNewItem(array, itemToAdd) {
    if (!array.find(obj => Object.values(obj)[0] === Object.values(itemToAdd)[0])) {
        return [...array, itemToAdd];
    } else {
        console.log('ADDED!')
        return array;
    }
}


function reducer(state, action) {
    switch (action.type) {
        case 'FIRST_LEVEL':
            const firstLvItem = action.payload;
            return { ...state, firstlevel: addNewItem(state.firstlevel, firstLvItem) };
        case 'SECOND_LEVEL':
            const secondLvItem = action.payload;
            return { ...state, secondLevel: addNewItem(state.secondLevel, secondLvItem) };
        case 'THIRD_LEVEL':
            const thirdLvItem = action.payload;
            return { ...state, thirdLevel: addNewItem(state.thirdLevel, thirdLvItem) };
        case 'TOGGLE_VISIBLE_LV2':
            return {
                ...state,
                secondLevel: state.secondLevel.map((item, index) => {
                    if (index === action.payload) {
                        return { ...item, visible: !item.visible };
                    }
                    return item;
                })
            };
            case 'TOGGLE_VISIBLE_LV3':
            return {
                ...state,
                thirdLevel: state.thirdLevel.map((item, index) => {
                    if (index === action.payload) {
                        return { ...item, visible: !item.visible };
                    }
                    return item;
                })
            };
        default:
            return state;
    }
}

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};
