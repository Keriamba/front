import React, { useState } from 'react'
import { fetchUserDict } from '../../../components/other/slices/userDicts';
import '../leveltwo/leveltwo.css';
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
            return item.Dictionary.filter(el => el.level === 3)
          })
          
      return  words.map((item, index) =>  {
        
            return (<ul key={index}>
                     <div className='containerlvl2' >
                        <li >
                            <span className='liwraplv2'>
                            <span className={item.visible ? 'visible' : 'blur-text'} onClick={() => showHideWord(Object.values(item)[0])}>
                                     {Object.keys(item)[0]}</span> 
                               : <span>{Object.values(item)[0]}</span><button className='button-next-level' onClick={() => {lvlUpdate(item)}}>{'>>>'}</button>
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