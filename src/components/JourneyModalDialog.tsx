import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
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

export default function JourneyModalDialog({ isOpen, onCancel, onSubmit }: Props): JSX.Element {
  return (
    <Modal open={isOpen} onClose={onCancel}>
      <ModalDialog>
        <DialogTitle>Create new project</DialogTitle>
        <DialogContent>Fill in the information of the project.</DialogContent>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onSubmit(false);
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input autoFocus required />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input required />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
