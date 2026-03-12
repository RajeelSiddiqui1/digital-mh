import mongoose from "mongoose";

const { Schema, model, models } = mongoose 

const faqsSchema = new Schema({
    question:{
        type:String,
        required:true
    },
    answers:[{
        type:String,
        required:true
    }],
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    }
},
{
    timestamps:true
})

const FAQS = models.FAQS || model("FAQS", faqsSchema)

export default FAQS