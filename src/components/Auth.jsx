import React, { useState } from 'react';
import "./Auth.css"
import { Button, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { GrFormClose } from 'react-icons/gr';

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

const AuthComponent=() => {
    const [open, setOpen]=useState(false);
    const formRef=React.useRef();
    const [error, seterror]=useState('')
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

        if (!email||!password) {
            seterror("Email and password are required.");
            setOpen(true);
            return;
        }

        setLoad(true);
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                seterror('See Console for error')
                setOpen(true);
                console.log(err);
            })
    };

    const handleCreateAccount=(e) => {
        if (!email||!password) {
            seterror("Email and password are required.");
            setOpen(true);
            return;
        }
        setLoad(true);
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                seterror('See Console for error')
                setOpen(true);
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
                <form style={{ display: 'grid', gap: '1rem' }} ref={formRef}>
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
            <Collapse in={open} sx={{ marginTop: '1rem' }}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <GrFormClose />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {error}
                </Alert>
            </Collapse>
        </div>
    );
};

export default AuthComponent;
