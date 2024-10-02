import { inputProps } from '@/types'
import { TextField } from '@mui/material'
import { FC } from 'react'

export const Input: FC<inputProps> = ({ type, placeholder, value, onChange }) => {
  return <TextField variant='outlined' type={type} placeholder={placeholder} value={value} onChange={onChange} />
}
