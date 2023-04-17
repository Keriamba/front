import React from 'react'
import './login.css'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { boolAuthResult, fetchUserData } from '../../components/other/slices/auth';

export default function Login() {
    const isAuth = useSelector(boolAuthResult)
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            nickname: '',
            password: ''
        }
    });


    const onSubmit = async (values) => {
       const data = await dispatch(fetchUserData(values))
        if(!data.payload) {
            return   alert('Sisäänkirjautuminen epäonnistui')
        }
       if('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token)
       }
    }

    const checkError = (errorvalue) => {
        let checkError = Boolean(errorvalue)
        return checkError
    }
    
    if(isAuth) {
        return <Navigate to={'/'} />
    }


  return (
    <div className='login'>Kirjaudu
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='login-wrap'>
                <span className={checkError(errors.nickname?.message) ? 'error' : ''} >{checkError(errors.nickname?.message) ? errors.nickname.message : 'Nimimerkki'}</span>
                <input  {...register('nickname', {required: 'Virheellinen lempinimi'})} />
                <span className={checkError(errors.password?.message) ? 'error' : ''} >{checkError(errors.password?.message) ? errors.password.message : 'Salanasa'}</span>
                <input type='password' {...register('password', {required: 'Väärä salasana'})} />
                <button type='submit' >Sisäänkäynti</button>
                <Link to='/registration'>Rekisteröinti</Link>
            </div>
        </form>
    </div>
  )
}
