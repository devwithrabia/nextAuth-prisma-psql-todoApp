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
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <h1>Forgot Password</h1>
      </div>

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
        <div>
          <label htmlFor='email'>Enter your email address to get instructions for resetting your passowrd</label>
          <br />
          <br />

          <input
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

          {errors?.email && <small style={{ color: 'red' }}>{errors.email.message}</small>}
        </div>

        <br />
        <br />

        <button type='submit'>Send OTP</button>

        <h1 style={{ color: 'red' }}>{error && error}</h1>
      </form>
    </section>
  )
}

export default ForgotPassword
