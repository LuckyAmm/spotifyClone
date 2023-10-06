import React, { useState } from 'react';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false); 
  const clientId = '8abd809dfabd40bd819040ba4756cbf7';
  const redirectUrl = 'https://poetic-donut-b1304e.netlify.app/';
  const apiUrl = 'https://accounts.spotify.com/authorize';
  const scope = [
    'user-read-private',
    'user-read-email',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-top-read',
  ];

  // Function to handle login
  const handleLogin = () => {
    setLoggedIn(true);
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      ' '
    )}&response_type=token&show_dialog=true`;
  };

  // Function to handle logout
  const handleLogout = () => {
    setLoggedIn(false);
    window.location.href = 'https://www.spotify.com/logout/';
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-[#1db954] gap-10'>
      <img
        src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black-768x230.png'
        alt='spotify'
        className='h-[20vh]'
      />
      {loggedIn ? (
        <button
          className='p-3 px-14 rounded-3xl border-none bg-slate-950 text-[#49f585] text-md hover:cursor-pointer hover:bg-slate-900'
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className='p-3 px-14 rounded-3xl border-none bg-slate-950 text-[#49f585] text-md hover:cursor-pointer hover:bg-slate-900'
          onClick={handleLogin}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default Login;
