import React, { useState,useContext} from 'react'
import notecontext from "../context/Notes/NoteContext"
const AddNote=(props)=> {
    const {addNote}=useContext(notecontext);
    const [note,setnote]=useState({title:"",description:"",tag:""})
    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setnote({title:"",description:"",tag:""});
        props.showalert("Added successfully","success")
    }
    const change=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className='container'>
            <h1>Add notes</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={change} minLength={5} required  />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={change} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={change} minLength={5} required  />
                </div>
                
                <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Notes</button>
            </form>
        </div>
    )
}

export default AddNote
