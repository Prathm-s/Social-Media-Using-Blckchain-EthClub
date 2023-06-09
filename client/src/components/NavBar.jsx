import React, { useContext, useState } from 'react'
import { TextField, Button, FormControl, MenuItem, InputLabel, Select } from '@mui/material'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Jdenticon from 'react-jdenticon'
import { StateContext } from '../context/StateContextProvider';
import { useNavigate } from 'react-router-dom';


import { storage } from '../config/config';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';




export const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '70%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function NavBar() {

    const account = useContext(StateContext).account
    const contract = useContext(StateContext).contract


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFileObj()
        setOpen(false)
    };

    const navigate = useNavigate()
    const [percentage, setProgresspercent] = useState(0)
    const [description, setDescription] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [fileObj, setFileObj] = useState()

    const [privacy, setPrivacy] = useState(false)


    const uploadFileToClod = (file) => {
        const storageRef = ref(storage, `files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress =
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
        },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                    createPost(downloadURL)
                    console.log("Store data on blockchain")
                });
            })
    }

    const createPost = async (url) => {
        let name = localStorage.getItem("name")
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        // made post private 
        const res = await contract.methods.createPost(account, name, description, url, timestamp, privacy).send({ from: account })
        handleClose()

    }


    const handleChange = (event) => {
        setPrivacy(event.target.value)
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0]

        if (!file) return
        setFileObj(URL.createObjectURL(file))
        uploadFileToClod(file)
    }

    const updateFileView = (e) => {
        const file = e.target.files[0]
        setFileObj(URL.createObjectURL(file))

    }

    const modalInstance = (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Create Post
            </Typography>
            <form onSubmit={handleSubmitForm} className='fc' style={{ padding: 20 }} >
                <img src={fileObj ? fileObj : "https://ptpkp.gov.pk/wp-content/uploads/visual-portfolio/placeholder-1170x877.png"} style={{ alignSelf: 'center', borderRadius: 20, padding: 10, height: 300 }} />
                <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', marginBottom: 20 }}>
                    <TextField type='file' name="file" onChange={(e) => updateFileView(e)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Privacy</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={privacy}
                            label="Privacy"
                            onChange={handleChange}
                        >
                            <MenuItem value={false}>Public</MenuItem>
                            <MenuItem value={true}>Private</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField placeholder='Description' style={{ flex: 1, marginLeft:20 }} name="description" onChange={(e) => {
                        setDescription(e.target.value);
                    }} />
                    <Button type="submit">Post</Button>
                </div>
            </form >

        </Box>
    </Modal>
    )

    const handleLogout = () => {
        localStorage.removeItem('name')
        navigate("/Login")
    }

    return (

        <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid rgba(0, 55, 88, 0.08)', padding: 20, marginBottom: 20 }}>
            {modalInstance}
            <img style={{ width: 40, height: 40, marginRight: 10 }} src="https://coywolf.pro/wp-content/uploads/2019/01/solid-logo.png" alt="" />
            <h1 style={{ flex: 1 }}>Ethclub</h1>
            {/* <p>Address: <span style={{ fontWeight: 500, marginRight: 10 }}>{account}</span></p> */}
            <Button variant='contained' onClick={handleOpen} disableElevation>Create</Button>
            <div style={{ borderRadius: 100, marginLeft: 20, marginLeft: 20 }}>
                <Jdenticon value={account} size={32} />
            </div>
            <Button onClick={() => { handleLogout() }} >Logout</Button>
            {/* <img height={50} width={50} style={{ borderRadius: 100, marginLeft: 20 }} src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png" alt="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png" /> */}
        </div>
    )
}

export default NavBar
