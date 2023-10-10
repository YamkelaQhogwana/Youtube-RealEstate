import asyncHandler from "express-async-handler"
import {prisma} from "../config/prismaConfig.js"

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");

  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User already registered" });
});

//booking a visit
export const bookVisit = asyncHandler(async(req,res)=>{
    //get the email and dae from the body
    const {email, date} = req.body;
    //get the id of the hotel/place  from the params
    const {id} = req.params;

    try{
        //try to determine if it has already been booked
        //get the bookedVisits from the user table
        const alreadyBooked = await prisma.user.findUnique({
            where : {email},
            select : {bookedVisits : true}
        })

        //if any of the alreadyBooked entries for the user have the same id as the residency they are trying to book deny the request
        if(alreadyBooked.bookedVisits.some((visit)=> visit.id === id)){
            res.status(400).json({message : "This residency is already booked by you"})
        }
        //otherwise update the user table where the email is equal to the email entered
        else{
            await prisma.user.update({
                where : {email : email},
                //the data - push into booked visits column a new entry with the id and date
                data :{
                    bookedVisits : {push : {id, date}}
                }
            })
            res.send("Your visit is booked successfully")
        }

    } catch(err){
        throw new Error(err.message)
    }
})

export const getAllBookings = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    try{
        //from the user table, where the email is equals to the email in the body, get only the bookedVisits
        const bookings = await prisma.user.findUnique({
            where : {email},
            select : {bookedVisits : true}
        })

        res.status(200).send(bookings)

    } catch(error){
        throw new Error(err.message)
    }
})

//cancel a said booking
export const cancelBooking = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const {id} = req.params;

    try{
        //from the user table get the users bookedVisits
        const user = await prisma.user.findUnique({
            where : {email : email},
            select : {bookedVisits : true}
        })
        
        //from the bookedVisits find the index of the property whose id is equal to the id entered
        const index = user.bookedVisits.findIndex((visit)=> visit.id === id)
        if(index === -1){
            res.status(404).json({message : "Booking not found"})
        } else{
            //Delete only one element whose index is equals to the index we searched for
            user.bookedVisits.splice(index, 1);
            await prisma.user.update({
                where : {email},
                data : {
                    //update the booked visits array with the user.bookedVisits array
                    bookedVisits : user.bookedVisits
                }
            })

            res.send("Booking Cancelled")
        }

    } catch(err){
        throw new Error(err.message)
    }
})

//Updating the fav

export const toFav = asyncHandler(async(req,res)=>{
    const {email} = req.body
    //residence id
    const {rid} = req.params

    try {
        //get the users records
        const user = await prisma.user.findUnique({
            where : {email}
        })
        //if the users favRes column includes the residence id
        if(user.favResidenciesID.includes(rid)){
            //update it to not
            const updatedUser = await prisma.user.update({
                where : {email},
                data : {
                    favResidenciesID : {
                        set : user.favResidenciesID.filter((id)=> id !== rid)
                    }
                }
            })

            res.send({message : "removed from favorites", user:updatedUser})

        }
        else{
            //otherwise in the user table, where the users email is equal to the email entered in the body, add the property id 
                const updatedUser = await prisma.user.update({
                where : {email},
                data : {
                    favResidenciesID : {
                        push : rid
                    }
                }
            })
        }

        res.send({message : "updated favorites"})

        
    } catch (err) {
        throw new Error(err.message)
    }
})

//get all the users favorite residencies
export const allFaves = asyncHandler(async(req,res)=>{
    const {email} = req.body;

    try {
        //where the users email is equal to the entered email
        const userFaves = await prisma.user.findUnique({
            where : {email},
            //select their favorite residencies
            select : {favResidenciesID : true}
    
        })

        //return these residencies to the user
        res.status(200).send(userFaves);

    } catch (err){
        throw new Error(err.message);
    }
})





