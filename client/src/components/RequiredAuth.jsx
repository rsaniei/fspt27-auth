import React, {useContext} from 'react'
import AuthContext from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function RequiredAuth({children}) {
  const auth= useContext(AuthContext)

  if(!auth.isLoggedIn){
    return <div><Navigate to="/login"/></div>
  }
  return <div>{children}</div>

}
