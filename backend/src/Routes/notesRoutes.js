import express from 'express'
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../Controller/notesController.js'

const router = express.Router()

router.get('/', getAllNotes)
router.post('/create', createNote)
router.get('/:id', getNoteById)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

export default router
