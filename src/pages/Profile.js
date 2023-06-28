import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const Profile = () => {
    let { id } = useParams()
    const [state, setState] = useState("")
    const [listOfPosts, setListOfPosts] = useState([])
    let navigate = useNavigate();
    const { authState } = useContext(AuthContext)



    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {

            setState(response.data.username);
        });
        axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
            setListOfPosts(response.data)
        })


    }, []);


    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                <h1>username :{state}</h1>
                {authState.username === state && 
                <button onClick={()=>{navigate("/changepassword")}}> changepassword</button>
                }
            </div>
            <div className='listOfPosts'>

                {listOfPosts.map((value, key) => {
                    return (
                        <div className="post" key={key}>
                            <div className="title"> {value.title} </div>
                            <div
                                className="body"
                                onClick={() => {
                                    navigate(`/post/${value.id}`)
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
                                    <label> {value.Likes.length}</label>
                                </div>
                            </div>
                        </div>
                    );
                })


                }

            </div>
        </div>

    );
}

export default Profile
