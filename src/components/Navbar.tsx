import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'

//here we get session from client;

export const Navbar: FC = () => {
  const { data: session } = useSession()
  return (
    <>
      <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Link href='/'>
            <li>
              <h1>Home</h1>
            </li>
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '50px' }}>
          <Link href='/dashboard'>
            <li>
              <h1>Dashboard</h1>
            </li>
          </Link>

          {!session ? (
            <>
              <Link href='register'>
                <li>
                  <h1>Register</h1>
                </li>
              </Link>

              <Link href='/login'>
                <li>
                  <h1>Login</h1>
                </li>
              </Link>
            </>
          ) : (
            <>
              <h1 style={{ color: 'red' }}>{session.user?.email}</h1>

              <Link href='/edit-profile'>
                <li>
                  <h1>profile</h1>
                </li>
              </Link>

              <li>
                <button
                  onClick={() => signOut({ callbackUrl: '/login', redirect: true })}
                  style={{
                    backgroundColor: 'blue',
                    color: 'wheat',
                    height: '40px',
                    width: '90px',
                    borderRadius: '50%'
                  }}
                >
                  LogOut
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </>
  )
}
