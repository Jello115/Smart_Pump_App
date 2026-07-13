import React, { useState, useEffect } from 'react' // 🛠️ Added useEffect here
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from '../context/AuthContext'
import { supabase } from '../supabaseClient'
import googleLogo from '../assets/google.jpg'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    const { session, signUpNewUser } = UserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (session) {
            navigate("/Dashboard");
        }
    }, [session, navigate]);

    const handleSignUp = async (e) => {
    e.preventDefault()
    setError('') // Clear old errors
    setLoading(true)
    
    try {
        const result = await signUpNewUser({ email, password, username })
        
        if (result.success) {
            navigate("/Dashboard")
        } else {
            const errorMsg = typeof result.error === 'object' && result.error !== null
                ? result.error.message 
                : result.error;
            setError(errorMsg || "Signup failed");
        }
    } catch (err) {
        setError(err.message || "An unexpected error occurred");
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
        <form onSubmit={handleSignUp}>
            <h2>Sign Up!</h2>
            <div className='context_cont'>
                <input 
                    onChange={(e) => setUsername(e.target.value)} 
                    className='username' 
                    placeholder='Username' 
                    type="text" 
                    required 
                />
                <input onChange={(e) => setEmail(e.target.value)} className='email' placeholder='Email' type="email" required/>
                <input onChange={(e) => setPassword(e.target.value)} className='pass' placeholder='Password' type="password" required/>
                <div className='signup_btns'>
                    <button type='submit' disabled={loading} className='signup_btn'>Sign Up</button>
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
                Already have an account? <Link to="/SignIn">Sign In!</Link>
            </p>
        </form>
    </div>
  )
}

export default SignUp