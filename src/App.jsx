import About from './components/About'
import Home from './components/Home'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import NoteState from './context/Notes/NoteState'
import Alert from './components/Alert'
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from 'react'
function App() {
  const [alert,setalert]=useState(null);
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }
  // window.onbeforeunload = function () {
  //   localStorage.clear();
  // };
  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert={alert}/>
      
      <Routes>
      <Route exact path='/about'element={<About/>}/>
      <Route exact path='/'element={<Home showalert={showalert}/>}/>
      <Route exact path='/login' element={<Login showalert={showalert}/>}/>
      <Route exact path='/signup' element={<Signup showalert={showalert}/>}/>
      </Routes>
      
      </Router>
      </NoteState>
    </>
  )
}

export default App
