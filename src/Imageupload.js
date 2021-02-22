import { Button,Input } from "@material-ui/core";
import React, { useState } from "react";
import "./Imageupload.css";
import { db, storage } from "./firebase";
import firebase from "firebase";

function Imageupload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setprogress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //  Progress Function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setprogress(progress);
      },
      (error) => {
        //  Error Function
        console.log(error);
        alert(error.message);
      },
      () => {
        //  complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside database
            db.collection("posts").add({
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                caption : caption,
                imgUrl : url,
                username : username
            });
            setprogress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className="ImageUpload">
      <progress className="ImageUpload__progress" value={progress} max="100" />
      <Input
        type="text"
        placeholder="Enter a Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default Imageupload;

// {
//   /* I want to have */
// }
// {
//   /* Caption Input */
// }
// {
//   /* File Picker */
// }
// {
//   /* Post Button*/
// }
