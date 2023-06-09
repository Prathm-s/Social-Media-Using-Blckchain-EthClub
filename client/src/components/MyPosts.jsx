import React, { useContext, useEffect, useState } from 'react'
import PostComponent from './PostComponent'
import { Button, TextField, Modal, Typography, Box } from '@mui/material'
import Comment from './Comment';
import { StateContext } from '../context/StateContextProvider';
import Jdenticon from 'react-jdenticon'


export const style = {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '80%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'background.paper',
    boxShadow: 24,
};



function MyPosts() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [posts, setPosts] = useState([])
    const [description, setDescription] = useState("")
    const [item, setItem] = useState()
    const [comment, setComment] = useState("")

    const stateContext = useContext(StateContext)
    const account = stateContext.account;
    const contract = stateContext.contract;


    useEffect(() => {
        getAllPosts();
    }, [])

    const modalInstance = () => {
        const comments = item.comments.map((commentObj) => {
            return <Comment comment={commentObj.comment} owner={commentObj.commentorAdd} />
        })

        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ flex: 1, borderRight: '1px solid lightgray' }} className='f ic jc'>
                        <img style={{ width: '100%', alignSelf: 'center', alignContent: 'center' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8d2GaM9vp206kfNlnBUKdLFUNQMpy4SmWZxYssaNy1MVWtaJp9P4AJ9FngBRMQiWfj2c&usqp=CAU" alt="" />
                    </div>
                    <div style={{ flex: 1 }}>

                        <div className='f ic' style={{ borderBottom: '1px solid lightgray', padding: 10 }}>
                            <img className="profile" src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png" alt="" />
                            <p style={{ fontWeight: '500', marginLeft: 10 }}>{item.owner}</p>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', height: "70%" }} >

                            {comments}

                        </div>
                        <div className='f ic' style={{ padding: 20 }}>
                            <TextField placeholder='Add Comment ....' style={{ flex: 1 }} onChange={(text) => { setComment(text.target.value) }} />
                            <Button onClick={() => {
                                handleAddComment(item.id, comment)
                            }}>Post</Button>
                        </div>
                    </div>

                </Box>
            </Modal>
        )

    }


    const handleCommentViewClick = (item) => {
        setItem(item)
        console.log(item)
        handleOpen()
    }

    const handlePostSubmit = async () => {

        if (description != "") {
            console.log(description)
            const currentDate = new Date();
            const timestamp = currentDate.getTime();
            let name = localStorage.getItem("name")
            // hardcoded post as public 

            const temp = await contract.methods.createPost(account,name,description, "", timestamp,false).send({ from: account })
            console.log(temp)
        } else {
            console.log("Please write post")
        }
    }

    const getAllPosts = async () => {
        let temp = await contract.methods.getPosts().call();
        const filtered = temp.filter((item) => item.owner == account)
        setPosts(filtered)
    }



    const likePost = async (_id) => {
        await contract.methods.likePost(_id).send({ from: account });
        let temp = await contract.methods.getPosts().call();

    }



    const handleAddComment = async (id, comment) => {
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        let name = localStorage.getItem("name")
        await contract.methods.commentPost(id, comment, timestamp, name).send({ from: account })
  
    }

    const postObj = posts.map((item, index) => {
        return <PostComponent handleCommentClick={handleCommentViewClick} handleAddComment={handleAddComment} item={item} likePost={likePost} />
    })

    postObj.reverse();

    return (
        <div>
            {item ? open ? modalInstance() : null : null}

            <div onSubmit={handlePostSubmit} className='menuDiv f ic jc' style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                {/* <img className="profile" src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png" alt="" /> */}
                <Jdenticon size={48} value={account} />
                <TextField style={{ flex: 1, marginRight: 10, marginLeft: 20 }} placeholder='Create New Post here' name="post" onChange={(text) => {
                    setDescription(text.target.value)
                }} />
                <Button variant='contained' type='submit' onClick={() => { handlePostSubmit() }} disableElevation style={{ height: '100%!' }}>Post it!</Button>
            </div>
            {postObj}



        </div>
    )
}

export default MyPosts
