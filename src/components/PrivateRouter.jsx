import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({ children }) => {
    const { session } = UserAuth()
    console.log(session)

    if (session === undefined) {
        return <p>Loading...</p>
    }

  return <>{session ? <>{children}</> : <Navigate to="/SignUp" />}</>
}

export default PrivateRouter