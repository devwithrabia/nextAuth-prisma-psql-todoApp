import { UpdateUserInfo } from '@/components/UpdateUserInfo'
import { UpdateUserPassword } from '@/components/UpdateUserPassword'
import { NextPage } from 'next'

const EditProfile: NextPage = () => {
  return (
    <>
      <div>
        <h1>Update User Information</h1>
        <UpdateUserInfo />
      </div>

      <div>
        <h1>Update User Password</h1>
        <UpdateUserPassword />
      </div>
    </>
  )
}

export default EditProfile
