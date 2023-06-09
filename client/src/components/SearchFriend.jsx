import { Button, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { StateContext } from '../context/StateContextProvider';
import User from './User';

function SearchFriend() {

    const stateContext = useContext(StateContext)
    const account = stateContext.account
    const contract = stateContext.contract
    const userContract = stateContext.userContract
    const [currentUser, setCurrentUser] = useState({})

    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        const fetchedUsers = await userContract.methods.getAllUsers().call()
        setUsers(fetchedUsers)

        const cUser = await userContract.methods.getCurrentUser(account).call()
        setCurrentUser(cUser)

    }


    const sendFrientRequest = async (_id) => {
        await userContract.methods.sendFriendRequest(_id).send({ from: account })
        console.log("FR Sent ")
    }

    const filterdUsers = users.map((user) => {
        if (user.owner != account)
            return <User user={user} handleSendRequest={sendFrientRequest}  />
    })

    const handleOnSearch = (e) => {
        let name = e.target.value;

    }

    return (
        <div>

            <div className='menuDiv' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', margin: 20 }}>
                <TextField style={{ flex: 1, marginRight: 10 }} placeholder='Search Person' onChange={(e) => { handleOnSearch(e) }} />

            </div>
            {
                filterdUsers
            }
        </div>
    )
}

export default SearchFriend
