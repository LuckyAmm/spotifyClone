import React from "react";
import CurrentTrack from "./CurrentTrack";

import PlayerControls from "./PlayerControls";
import Volume from "./Volume";
export default function Footer() {
  return (
    <div className="h-full w-full bg-[#181818] border-t-2 border-solid border-[#282828] grid grid-cols-[1fr,2fr,1fr] items-center justify-center py-0 px-4">
      <CurrentTrack />
      <PlayerControls />
      <Volume />
    </div>
  );
}
