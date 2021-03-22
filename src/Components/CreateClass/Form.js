import { Button, DialogActions, TextField } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { useLocalContext } from '../../context/context'
import { v4 as uuidV4 } from 'uuid'
import db from '../../lib/firebase'

const Form = () => {
    const [roomName, setRoomName] = useState("")
    const [orgName, setOrgName] = useState("")

    const { loggedInMail, setCreateClassDialog } = useLocalContext()

    const addRoom = (e) => {
        e.preventDefault()

        const id = uuidV4()

        db
            .collection('CreatedRooms')
            .doc(loggedInMail)
            .collection('rooms')
            .doc(id)
            .set({
                owner: loggedInMail,
                roomName: roomName,
                orgName: orgName,
                id: id
            })
            .then(() => {
                setCreateClassDialog(false)
            })
    }

    return (
        <div className='form'>
            <p className="class__title">Create Room</p>

            <p className='class__p'>Fields marked with * are important</p>

            <div className="form__inputs">
                <TextField
                    id='filled-basic'
                    label='Room Name *'
                    className='form__input'
                    variant='filled'
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />

                <TextField
                    id='filled-basic'
                    label='Organisation Name *'
                    className='form__input'
                    variant='filled'
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                />

            </div>

            <DialogActions>
                <Button color='primary' onClick={addRoom}>
                    Create
                </Button>
            </DialogActions>
        </div>
    )
}

export default Form
