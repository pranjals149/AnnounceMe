import { Avatar } from '@material-ui/core'
import { FolderOpen, PermContactCalendar } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'

import './JoinedClasses.css'

const JoinedClasses = ({ classData }) => {

    return (
        <li className='joined__list'>
            <div className="joined__wrapper">
                <div className="joined__container">
                    <div className="joined__imageWrapper" />
                    <div className="joined__image" />
                    <div className="joined__content">
                        <Link className="joined__title" to={`/${classData.id}`}>
                            <h2 className='joinedClasses__roomName'>{classData.roomName}</h2>
                        </Link>
                        <p className="joined__owner">{classData.owner}</p>
                    </div>
                </div>
                <Avatar className='joined__avatar' src="https://image.freepik.com/free-vector/man-shows-gesture-great-idea_10045-637.jpg" />
            </div>

            <div className="joined__bottom">
                <PermContactCalendar />
                <FolderOpen />
            </div>

        </li>
    )
}

export default JoinedClasses
