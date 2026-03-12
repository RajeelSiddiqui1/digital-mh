import mongoose from "mongoose";


const { Schema, model, models } = mongoose

const testimonialSchema = new Schema(
    {
        
        Name: {
            type: String,
            required: true,
        },
        comment:{
         type: String,
            required: true,
        },
        stars: {
            type: Number,        
            min: 1,
            max: 5,
            required: true
        },

        profilePic: {
            url: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            size: {
                type: Number,
                required: true,
            },
            publicId: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,

            },
        },
      
    },
    {
        timestamps:true
    }
)

const Testimonail = models.Testimonail || model("Testimonail", testimonialSchema)

export default Testimonail