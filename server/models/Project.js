import mongoose from 'mongoose'

const PorojectSchema = new mongoose.Schema(
    {
        username: { type: String },
        title: { type: String, required: true },
        password: { type: String, required: true },
        views: { type: Number, default: 0 },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    },
    { timestamps: true },
)
export default mongoose.model('Project', PorojectSchema)