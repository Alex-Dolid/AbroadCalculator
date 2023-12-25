import React, { useEffect, useMemo, useState } from 'react';
import { differenceInDays, getOverlappingDaysInIntervals, sub } from 'date-fns';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import store from './store';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import {
  AccessDeniedModalDialog,
  AlertDialogModal,
  AuthModalDialog,
  Header,
  JourneyModalDialog,
  JourneyTable,
  SnackbarHideDuration,
  StatisticsPanel,
} from './components';

import './App.css';
import { JourneyDataItem, JourneyStatus, PreparedJourneyStoreItem } from '../types';

const MAX_AVAILABLE_DAYS_PER_CYCLE = 240;

const computeFields = (
  data: [PreparedJourneyStoreItem['id'], PreparedJourneyStoreItem][],
): [JourneyDataItem['id'], JourneyDataItem][] => {
  const today = new Date();
  const startCycleDate = sub(today, { years: 1 });
  return data.map(([id, item]) => {
    const total = differenceInDays(item.endDate, item.startDate);
    const _period = getOverlappingDaysInIntervals(
      { start: item.startDate, end: item.endDate },
      { start: startCycleDate, end: today },
    );
    const period = _period > total ? _period - 1 : _period;
    return [
      id,
      {
        ...item,
        days: {
          total,
          period,
        },
        status:
          period === total
            ? JourneyStatus.Full
            : period < total && period !== 0
              ? JourneyStatus.Partial
              : JourneyStatus.None,
      },
    ];
  });
};

const getStoreErrorMessage = (error: unknown): string => {
  console.error(error);
  if (error instanceof Error) return error.message;
  if (Array.isArray(error)) return error[0];
  return 'Unknown Error!';
};
const initSnackbarState = { isOpenSnackbar: false, snackbarMessage: '' };

function App() {
  const [data, setData] = useState(new Map<JourneyDataItem['id'], JourneyDataItem>([]));
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [isAccessDenied, setIsAccessDenied] = useState<boolean>(false);
  const [isOpenJourneyModal, setIsOpenJourneyModal] = useState<boolean>(false);
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState<boolean>(false);
  const [editableItemId, setEditableItemId] = useState<JourneyDataItem['id'] | null>(null);
  const [{ isOpenSnackbar, snackbarMessage }, setSnackbar] = useState({ ...initSnackbarState });

  const today = new Date();
  const startCycleDate = sub(today, { years: 1 });

  const availableDays = useMemo(() => {
    return [...data.values()].reduce(
      (acc, curr) => (acc -= curr.days.period),
      MAX_AVAILABLE_DAYS_PER_CYCLE,
    );
  }, [data]);
  const editableItemData = useMemo(() => {
    const editableItem = editableItemId ? data.get(editableItemId) : null;
    return editableItem
      ? {
          name: editableItem.name,
          startDate: editableItem.startDate,
          endDate: editableItem.endDate,
        }
      : null;
  }, [editableItemId]);

  const openSnackbar = (msg: string) => {
    setSnackbar({ isOpenSnackbar: true, snackbarMessage: msg });
  };
  const fetchNewData = async () => {
    try {
      const journeys = await store.journeys.get();
      setData(new Map(computeFields(journeys)));
    } catch (error) {
      openSnackbar(getStoreErrorMessage(error));
    }
  };
  const openJourneyModal = () => setIsOpenJourneyModal(true);
  const closeJourneyModal = () => setIsOpenJourneyModal(false);
  const onEdit = (id: JourneyDataItem['id']) => {
    setEditableItemId(id);
    openJourneyModal();
  };
  const onRemove = async () => {
    if (!editableItemId) return;
    try {
      await store.journeys.remove(editableItemId);
      await fetchNewData();
    } catch (error) {
      openSnackbar(getStoreErrorMessage(error));
    } finally {
      onCancelRemove();
    }
  };
  const openConfirmationModel = (id: JourneyDataItem['id']) => {
    setEditableItemId(id);
    setIsOpenConfirmationModal(true);
  };
  const onCancelRemove = () => {
    setEditableItemId(null);
    setIsOpenConfirmationModal(false);
  };
  const onCancelJourneyModal = () => {
    closeJourneyModal();
    setEditableItemId(null);
  };
  const onSubmitJourneyModal = async (
    data: Pick<JourneyDataItem, 'name' | 'startDate' | 'endDate'>,
  ) => {
    closeJourneyModal();
    try {
      if (editableItemId) {
        await store.journeys.update(editableItemId, data);
        await fetchNewData();
        return;
      }

      await store.journeys.create(data);
      await fetchNewData();
    } catch (error) {
      openSnackbar(getStoreErrorMessage(error));
    }
  };

  useEffect(() => {
    // const unsubscribe = store.journeys.onDidChange(fetchNewData);
    fetchNewData();

    // return unsubscribe;
  }, []);

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Journeys
            </Typography>
            <Button
              color="primary"
              startDecorator={<AddCircleOutlineIcon />}
              size="sm"
              onClick={openJourneyModal}
            >
              Add new journey
            </Button>
          </Box>
          <StatisticsPanel
            today={today}
            startCycleDate={startCycleDate}
            availableDays={availableDays}
          />
          <JourneyTable
            data={[...data.values()]}
            onEdit={onEdit}
            onRemove={openConfirmationModel}
          />
          <div key="modals">
            <JourneyModalDialog
              isOpen={isOpenJourneyModal}
              onCancel={onCancelJourneyModal}
              onSubmit={onSubmitJourneyModal}
              today={today}
              data={editableItemData}
              openSnackbar={openSnackbar}
            />
            <AuthModalDialog
              isOpen={isAuth}
              onCancel={() => {
                setIsAuth(false);
                setIsAccessDenied(true);
              }}
              onSubmit={setIsAuth.bind(null, false)}
            />
            <AccessDeniedModalDialog isOpen={isAccessDenied} />
            <AlertDialogModal
              isOpen={isOpenConfirmationModal}
              onCancel={onCancelRemove}
              onConfirm={onRemove}
            />
          </div>
          <SnackbarHideDuration
            isOpen={isOpenSnackbar}
            onClose={() => setSnackbar({ ...initSnackbarState })}
            message={snackbarMessage}
          />
        </Box>
      </Box>
    </>
  );
}

export default App;
