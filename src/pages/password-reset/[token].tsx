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

const PasswordReset: NextPage<ParsedUrlQuery> = ({ token }) => {
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
        <h1>Choose a New Password</h1>
      </div>

      <form
        onSubmit={handleSubmit(async (data, e) => {
          console.log(data)

          //when user submitted form all fields should be empty:

          e?.target.reset()

          const { password } = data
          console.log(token)

          //now post all data to the api route:

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

        <div>
          <label htmlFor='repeat-password'>RepeatPassword</label>
          <br />
          <br />

          <input
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

          {errors?.repeatPassword && <small style={{ color: 'red' }}>{errors.repeatPassword.message}</small>}
        </div>

        <br />
        <br />

        <button type='submit'>Reset Password</button>

        <h1 style={{ color: 'red' }}>{error && error}</h1>
      </form>
    </section>
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
