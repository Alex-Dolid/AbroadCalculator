import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { sub, differenceInDays } from 'date-fns';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Stack from '@mui/joy/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Journey } from '../types';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (data: Journey) => void;

  today: Date;
  data: Journey | null;
};

type StateData = {
  name: Journey['name'];
  startDate: Date;
  endDate: Date;
};

export default function JourneyModalDialog({
  isOpen,
  onCancel,
  onSubmit,
  today,
  data,
}: Props): JSX.Element {
  const editableInitState = {
    name: data?.name,
    startDate: data ? new Date(data.startDate) : undefined,
    endDate: data ? new Date(data.endDate) : undefined,
  };
  const initState = {
    name: editableInitState.name || '',
    startDate: editableInitState.startDate || sub(today, { days: 1 }),
    endDate: editableInitState.endDate || today,
  };
  const [{ name, startDate, endDate }, setState] = useState<StateData>({ ...initState });

  const days =
    startDate && endDate ? (differenceInDays(endDate, startDate) as unknown as number) : 0;

  const discardChanges = () => {
    setState((prevState) => ({ ...prevState, ...initState }));
  };
  const discardChangesAndCloseModal = () => {
    discardChanges();
    onCancel();
  };

  const saveChanges = () => {
    const preparedData = {
      name: name.trim(),
      startDate: new Date(startDate).toJSON(),
      endDate: new Date(endDate).toJSON(),
      days,
    };

    if (data) {
      if (preparedData && startDate && endDate) {
        onSubmit({ ...data, ...preparedData });
      }
      return;
    }

    onSubmit({ ...preparedData, id: v4() });
  };

  useEffect(() => {
    if (!data) {
      discardChanges();
    } else {
      const newStateData = {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      };
      setState((prevState) => ({ ...prevState, ...newStateData }));
    }
  }, [data]);

  return (
    <Modal open={isOpen} onClose={discardChangesAndCloseModal}>
      <ModalDialog size="lg">
        <DialogTitle>Create new journey</DialogTitle>
        <DialogContent>Fill in the information of the journey.</DialogContent>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            saveChanges();
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                autoFocus
                required
                value={name}
                placeholder="Some journey name"
                onChange={(event) =>
                  setState((prevState) => ({ ...prevState, name: event.target.value }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <DesktopDatePicker
                value={startDate}
                onChange={(newValue) =>
                  setState((prevState) => ({ ...prevState, startDate: newValue }))
                }
                views={['year', 'month', 'day']}
                format="dd/MM/yyyy"
              />
              <FormLabel>End Date</FormLabel>
              <DesktopDatePicker
                value={endDate}
                onChange={(newValue) =>
                  setState((prevState) => ({ ...prevState, endDate: newValue }))
                }
                views={['year', 'month', 'day']}
                format="dd/MM/yyyy"
              />
            </FormControl>
            <DialogActions>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button variant="outlined" color="danger" onClick={discardChangesAndCloseModal}>
                Discard changes
              </Button>
            </DialogActions>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
