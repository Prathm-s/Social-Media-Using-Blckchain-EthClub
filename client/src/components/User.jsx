import { Button } from '@mui/material'
import React from 'react'
import Jdenticon from 'react-jdenticon'

function User(props) {
    return (
        <div className='f ic menuDiv userComp ' style={{marginBottom:20}} >
            <Jdenticon value={props.user.owner} size={32} />
            <div style={{ marginLeft: 20 }} className='f jc ic'>
                <p>{props.user.name}</p>
                <div>
                    <Button onClick={() => {
                        props.handleSendRequest(props.user.id)
                    }}>Add Friend</Button>
                </div>
            </div>
        </div>
    )
}

export default User
