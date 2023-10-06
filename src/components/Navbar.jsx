import React from 'react'
import {FaSearch} from 'react-icons/fa';
import {CgProfile} from 'react-icons/cg';
import { useStateProvider } from '../utils/StateProvider';
import '../index.css'

const Navbar = ({ navBackground }) => {
  const [{userInfo}] = useStateProvider();
  return (
    <div className={`flex items-center justify-between p-12 h-[15vh] sticky top-0 transition duration-300 bg-none ease-in-out ${navBackground ? 'bg-[rgba(0,0,0,0.7)]' : 'bg-transparent'}`}>
      <div className="flex bg-white w-1/3 py-[0.4rem] px-[1rem] rounded-3xl gap-2 items-center">
        <FaSearch />
        <input type="text" placeholder='What do you want to listen to?' id="" className='w-full focus:outline-none h-8'/>
      </div>

      <div className="bg-black py-1 px-2 pr-4 rounded-3xl flex justify-center items-center ">
        <a href="#" className='flex items-center justify-center text-white gap-2 font-bold'>
        <img src={userInfo?.userImage} alt="profile" className='w-8 h-8 rounded-full'/>
        <span> {userInfo?.name}</span>
        </a>
        
      </div>
    </div>
  )
}

export default Navbar