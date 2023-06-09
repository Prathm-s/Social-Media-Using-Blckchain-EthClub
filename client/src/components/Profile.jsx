import { TextField } from '@mui/material'
import React from 'react'

function Profile() {
    return (
        <div className='menuDiv' style={{ marginLeft: 20, marginRight: 20 }}>
            <h4>Profile </h4>

            <div className='f' style={{ marginTop: 20, }}>
                <img style={{ width: '50%', borderRadius: 20 }} src="https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=170667a&w=0&k=20&c=qDvsvfQdmm_cvI_BQH4PdIt8-P-VDAq7ufOobicPBu0=" alt="" />
                <div style={{ paddingLeft: 20, flex: 1  }}>
                    <TextField label="Name" style={{ width:'100%' , marginBottom:20}} />
                    <TextField label="Email" style={{ width:'100%', marginBottom:20 }} />
                    <TextField label="Email" style={{ width:'100%', marginBottom:20 }} />
               
                    <TextField label="Date of birth" style={{ width:'100%' }} />

                   

                </div>
            </div>
        </div>
    )
}

export default Profile
