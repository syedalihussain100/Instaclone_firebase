import React , {useState ,useEffect} from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import {db } from './firebase';
import firebase from 'firebase';
import {Input,Button} from '@material-ui/core'
import moment from 'moment';

function Post({postId,user,username,caption,imgUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp","asc")
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()))
            })  
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);
    
    const postComment = (event) =>{
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() 
        });
        setComment('');
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar"
                src="/static/images/avatar/jpg"
                alt={username}/>
                <h3>{username}</h3>
            </div>
            
            <img className="post__image" alt="abc" src={imgUrl}></img>           
            <h4 className="post__text"><strong>{username}:</strong> {caption}</h4>
            <div className = "post__comments">
                {
                    comments.map((comment) => (
                        <p className="comment_post">
                            <strong className="strong_post">{comment.username}: </strong> {comment.text} <strong className="date_post">{moment().startOf('hour').fromNow()}</strong>
                        </p>
                    ))
                }
            </div>
            {user && (

                <form className = "post__commentsBox">
                    <Input 
                        className="post__input"
                        type="text"
                        placeholder="Add a comment.."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button 
                        className="post__button" 
                        disabled={!comment} 
                        type="submit"
                        onClick={postComment} >Post
                    </Button>
                    
                </form>
            )}    
        </div>
    )
}

export default Post;






















// import React from "react";
// import "./Post.css";
// import Avatar from "@material-ui/core/Avatar";

// function Post({userName,imageUrl,Caption}) {
//   return (
//     <div className="post">
//       <div className="post_header">
//         <Avatar
//           className="post_avator"
//           src="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2016/05/instagram-logo-796x404.png"
//           alt={userName}
//         />
//         <h3>{userName}</h3>
//       </div>
//       {/* header -> avator username */}
//       <img
//         className="post_image"
//         src={imageUrl}
//         alt="Instagram"
//       />
//       {/* image */}
//       <h4 className="post_text">
//         <strong>{userName}</strong>: {Caption}</h4>
//       {/* username + caption */}
//     </div>
//   );
// }

// export default Post;
