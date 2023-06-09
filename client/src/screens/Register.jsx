import { TextField, Button } from '@mui/material'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StateContext } from '../context/StateContextProvider'


const style = {
    marginBottom: {
        marginBottom: 20
    }
}

function Register() {

    const stateContext = useContext(StateContext)

    const account = stateContext.account;
    const userContract = stateContext.userContract
    const contract = stateContext.contract

    const navigate = useNavigate()


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Check wheater email already register or not 
        const isExist = await userContract.methods.getCurrentUser(account).call()
        if (isExist.name) {
            alert("User already registerd please login")
        } else {
            console.log("Register")
            console.log(e.target.first)
            const name = e.target.first.value + " " + e.target.last.value
            const email = e.target.email.value;
            const password = e.target.password.value;
            const url = "https://cdn.dribbble.com/users/2199928/screenshots/11532918/media/5a7273b592ea860e6d0ff2931ecab4f3.png?compress=1&resize=400x300&vertical=top"
            await userContract.methods.createUser(account, name, email, password, url).send({ from: account })

            alert("user is created and data ")
        }
    }

    const getAllUsers = async () => {
        const temp = await userContract.methods.getAllUsers().call();
        console.log(temp)
    }

    const handleLoginRedirect = () => {
        navigate("/Login")
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
            <form className='fc' onSubmit={handleFormSubmit} method='POST' >
                <h1 >Register</h1>
                <p style={style.marginBottom}>Create new account </p>
                <div style={style.marginBottom} className='f' >
                    <TextField label="First Name" name="first" required style={{ marginRight: 20 }} />
                    <TextField label="Last Name" name="last" required />
                </div>

                <TextField label="Email" name="email" required type='email' style={style.marginBottom} />
                <TextField label="password" name="password" required type='password' style={style.marginBottom} />
                <Button type='submit' variant='contained' disableElevation  style={style.marginBottom}>Create Account</Button>

                
                <Button type='submit' variant='outlined' onClick={() => {
                    handleLoginRedirect()
                }} >Login</Button>

             
            </form>
        </div>

    )
}

export default Register
