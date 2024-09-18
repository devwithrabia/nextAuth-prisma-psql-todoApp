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

const ForgotPassword: NextPage = () => {
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

        const { email } = data

        //now post all data to the api route:

        try {
          const res = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email
            })
          })

          if (res.status === 201) {
            router.push('/forgot-password/success')
            setError('')
          }
          if (res.status === 400) {
            setError('this user not registered')
          } else {
            setError('something went wrong')
          }
        } catch (err) {
          console.log(err)
        }
      })}
    >
      <Box
        display='flex'
        flexDirection='column'
        gap='30px'
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
          Forgot Password
        </Typography>

        <label htmlFor='email'>Enter your email address to get instructions for resetting your passowrd</label>

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

        <Button type='submit' variant='contained' sx={{ borderRadius: 3 }}>
          Sent OTP To gmail
        </Button>

        <h1 style={{ color: 'red' }}>{error && error}</h1>
      </Box>
    </form>
  )
}

export default ForgotPassword
