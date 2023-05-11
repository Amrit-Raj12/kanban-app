import React from 'react'
import styles from '../../styles/Header.module.css'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { profileAction } from '../../redux/profileSlice'
import { useRouter } from 'next/router'

const Header = () => {

  const profileData = useSelector((state) => state?.profile?.profile?.user)

  let token = Cookies.get('token')

  const dispatch = useDispatch()

  const router = useRouter()

  const handleLogout = async () => {
    await fetch(
      'https://kanban-server.up.railway.app/users/v1/logoutAll',
      {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      }
  ).then(async (response) => {
    if(response){
      Cookies.remove('token')
      dispatch(profileAction.setProfile({}))
      router.push('/sign-in')
    }
  } ).catch((error) => {
    console.log(error)
  })
  }

  return (
    <div className={styles['header']}>
        <div className={styles['header_menu_logo']}>
          <h4>Next Kanban App</h4>
            {/* <div className={styles['header_menu_circle1']}/>
            <div className={styles['header_menu_circle2']}/>
            <div className={styles['header_menu_circle3']}/> */}
        </div>
        <div className={styles['header_menu_right']}>
            <div>
              {profileData?.name}
            </div>
            <div>
              {token?.length > 0 
              ? 
                <span onClick={handleLogout}>Logout</span>
              :  
                <Link href='/sign-in'>Login</Link>
              }
            </div>
        </div>
        {/* <div className={styles['header_menu_user']}>
            User
        </div> */}
    </div>
  )
}

export default Header