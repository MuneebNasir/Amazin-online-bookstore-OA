import React, {useState} from 'react';
import {authMethods} from "../firebase/authMethods";

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
    const initState = {email: '', password: ''}
    const [inputs, setInputs] = useState(initState)
    const [errors, setErrors] = useState([])
    const [token, setToken] = useState(null)

    const handleSignUp = () => {
        authMethods.signUp(inputs.email, inputs.password, setErrors ,setToken)
        console.log(errors, token)
    }

    const handleSignIn = () => {
        authMethods.signIn(inputs.email, inputs.password, setErrors, setToken)
        console.log(errors, token)
    }

    const handleSignOut = () => {
        authMethods.signOut(setErrors, setToken)
    }

    return (
        <firebaseAuth.Provider
            value={{
                handleSignUp,
                handleSignIn,
                handleSignOut,
                token,
                inputs,
                setInputs,
                setErrors,
                errors,
            }}>
            {props.children}
        </firebaseAuth.Provider>
    );
};

export default AuthProvider;