import { Box, Button, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  username: string
  email: string
  password: string
  repeatPassword: string
}

const Register: NextPage = () => {
  const router = useRouter()

  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>()

  return (
    <form
      onSubmit={handleSubmit(async (data, e) => {
        console.log(data)

        //when user submitted form all fields should be empty:

        // e?.target.reset()

        const { username, email, password } = data

        //now post all data to the api route:

        try {
          const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email,
              password,
              username
            })
          })

          const data = await res.json()

          console.log(data.user)

          if (res.ok) {
            router.push('/login')
            setError('')
          } else {
            console.error('Registration failed')
            setError('registeration failed')
          }
        } catch (err) {
          console.log(err)
        }
      })}
    >
      <Box
        display='flex'
        flexDirection='column'
        maxWidth={500}
        margin='auto'
        marginTop={5}
        padding={5}
        borderRadius={5}
        boxShadow={'5px 5px 10px #ccc'}
        sx={{
          ':hover': {
            boxShadow: '10px 10px 20px #ccc'
          }
        }}
      >
        <Typography variant='h4' margin='auto'>
          Registeration
        </Typography>

        {errors?.username && <small style={{ color: 'red' }}>{errors.username.message}</small>}

        <TextField
          margin='normal'
          variant='outlined'
          type='text'
          id='username'
          placeholder='enter your name here'
          {...register('username', {
            required: 'username is required',
            validate: {
              minLength: v => v.length >= 5 || 'The username should have at least 5 characters',
              matchPattern: v => /^[a-zA-Z0-9_]+$/.test(v) || 'Username must contain only letters, numbers and _'
            }
          })}
        />

        {errors?.email && <small style={{ color: 'red' }}>{errors.email.message}</small>}

        <TextField
          margin='normal'
          variant='outlined'
          type='email'
          id='email'
          placeholder='enter your email here'
          {...register('email', {
            required: 'Email is required',

            validate: {
              maxLength: v => v.length <= 50 || 'The email should have at most 50 characters',
              matchPattern: v =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email address must be a valid address'
            }
          })}
        />

        {errors?.password && <small style={{ color: 'red' }}>{errors.password.message}</small>}

        <TextField
          margin='normal'
          variant='outlined'
          type='password'
          id='password'
          placeholder='enter your password here'
          {...register('password', {
            required: 'password is required',
            validate: {
              minLength: v => v.length >= 8 || 'The password should have at least 8 characters'
            }
          })}
        />

        {errors?.repeatPassword && <small style={{ color: 'red' }}>{errors.repeatPassword.message}</small>}

        <TextField
          margin='normal'
          variant='outlined'
          type='password'
          id='repeat-password'
          placeholder='enter your repeat password here'
          {...register('repeatPassword', {
            required: true,
            validate: (val: string) => {
              if (watch('password') != val) {
                return 'Your passwords do no match'
              }
            }
          })}
        />

        <Button type='submit' variant='contained' sx={{ marginTop: 3, borderRadius: 3 }}>
          Registeration
        </Button>

        <h1 style={{ color: 'red' }}>{error && error}</h1>
      </Box>
    </form>
  )
}

export default Register
