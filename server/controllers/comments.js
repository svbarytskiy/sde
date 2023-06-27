import Comment from '../models/Comment.js'
import Project from '../models/Project.js'

export const createComment = async (req, res) => {
    try {
        const { projectId, comment } = req.body

        if (!comment)
            return res.json({ message: 'Комментарій не может бути пустим' })

        const newComment = new Comment({ comment })
        await newComment.save()

        try {
            await Project.findByIdAndUpdate(projectId, {
                $push: { comments: newComment._id },
            })
        } catch (error) {
            console.log(error)
        }

        res.json(newComment)
    } catch (error) {
        res.json({ message: 'Шось пішло не так.' })
    }
}

export const getProjectComments = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        const list = await Promise.all(
            project.comments.map((comment) => {
                return Comment.findById(comment)
            }),
        )
        res.json(list)
    } catch (error) {
        res.json({ message: 'Шось пішло не так.' })
    }
}