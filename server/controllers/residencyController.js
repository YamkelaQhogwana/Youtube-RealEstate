import asyncHandler from "express-async-handler"
import {prisma} from "../config/prismaConfig.js"

//Function for the user to create a residency
export const createResidency = asyncHandler(async(req,res)=>{
    //get the details from the request body it will be entered inside an object called data
    const {title, description, price, address, country, city, facilities, image, userEmail} = req.body.data;
    console.log(req.body.data)
    
    //operations to the database are carried out inside a try catch block
    try{
        //create a record with the said data
        const residency = await prisma.residency.create({
            data : {
                title,
                description,
                price,
                address,
                country,
                city,
                facilities,
                image,
                owner: { connect: { email: userEmail } },
            }
        })

        res.send({
            message : "residency created successfully",
            residency
        })

    } catch(err){
        //duplicate entries
        if(err.code === "P2002"){
            throw new Error("A residency with this address already exists");
        }
        throw new Error(err.message)
    }

})

export const getAllResidencies = asyncHandler(async(req,res)=>{
    //find all the residencies in the residency table
    const residencies = await prisma.residency.findMany({
        orderBy : {
            //order by date created
            createdAt : "desc"
        }
    })

    res.send(residencies);
})

export const getResidency = asyncHandler(async(req,res)=>{
    //get the id of the residency wanted from the params(url)
    const {id} = req.params;

    try {
        //find the residency where the id is equal to :/id from the residency table
       const residency = await prisma.residency.findUnique({
        where : {id},
       })
       res.send(residency)
    } catch(err){
        throw new Error(err.message)
    }
})


