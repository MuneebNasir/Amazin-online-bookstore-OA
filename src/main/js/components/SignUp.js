import React, {useContext} from 'react';
import {firebaseAuth} from "../services/provider/AuthProvider";
import {withRouter} from 'react-router-dom';

const SignUp = (props) => {
    const {handleSignUp, inputs, setInputs, errors} = useContext(firebaseAuth)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleSignUp()
        props.history.push('/')
    }
    const handleChange = e => {
        const {name, value} = e.target
        setInputs(prev => ({...prev, [name]: value}))
    }

    return (
        <form onSubmit={handleSubmit}>
            Signup
            <input onChange={handleChange} name="email" placeholder='email' value={inputs.email} />
            <input onChange={handleChange} name="password" placeholder='password' value={inputs.password} />
            <button>signup</button>
            {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
        </form>
    );
};

export default withRouter(SignUp);