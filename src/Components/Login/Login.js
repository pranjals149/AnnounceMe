import { Button } from '@material-ui/core'
import React from 'react'
import { useLocalContext } from '../../context/context'

import './Login.css'

const Login = () => {

    const { login, loggedInUser } = useLocalContext()

    return (
        <div className='login'>
            <img className='login__logo' src="https://cdn.pixabay.com/photo/2016/10/30/21/56/book-1784458_960_720.png" alt="" />

            <Button className='login__button' variant="contained" color="default" onClick={() => login()}>
                Login
            </Button>
        </div>
    )
}

export default Login
