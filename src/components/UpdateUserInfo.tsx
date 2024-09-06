import { FC, useEffect } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'

interface FormData {
  username: string
}

export const UpdateUserInfo: FC = () => {
  const { data: session, update: sessionUpdate } = useSession()

  // console.log(session)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>()

  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

            sessionUpdate({ username: data.update.username })

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
        <div>
          <label htmlFor='username'>ChnangeUserName</label>
          <br />

          <br />

          <input
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

          {errors?.username && <small style={{ color: 'red' }}>{errors.username.message}</small>}
        </div>

        <br />
        <br />

        <button type='submit'>Update</button>
      </form>
    </section>
  )
}
