import React, { useEffect, useState } from 'react'
import '../style/style.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PagesOutlinedIcon from '@mui/icons-material/PagesOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { Button } from '@mui/material';
function Menu(props) {

    const [select, setSelected] = useState("HOME")
    useEffect(() => {
        props.onMenuChange(select)
    }, [select])

    const onMenuChange = (string) => {
        setSelected(string)
        props.onMenuChange(string)
    }
    return (
            <div className='menuDiv' >
                <ul className='menuItems'>
                    <li onClick={() => onMenuChange("HOME")} style={{ color: select == "HOME" ? 'cornflowerblue' : 'black', borderLeft: select == "HOME" ? ' 2px solid cornflowerblue' : '' }}> <HomeOutlinedIcon />  <p style={{ marginLeft: 10 }}>Feed</p></li>
                    <li onClick={() => onMenuChange("FRIENDS")} style={{ color: select == "FRIENDS" ? 'cornflowerblue' : 'black', borderLeft: select == "FRIENDS" ? ' 2px solid cornflowerblue' : '' }} > <Diversity3OutlinedIcon />  <p style={{ marginLeft: 10 }}>Peoples</p></li>
                    <li onClick={() => onMenuChange("POSTS")} style={{ color: select == "POSTS" ? 'cornflowerblue' : 'black', borderLeft: select == "POSTS" ? ' 2px solid cornflowerblue' : '' }} > <PagesOutlinedIcon />  <p style={{ marginLeft: 10 }}>Posts</p></li>
                    {/* <li onClick={() => onMenuChange("PROFILE")} style={{ color: select == "PROFILE" ? 'cornflowerblue' : 'black', borderLeft: select == "PROFILE" ? ' 2px solid cornflowerblue' : '' }}  > <ManageAccountsOutlinedIcon />  <p style={{ marginLeft: 10 }}>Profile</p></li> */}
                </ul>

            </div>
    )
}

export default Menu
