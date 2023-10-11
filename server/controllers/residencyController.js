import asyncHandler from "express-async-handler"
import {prisma} from "../config/prismaConfig.js"

//Function for the user to create a residency
export const createResidency = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      address,
      country,
      city,
      facilities,
      image,
      userEmail,
    } = req.body.data;

    if (!title || !description || !price || !address || !country || !city) {
      return res.status(400).json({ error: "Incomplete data provided" });
    }

    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    return res.status(201).json({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(400).json({ error: "A residency with this address already exists" });
    }
    console.error("Error creating residency:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});



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


