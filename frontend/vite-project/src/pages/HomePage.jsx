import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import RateLimitedUI from '../components/RateLimitedUI.jsx'

import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard.jsx'
import NotesNotFound from '../components/notesnotfound.jsx'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true)
  const [notes, setNotes] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get('/notes')
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log('error fetching notes')
        if (error.response.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error('failed to import the toast function')
        }
      } finally {
        setloading(false)
      }
    }
    fetchNote()
  }, [])
  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && (
          <div className='text-center text-primary py-10'>Loading notes...</div>
        )}

        {/* //if no notes found in the thing then this message was said  */}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 m:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
