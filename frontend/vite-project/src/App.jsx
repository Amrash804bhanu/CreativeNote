import React from 'react'
import './index.css'

import { Route, Routes } from 'react-router'

import HomePage from './pages/HomePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div className='relative h-full w-full'>
      {/* theme working  */}
      <div className='absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div>
      {/* routes of the page path */}
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/create' element={<CreatePage />}></Route>
        <Route path='/notes/:id' element={<NoteDetailPage />}></Route>
      </Routes>
    </div>
  )
}

export default App

{
  /* <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%_#000_60%,#00FF9040_100%)]' /> */
}
