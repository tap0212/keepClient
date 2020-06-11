import React, { useState} from 'react'
import EmojiObjectsTwoToneIcon from '@material-ui/icons/EmojiObjectsTwoTone';
import BackupTwoToneIcon from '@material-ui/icons/BackupTwoTone';
import CloudDoneTwoToneIcon from '@material-ui/icons/CloudDoneTwoTone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom'
import './navbar.scss'
 const Navbar = (props) => {



     const [backup, setBackup] = useState(false)
     const [loading, setLoading] = useState(false)
     
    const handleBackup = () => {
        setLoading(true)
        setInterval(() => {
            setLoading(false)
             setBackup(true) 
        }, 1000);
    }
    const handleClear = () => {
        localStorage.clear()
        window.sessionStorage.clear()
        props.dummy(null)
        props.setOpen(true)
    }
     const userName = window.sessionStorage.getItem("jwt") ? JSON.parse(window.sessionStorage.getItem("jwt")).user.name : null
    return (
        <div className="navbar">
        <Link style={{textDecoration:"none"}} to="/" >
            <span className="logo">
                    <EmojiObjectsTwoToneIcon 
                        style={{fontSize:"35"}}
                    />
                <span className="keep">
                     Keep
                </span>
            </span> 
            
        </Link>
        {
            userName !== null && 
            <ExitToAppIcon onClick={handleClear} className="logout" />
        }
          {  loading
            ?
            <h4>...</h4>
            :
            backup
            ?
            <CloudDoneTwoToneIcon className="backup"   style={{fontSize:"35"}}/>
            :
            <BackupTwoToneIcon className="backup"  onClick={handleBackup} style={{fontSize:"35"}}/>
          }
        </div>
    )
}
export default Navbar