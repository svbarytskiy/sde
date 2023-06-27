import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        projects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Project',
            },
        ],
    },
    { timestamps: true },
)

export default mongoose.model('User', UserSchema)