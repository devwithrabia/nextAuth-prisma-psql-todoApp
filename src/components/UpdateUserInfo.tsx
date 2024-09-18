import { FC, useEffect } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { Box, Button, TextField, Typography } from '@mui/material'

interface FormData {
  username: string
}

export const UpdateUserInfo: FC = () => {
  const { data: session } = useSession()

  // console.log(session)
  const router = useRouter()

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

        e?.target.reset()

        const { username } = data
        // console.log(username)

        //now post all data to the api route:

        try {
          const res = await fetch('/api/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username
            })
          })

          const data = await res.json()

          // console.log(data.update.username)

          // if (res.ok) {
          //   router.push('/login')
          //   setError('')
          // } else {
          //   console.error('Registration failed')
          //   setError('registeration failed')
          // }
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
        <Typography variant='h5' margin='auto'>
          Change Your Name
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

        <Button type='submit' variant='contained' sx={{ marginTop: 3, borderRadius: 3 }}>
          Update
        </Button>
      </Box>
    </form>
  )
}
