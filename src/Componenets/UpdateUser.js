import React from 'react'
import Avatar from '@mui/material/Avatar';

export default function UpdateUser(props) {
    return (
        <div className="userDiv">
        <div className="userInfo">
        <Avatar alt="Trevor Henderson" style={{ left: "80%"}} src={props.src} style={{left:"0%"}}/>
        <div>
        <p>Name : {props.name}</p>
<p>Email : {props.email}</p>
<p>Date Of Birth : {props.dob}</p>
<p>Gender : {props.gender}</p>
<p>Phone No :{props.phone}</p>
        </div>

        </div>
        </div>
    )
}
