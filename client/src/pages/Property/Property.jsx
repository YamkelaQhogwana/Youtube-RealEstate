import { getProperty } from "../../utils/api"
import { useMutation, useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { PuffLoader } from "react-spinners"
import "./Property.css"
import {FaShower} from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import {MdMeetingRoom} from "react-icons/md"
import { AiFillHeart } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md"
import Map from "../../components/Map/Map"
import { useState } from "react"
import useAuthCheck from "../../hooks/useAuthCheck"
import { useAuth0 } from "@auth0/auth0-react"
import BookingModal from "../../components/BookingModel/BookingModal"
import UserDetailContext from "../../Context/UserDetailContext"
import { useContext } from "react"
import { Button } from "@mantine/core"
import { toast } from "react-toastify"
import Heart from "../../components/Heart/Heart"
export const Property = () => {
  const {pathname} = useLocation()

  const id = pathname.split("/").slice(-1)[0];//3. To get the id pf the page
  console.log(id);
  const {data, isError, isLoading} = useQuery(["res", id], ()=>getProperty(id))
  
  console.log(data);
  const [modalOpened, setModalOpened] = useState(false);
  const {validateLogin} = useAuthCheck();
  const {user} = useAuth0();
  const {userDetails : {token, bookings}, setUserDetails} = useContext(UserDetailContext);


  const {mutate : cancelBooking, isLoading : cancelling } = useMutation({
    mutationFn : ()=> removeBooking(id, user?.email, token),
    onSuccess : ()=>{
     setUserDetails((prev)=>({
      ...prev,
      bookings : prev.bookings.filter((booking)=>bookings?.id !== id)
     }))
     toast.success("Booking cancelled")
    } 
  })
  if(isLoading){
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader></PuffLoader>
        </div>
      </div>
    )
  }

  if(isError){
    <div className="wrapper">
      <div className="flexCenter paddings">
        Error while fetching the data
      </div>
    </div>
  }
  
  return (
    <div className="wrapper">
       <div className="flexColStart paddings innerWidth property-container">
        {/* like button */}
        <div className="like">
          <Heart id={id}/>
        </div>

        {/* image */}
        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>

              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities.parkings} Parking</span>
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities.bedrooms} Room/s</span>
              </div>
            </div>

            {/* description */}

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}{" "}
                {data?.city}{" "}
                {data?.country}
              </span>
            </div>

           {/* Booking Button */}
           
           {bookings?.map((booking)=>booking.id).includes(id)?(
           <>
           <Button variant="outline" w={"100%"} color="red" >
                <span>Cancel Booking</span>
           </Button>
           <span>
            Your visit is already booked for {bookings.filter((booking)=>booking.id === id)[0].date}
           </span>
           </>
           ) :<button className="button" onClick={()=>{
            validateLogin() && setModalOpened(true)
           }}>
            Book your visit
           </button>
}
           <BookingModal opened={modalOpened} setOpened={setModalOpened}
           email = {user?.email}
           propertyId = {id} >

           </BookingModal>

            
           
          </div>

          {/* right side */}
          <div className="map">
            <Map address={data?.address} city={data?.city} country={data?.country}  >
            </Map>
          </div>
        </div>
      </div>
    </div>
  )
}