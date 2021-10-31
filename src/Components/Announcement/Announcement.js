import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useLocalContext } from '../../context/context'
import db from '../../lib/firebase'
import firebase from 'firebase'

import './Announcement.css'

const Announcement = ({ classData }) => {

    const { loggedInUser } = useLocalContext()

    const [announcement, setAnnouncement] = useState([])

    useEffect(() => {
        if (classData) {
            let unsubscribe = db
                .collection('announcements')
                .doc('rooms')
                .collection(classData.id)
                .onSnapshot((snapshot) => {
                    setAnnouncement(snapshot.docs.map((doc) => doc.data()))
                })
            return () => unsubscribe()
        }
    }, [classData])

    return (
        <div>
            {
                announcement.map((item) => (
                    <div className='amt'>
                        {console.log(item.timstamp)}
                        <div className="amt__Cnt">
                            <div className="amt__top">
                                <Avatar src="https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_960_720.png" />

                                <div style={{
                                    fontSize: "15px",
                                    fontWeight: "600"
                                }}>
                                    {item.sender}
                                </div>

                            </div>
                            <p className="amt__txt">
                                {item.text}
                            </p>

                            <p className='amt__content'>
                                Content -
                            </p>

                            <img src={item?.imageUrl} alt={item.text} className="amt__img" />

                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Announcement
