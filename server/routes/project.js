import { Router } from 'express'
import { loginIntoProject, updateProject, removeProject, getMyProjects, getById, getAll, createProject } from '../controllers/projects.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// Register
// http://localhost:3000/api/projects
router.post('/', checkAuth, createProject)

// Get All Projects
// http://localhost:3002/api/projects
router.get('/', getAll)

// Get Project By Id
// http://localhost:3002/api/projects/:id
router.get('/:id', getById)

// Get My Projects
// http://localhost:3002/api/projects/user/me
router.get('/user/me', checkAuth, getMyProjects)

// Remove Project
// http://localhost:3002/api/projects/:id
router.delete('/:id', checkAuth, removeProject)

// Update Project
// http://localhost:3002/api/projects/:id
router.put('/:id', checkAuth, updateProject)

// Log in Project
// http://localhost:3002/api/projects/:id
router.post('/log', checkAuth, loginIntoProject)

export default router