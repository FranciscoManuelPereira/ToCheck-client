import React from 'react'
import { GoogleLogin } from '@react-oauth/google'

const clientId = "343027757721-ud4anqta8isb3p6h830dhf37qnhifvsm.apps.googleusercontent.com"

function LoginGoogle2() {
   
    const onSuccess = (res) => {
        console.log('LOGIN SUCCESS! Current user: ', res.profileObj)
      }
    
      const onFailure = (res) =>{
        console.log('LOGIN FAILED! res: ', res)
      }
  return (
    <div id='signInButton'>
              <GoogleLogin
              clientId={clientId}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
              />
            </div>
  )
}

export default LoginGoogle2