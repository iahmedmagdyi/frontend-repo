import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../App.css"


const Rigister = () => {
    // const [username , setUsername] = useState("")
    // const [password , setPassword] = useState("")
    

    const initialValues = {
        password :"",
        username: ""
    };

    const validationSchema = Yup.object().shape({

        username: Yup.string().min(3).max(15).required(),
        password:Yup.string().min(4).max(20).required()
    });

    const onSubmit = (data) => {
        
       axios.post("http://127.0.0.1:3001/auth",data ).then(()=> {
        console.log("you logged")
       })
    }

    return (
        <div className="createPostPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">

                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field

                        id="inputCreatePost"
                        name="username"
                        placeholder="(Ex. John123...)"
                    />
                    <label>password: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        type="password"
                        id="inputCreatePost"
                        name="password"
                        placeholder="(your password ...)"
                    />

                    <button type="submit"> Rigister </button>
                </Form>
            </Formik>
        </div>
    )
}

export default Rigister
// const likeAPost = (postId) => {
//     axios.post("http://127.0.0.1:3001/likes" , {PostId :postId} , {
//       headers :{accesstoken :localStorage.getItem("accesstoken")}
//     }).then((responese) => {
//       alert(responese.data)
//     })  }
