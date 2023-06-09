import React, { useContext, useEffect, useState } from 'react'
import FriendComponent from './FriendComponent'
import '../style/style.css'
import { StateContext } from '../context/StateContextProvider'

function Friends() {

    const stateContext = useContext(StateContext)
    const account = stateContext.account
    const userContract = stateContext.userContract
    const [user, setUser] = useState([])

    useEffect(() => {
        getCurrentUser()
    }, [user])

    const getCurrentUser = async () => {
        await userContract.methods.getCurrentUser(account).call().then(res=>{
            setUser(res.friends)
        })  
    }


    const friendsList = user.map((fr) => {
        return <FriendComponent address={fr} />

    })



    return (
        <div>

            <div className='f jc ic' style={{ marginBottom: 10 }}>
                <p style={{ fontWeight: 500 }} >FRIENDS</p>
                <h5 className='badge'>{user ? user.length : 0}</h5>
            </div>

            <div className='menuDiv' >

                {
                    user.length != 0 ? friendsList : <div> No Friends...</div>
                }


            </div>
        </div>
    )
}

export default Friends
