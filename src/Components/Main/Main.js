import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import db, { storage } from "../../lib/firebase";
import firebase from "firebase";
import { useLocalContext } from "../../context/context";
import { Announcement } from "..";

import './Main.css'

const Main = ({ classData }) => {
    const { loggedInMail, loggedInUser } = useLocalContext();

    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInput] = useState("");
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadImage = storage.ref(`images/${image?.name}`).put(image);

        uploadImage.on("state_changed", () => {
            storage
                .ref("images")
                .child(image?.name)
                .getDownloadURL()
                .then((url) => {
                    console.log(url)
                    db.collection("announcements")
                        .doc("rooms")
                        .collection(classData.id)
                        .add({
                            timstamp: firebase.firestore.FieldValue.serverTimestamp(),
                            imageUrl: url,
                            text: inputValue,
                            sender: loggedInMail,
                        });
                });
        });
    };
    return (
        <div className="main">
            <div className="main__wrapper">
                <div className="main__content">
                    <div className="main__wrapper1">
                        <div className="main__bgImage">
                            <div className="main__emptyStyles" />
                        </div>
                        <div className="main__text">
                            <h1 className="main__heading main__overflow">
                                {classData.className}
                            </h1>
                            <div className="main__section main__overflow">
                                {classData.section}
                            </div>
                            <div className="main__wrapper2">
                                <em className="main__code">Room Code :</em>
                                <div className="main__id">{classData.id}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main__announce">

                    <div className="main__announcements">
                        <div className="main__announcementsWrapper">
                            <div className="main__ancContent">
                                {showInput ? (
                                    <div className="main__form">
                                        <TextField
                                            id="filled-multiline-flexible"
                                            multiline
                                            label="Announce Something to Room"
                                            variant="filled"
                                            value={inputValue}
                                            onChange={(e) => setInput(e.target.value)}
                                        />
                                        <div className="main__buttons">
                                            <input
                                                onChange={handleChange}
                                                variant="outlined"
                                                color="primary"
                                                type="file"
                                            />

                                            <div>
                                                <Button onClick={() => setShowInput(false)}>
                                                    Cancel
                        </Button>

                                                <Button
                                                    onClick={handleUpload}
                                                    color="primary"
                                                    variant="contained"
                                                >
                                                    Post
                        </Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                        <div
                                            className="main__wrapper100"
                                            onClick={() => setShowInput(true)}
                                        >
                                            <Avatar src={loggedInUser?.photoURL} />
                                            <div>Make Announcements</div>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <Announcement classData={classData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
