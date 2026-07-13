import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from '../context/AuthContext'
import googleLogo from '../assets/google.jpg'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { signInUser } = UserAuth()
    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        e.preventDefault()
        setError('') 
        try {
            const result = await signInUser({ email, password, })
            
            if (result.success) {
                navigate("/Dashboard")
            } else {
                setError(result.error || "Invalid login credentials")
            }
        } catch (err) {
            setError("An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    const SignInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:5173/Dashboard",
                queryParams: {
                    prompt: 'select_account'
                }
            }
        })
    }

  return (
    <div className='signup_cont'>
        <form onSubmit={handleSignIn}>
            <h2>Sign In!</h2>
            <div className='context_cont'>
                <input onChange={(e) => setEmail(e.target.value)} className='email' placeholder='Email' type="email" required />
                <input onChange={(e) => setPassword(e.target.value)} className='pass' placeholder='Password' type="password" required />
                <div className='signup_btns'>
                    <button type='submit' disabled={loading} className='signup_btn'>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                    <button type='button' className='google_circle_btn' onClick={SignInWithGoogle}>
                        <img 
                            src={googleLogo}
                            alt="Google logo" 
                        />
                    </button>
                </div>
                {error && <p className='error'>{error}</p>}
            </div>
            <p>
                Don't have an account? <Link to="/SignUp">Sign Up!</Link>
            </p>
        </form>
    </div>
  )
}

export default SignIn