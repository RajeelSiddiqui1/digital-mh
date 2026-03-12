import mongoose from "mongoose"

const { model, models, Schema } = mongoose

const categorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: false
    },
   
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
},
{
        timestamps:true
    }
)

const Category = models.Category || model("Category", categorySchema);

export default Category;