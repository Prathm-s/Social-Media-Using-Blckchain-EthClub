import React, { useContext, useState, useEffect } from 'react'
import { StateContext } from '../context/StateContextProvider'
import Web3 from 'web3'
import NavBar from '../components/NavBar'
import Friends from '../components/Friends'
import Posts from '../components/Posts'
import Menu from '../components/Menu'
import Requests from '../components/Requests'
import '../style/style.css'
import SearchFriend from '../components/SearchFriend'
import Profile from '../components/Profile'
import MyPosts from '../components/MyPosts'
import { useNavigate } from 'react-router-dom'


function Home() {


    const [currentUserName, setCurrentUserName] = useState("")
    const stateContext = useContext(StateContext)
    const contract = stateContext.contract
    const account = stateContext.account
    const userContract = stateContext.userContract
    const [posts, setPosts] = useState([])
    const [select, setSelected] = useState("HOME")
    const [friends, setFriends] = useState([])
    
    const navigate = useNavigate()


    useEffect(() => {
        console.log("Loaded")
        getAllUsers()
    }, [posts])

    useEffect(() => {
        checkUesrLoggedIn()
    }, [])

    const checkUesrLoggedIn = () => {
        let name = localStorage.getItem('name')
        if (name)
            setCurrentUserName(name)
        else navigate("/Login")
    }

    const getFriends = () => {

    }

    const createPost = async (e) => {
        const temp = await contract.methods.getPosts().call();
        const numOfPost = await contract.methods.numberOfPosts().call();
        const number = await contract.methods.createPost(account, "How should i design myself?", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Y6LJX7s5AIQ76VRiU5JtsfS-KIK8aFjMWw&usqp=CAU").send({ from: account })
        console.log(temp, numOfPost, number)
    }

    const getPosts = async (e) => {
        let temp = await contract.methods.getPosts().call();
        setPosts(temp)
        console.log(temp)
    }

    const likePost = async (_id) => {
        await contract.methods.likePost(_id).send({ from: account });
        let temp = await contract.methods.getPosts().call();
        console.log(temp)
    }

    const commentOnPost = async (_id, comment) => {
        await contract.methods.commentPost(_id, comment).send({ from: account })
        console.log("Commented Successfully!")
    }



    const commentForm = (e) => {
        e.preventDefault();
        console.log(e.target.comment.value, e.target.index.value)
        let _id = e.target.index.value
        let comment = e.target.comment.value
        commentOnPost(_id, comment)
        e.target.reset()
    }

    const postsObj = posts.map((item, index) => {
        // replace index with get numberOf post from chain 
        const comments = item.comments.map((item) => {
            console.log(item.comment)
            return <div>
                <p style={{ fontWeight: 'bold' }}>{item.commentorAdd}</p>
                <p >{item.comment}</p>
            </div>
        })
        return <div style={{ width: '50%' }}>
            <h4>{item.owner}</h4>
            <img src={item.imageUrl} height="100px" width="100px" />
            <p>{item.description}</p>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p>Likes : {item.likes.length}</p>
                <p>Comments : {item.comments.length}</p>
            </div>
            {comments}
            <button onClick={() => likePost(index)}>Like This Post</button>

            <form onSubmit={commentForm}>
                <input name="comment" />
                <input name="index" type="hidden" value={index} />
                <button type='submit' >Comment on  This Post</button>
            </form>
        </div >
    }
    )


    const getAllUsers = async () => {
        const temp = await userContract.methods.getAllUsers().call();
        console.log(temp)
    }

    const onMenuChange = (_select) => {
        console.log()
        setSelected(_select)
    }


    return (
        <div >
            <header className="sticky" style={{ top: 0, zIndex: 100, boxShadow: '10px 10px 40px  rgba(0, 55, 88, 0.08)' }} >
                {
                    <NavBar />
                }

            </header>

            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, padding: 20, justifyContent: 'space-between' }}>
                <div className="sticky" style={{ width: '20%', top: '16%', }}>
                    {
                        <Menu onMenuChange={onMenuChange} />
                    }
                </div>
                <div style={{ width: '40%' }}>
                    {
                        select == "HOME" ? <Posts /> : select == "FRIENDS" ? <SearchFriend /> : select == "PROFILE" ? <Profile /> : <MyPosts />


                    }
                </div>

                <div className="sticky" style={{ top: '16%', minWidth: '20%' }}>
                    {
                        <Requests />
                    }
                    {
                        <Friends />
                    }

                </div>
            </div>


        </div>
    );
}

export default Home
