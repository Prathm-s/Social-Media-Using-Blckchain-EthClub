import React, { useEffect, useState } from 'react'
import { getHumanReadable } from './PostComponent'
import Jdenticon from 'react-jdenticon'

function Comment(props) {

    const { name, timeStamp, comment, owner } = props.commentObj;
    const [time, setTime] = useState("")
    useEffect(() => {
        getTimeStamp()
    }, [])

    const getTimeStamp = () => {
        setTime(getHumanReadable(timeStamp))
    }
    return (
        <div style={{ padding: 10, borderBottom: '1px solid  rgba(0, 55, 88, 0.08)' }} className='f'>
            {/* <img src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png " alt="profile" className='profile' /> */}
            <Jdenticon value={owner} size={42} />
            <div style={{ marginLeft: 10 }}>
                <p><span style={{ fontWeight: '500' }}>{name} </span>{comment}</p>
                <p style={{ color: 'lightgray ' }}>{time}</p>
            </div>
        </div>
    )
}

export default Comment
