import React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (value: boolean) => void;
};

export default function AccessDeniedModalDialog({ isOpen }: Props): JSX.Element {
  return (
    <Modal open={isOpen}>
      <ModalDialog>
        <DialogTitle>Access Denied!</DialogTitle>
        <DialogContent>Wrong answer 😉</DialogContent>
      </ModalDialog>
    </Modal>
  );
}
