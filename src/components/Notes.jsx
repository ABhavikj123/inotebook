import React, { useContext, useEffect, useRef,useState ,memo} from 'react'
import noteContext from '../context/Notes/NoteContext';
import {useNavigate} from 'react-router-dom'
import NotesItem from './NotesItem';
import AddNote from './AddNote';
const Notes = (props) => {
  const {showalert}=props
  let history=useNavigate()
  const [note,setnote]=useState({id:"",etitle:"",edescription:"",etag:"default"})
  const { notess, getNote,editNote} = useContext(noteContext)
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()
    }else{
      history("/login")
    }
  }, [])
  const ref = useRef(null)
  const updateNote = (note) => {
    ref.current.click();
    setnote({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag})
    
  }
  const refClose=useRef(null)
  const handleclick=()=>{
    editNote(note.id,note.etitle,note.edescription,note.etag); 
    refClose.current.click();
    props.showalert("updated","success")
}
const change=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
}
  return (
    <>
      <AddNote showalert={props.showalert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={change} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={change} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">tag</label>
                  <input type="text" className="form-control" id="etag" name="etag"value={note.etag} onChange={change} minLength={5} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleclick} type="button" className="btn btn-primary" >Update notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h1>Your Notes</h1>
        {notess.length===0 && 'No notes to display'}
        {notess.map((note) => {
          return <NotesItem key={note._id} note ={note} updateNote={updateNote} showalert={showalert} />;
        })}
      </div>
    </>
  )
}

export default memo(Notes)

