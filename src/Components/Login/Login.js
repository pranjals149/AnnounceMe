import { Button } from '@material-ui/core'
import React from 'react'
import { useLocalContext } from '../../context/context'

import './Login.css'

const Login = () => {

    const { login, loggedInUser } = useLocalContext()

    return (
        <div className='login'>
            <img className='login__logo' src="https://image.freepik.com/free-vector/smiling-man-talking-loudspeaker-monitor-social-media-computer-online-flat-vector-illustration-communication-digital-technology_74855-13238.jpg" alt="" />

            <Button className='login__button' variant="contained" color="default" onClick={() => login()}>
                Login
            </Button>
        </div>
    )
}

export default Login
