import React,{useState, useEffect} from 'react'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

import { Modal } from 'react-responsive-modal';


import {DeleteNote, UpdateNote} from '../../APICalls/note'
import {isAuthenticated} from '../../APICalls/auth'
const Tile =(props) => {

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")

    useEffect(() => {
        setTitle(props.keep.title)
        setNote(props.keep.note)
    }, [])
    const  onOpenModal = () => {
        setOpen(true)
      };

    const  onCloseModal = () => {
        setOpen(false)
      };

    const handleDelete = () => {
        if(window.sessionStorage.getItem("jwt") === null){
            props.setOpenLogin(true)
        }
       else{
        const {user, token} = isAuthenticated()
        DeleteNote(props.keep._id, user._id, token)
            .then((res) => {
                console.log(res)
                props.setSuccess(true)
            })
            .catch(err => console.log(err))
       }
    } 

    const handleUpdate = () => {
        if(window.sessionStorage.getItem("jwt") === null){
            props.setOpenLogin(true)
        }
       else{
        const {user, token} = isAuthenticated()
        const keep= {
            "title":title,
            "note" : note,
            "user": user._id
        }
        UpdateNote(props.keep._id, user._id, token, keep)
            .then(res => {
                onCloseModal()
                props.setSuccess(true)
            })
            .catch(err => console.log(err))
       }
    }
    return (
        <>
            <div id="tile" className="tile">
                <h4>{props.keep.title}</h4>
                <p>{props.keep.note}</p>
                <span className="s1" onClick={handleDelete}><DeleteForeverTwoToneIcon /></span>
                <span className="s2" onClick={onOpenModal}><EditTwoToneIcon /></span>
            </div>

            <Modal open={open} onClose={onCloseModal} center>
            <div className="note-container-edit">
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
                   
                    <button
                    onClick={handleUpdate}
                     className="save-btn">Update</button>
                </div>
                </div>
            </Modal>
        </>
    )
}
export default Tile
