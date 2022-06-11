import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Navbar = (props) => {
    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                props.history.push("/login")
            })
    }
  return (
    <div className='navbar navbar-dark bg-dark'>
        <Link className='navbar-brand mx-2' to='/'>AUTH</Link>
        <div>
            <div className="d-flex">
                <NavLink className='btn btn-dark me-2' to='/' exact>
                    Inicio
                </NavLink>

                {
                    props.firebaseUser !== null ? (
                    <NavLink className='btn btn-dark me-2' to='/admin' exact>
                        Admin
                    </NavLink>

                    ) : null
                }


                {
                    props.firebaseUser !== null ? (
                        <button 
                        className="btn btn-dark"
                        onClick={() => cerrarSesion()}
                        >Cerrar Sesión</button>
                    ) : (
                    <NavLink className='btn btn-dark me-2' to='/login' exact>
                        Login
                    </NavLink>
                    )
                }


            </div>
        </div>

    </div>
  )
}

export default withRouter(Navbar)