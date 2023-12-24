import React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (value: boolean) => void;
};

export default function AuthModalDialog({ isOpen, onCancel, onSubmit }: Props): JSX.Element {
  return (
    <Modal open={isOpen}>
      <ModalDialog>
        <DialogTitle>Do you want me?</DialogTitle>
        <DialogContent>Are you my sugar baby? 😉</DialogContent>
        <Stack spacing={2}>
          <Button onClick={onCancel}>No 😔</Button>
          <Button onClick={onSubmit}>Definitely 😈</Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
