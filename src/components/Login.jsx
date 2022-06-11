import React from 'react'
import {auth, db} from '../firebase'
import {withRouter} from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = React.useState("si@hola.cl")
    const [pass, setPass] = React.useState("123456")
    const [error, setError] = React.useState(null)
    const [esRegistro, setEsRegistro] = React.useState(true)
    const [response, setResponse] = React.useState(null)

    const procesarDatos = e => {
        e.preventDefault()
        if (!email.trim()) {
            // console.log()
            setError("Ingrese Email")
            return
        }
        if (!pass.trim()) {
            // console.log()
            setError("Ingrese Password")
            return
        }
        if (pass.length < 6) {
            // console.log("Ingrese una contraseña de al menos 6 caracterres")
            setError("Ingrese una contraseña de al menos 6 caracteres")
            return
        }
        setError(null)
        if (esRegistro) {
            registrar()
        } else {
            login()
        }
    }

    const login = React.useCallback( async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res)
            if (res.operationType === 'signIn') {
                setResponse("Email y contraseña válidos")
            }
            setEmail("")
            setPass("")
            setError(null)
            props.history.push('/admin')
            
        } catch (error) {
            console.log(error)
            if (error.code === 'auth/user-not-found') {
                setError("Usuario no encontrado")
            }
            if (error.code === 'auth/invalid-email') {
                setError('El formato de Email es incorrecto')
            }
            if (error.code === 'auth/wrong-password') {
                setError('Contraseña incorrecta')
            }
        }
    }, [email, pass, props.history])

    const registrar = React.useCallback( async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })

            await db.collection(res.user.uid).add({
                name: 'Tarea de Ejemplo',
                fecha: Date.now()
            })

            setEmail("")
            setPass("")
            setError(null)
            props.history.push('/admin')

            console.log(res)
            if (res.operationType === 'signIn') {
                setResponse("Email registrado exitosamente")
            }
        } catch (error) {
            console.log(error)
            if (error.code === 'auth/invalid-email') {
                setError('El formato de Email es incorrecto')
            }
            if (error.code === 'auth/email-already-in-use') {
                setError('El mail ya está registrado')
            }

        }


    }, [email, pass, props.history])

  return (
    <div className='mt-5'>
        {
            esRegistro 
            ?
            <h3 className="text-center">Registro de Usuarios</h3> 
            :
            <h3 className="text-center">Login de Acceso</h3>
        }
        <hr />
        <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <form onSubmit={procesarDatos}>
                    {
                        error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )

                    }
                    {
                        response && (
                            <div className="alert alert-info">
                                {response}
                            </div>
                        )
                    }
                    <input 
                        type="email" 
                        className="form-control mt-2"
                        placeholder='Ingese un email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />

                    <input 
                        type="password" 
                        className="form-control mt-2"
                        placeholder='Ingrese un password'
                        onChange={e => setPass(e.target.value)}
                        value={pass}
                    />

                    <button 
                    className="btn btn-dark btn-lg col-12 mt-2"
                    type='submit'
                    >
                        {
                            esRegistro ? 'Registrarse': 'Acceder'
                        }
                    </button>
                    <button 
                        className="btn btn-success btn-sm col-12 mt-2"
                        onClick={() => setEsRegistro (!esRegistro)}
                        type='button'
                        >
                            {
                                esRegistro ? '¿Ya estás registrado?': '¿No tienes cuenta?'
                            }
                    </button>
                    {
                        !esRegistro ? (
                            <button 
                                className="btn btn-info btn-sm col-12 mt-2"
                                onClick={() => props.history.push("/reset")}
                                type='button'
                            >
                            Recuperar Contraseña
                            </button>
                        ) : null
                    }
                </form>
            </div>
        </div>
    </div>
  )
}

export default withRouter(Login)