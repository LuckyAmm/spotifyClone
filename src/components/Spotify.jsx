import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
import '../index.css'

const Spotify = () => {
    const [{ token }, dispatch] = useStateProvider();
    const [navBackground, setNavBackground] = useState(false);
    const [headerBackground, setHeaderBackground] = useState(false);
    const bodyRef = useRef();
    const bodyScrolled = () => {
      bodyRef.current.scrollTop >= 30
        ? setNavBackground(true)
        : setNavBackground(false);
      bodyRef.current.scrollTop >= 268
        ? setHeaderBackground(true)
        : setHeaderBackground(false);
    };
    useEffect(() => {
        const getUserInfo = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/me", {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            });
            const userInfo = {
              userId: data.id,
              userUrl: data.external_urls.spotify,
              name: data.display_name,
              userImage:data.images && data.images.length > 0 ? data.images[0].url : null,
            };
            dispatch({ type: reducerCases.SET_USER, userInfo });
          };
          getUserInfo();
    }, [dispatch,token]);

    useEffect(() => {
        const getPlaybackState = async () => {
          const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          });
          dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: data.is_playing,
          });
        };
        getPlaybackState();
      }, [dispatch, token]);
    
  return (
    <div className='max-w-[100vw] max-h-screen overflow-hidden grid grid-rows-[85vh,15vh] scroll'>
        <div className="grid grid-cols-[15vw,85vw] h-full w-full bg-[linear-gradient(transparent,rgba(0,0,0,1))] bg-[rgb(32,87,100)]">
                <Sidebar />
            <div className="h-full w-full overflow-auto" ref={bodyRef} onScroll={bodyScrolled}>
                <Navbar navBackground={navBackground}/>
                <div className="bodycontents" navBackground={navBackground}>
                    <Body headerBackground={headerBackground}/>
                </div>
            </div>
        </div>
        <div className="footer">
            <Footer />
        </div>
    </div>
  )
}

export default Spotify