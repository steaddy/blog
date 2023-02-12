import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default ({ children }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem('user')) {
            console.log('In the Private')
            navigate('/sign-in')
        }
    }, [])

  return (
    <>
        {children}
    </>
  )
}


