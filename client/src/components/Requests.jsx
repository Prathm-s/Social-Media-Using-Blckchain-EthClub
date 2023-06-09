import React, { useContext, useEffect, useState } from 'react'
import RequestComponent from './RequestComponent'
import { StateContext } from '../context/StateContextProvider'

function Requests() {

    const [user, setUser] = useState([])
    const stateContext = useContext(StateContext)
    const account = stateContext.account
    const userContract = stateContext.userContract
    const [ refresh,setRefresh] = useState(false)
    useEffect(() => {
        acceptRequest()
    }, [user.friendRequests])

    useEffect(()=>{

    },[refresh])

    const acceptRequest = async () => {
        const user = await userContract.methods.getCurrentUser(account).call()
        setUser(user.friendRequests)
        setRefresh(!refresh)
    }

    const requests = user.map((request) => {
        return <RequestComponent address={request} user={request} />
    })

    return (
        <div style={{ marginBottom: 20 }}>

            <div className='f jc ic' style={{ marginBottom: 10 }}>
                <p style={{ fontWeight: 500 }} >REQUESTS</p>
                <h5 className='badge'>{user ? user.length : 0}</h5>
            </div>
            <div  className='menuDiv' >
                {
                    user.length != 0 ? requests : <div>No Request...</div>
                }

            </div>
        </div>
    )
}

export default Requests
