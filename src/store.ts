import { v4 } from 'uuid';
import { JourneyDataItem, JourneyStoreItem, Stores } from '../types';

const prepareDataToSerialize = (data: Pick<JourneyDataItem, 'name' | 'startDate' | 'endDate'>) => {
  return {
    name: data.name,
    startDate: data.startDate.toJSON(),
    endDate: data.endDate.toJSON(),
  };
};

export default {
  journeys: {
    async get() {
      const journeys = await ipcRenderer.invoke('store.get', Stores.Journeys);
      return Object.entries<JourneyStoreItem>(journeys).map(([id, item]) => [
        id,
        {
          ...item,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
        },
      ]);
    },
    async create(data: Pick<JourneyDataItem, 'name' | 'startDate' | 'endDate'>) {
      const journey = {
        id: v4(),
        ...prepareDataToSerialize(data),
      };

      await ipcRenderer.invoke('store.set', { [`${Stores.Journeys}.${journey.id}`]: journey });
    },
    async update(
      id: JourneyDataItem['id'],
      data: Pick<JourneyDataItem, 'name' | 'startDate' | 'endDate'>,
    ) {
      const journey = {
        id,
        ...prepareDataToSerialize(data),
      };

      await ipcRenderer.invoke('store.set', { [`${Stores.Journeys}.${id}`]: journey });
    },
    async remove(id: JourneyDataItem['id']) {
      await ipcRenderer.invoke('store.delete', `${Stores.Journeys}.${id}`);
    },
    // onDidChange(callback: () => void) {
    //   return store.onDidChange(Stores.Journeys, callback);
    // },
  },
};
