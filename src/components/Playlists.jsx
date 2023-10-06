import axios from "axios";
import React, { useEffect } from "react";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import '../index.css';

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const { items } = response.data;
        const playlists = items.map(({ name, id, images }) => {
          // Assuming the first image in the `images` array is the main image
          const image = images && images.length > 0 ? images[0].url : null;
          return { name, id, image };
        });
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    getPlaylistData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  return (
    <div className="text-[#b3b3b3] h-full overflow-hidden">
      <ul className="list-none flex flex-col gap-[1rem] p-[1rem] h-[55vh] max-h-full overflow-auto scroll">
        <span className="hover:cursor-pointer text-white">+ Create Playlist</span>
        {playlists?.map(({ name, id, image }) => {
          return (
            <li
              key={id}
              onClick={() => changeCurrentPlaylist(id)}
              className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-white flex"
            >
              {image && (
                <img
                  src={image}
                  alt={`${name} playlist`}
                  className="w-10 h-10 mr-2" 
                />
              )}
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
