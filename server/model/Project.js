import mongoose from "mongoose";

const { Schema, model, models } = mongoose

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: [
        {
            type: String,
            required: true
        }
    ],
      cateogryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
         },
    
     adminId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Admin"
         },

         liveLink:{
           type:String,
           required:false
         },

         isActive:{
            type:Boolean,
            default:false
         },
    
         type:{
          type:String,
          enum:["Web dev","Mobile App","AI","Graphic Design","Digital Marketing"],
          required:false
         },
        fileAttachment: {
          
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
     multipleAttachments:[ {
          
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
        }],
})

const Project = models.Project || model("Project", projectSchema)

export default Project