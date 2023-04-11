import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import React, { useState } from 'react'
import { signOut } from 'firebase/auth';
import LoadingButton from '@mui/lab/LoadingButton';

const UserDashboard=({ authUser }) => {
    const [isLoad, setLoad]=useState(false)

    const handleSignout=() => {
        setLoad(true);
        signOut(auth)
            .then(() => {
                setLoad(false);
                console.log('signed out')
            })
            .catch((err) => {
                setLoad(false);
                console.log(err)
            })
    }

    return (
        <div>
            {authUser? (
                <>
                    <h1>Hello World</h1>
                    <p style={{ fontSize: '2rem' }}>
                        signed in as <b>{authUser.email}</b>
                    </p>
                    <LoadingButton
                        onClick={handleSignout}
                        loading={isLoad}
                        sx={{
                            m: "1rem",
                            p: "1rem",
                            backgroundColor: '#ffffff',
                            boxShadow: '4px 8px 16px rgba(0, 0, 0, 0.1)',
                            color: 'black',
                            "&:hover": { color: '#ffffff', backgroundColor: 'black' },
                        }}
                    >
                        Sign Out
                    </LoadingButton>
                </>
            ):(
                <p>
                    signed out
                </p>
            )
            }
        </div>

    )
}

export default UserDashboard