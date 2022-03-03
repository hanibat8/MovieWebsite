import React,{useContext,useEffect, useState} from 'react';
import {useNavigate } from 'react-router-dom';
import Header from '../components/UI/Header';
import Input from '../components/UI/Input';
import classes from './Form.module.css';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword
  } from "firebase/auth";
import {auth} from '../firebase-config';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {renderResponseItem} from '../utils/util';
import AuthContext from '../store/auth-context';

const Login=()=>{
    //const {sendRequest,unsetState,response,isLoading,error}=useHttp();
    console.log('login')
    const [error,setError]=useState(false);
    const authContext=useContext(AuthContext);
    const navigate=useNavigate ();
    //const isLoggedIn=authContext.isLoggedIn;

    /*useEffect(()=>{
       // !error && !isLoading && response && authContext.logIn(response.idToken);
       response && authContext.logIn(response.idToken);
       isLoggedIn && navigate('/');
    },[response,authContext])

    useEffect(()=>{
        return()=>{
            unsetState();
        }
    },[unsetState])*/

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                console.log(user);
                navigate('/');
            }
        })
    },[])


    return(
        <React.Fragment>
            <Header/>
            <Formik
            initialValues={{
                email: "",
                password:""
            }}
            validationSchema={Yup.object({
            email: Yup.string()
                .email("Invalid email addresss`")
                .required("Required"),
            password: Yup.string()
                .min(5, "Must be 5 characters or more")
                .required("Required"),
            })}
            onSubmit={async(values, { setSubmitting }) => {
                //unsetState();
                /*sendRequest({
                   url:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3tkL__9PuUSI_bZBzyJIAjxda4AHOZog',
                   method:'POST',
                   body: JSON.stringify({
                       email: values.email,
                       password: values.password,
                       returnSecureToken: true,
                       }),
                   headers: {
                       'Content-Type': 'application/json',
                       },
                   });*/
                    signInWithEmailAndPassword(auth,values.email,values.password).then((userCredential)=>{
                        setSubmitting(false);
                        authContext.logIn(userCredential._tokenResponse.idToken);
                        navigate('/');
                   }).catch((err)=>{
                        setError(err.message);
                   })

                   //!error && !isLoading && setSubmitting(false);
                   //{error && console.log(error)}
               }}>
                {formik => {
                    //console.log('Formik props', formik)
                    return (
                        <div className={classes['form__container']}>
                        <Form className={classes['form']}>
                        <h2 className={classes['form__heading']}>Login</h2>
                        <Input 
                            label="Email Address"
                            name="email"
                            type="email"
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="password"       
                        />
                        {(formik.isSubmitting || error) && renderResponseItem(formik.isSubmitting,error)}
                        {!formik.isSubmitting && <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className={classes['form__btn']} type="submit">Submit</button>}
                        </Form>
                        </div>
                    )}}
        </Formik>
    </React.Fragment>
    )
}

export default Login;