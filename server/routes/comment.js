import { Router } from 'express'
const router = new Router()
import { checkAuth } from '../utils/checkAuth.js'
import { createComment ,getProjectComments} from '../controllers/comments.js'

// Create Comment
// http://localhost:3002/api/comments/:id
router.post('/:id', checkAuth, createComment)

// Create Comment
// http://localhost:3002/api/comments/:id
router.get('/:id', checkAuth, getProjectComments)

export default router