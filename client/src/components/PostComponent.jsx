import { IconButton, Button, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { StateContext } from '../context/StateContextProvider';
import Jdenticon from 'react-jdenticon';
import Comment from './Comment';
import moment from 'moment'


export const getHumanReadable = (oldTimestamp) => {
    const date = new Date();
    const timestamp = date.getTime();
    const seconds = Math.floor(timestamp / 1000);
    const difference = seconds - oldTimestamp / 1000;
    let output = ``;
    if (difference < 60) {
        // Less than a minute has passed:
        output = `${parseInt(difference)} seconds ago`;
    } else if (difference < 3600) {
        // Less than an hour has passed:
        output = `${Math.floor(difference / 60)} minutes ago`;
    } else if (difference < 86400) {
        // Less than a day has passed:
        output = `${Math.floor(difference / 3600)} hours ago`;
    } else if (difference < 2620800) {
        // Less than a month has passed:
        output = `${Math.floor(difference / 86400)} days ago`;
    } else if (difference < 31449600) {
        // Less than a year has passed:
        output = `${Math.floor(difference / 2620800)} months ago`;
    } else {
        // More than a year has passed:
        output = `${Math.floor(difference / 31449600)} years ago`;
    }
    return output
}


function PostComponent(props) {

    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [isClickedComment, setIsCommentCliked] = useState(false)
    const [user, setUser] = useState()
    const [time, setTime] = useState("")
    const stateContext = useContext(StateContext)
    const contract = stateContext.contract
    const userContract = stateContext.userContract
    const account = stateContext.account

    const handleViewComment = () => {
        setIsCommentCliked(!isClickedComment)
        // props.handleCommentClick(props.item)
    }
    useEffect(() => {
        getCurrentUser();
    }, [])


    const getCurrentUser = async () => {
        const currentUser = await userContract.methods.getCurrentUser(props.item.owner).call()
        setTime(getHumanReadable(props.item.timeStamp))
        setUser(currentUser)
    }

    const previewComments = props.item.comments.map((item) => {
        return <Comment commentObj={item} />
    })



    return (
        <div className='fc menuDiv ' style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>

            <div className='f ic'>
                <Jdenticon size="48" value={props.item.owner} />
                <div style={{ flex: 1, marginLeft: 10 }}>
                    <p style={{ fontWeight: '500' }}>{props.item.name}</p>
                    <p className='lowOP'>{time}</p>
                </div>


            </div>
            <div>
                <p style={{ marginBottom: 10, marginTop: 10 }}>{props.item.description}</p>

                {props.item.imageUrl && <img src={props.item.imageUrl} alt="Here will be image" style={{ borderRadius: 20, marginTop: 10, width: '100%' }} />}
            </div>

            <div style={{ paddingTop: 10, paddingBottom: 10, }} className='f ic jc'>
                <div className='f ic'>
                    <IconButton  onClick={() => {
                        props.likePost(props.item.id)
                    }}>
                        <ThumbUpIcon style={{  color:props.item.likes.includes(account) ? '#2196f3' : ''}} />
                    </IconButton>
                    <p>{props.item.likes.length} Likes</p>
                </div>
                <p style={{ cursor: 'pointer' }} onClick={() => handleViewComment()}> {props.item.comments.length} Comments</p>
            </div>

            <div className={isClickedComment ? "comment active" : "comment"}>
                <p style={{ borderBottom: '1px solid rgba(0, 55, 88, 0.1)', paddingBottom: 10, fontWeight: 500 }}>Comments</p>
                {previewComments}
            </div>

            <div className='f' >
                <TextField placeholder='Add Comment...' style={{ flex: 1 }} onChange={(text) => { setComment(text.target.value) }} />
                <Button onClick={() => {
                    props.handleAddComment(props.item.id, comment)
                }}>Post</Button>

            </div>
        </div>
    )
}

export default PostComponent
