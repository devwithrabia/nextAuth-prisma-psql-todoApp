import { Box, Button, TextField, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  newPassword: string
  oldPassword: string
}

export const UpdateUserPassword: FC = () => {
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

        e?.target.reset()

        const { newPassword, oldPassword } = data
        console.log(newPassword, oldPassword)

        //now post all data to the api route:

        try {
          const res = await fetch('/api/update-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              newPassword,
              oldPassword
            })
          })

          if (res.status === 400) {
            setError('password does not match')
          } else {
            setError('user password changed')
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
        <Typography variant='h5' margin='auto'>
          Change Your Password
        </Typography>

        {errors?.newPassword && <small style={{ color: 'red' }}>{errors.newPassword.message}</small>}

        <TextField
          margin='normal'
          variant='outlined'
          id='password'
          type='password'
          placeholder='enter your New password here'
          {...register('newPassword', {
            required: 'password is required',
            validate: {
              minLength: v => v.length >= 8 || 'The password should have at least 8 characters'
            }
          })}
        />

        {errors?.oldPassword && <small style={{ color: 'red' }}>{errors.oldPassword.message}</small>}

        <TextField
          margin='normal'
          variant='outlined'
          id='old-password'
          type='password'
          placeholder='enter your Old password here'
          {...register('oldPassword', {
            required: 'password is required',
            validate: {
              minLength: v => v.length >= 8 || 'The password should have at least 8 characters'
            }
          })}
        />

        <Button type='submit' variant='contained' sx={{ marginTop: 3, borderRadius: 3 }}>
          Update
        </Button>

        <h1 style={{ color: 'red' }}>{error && error}</h1>
      </Box>
    </form>
  )
}
