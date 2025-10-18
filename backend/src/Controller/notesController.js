import Note from '../Models/Note.js'
export async function getAllNotes(req, res) {
  //get all notes
  try {
    const notes = await Note.find()
    res.status(200).json(notes)
  } catch (error) {
    console.log('error in gettingall notes control', error)
    res.status(500).json({ message: 'internal server error' })
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) return res.status(404).json({ message: 'note  not found ' })
    res.json(note)
  } catch (error) {
    console.log('error in gettingall notes control', error)
    res.status(500).json({ message: 'internal server error' })
  }
}

export async function createNote(req, res) {
  //wants to create note then we need title and content
  try {
    const { title, content } = req.body
    const note = new Note({ title, content })
    const savedNote = await note.save()
    res.status(201).json(savedNote)
  } catch (error) {
    console.log('error in the createNote controller', error)
    res.status(500).json({ message: 'internal server error' })
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    )
    if (!updatedNote) return res.status(404).json({ message: 'note not found' })
    res.status(200).json(updatedNote)
  } catch (error) {
    console.error('error in updated Note controller', error)
    res.status(500).json({ message: 'internal server error' })
  }
}

export async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id)
    if (!deleteNote) return res.status(404).json({ message: 'note not found' })
    res.status(200).json({ message: 'note deleted successfully' })
  } catch (error) {
    console.error('error in delete note controller', error)
    res.status(500).json({ message: 'internal server error' })
  }
}
