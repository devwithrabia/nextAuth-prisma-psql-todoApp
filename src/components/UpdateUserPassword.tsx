import { NextPage } from 'next'
import { useRouter } from 'next/router'
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
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        <div>
          <label htmlFor='password'>NewPassword</label>
          <br />
          <br />

          <input
            type='password'
            id='password'
            placeholder='enter your password here'
            {...register('newPassword', {
              required: 'password is required',
              validate: {
                minLength: v => v.length >= 8 || 'The password should have at least 8 characters'
              }
            })}
          />

          {errors?.newPassword && <small style={{ color: 'red' }}>{errors.newPassword.message}</small>}
        </div>

        <br />
        <br />

        <div>
          <label htmlFor='old-password'>oldPassword</label>
          <br />
          <br />

          <input
            type='password'
            id='old-password'
            placeholder='enter your password here'
            {...register('oldPassword', {
              required: 'password is required',
              validate: {
                minLength: v => v.length >= 8 || 'The password should have at least 8 characters'
              }
            })}
          />

          {errors?.oldPassword && <small style={{ color: 'red' }}>{errors.oldPassword.message}</small>}
        </div>

        <br />
        <br />

        <button type='submit'>Update</button>

        <h1 style={{ color: 'red' }}>{error && error}</h1>
      </form>
    </section>
  )
}
