import Navbar from '@/components/navbar';
import { Outlet } from 'react-router';

function Container() {
  return (
    <div className='w-full h-full flex flex-col'>
      <Navbar />
      <div className='flex-grow'>
        <Outlet />
      </div>
    </div>
  );
}

export default Container;
