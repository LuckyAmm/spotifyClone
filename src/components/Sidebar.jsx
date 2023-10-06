import React from "react";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import Playlists from "./Playlists";
export default function Sidebar() {
  return (
    <div className="bg-black text-[#b3b3b3] flex flex-col h-full w-full">
      <div className="flex flex-col">
        <div className="text-center m-[1rem 0]">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
            style={{maxInlineSize: "80%",
              blockSize: "auto"
            }}
            className="p-5"
          />
        </div>
        <ul className="list-none flex flex-col gap-[1rem] p-[1rem]">
          <li className="flex gap-[1rem] cursor-pointer transition-colors duration-300 ease-in-out hover:text-white">
            <MdHomeFilled size={25}/>
            <span>Home</span>
          </li>
          <li className="flex gap-[1rem] cursor-pointer transition-colors duration-300 ease-in-out hover:text-white">
            <MdSearch size={25}/>
            <span>Search</span>
          </li>
          <li className="flex gap-[1rem] cursor-pointer transition-colors duration-300 ease-in-out hover:text-white">
            <IoLibrary size={25}/>
            <span>Your Library</span>
          </li>
        </ul>
      </div>
      <Playlists />
    </div>
  );
}

