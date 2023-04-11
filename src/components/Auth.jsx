import React, { useState } from 'react';
import "./Auth.css"
import { Button, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

const AuthComponent=() => {

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [isLogin, setIsLogin]=useState(true);
    const [isLoad, setLoad]=useState(false)

    const handleGoogleSignup=() => {
        signInWithPopup(auth, provider)
            .then((response) => { console.log(response) })
            .catch((err) => { console.log(err) })
    }


    const handleLogin=(e) => {
        setLoad(true);
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoad(false);
                console.log(userCredential)
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            })
    };

    const handleCreateAccount=(e) => {
        setLoad(true);
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                setLoad(false);
                console.log(credentials)
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            })

    };

    const toggleLogin=() => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            <Button
                type="button"
                onClick={handleGoogleSignup}
                sx={{
                    p: "0.5rem",
                    width: '20rem',
                    backgroundColor: 'white',
                    color: 'black',
                    textTransform: 'none',
                    "&:hover": { color: 'black', backgroundColor: '#f0f1f2' },
                }}
            >
                <FcGoogle size={30} style={{ marginRight: '1rem' }} />Log in With Google
            </Button>
            <div className='authBox'>
                <h1>{isLogin? 'Log In':'Create Account'}</h1>
                <form style={{ display: 'grid', gap: '1rem' }}>
                    <TextField
                        label="Email"
                        type='email'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        sx={{ mx: '1rem' }}
                    />
                    <TextField
                        label="Password"
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        name="firstName"
                        required
                        sx={{ mx: '1rem' }}
                    />
                    <LoadingButton
                        type="button"
                        onClick={isLogin? handleLogin:handleCreateAccount}
                        loading={isLoad}
                        sx={{
                            m: "1rem",
                            p: "0.5rem",
                            mx: '7rem',
                            backgroundColor: '#f0f1f2',
                            color: 'black',
                            "&:hover": { color: '#f0f1f2', backgroundColor: 'black' },
                        }}
                    >
                        {isLogin? 'Log In':'Create Account'}
                    </LoadingButton>

                </form>
                <p>
                    {isLogin? "Don't have an account yet?":'Already have an account?'}
                    <Button
                        type="button"
                        onClick={toggleLogin}
                        sx={{ textTransform: 'none', }}
                    >
                        {isLogin? 'Create Account':'Log In'}
                    </Button>
                </p>

            </div>
        </div>
    );
};

export default AuthComponent;
