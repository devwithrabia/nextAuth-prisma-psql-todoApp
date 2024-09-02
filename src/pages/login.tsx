import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
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
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <h1>Login</h1>
      </div>

      <form
        onSubmit={handleSubmit(async data => {
          console.log(data)

          const { email, password } = data

          //now call signIn Api from next auth:
          const res = await signIn('credentials', {
            redirect: false,
            email,
            password
          })

          console.log(res)

          if (res?.error) {
            console.log(res.error)

            setError('invalid credentials')
          } else {
            router.push('/')
          }
        })}
      >
        <div>
          <label htmlFor='email'>Email</label>
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

        <div>
          <label htmlFor='password'>Password</label>
          <br />
          <br />

          <input
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

          {errors?.password && <small style={{ color: 'red' }}>{errors.password.message}</small>}
        </div>

        <br />
        <br />

        <button type='submit'>Login</button>

        <h1 style={{ color: 'red' }}>{error && error}</h1>
      </form>
    </section>
  )
}

export default Register
