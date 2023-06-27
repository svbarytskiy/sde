import { Router } from 'express'
import { createFile, getAllFiles, removeFile } from '../controllers/file.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// Add Files
// http://localhost:3000/api/projects
router.post('/', createFile)

// Get All Files
// http://localhost:3002/api/projects
router.get('/', getAllFiles)

// Remove File
// http://localhost:3002/api/projects/:id
router.post('/:id', checkAuth, removeFile)

export default router