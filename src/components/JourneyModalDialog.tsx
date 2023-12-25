import React, { useEffect, useState } from 'react';
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

import { JourneyDataItem } from '../../types';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (data: Pick<JourneyDataItem, 'name' | 'startDate' | 'endDate'>) => void;
  openSnackbar: (msg: string) => void;

  today: Date;
  data: Pick<JourneyDataItem, 'name' | 'startDate' | 'endDate'> | null;
};

type StateData = {
  name: JourneyDataItem['name'];
  startDate: Date;
  endDate: Date;
};

export default function JourneyModalDialog({
  isOpen,
  onCancel,
  onSubmit,
  today,
  data = {},
  openSnackbar,
}: Props): JSX.Element {
  const editableInitState = {
    name: data?.name,
    startDate: data ? data.startDate : undefined,
    endDate: data ? data.endDate : undefined,
  };
  const initState = {
    name: editableInitState.name || '',
    startDate: editableInitState.startDate || sub(today, { days: 1 }),
    endDate: editableInitState.endDate || today,
  };
  const [{ name, startDate, endDate }, setState] = useState<StateData>({ ...initState });

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
      startDate,
      endDate,
    };

    if (!preparedData.name || preparedData.name.length < 3) {
      openSnackbar('Name is required and must be at least 3 characters!');
      return;
    }

    if (!preparedData.startDate || !preparedData.endDate) {
      openSnackbar('Dates are required!');
      return;
    }

    if (!(differenceInDays(preparedData.endDate, preparedData.startDate) >= 1)) {
      openSnackbar('The difference in days must be at least 1 day between start and end dates!');
      return;
    }

    onSubmit({ ...data, ...preparedData });
  };

  useEffect(() => {
    if (!data) {
      discardChanges();
    } else {
      setState((prevState) => ({ ...prevState, ...data }));
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
                  setState((prevState) => ({ ...prevState, startDate: newValue || new Date() }))
                }
                views={['year', 'month', 'day']}
                format="dd/MM/yyyy"
              />
              <FormLabel>End Date</FormLabel>
              <DesktopDatePicker
                value={endDate}
                onChange={(newValue) =>
                  setState((prevState) => ({ ...prevState, endDate: newValue || new Date() }))
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
