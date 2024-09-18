import { UpdateUserInfo } from '@/components/UpdateUserInfo'
import { UpdateUserPassword } from '@/components/UpdateUserPassword'
import { NextPage } from 'next'

const EditProfile: NextPage = () => {
  return (
    <>
      <div style={{ height: '35vh' }}>
        <UpdateUserInfo />
      </div>

      <div style={{ height: '40vh' }}>
        <UpdateUserPassword />
      </div>
    </>
  )
}

export default EditProfile
