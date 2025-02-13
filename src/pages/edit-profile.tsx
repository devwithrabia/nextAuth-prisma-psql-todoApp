import { UpdateUserInfo } from '@/components/EditProfile/UpdateUserInfo'
import { UpdateUserPassword } from '@/components/EditProfile/UpdateUserPassword'
import { NextPage } from 'next'

const EditProfile: NextPage = () => {
  return (
    <>
      <UpdateUserInfo />

      <UpdateUserPassword />
    </>
  )
}

export default EditProfile
