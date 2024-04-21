import React, { useContext } from 'react'
import { LogOutPanel } from './LoginComponent'
import { UserContext } from './Context'
import '../Styling/ProfilePage.css'

const ProfilePage = () => {
    const { user } = useContext(UserContext); 
    console.log(user);
  return (
    <div>
      <h1>{"Welcome " + user.CompanyName}</h1>
      <h2> Your Information </h2>
      <div className="infoWrapper">
        <div>
            <p><b>Navn:</b> {user.FirstName} {user.LastName}</p>
            <p><b>Mail:</b> {user.ContactEmail} </p>
        </div>
      </div>
      <LogOutPanel />
      
    </div>
  )
}

export default ProfilePage
