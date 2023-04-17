import React from 'react'
import { Navigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { boolAuthResult, fetcRegister } from '../../components/other/slices/auth';
import './registration.css'

export default function Registration() {
    const isAuth = useSelector(boolAuthResult)
    const dispatch = useDispatch()


    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            nickname: '',
            password: ''
        }
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetcRegister(values))
         if(!data.payload) {
             return   alert('Sisäänkirjautuminen epäonnistui')
         }
        if('token' in data.payload) {
         window.localStorage.setItem('token', data.payload.token)
        }
     };
     const checkError = (errorvalue) => {
        let checkError = Boolean(errorvalue)
        return checkError
    }
    
    if(isAuth) {
        return <Navigate to={'/'} />
    }


  return (
    <div className='reg'>rekisteröinti
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='reg-wrap'>
            <span className={checkError(errors.nickname?.message) ? 'error' : ''} >{checkError(errors.nickname?.message) ? errors.nickname.message : 'Nimimerkki'}</span>
            <input  {...register('nickname', {required: 'Virheellinen lempinimi'})} />
            <span className={checkError(errors.password?.message) ? 'error' : ''} >{checkError(errors.password?.message) ? errors.password.message : 'Salasana'}</span>
            <input type='password' {...register('password', {required: 'Väärä salasana'})} />
            <button type='submit' >Vahvistaa</button>
        </div>
    </form>
</div>
  )
}
