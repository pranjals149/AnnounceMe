import { Avatar, Button, Dialog, Slide, TextField } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'
import { useLocalContext } from '../../context/context'
import db, { auth } from '../../lib/firebase'

import './JoinClass.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const JoinClass = () => {
    const { joinClassDialog, setJoinClassDialog, loggedInUser } = useLocalContext()

    const [roomCode, setRoomCode] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState();
    const [joinedData, setJoinedData] = useState();
    const [roomExists, setRoomExists] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        db
            .collection('CreatedRooms')
            .doc(email)
            .collection('rooms')
            .doc(roomCode)
            .get()
            .then((doc) => {
                if (doc.exists && doc.owner !== loggedInUser.email) {
                    setRoomExists(true)
                    setJoinedData(doc.data())
                    setError(false)
                } else {
                    setError(true)
                    setRoomExists(false)
                    return
                }
            })

        if (roomExists === true) {
            db
                .collection('JoinedRooms')
                .doc(loggedInUser.email)
                .collection('rooms')
                .doc(roomCode)
                .set({
                    joinedData
                })
                .then(() => {
                    setJoinClassDialog(false)
                })
        }
    }

    const logout = () => {
        auth.signOut()
    }

    return (
        <div>
            <Dialog
                fullScreen
                open={joinClassDialog}
                onClose={() => setJoinClassDialog(false)}
                TransitionComponent={Transition}
            >
                <div className="joinClass">
                    <div className="joinClass__wrapper">
                        <div className="joinClass__wrapper2" onClick={() => setJoinClassDialog(false)}>
                            <Close className="joinClass__svg" />
                            <div className="joinClass__topHead">
                                Join Room
                            </div>
                        </div>

                        <Button className="joinClass__button" variant='contained' color="primary" onClick={handleSubmit}>
                            Join
                        </Button>
                    </div>

                    <div className="joinClass__form">
                        <p className="joinClass__formText">
                            You're currently signed as <strong>{loggedInUser?.email}</strong>
                        </p>

                        <div className="joinClass__loginInfo">
                            <div className="joinClass__classLeft">
                                <Avatar src={loggedInUser?.photoURL} />

                                <div className="joinClass__loginText">
                                    <div className="joinClass__loginName">{loggedInUser?.displayName}</div>
                                    <div className="joinClass__loginEmail">{loggedInUser?.email}</div>
                                </div>
                            </div>

                            <Button variant='outlined' color='primary' onClick={logout}>
                                Logout
                            </Button>
                        </div>

                    </div>

                    <div className="joinClass__form">
                        <div
                            className="joinClass__formText"
                            style={{
                                fontSize: '1.25rem',
                                color: '#3c4043'
                            }}
                        >
                            Room ID
                        </div>

                        <div
                            className="joinClass__formText"
                            style={{
                                color: '#3c4043',
                                marginTop: '-5px'
                            }}
                        >
                            Enter the Room ID here
                        </div>

                        <div className="joinClass__loginInfo">
                            <TextField
                                id='outlined-basic'
                                label='Room ID'
                                variant='outlined'
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value)}
                                error={error}
                                helperText={error && "No Room found !! Try Again"}
                            />

                            <TextField
                                id='outlined-basic'
                                label='Email'
                                variant='outlined'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>

                    </div>

                </div>

            </Dialog>
        </div>
    )
}

export default JoinClass
