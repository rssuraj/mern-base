import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { toast } from 'react-toastify';
import { register } from '../api';

import './Signup.css';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        nameFeedback: '',
        email: '',
        emailFeedback: '',
        password: '',
        passwordFeedback: '',
        buttonText: 'Submit'
    });

    const { 
        name, nameFeedback, 
        email, emailFeedback, 
        password, passwordFeedback, 
        buttonText 
    } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = async event => {
        try {
            event.preventDefault();
            setValues({ ...values, buttonText: 'Submitting' });
            const response = await register({ name, email, password });
            if(response && response.status == 200) {
                console.log('SIGNUP SUCCESS', response);
                setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                toast.success(response.data.message);
                return;
            } 
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || error.response.data.error);
            const errorValues = { nameFeedback: '', emailFeedback: '', passwordFeedback: '' };
            if(error.response.data.error && error.response.data.error.length > 0) {
                for(const errorObj of error.response.data.error) {
                    errorValues[`${errorObj.param}Feedback`] = errorObj.msg;
                }
            }
            setValues({ ...values, ...errorValues, buttonText: 'Submit' });
        }
    }

    const signupForm = () => (
        <form className='g-3 needs-validation'>
            <div className='mb-3'>
                <label htmlFor='signupName' className='form-label'>Name</label>
                <input id='signupName' onChange={handleChange('name')} value={name} type='text' className='form-control' />
                <div className='signup-validation-msg'>{nameFeedback}</div>
            </div>

            <div className='mb-3'>
                <label htmlFor='signupEmail' className='form-label'>Email</label>
                <input id='signupEmail' onChange={handleChange('email')} value={email} type='email' className='form-control' />
                <div className='signup-validation-msg'>{emailFeedback}</div>
            </div>

            <div className='mb-3'>
                <label htmlFor='signupPassword' className='form-label'>Password</label>
                <input id='signupPassword' onChange={handleChange('password')} value={password} type='password' className='form-control' />
                <div className='signup-validation-msg'>{passwordFeedback}</div>
            </div>

            <div>
                <button type='submit' className='btn btn-primary' onClick={handleSubmit}>{buttonText}</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className='col-d-6 offset-md-3'>
                <h1 className='p-5 text-center'>Signup</h1>
                {signupForm()}
            </div>
        </Layout>
    );
};

export default Signup;