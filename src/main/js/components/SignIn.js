import React, {useContext} from 'react';
import {firebaseAuth} from "../services/provider/AuthProvider";

const SignIn = () => {


    const {handleSignIn, inputs, setInputs, errors} = useContext(firebaseAuth)

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSignIn()

    }
    const handleChange = e => {
        const {name, value} = e.target
        setInputs(prev => ({...prev, [name]: value}))
    }

    return (
        <form onSubmit={handleSubmit}>
            Sign In
            <input onChange={handleChange} name="email" placeholder='email' value={inputs.email} />
            <input onChange={handleChange} name="password" placeholder='password' value={inputs.password} />
            <button>Sign In</button>
            {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
        </form>
    );
};

export default SignIn;