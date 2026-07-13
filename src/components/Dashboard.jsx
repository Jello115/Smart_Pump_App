import React from 'react'
import NavBar from "../NavBar"
import PumpButton from "../PumpButton"
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { session, signOut } = UserAuth()
  const navigate = useNavigate()

  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      await signOut()
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <h1 className='logged_in_title'>
        Hey, {session?.user?.user_metadata?.display_name || session?.user?.user_metadata?.full_name || "User"}!
      </h1>
      <button onClick={handleSignOut} className='sign_out_btn'>Sign Out</button>
      <PumpButton/>
      <NavBar/>
    </>
  )
}

export default Dashboard