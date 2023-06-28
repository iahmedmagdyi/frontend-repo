import React, { useContext } from "react";
import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from '../helpers/AuthContext';

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedposts, setLikedPost] = useState([]);
  const { authState } = useContext(AuthContext)

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accesstoken")) {
      navigate("/login")
    } else {
      axios
        .get("http://127.0.0.1:3001/posts", {
          headers: {
            accesstoken: localStorage.getItem("accesstoken"),
          },
        })
        .then((response) => {
          setListOfPosts(response.data.getListOf);
          setLikedPost(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        })


    };
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://127.0.0.1:3001/likes",
        { PostId: postId },
        {
          headers: { accesstoken: localStorage.getItem("accesstoken") },
        }
      )
      .then((responese) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (responese.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const like = post.Likes;
                like.pop();
                return { ...post, Likes: like };
              }
            } else {
              return post;
            }
          })
        );
        if (likedposts.includes(postId)) {
          setLikedPost(likedposts.filter((id) => {
            return id !== postId
          }))
        } else {
          setLikedPost([...likedposts, postId])
        }
      });
  };

  return (
    <div className="App">
      <Link to="/createpost">
        <h1>create post</h1>
      </Link>
      <h1>link</h1>
      {listOfPosts.map((value, key) => {
        return (
          <div className="post" key={key}>
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">
                <a href={`/profile/${value.UserId}`} >{value.username}
                </a>
              </div>
              <div className="buttons">
                <ThumbUpIcon
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={
                    likedposts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                />

                <label> {value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
