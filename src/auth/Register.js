import React, { useState } from 'react'
import { Container, TextField, Typography } from '@mui/material'
import { auth, firestore } from '../firebase-config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { getCustomErrorMessage } from './CustomErrorMessages'
import './Register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup = async e => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      await updateProfile(user, {
        displayName: displayName,
      })

      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        displayName: displayName,
        role: 'user',
      })

      navigate('/')
    } catch (error) {
      const errorMessage = getCustomErrorMessage(error.code)
      setError(errorMessage)
    }
  }

  return (
    <div className='register-page'>
      <video autoPlay muted loop className='background-video'>
        <source
          src='/Project Assets/video/5121285_School_Classroom_1920x1080_2.mp4'
          type='video/mp4'
        />
        Your browser does not support the video tag.
      </video>
      <Container className='register-container' sx={{ width: '30%' }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup} className='register-form'>
          <TextField
            label='Display Name'
            variant='outlined'
            fullWidth
            margin='normal'
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
          <TextField
            label='Email'
            variant='outlined'
            fullWidth
            margin='normal'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label='Password'
            variant='outlined'
            fullWidth
            margin='normal'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            label='Confirm Password'
            variant='outlined'
            fullWidth
            margin='normal'
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {error && (
            <Typography color='error' variant='body2'>
              {error}
            </Typography>
          )}
          <button type='submit' variant='contained' className='register-button'>
            Sign Up
          </button>
        </form>
        <Link to={"/login"} className="menu-item">Login</Link>
      </Container>
    </div>
  )
}

export default Register
