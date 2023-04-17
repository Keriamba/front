import React, { useState } from 'react'
import { fetchUserDict } from '../../../components/other/slices/userDicts';
import './leveltwo.css';
import { useEffect } from 'react';
import Navigation from '../../../components/navgation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../components/other/axios.js';

export default function LevelTwo() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.UserDictionaries.usersDict.dicts);
    const [dicts, setDicts] = useState([])

    useEffect(() => {
        dispatch(fetchUserDict())
 
    }, [dispatch]);

    useEffect(() => {
        if(Boolean(state.length)) {
            const updatedArr = state.map((item) => {
                return {
                  ...item,
                  Dictionary: item.Dictionary.map((elem) => {
                    return {
                      ...elem,
                      visible: false,
                    };
                  }),
                };
              });
              setDicts(updatedArr)
        }
    }, [state])
   
    const showHideWord = (objValue) => {
        const updatedArr = dicts.map((item) => {
          return {
            ...item,
            Dictionary: item.Dictionary.map((elem) => {
              if (objValue === Object.values(elem)[0]) {
                return {
                  ...elem,
                  visible: !elem.visible,
                };
              }
              return elem;
            }),
          };
        });
        setDicts(updatedArr);
      };
      


    const showWords = () => {
        const words = dicts.flatMap(item => {
            return item.Dictionary.filter(el => el.level === 2)
          })
          
      return  words.map((item, index) =>  {
        
            return (<ul key={index}>
                     <div className='containerlvl2' >
                        <li >
                            <span className='liwraplv2'>
                                <span>{Object.keys(item)[0]}</span>
                                <span className={item.visible ? 'visible' : 'blur-text'} onClick={() => showHideWord(Object.values(item)[0])}>
                                    : {Object.values(item)[0]}</span><button className='button-next-level' onClick={() => {lvlUpdate(item)}}>{'>>>'}</button>
                            </span>
                           </li>
                    </div>
            </ul>
            )
        })
    };

    const lvlUpdate = async (obj) => {
        const {level, visible, ...other} = obj
        const updatedObj = {level, ...other};
        console.log(updatedObj)
       const test = await axios.patch('/user/dictionary/next-level', updatedObj)
       console.log(test.status)
        if (test.status === 200 ) {
            dispatch(fetchUserDict())
        }
    };

    return (
        <div className='lvl-two'>
            <Navigation />
             {showWords()}
        </div>
    )
}
/*             <ul>
                {Boolean(!state.secondLevel.length) ? 'odottaa sanaa' : state.secondLevel.map((item, index) => {
                    let isDisabled = Boolean(state.thirdLevel.find(obj => Object.values(obj)[0] === Object.values(item)[0]))

                    return (<div className='containerlvl2' key={index}>
                        <li >
                            <span className='liwraplv2'>
                                <span>{Object.keys(item)[0]}</span>
                                <span className={item.visible ? 'visible' : 'blur-text'} onClick={() => dispatch({ type: 'TOGGLE_VISIBLE_LV2', payload: index })}>
                                    : {Object.values(item)[0]}</span>
                            </span>
                            <button disabled={isDisabled}
                                onClick={() => dispatch({ type: 'THIRD_LEVEL', payload: item })}>Seuraava taso</button>
                            {isDisabled ? 'Sana lisätty' : null}</li>
                    </div>)
                })}
            </ul> */