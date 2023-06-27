import mongoose from 'mongoose'

const FileSchema = new mongoose.Schema(
    {
        fileName: { type: String, required: true },
        text: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        fileUrl: { type: String, default: '' },
    },
    { timestamps: true },
)
export default mongoose.model('File', FileSchema)