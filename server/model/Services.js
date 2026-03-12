import mongoose from "mongoose"

const { model, models, Schema } = mongoose

const servicesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
     isActive:{
        type:Boolean,
        default:false
     },

     cateogryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
     },

 adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
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

    videoAttachment: {
      url: { type: String },       // optional
      name: { type: String },      // optional
      type: { type: String },      // optional
      size: { type: Number },      // optional
      publicId: { type: String },  // optional
      createdAt: { type: Date, default: Date.now },
    },
},
{
        timestamps:true
    }
)

const Services = models.Services || model("Services", servicesSchema);
export default Services;
