import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState=(props)=>{
  const port = import.meta.env.PORT
  const host=`http://localhost:${port}`
  const [notess,setNotes]=useState([])
  const getNote= async()=>{
    const response=await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
    });
    const json= await response.json()
    setNotes((json))
  }
  const addNote= async(title,description,tag)=>{
    const response=await fetch(`${host}/api/notes/addnotes`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token'),
      },
      body:JSON.stringify({title,description,tag})
    });
    const note=await response.json()
      setNotes(notess.concat(note))
  }
  const deleteNote=async(id)=>{
    const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token'),
      },
    });
    const json=await response.json();
    const notes1=notess.filter((note)=>{return note._id !== id})
    setNotes(notes1)
  }
  const editNote=async(id,title,description,tag)=>{
    const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });
    const newNotes=[...notess];
    const index = newNotes.findIndex((note) => note._id === id);
    if (index!== -1) {
      newNotes[index] = {...newNotes[index], title, description, tag };
      setNotes(newNotes);
    }
  }
   return(
    <noteContext.Provider value={{notess,addNote,deleteNote,editNote,getNote}}>
        {props.children}
    </noteContext.Provider>
   )
}
export default NoteState