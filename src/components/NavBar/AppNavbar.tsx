import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import LocalLibrary from '@mui/icons-material/LocalLibrary'
import MenuIcon from '@mui/icons-material/Menu'
import { FC, useState } from 'react'
import { NavLinks } from './NavLinks'
import { signOut, useSession } from 'next-auth/react'

export const AppNavbar: FC = () => {
  //for mui Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  //for getting session

  const { data: session } = useSession()

  return (
    <AppBar position='static' sx={{ marginBottom: '20px' }}>
      <Toolbar sx={{ background: 'darkblue' }}>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <LocalLibrary />
        </IconButton>

        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          TodoApp
        </Typography>

        {/* for large screen: */}

        <Box gap='20px' display='flex' sx={{ display: { xs: 'none', md: 'flex' } }}>
          <NavLinks />
        </Box>

        {/* for small screen */}

        <Box gap='20px' sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            color='inherit'
            size='large'
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>

          {/* this menu comes from mui */}

          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem href='/' component='a'>
              Home
            </MenuItem>

            {!session ? (
              <>
                <MenuItem href='/register' component='a'>
                  Register
                </MenuItem>

                <MenuItem href='/login' component='a'>
                  Login
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem href='/edit-profile' component='a'>
                  Edit Profile
                </MenuItem>

                <MenuItem onClick={() => signOut({ callbackUrl: '/login', redirect: true })}>LogOut</MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
