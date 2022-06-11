import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Admin from "./components/Admin";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Reset from "./components/Reset";
import {auth} from './firebase'

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        setFirebaseUser(user)
      }else {
        setFirebaseUser(null)
      }
    })
  }, [])
  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUser={firebaseUser}/> 
        <Switch>
          <Route path="/login">
            <Login/> 
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/reset">
            <Reset/>
          </Route>
          <Route path="/" exact>
            inicio.... 
          </Route>
        </Switch>

      </div>
    </Router>
  ) : (
    <p>Cargando...</p>
  )
}

export default App;