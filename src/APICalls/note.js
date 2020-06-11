import {API} from '../backend'

export const CreateNote = (note,userId, token) => {
    return fetch(`${API}/create/note/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(note)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const GetNoteById = (noteId,userId, token) => {
    return fetch(`${API}/note/${noteId}`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const GetAllNotes = () => {
    return fetch(`${API}/notes`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const UpdateNote = (noteId, userId, token, note) => {
    return fetch(`${API}/note/${noteId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(note)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };


  export const DeleteNote = (noteId, userId, token) => {
    return fetch(`${API}/note/${noteId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };