import mongoose from "mongoose";


const { Schema, model, models } = mongoose

const socialSchema = new Schema(
    {
        platform: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        url: {
            type: String,
            required: true,
            trim: true
        }
    },
    { _id: false }
);

const teamMemberSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        intro: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["owner", "manager", "teamlead", "employee"],
            required: true
        },

        socials: {
            type: [socialSchema],
            default: []
        },

        postion:{
            type:Number
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

        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin"
        }
    },
    {
        timestamps: true
    }
);

const Team =
    models.Team || model("Team", teamMemberSchema);

export default Team;
