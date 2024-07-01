import React from 'react'
import { useSelector, useDispatch } from "react-redux";

const UserDash = () => {

  const { user } = useSelector((state) => state.auth);

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h1 className='text-3xl'>Hello, {user && user.username}</h1>
      <p>You have {user && user.actionsAllowed} out of {user && user.numOfActions} actions left for today</p>
    </div>
  )
}

export default UserDash