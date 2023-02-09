export type SearchPreferences = {
  decade: keyof typeof DECADES;
  referenceMovie: string;
};

export const DECADES = {
  '10s': '10s',
  '20s': '20s',
  '30s': '30s',
  '40s': '40s',
  '50s': '50s',
  '60s': '60s',
  '70s': '70s',
  '80s': '80s',
  '90s': '90s',
  '00s': '00s',
  ANY: 'Cualquiera',
};
