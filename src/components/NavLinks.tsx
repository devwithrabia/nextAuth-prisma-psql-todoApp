import { signOut, useSession } from 'next-auth/react'
import { FC } from 'react'
import Link from '@mui/material/Link'

export const NavLinks: FC = () => {
  const { data: session } = useSession()

  return (
    <>
      <Link href='/' color='inherit' variant='h6' underline='hover'>
        Home
      </Link>

      <Link href='/dashboard' color='inherit' variant='h6' underline='hover'>
        Dashboard
      </Link>
      {!session ? (
        <>
          <Link href='/register' color='inherit' variant='h6' underline='hover'>
            Register
          </Link>

          <Link href='/login' color='inherit' variant='h6' underline='hover'>
            Login
          </Link>
        </>
      ) : (
        <>
          <Link href='/edit-profile' color='inherit' variant='h6' underline='hover'>
            Edit Profile
          </Link>

          <Link
            component='button'
            underline='hover'
            color='inherit'
            variant='h6'
            onClick={() => signOut({ callbackUrl: '/login', redirect: true })}
          >
            LogOut
          </Link>
        </>
      )}
    </>
  )
}
