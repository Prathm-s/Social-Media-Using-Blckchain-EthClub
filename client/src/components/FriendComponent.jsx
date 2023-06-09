import React, { useContext, useEffect, useState } from 'react'
import { Button, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Jdenticon from 'react-jdenticon'
import { StateContext } from '../context/StateContextProvider';


function FriendComponent(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [name, setName] = useState("")
    const stateContext = useContext(StateContext)
    const userContract = stateContext.userContract
    const account = stateContext.account

    useEffect(() => {
        getUserFromAddress()
    }, [])


    const unFriend = async () => {

    }

    const messageFriend = () => {

    }

    const showProfile = () => {

    }
    const getUserFromAddress = async () => {
        let userObj = await userContract.methods.getCurrentUser(props.address).call()
        console.log(userObj)
        if (userObj) {
            setName(userObj.name)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, paddingTop: 10, flex: 1 }}>
            {/* <img height={50} width={50} style={{ borderRadius: 10 }} src="https://play-lh.googleusercontent.com/tmASL-0Jg5bq3RKsneEFVCcAth0M7jFLI7alQQyKSEqrpvLuMfW4mfkw4iSkLCj9_zo" alt="" /> */}
            <Jdenticon value={props.address} size={42} />
            <p style={{ margin: '10px 10px', fontWeight: '500' }}>{name}</p>

            {<IconButton style={{ marginLeft: 'auto' }} id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick} ><MoreHorizIcon /></IconButton>}
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={showProfile}>Profile</MenuItem>
                <MenuItem onClick={messageFriend}>Message</MenuItem>
                <MenuItem onClick={unFriend}>Unfriend</MenuItem>
            </Menu>
        </div>

    )
}

export default FriendComponent
