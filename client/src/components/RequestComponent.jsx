import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Jdenticon from 'react-jdenticon'
import { StateContext } from '../context/StateContextProvider'

function RequestComponent(props) {

    const [name, setName] = useState("")
    const stateContext = useContext(StateContext)
    const account = stateContext.account
    const userContract = stateContext.userContract

    useEffect(() => {
        getUserName()
    }, [])

    const getUserName = async () => {
        let userObj = await userContract.methods.getCurrentUser(props.address).call()
        if (userObj) {
            setName(userObj.name)
            console.log(userObj)
        }
    }

    const handleAcceptRequest = async () => {
        // send id instead of address
        const getCurrentUserObj = await userContract.methods.getCurrentUser(account).call()
        const friendObj = await userContract.methods.getCurrentUser(props.address).call()
        await userContract.methods.acceptRequest(getCurrentUserObj.id, friendObj.id).send({ from: account })
    }
    return (
        <div >
            <div className='f'>
                {/* <img className='profile' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8d2GaM9vp206kfNlnBUKdLFUNQMpy4SmWZxYssaNy1MVWtaJp9P4AJ9FngBRMQiWfj2c&usqp=CAU" alt="" /> */}
                <Jdenticon value={props.address} size={32} />
                <p style={{ marginLeft: 10 }}><p style={{ fontWeight: 500 }}>{name} </p> wants to connet you</p>
            </div>
            <div style={{ marginTop: 10, justifyContent: 'space-between', display: 'flex' }}>
                <Button variant='contained' disableElevation onClick={() => {
                    handleAcceptRequest()
                }}>Accept</Button>
                <Button variant='outlined' disableElevation>Decline</Button>

            </div>
        </div>
    )
}

export default RequestComponent
