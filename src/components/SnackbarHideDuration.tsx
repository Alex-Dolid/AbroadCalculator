import React, { useEffect, useState, useRef } from 'react';
import Snackbar from '@mui/joy/Snackbar';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/joy/Button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

const DURATION = 1300;

export default function SnackbarHideDuration({ isOpen, onClose, message }: Props): JSX.Element {
  const [left, setLeft] = useState<undefined | number>();
  const timer = useRef<undefined | number>();

  const countdown = () => {
    timer.current = setInterval(() => {
      setLeft((prev) => (prev === undefined ? prev : Math.max(0, prev - 100)));
    }, 100);
  };
  const handlePause = () => {
    clearInterval(timer.current);
  };
  const handleResume = () => {
    countdown();
  };

  useEffect(() => {
    if (isOpen) {
      setLeft(DURATION);
      countdown();
    } else {
      clearInterval(timer.current);
    }
  }, [isOpen]);

  return (
    <Snackbar
      color="danger"
      size="lg"
      variant="plain"
      autoHideDuration={1300}
      resumeHideDuration={left}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocus={handlePause}
      onBlur={handleResume}
      onUnmount={() => setLeft(undefined)}
      open={isOpen}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      startDecorator={<InfoOutlinedIcon />}
      endDecorator={
        <Button onClick={onClose} size="sm" variant="plain" color="danger">
          Dismiss
        </Button>
      }
    >
      {message}
    </Snackbar>
  );
}
