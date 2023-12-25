import React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AlertDialogModal({ isOpen, onConfirm, onCancel }: Props): JSX.Element {
  return (
    <Modal open={isOpen} onClose={onCancel}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent>Are you sure, my baby wants to remove journey?</DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={onConfirm}>
            Remove
          </Button>
          <Button variant="plain" color="neutral" onClick={onCancel}>
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
