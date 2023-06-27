import File from '../models/File.js'
import User from '../models/User.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import Project from '../models/Project.js'
import fs from 'fs'

export const createFile = async (req, res) => {
    try {
        const { fileName, text, prjId, author } = req.body
        let hfileName = Date.now().toString() + req.files.file.name
        const __dirname = dirname(fileURLToPath(import.meta.url))
        req.files.file.mv(path.join(__dirname, '..', 'uploads', hfileName))

        const user = await User.findById(author)
        const newFile = new File({
            fileName,
            text,
            author: user,
            fileUrl: hfileName,
        })

        await newFile.save()
        await Project.findByIdAndUpdate(prjId, {
            $push: { files: newFile },
        })

        return res.json(newFile)
    }
    catch (error) {
        res.json({ message: 'Шось пішло не так.' })
    }
}
export const getAllFiles = async (req, res) => {
    try {
        const { prjId } = req.query
        const prj = await Project.findById(prjId)
        const files = await Promise.all(
            prj.files.map((file) => {
                return File.findById(file._id)
            }),
        )
        res.json(files)
    }
    catch (error) {
        res.json({ message: 'Шось пішло не так.' })
    }
}

export const getFileById = async (req, res) => {
    try {
        res.json(newProject)
    }
    catch (error) {
        res.json({ message: 'Шось пішло не так.' })
    }
}
export const removeFile = async (req, res) => {
    try {
        const { prgId, fileId } = req.body
        const file = await File.findById(fileId)
        if (!file) return res.json({ message: 'Такого файлу не існує' })
        const hfileName = file.fileUrl;
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const filePath = path.join(__dirname, '..', 'uploads', hfileName);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Файл ${hfileName} успешно видалений`);
        });
        await File.findByIdAndDelete(fileId)
        res.json({ message: 'Файл був видалений.' })
        await Project.findByIdAndUpdate(prgId, {
            $pull: { files: fileId },
        })
    }
    catch (error) {
        res.json({ message: 'Шось пішло не так.' })
    }
}