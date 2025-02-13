import { Box, Button, TextField, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  password: string
  repeatPassword: string
}

// interface  ParsedUrlQuery extends IProps

const PasswordReset: NextPage<ParsedUrlQuery> = ({ token }: any) => {
  console.log(token)
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
        e?.target.reset()

        const { password } = data

        try {
          const res = await fetch(`/api/password-reset/${token}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              password
            })
          })

          if (res.status === 400) {
            setError('invalid token request,please try reseting your password again')
          }
        } catch (err) {
          console.log(err)
        }
      })}
    >
      <Box
        display='flex'
        flexDirection='column'
        alignItems='space-around'
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
          Reset Password
        </Typography>

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

        {errors?.repeatPassword && <small style={{ color: 'red' }}>{errors.repeatPassword.message}</small>}

        <TextField
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

        <Button type='submit' variant='contained' sx={{ borderRadius: 3 }}>
          Reset Password
        </Button>

        <h1 style={{ color: 'red' }}>{error && error}</h1>
      </Box>
    </form>
  )
}

export default PasswordReset

export const getServerSideProps: GetServerSideProps = async context => {
  const token = context.query.token

  return {
    props: {
      token
    }
  }
}
