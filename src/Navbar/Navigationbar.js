import logo from './favicon.svg';
import React from 'react';
import { MdGroups2, MdGroupAdd, MdSchedule, MdPersonAdd, MdPerson , MdOutlineQrCode } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function NavigationBar(props) {
  return (



    <div className="h-screen w-full bg-white relative flex overflow-hidden">

      <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
        <Link className="text-white" to='/absence'>
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <MdOutlineQrCode />
          </div>
        </Link>
        <Link className="text-white" to='/'>
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <MdGroups2 />
          </div>
        </Link>
        <Link className="text-white" to='/groups/add'>
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <MdGroupAdd />
          </div>
        </Link>

        <Link className="text-white" to='/groups/schedule/add'>
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <MdSchedule />
          </div>
        </Link>

        <Link className="text-white" to='/students'>
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <MdPerson />
          </div>
        </Link>

        <Link className="text-white" to='/students/add'>
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <MdPersonAdd />
          </div>
        </Link>
      </aside>



      <div className="w-full h-full flex flex-col justify-between">
        <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
          <div className="flex flex-shrink-0 items-center space-x-4 text-white">

            <div className="flex flex-col items-end ">
              <div className="text-md font-medium ">EduLink</div>
              <div className="text-sm font-regular">Administrator</div>
            </div>

            <div className="h-10 w-10 rounded-full cursor-pointer bg-black border-2 border-blue-400">
              <img src={logo} alt="logo" className="h-full w-full object-cover rounded-full" />
            </div>
          </div>
        </header>

        <main className="w-full h-full overflow-auto">
          {props.children}
        </main>
      </div>

    </div>


  );
}

