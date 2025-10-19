import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import RateLimitedUI from '../components/RateLimitedUI.jsx'

import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard.jsx'
import NotesNotFound from '../components/NoteNotFound.jsx'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        // Debug axios configuration
        console.log('=== API DEBUG ===')
        console.log('Axios baseURL:', api.defaults.baseURL)
        console.log('Making API call to:', `${api.defaults.baseURL}/notes`)

        const res = await api.get('/notes')
        console.log('API Response:', res.data)
        console.log('Response type:', typeof res.data)
        console.log('Is array:', Array.isArray(res.data))

        // ✅ Handle response safely
        if (Array.isArray(res.data)) {
          setNotes(res.data)
          setIsRateLimited(false)
          toast.success(`Loaded ${res.data.length} notes`)
        } else if (res.data && Array.isArray(res.data.data)) {
          // Handle wrapped response: { data: [...] }
          setNotes(res.data.data)
          setIsRateLimited(false)
        } else {
          console.error('Unexpected response format:', res.data)
          setNotes([])
          toast.error('Unexpected data format from server')
        }
      } catch (error) {
        console.error('API Error details:', error)
        setNotes([]) // ✅ Always ensure notes is an array
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
            {(notes || []).map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
