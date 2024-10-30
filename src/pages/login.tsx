import { Box, Button, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  username: string
  email: string
  password: string
  repeatPassword: string
}

const Login: NextPage = () => {
  const router = useRouter()

  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  return (
    <form
      onSubmit={handleSubmit(async data => {
        const { email, password } = data

        //now call signIn Api from next auth:
        const res = await signIn('credentials', {
          redirect: false,
          email,
          password
        })

        if (res?.error) {
          console.log(res.error)

          setError('invalid credentials')
        } else {
          router.push('/')
        }
      })}
    >
      <Box
        display='flex'
        flexDirection='column'
        gap='30px'
        maxWidth={500}
        margin='auto'
        marginTop='100px'
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
          Login
        </Typography>

        {errors?.email && <small style={{ color: 'red' }}>{errors.email.message}</small>}

        <TextField
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

        <Link href={'/forgot-password'} style={{ color: 'red' }}>
          Forgot Your Password?
        </Link>

        <Button type='submit' variant='contained' sx={{ borderRadius: 3 }}>
          Login
        </Button>

        <h1 style={{ color: 'red' }}>{error && error}</h1>
      </Box>
    </form>
  )
}

export default Login
