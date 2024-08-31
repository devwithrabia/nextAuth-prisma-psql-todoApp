import { NextPage } from 'next'
import { useForm } from 'react-hook-form'

interface FormData {
  username: string
  email: string
  password: string
  repeatPassword: string
}

const Register: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>()

  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <h1>Register</h1>
      </div>

      <form
        onSubmit={handleSubmit(async (data, e) => {
          console.log(data)

          //when user submitted form all fields should be empty:

          e?.target.reset()

          const { username, email, password } = data

          //now post all data to the api route:

          try {
            const res = await fetch('/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email,
                password,
                username
              })
            })

            const data = await res.json()

            console.log(data.user)
          } catch (err) {
            console.log(err)
          }
        })}
      >
        <div>
          <label htmlFor='username'>UserName</label>
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

        <button type='submit'>Registeration</button>
      </form>
    </section>
  )
}

export default Register
