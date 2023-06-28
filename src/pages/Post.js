
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';


function Post() {
  const { authState } = useContext(AuthContext)
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://127.0.0.1:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post("http://127.0.0.1:3001/comments", {
        commentBody: newComment,
        PostId: id,
      },
        {
          headers: {
            accesstoken: localStorage.getItem("accesstoken")
          }
        }

      )
      .then((response) => {
        if (response.data.error) {
          alert("you are not loged in")
        } else {
          const commentToAdd = { commentBody: newComment, username: response.data.username };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }

      });
  };
  const deletComment = (id) => {
    axios.delete(`http://127.0.0.1:3001/comments/${id}`,
      {
        headers: {
          accesstoken: localStorage.getItem("accesstoken")
        }
      }).then((response) => {
        setComments(comments.filter((val) => {
          return val.id !== id
        }))
      })
  }

  const deletPost = (id) => {
    axios.delete(`http://127.0.0.1:3001/Posts/${id}`,
      {
        headers: {
          accesstoken: localStorage.getItem("accesstoken")
        }
      }

    ).then(() => {
      navigate("/")
    })

  };
  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter new title")
      axios.put("http://127.0.0.1:3001/Posts/title",
        { newTitle: newTitle, id :id },
        {
          headers: {
            accesstoken: localStorage.getItem("accesstoken")
          }
        }
        )
        setPostObject({...postObject , title:newTitle})

    } else {
      let newPostText = prompt("Enter new text")
      axios.put("http://127.0.0.1:3001/Posts/postText",
        { newPostText: newPostText , id :id },
        { headers: { accesstoken: localStorage.getItem("accesstoken") } })
        setPostObject({...postObject , postText:newPostText})
    }
  }

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("title")
              }
            }}> {postObject.title} </div>
          <div className="body" onClick={() => {
            if (authState.username === postObject.username) {
              editPost("body")
            }
          }}>{postObject.postText}</div>
          <div className="footer">{postObject.username}
            {authState.username === postObject.username && (<button onClick={() => deletPost(postObject.id)}>delelte</button>)}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <div>username :{comment.username}</div>
                {
                  authState.username === comment.username && (
                    <button onClick={() => { deletComment(comment.id) }}>x</button>
                  )
                }

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;