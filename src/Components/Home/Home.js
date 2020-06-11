import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/navbar'
import EmojiObjectsTwoToneIcon from '@material-ui/icons/EmojiObjectsTwoTone';
import Skeleton from 'react-loading-skeleton';
import '../../../node_modules/react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {ReactComponent as Avatar} from '../../Utils/undraw_male_avatar_323b.svg'
import {Signup, Login, authenticate, isAuthenticated} from '../../APICalls/auth'
import {CreateNote, GetAllNotes} from '../../APICalls/note'
import { css } from "@emotion/core";
import {Alert} from '@material-ui/lab'
import {PropagateLoader} from "react-spinners";
import Tile from './Tile'
import './home.scss'
const Home = () => {
    const override = css`
    display: block;
    margin-left:50%;
   `;
    
    const [existingUser, setExistingUser] = useState("")
    const [newName, setNewName] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [fetching, setFetching] = useState(false)
    const [keeps, setKeep] = useState([])
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")
    const [name, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [noteError, setNoteError] = useState("")
    const [loading, setLoading] = useState(false)
    const [loadingNote, setLoadingNote] = useState(false)
    const [success, setSuccess] = useState(false)
    const [alreadyUser, setAlreadyUer] = useState(false)
    const [logout, setLogout] = useState("")
    useEffect(() => {
        setOpen(true)
        if(localStorage.getItem("userName") !== null){
            setExistingUser(JSON.parse(localStorage.getItem("userName")))
        }
    }, [])

    useEffect(() => {
            setFetching(true)
        const {user, token} = isAuthenticated()
        GetAllNotes()
        .then(res => {
            setKeep(res.filter(note => note.user === user._id))
            setFetching(false)
            setSuccess(false)
        })
        .catch(err => {
            console.log(err)
            setFetching(false)
        })
        
    }, [success])

     
     const  onCloseModal = () => {
        setOpen(false)
      };
      const handleSave = (e) => {
        e.preventDefault()
        const {user, token} = isAuthenticated()
        if(window.sessionStorage.getItem("jwt") === null){
            setOpen(true)
        }
       else{
        setLoadingNote(true)

        const keep = {
            "title":title,
            "note" : note,
            "user": user._id
        }
        
        CreateNote(keep, user._id,token , keep)
            .then((res) => {
                    console.log("success")
                    setLoadingNote(false)
                    setTitle("")
                    setNote("")
                    setSuccess(true)
            })
            .catch(err => {
                console.log(err)
                setLoadingNote(false)
            })
       }
      }

      const handleSignup = (e) => {
        e.preventDefault()
        setLoading(true)
        Signup({name, password})
        .then(data => {
            if(data.error){
                setError(data.error)
                setLoading(false)
            }
            else{
                console.log("Signup success")
                localStorage.setItem("userName", JSON.stringify(data.user.name))
                localStorage.setItem("existingUserId",JSON.stringify(data.user._id))
                console.log(data)
                authenticate(data, () => {
                    setLoading(false)
                    setOpen(false)
                })
               
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
      }

      const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        const name = existingUser
        Login({name, password})
        .then(data => {
            if(data.error){
                setError(data.error)
                setLoading(false)
            }
            else{
                console.log("Login success")
                authenticate(data, () => {
                    setLoading(false)
                    setOpen(false)
                    setSuccess(true)
                })
               
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
      }
      const handleNewLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        const user = {
            "name": newName,
            "password": newPassword
        }
        Login(user)
        .then(data => {
            if(data.error){
                setError(data.error)
                setLoading(false)
            }
            else{
                console.log("Login success")
                localStorage.setItem("userName", JSON.stringify(data.user.name))
                localStorage.setItem("existingUserId",JSON.stringify(data.user._id))
                authenticate(data, () => {
                    setLoading(false)
                    setOpen(false)
                    setSuccess(true)
                })
               
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
        
      }

      const Flash = () => {
        if(error){
            return  <Alert severity="error"><span className="flash">{error}</span></Alert>
        }
        if(loading === true){
            return <PropagateLoader
            css={override}
            size={12}
            color={"#6C63FE"}
            loading={loading}
          />
        }
    }
    const FlashError = () => {
        if(noteError){
            return  <Alert severity="error"><span className="flash">{noteError}</span></Alert>
        }
        if(loadingNote === true){
            return <PropagateLoader
            css={override}
            size={12}
            color={"#6C63FE"}
            loading={loadingNote}
          />
        }
    }
    return (
        <div>
            <Navbar setOpen={setOpen} dummy={setFetching}/>
            <div className="note-container">
                <div className="note-box">
                    <div>
                        <input 
                        type="text"
                        name="title"
                        className="title"
                        placeholder="Title"
                        autoFocus
                        maxLength="20"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                    <textarea 
                    name="note" 
                    id="mote" 
                    cols="30" 
                    rows="5"
                    maxLength="300"
                    className="note"
                    value={note}
                    placeholder="Take a note"
                    onChange={(e) => setNote(e.target.value)}
                    >
                    </textarea>
                    </div>
                    {FlashError()}
                    <button
                    onClick={handleSave}
                     className="save-btn">Save</button>
                </div>
                {
                    (keeps.length===0)
                    ?
                    <div className="no-notes">
                       <EmojiObjectsTwoToneIcon style={{fontSize:150}} className="no-notes-icon"/>
                       <p>Notes you add appear here</p>
                       <p>Keep is a simple and secure Notepad</p>
                       <p>No need to login multiple times</p>
                       <p>All you need is just your PIN for any activity</p>
                    </div>
                    :
                    <div>
                       {
                           fetching 
                       ?
                            <div className="keeps">
                                <Skeleton count={5} />
                            </div>
                       :
                           keeps.map((keep, index) => {
                               return <Tile setOpenLogin={setOpen} setSuccess={setSuccess}  keep={keep} key={index} />
                           })
                       }
                    </div>
                }
            </div>
            <Modal open={open} onClose={onCloseModal} center>
                 <div className="user">
                    <Avatar className="avatar" />
                    {Flash()}
                  {
                      alreadyUser
                      ? 
                      <>
                      <h3>Login</h3>
                   <div>
                        <input 
                        type="text"
                        placeholder="Username"
                        name="username"
                        maxlength="10"
                        onChange={(e) => setNewName(e.target.value)}
                        />
                   </div>
                    <div>
                        <input 
                        type="password"
                        name="password"
                        maxlength="4"
                        placeholder="4 Digit Pin"
                        onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={handleNewLogin}>Login</button>
                      </>
                      :
                      localStorage.getItem("userName") !== null 
                      ?
                      <>
                      <h3>Enter Pin</h3>
                    <div>
                        <input 
                        type="password"
                        name="password"
                        maxLength="4"
                        placeholder="Your security pin"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={handleLogin}>Submit</button>

                      </>
                      :
                      <>
                      <h3>Clutter free Signup</h3>
                   <div>
                        <input 
                        type="text"
                        placeholder="Username"
                        name="username"
                        maxlength="10"
                        onChange={(e) => setUsername(e.target.value)}
                        />
                   </div>
                    <div>
                        <input 
                        type="password"
                        name="password"
                        maxlength="4"
                        placeholder="4 Digit Pin"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p onClick={() => setAlreadyUer(true)}>Existing  user?  <span>Login</span></p>
                    <button onClick={handleSignup}>Signup</button>
                      </>
                  }
                 </div>
            </Modal>
        </div>
    )
}
export default  Home