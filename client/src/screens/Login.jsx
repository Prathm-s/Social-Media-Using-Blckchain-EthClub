import React, { useContext, useEffect } from 'react'
import { StateContext } from '../context/StateContextProvider'
import { Button, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'


const style = {
    flex: {
        display: 'flex',
        alignItem: 'center',
        justifyContains: 'center'
    },
    center: {
        alignItems: 'center',
        justifyContains: 'center',
        display: 'flex',
        flex: 1,
        marginTop: '10%',
    },
    marginBottom: {
        marginBottom: 20
    },
    flex_1: {
        flex: 1,
   
    }
}

function Login() {

    const stateContext = useContext(StateContext)
    const account = stateContext.account
    const contract = stateContext.contract
    const userContract = stateContext.userContract
    const navigate = useNavigate()
    useEffect(() => {
        console.log(account)
    }, [])

    const handleFromSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        const isExist = await userContract.methods.getCurrentUser(account).call()

        if (isExist.name) {
            console.log("verify password")
            console.log(isExist.password)

            if (isExist.password == e.target.password.value) {
                localStorage.setItem("name", isExist.name)
                navigate("/Home")
            } else {
                console.log("Password is incorrect")
            }
        } else {
            console.log("Try using register your account")
        }

        console.log()

    }
    return (
        <div style={style.flex}>
            <form className='fc jc' style={style.center} method="POST" onSubmit={handleFromSubmit}>
                <h1 style={{ marginBottom: 20 }}>Login to EthClub</h1>
                <p>Address</p>
                <p style={{ fontWeight: 500, marginBottom: 20 }}>{account}</p>
                <TextField type='password' required label="password" name="password" style={{ width: '25%', ...style.marginBottom }} />
                <Button type='submit' variant='contained' disableElevation style={{ ...style.marginBottom, ...style.flex_1 }} >Login</Button>
                <Link to="/Register">Don't have an account</Link>
            </form>

        </div>
    )
}

export default Login
