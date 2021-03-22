import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import { Add, Apps } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'
import { CreateClass, JoinClass } from '..'
import { useStyles } from './style'
import { useLocalContext } from '../../context/context'
import { useHistory } from 'react-router-dom'

const Header = ({ children }) => {

    const history = useHistory()

    const classes = useStyles()

    const [anchor, setAnchor] = useState(null)

    const handleClick = (e) => {
        setAnchor(e.currentTarget)
    }

    const handleClose = () => {
        setAnchor(null);
    }

    const { createClassDialog, setCreateClassDialog } = useLocalContext();
    const { joinClassDialog, setJoinClassDialog, loggedInUser, logout } = useLocalContext();

    const handleCreate = () => {
        handleClose();
        setCreateClassDialog(true);
    }

    const handleJoin = () => {
        handleClose();
        setJoinClassDialog(true);
    }

    return (
        <div classname={classes.root}>
            <AppBar className={classes.appBar} position='static'>

                <Toolbar className={classes.toolbar}>
                    <div className={classes.headerWrapper}>
                        {children}
                        <img className={classes.header__image} src="https://image.freepik.com/free-vector/smiling-man-talking-loudspeaker-monitor-social-media-computer-online-flat-vector-illustration-communication-digital-technology_74855-13238.jpg" alt="" />
                        <Typography variant='h6' className={classes.title} onClick={() => history.push('/')}>
                            ANNOUNCEME
                        </Typography>
                    </div>

                    <div className={classes.header__wrapper__right}>
                        <Add onClick={handleClick} className={classes.icon} />

                        <Menu
                            id='simple-menu'
                            anchor={anchor}
                            keepMounted
                            open={Boolean(anchor)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleJoin}>
                                Join Room
                            </MenuItem>

                            <MenuItem onClick={handleCreate}>
                                Create Room
                            </MenuItem>
                        </Menu>

                        <div className={classes.icon}>
                            <Avatar onClick={() => logout()} src={loggedInUser?.photoURL} />
                        </div>
                    </div>
                </Toolbar>

            </AppBar>
            <CreateClass />
            <JoinClass />
        </div>
    )
}

export default Header
