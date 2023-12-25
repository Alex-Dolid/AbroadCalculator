export type JourneyStoreItem = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
};
export type PreparedJourneyStoreItem = Pick<JourneyStoreItem, 'id' | 'name'> & {
  startDate: Date;
  endDate: Date;
};
export enum JourneyStatus {
  Full = 'Full',
  Partial = 'Partial',
  None = 'None',
}
export type ComputedJourneyData = {
  days: {
    period: number;
    total: number;
  };
  status: JourneyStatus;
};

export type JourneyDataItem = PreparedJourneyStoreItem & ComputedJourneyData;

export type StoreSchema = {
  journeys: Record<JourneyStoreItem['id'], JourneyStoreItem>;
};

export enum Stores {
  Journeys = 'journeys',
}
