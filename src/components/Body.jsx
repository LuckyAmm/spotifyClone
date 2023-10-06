import axios from "axios";
import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import { reducerCases } from "../utils/Constants";
import '../index.css'

export default function Body({ headerBackground }) {
  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);
  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <div headerBackground={headerBackground} className="scroll">
      {selectedPlaylist && (
        <>
          <div className="mx-8 flex items-center gap-8">
            <div className="image">
              <h1 className="text-white text-3xl mb-8 font-bold">Good Morning, John</h1>
              <img src={selectedPlaylist.image} alt="selected playlist" className="h-60 shadow-[rgba(0, 0, 0, 0.25) 0px 25px 50px -12px] rounded-md"/>
            </div>
            <div className="flex flex-col gap-4 text-[#e0dede]">
              <span className="type">PLAYLIST</span>
              <h1 className="text-white text-[4rem]">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 items-center sticky top-15vh py-4 px-12 transition-all duration-300 ease-in-out ${headerBackground ? 'bg-black bg-opacity-80' : 'bg-none'}`}>
              <div className="flex items-center text-[#dddcdc] ml-7">
                <span>#</span>
              </div>
              <div className="flex items-center text-[#dddcdc]">
                <span>TITLE</span>
              </div>
              <div className="flex items-center text-[#dddcdc] ml-32">
                <span>ALBUM</span>
              </div>
              <div className="flex items-center text-[#dddcdc] ml-60">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="mx-8 md:mx-16 flex flex-col mb-20">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="p-2 grid grid-cols-[0.3fr,3.1fr,2fr,0.1fr] hover:bg-black bg-opacity-70"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="flex items-center text-[#dddcdc]">
                        <span>{index + 1}</span>
                      </div>
                      <div className="flex items-center text-[#dddcdc] gap-4">
                        <div className="image">
                          <img src={image} alt="track" width="40px" height="40px"/>
                        </div>
                        <div className="flex flex-col">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-[#dddcdc]">
                        <span>{album}</span>
                      </div>
                      <div className="flex items-center text-[#dddcdc]">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

