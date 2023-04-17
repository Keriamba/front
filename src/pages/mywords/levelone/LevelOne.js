import React, { useEffect } from 'react'
import './levelone.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../components/other/axios.js'
import { fetchUserDict } from '../../../components/other/slices/userDicts'
import Navigation from '../../../components/navgation/Navigation'
export default function LevelOne() {
    const dispatch = useDispatch()
    const {dicts} = useSelector(state => state.UserDictionaries.usersDict)

useEffect(() => {
    dispatch(fetchUserDict())
}, [dispatch])

    const showWords = () => {
        const words = dicts.flatMap(item => {
            return item.Dictionary.filter(el => el.level === 1)
          })
          
      return  words.map((item, index) =>  {
        
            return (
                <div key={index+123} className='words-wrapper'>
                    {Object.keys(item)[0]}: {Object.values(item)[0]}
                    <button onClick={() => {lvlUpdate(item)}} className='button-next-level'> {">>>"} </button>
                </div>
            )
        })
    };

    const lvlUpdate = async (obj) => {
        const {level, ...other} = obj;
        const updatedObj = {level, ...other};
       const test = await axios.patch('/user/dictionary/next-level', updatedObj)
       console.log(test.status)
        if (test.status === 200 ) {
            dispatch(fetchUserDict())
        }
    };

  return (
    <div><Navigation />
    <div className='lvl-one'>
        {showWords()}
    </div>
    </div>
  )
}
