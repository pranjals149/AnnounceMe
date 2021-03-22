import React, { useState } from 'react'
import { useLocalContext } from '../../context/context'
import { Button, Checkbox, Dialog, DialogActions, DialogContent } from '@material-ui/core'

import './CreateClass.css'
import Form from './Form'

const CreateClass = () => {
    const { createClassDialog, setCreateClassDialog } = useLocalContext();

    const [check, setCheck] = useState(false)
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            { createClassDialog && (
                <div>
                    <Dialog
                        onClose={() => setCreateClassDialog(false)}
                        aria-labelledby='customized-dialog-title'
                        open={createClassDialog}
                        maxWidth={showForm ? 'lg' : 'xs'}
                        className='form__dialog'
                    >
                        {showForm ? (
                            <Form />
                        ) : (
                                <>
                                    <div className="class__title">
                                        Using AnnounceMe ?
                                    </div>

                                    <DialogContent className='class__content'>
                                        <p className="class__text">
                                            <p>
                                                Just Sign Up and start using it for free.
                                            </p>
                                        </p>
                                        <p>
                                            AnnounceMe is a simple Web Portal which allows organizations, small group of professionals, or a chapter to create and start a discussion or use it for making announcements.
                                        </p>

                                        <div className="class__checkboxWrapper">
                                            <Checkbox
                                                onChange={() => setCheck(!check)}
                                                color='primary'
                                            />
                                            <p>
                                                I've read and understood the above description and now want to sign up and create/join rooms
                                            </p>
                                        </div>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button autoFocus onClick={() => setCreateClassDialog(false)}>
                                            Close
                                        </Button>

                                        <Button autoFocus color='primary' disabled={!check} onClick={() => setShowForm(true)}>
                                            Continue
                                        </Button>
                                    </DialogActions>
                                </>
                            )}
                    </Dialog>
                </div>
            )
            }
        </>
    )
}

export default CreateClass
