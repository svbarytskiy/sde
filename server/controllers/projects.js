import User from '../models/User.js'
import Project from '../models/Project.js'
import bcrypt from 'bcryptjs'

//Create Project
export const createProject = async (req, res) => {
    try {
        const { title, password } = req.body
        const user = await User.findById(req.userId)
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newProject = new Project({
            username: user.username,
            title,
            password: hash,
            author: req.userId,
            users: [req.userId],
        })
        await newProject.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { projects: newProject },
        })
        res.json(newProject)
    }
    catch (error) {
        res.json({ message: 'Может что-то пошло не так.' })
    }
}


// Get All Projects
export const getAll = async (req, res) => {
    try {
        const projects = await Project.find().sort('-createdAt')
        if (!projects) {
            return res.json({ message: 'Проектов нет' })
        }
        res.json(projects)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так в контролерах.' })
    }
}


// Get Project By Id
export const getById = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        })
        console.log(req.params.id)
        const TheseUsers = await User.find({
            _id: { $in: project.users },
        })
        console.log(TheseUsers)
        res.json({ project, TheseUsers })
    } catch (error) {
        res.json({ message: 'Шось пішло не так.' })
    }
}

// Get All my Projects
export const getMyProjects = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.projects.map((project) => {
                return Project.findById(project._id)
            }),
        )

        res.json(list)
    } catch (error) {
        res.json({ message: 'Шось пішло не так.' })
    }
}

// Remove Project
export const removeProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        if (!project) return res.json({ message: 'Такого проекту не існує' })

        await User.findByIdAndUpdate(req.userId, {
            $pull: { projects: req.params.id },
        })

        res.json({ message: 'Проект був видалений.' })
    } catch (error) {
        res.json({ message: 'Шось пішло не так.' })
    }
}

// Update Project
export const updateProject = async (req, res) => {
    try {
        const { title, password, id } = req.body
        const project = await Project.findById(id)
        project.title = title
        project.password = password

        await project.save()

        res.json(project)
    } catch (error) {
        res.json({ message: 'Шось пішло не так.' })
    }
}

//Log into Project
export const loginIntoProject = async (req, res) => {
    try {
        const { IdPrj, password } = req.body
        const project = await Project.findById(IdPrj)
        const prjLog = IdPrj;
        if (!project) {
            return res.json({
                message: 'Такого проекта не існує.',
                prjLog: "NOTLOGGED"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, project.password)
        if (!isPasswordCorrect) {
            return res.json({
                message: 'Неправильний пароль.',
                prjLog: "NOTLOGGED"
            })
        }
        const prj = await Project.findByIdAndUpdate(
            IdPrj,
            { $addToSet: { users: req.userId } },
            { new: true }
        );

        if (!prj.users.includes(req.userId)) {
            prj.users.push(req.userId);
        }
        const userT = await User.findByIdAndUpdate(
            req.userId,
            { $addToSet: { projects: prj } },
            { new: true }
        );

        if (!userT.projects.includes(req.userId)) {
            userT.projects.push(req.userId);
        }

        res.json({
            project,
            prjLog,
            message: 'Ви зайшли в проект.',
        })
    } catch (error) {
        res.json({ message: 'Помилка при авторизации.', prjLog: "NOTLOGGED" })
    }
}