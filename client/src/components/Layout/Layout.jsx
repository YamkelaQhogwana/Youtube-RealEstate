import React, { useEffect, useContext} from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailContext from "../../Context/UserDetailContext"
import { useMutation } from 'react-query'
import { createUser } from '../../utils/api'
import useFavourites from '../../hooks/useFavourites'
import useBookings from '../../hooks/useBookings'

const Layout = () => {
  useFavourites()
  useBookings()
 const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });
  
  useEffect(() => {
    const getTokenAndRegsiter = async () => {

      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email",
        },
      });
      console.log(res);
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
      mutate(res)
    };


    isAuthenticated && getTokenAndRegsiter();
  }, [isAuthenticated]);
  return (
    <>
    <div style={{backgroundColor : "black", overflow : "hidden"}}>
      <Header></Header>
      <Outlet></Outlet>
    </div>
    <Footer></Footer>
    </>
  )
}

export default Layout
