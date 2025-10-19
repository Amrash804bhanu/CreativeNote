import { Link } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline' // or your preferred icon library

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
      <div className='mx-auto max-w-7xl p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-extrabold  font-mono tracking-tight text-white'>
            CreativeNote
          </h1>
          <div className='flex items-center gap-4'>
            <Link to={'/create'} className='btn btn-primary'>
              <PlusIcon className='size-5'></PlusIcon>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
