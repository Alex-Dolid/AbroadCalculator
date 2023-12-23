import React from 'react';
import Typography from '@mui/joy/Typography';

import reactLogo from '../assets/react.svg';
// eslint-disable-next-line import/no-unresolved
import viteLogo from '/electron-vite.animate.svg';

export default function Header() {
  return (
    <>
      <div>
        <span>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </span>
        <span>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </span>
      </div>
      <Typography level="h1" component="h1">
        I love you, my sweet ❤️
      </Typography>
    </>
  );
}
