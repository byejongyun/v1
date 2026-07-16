export interface Place {
  id: number;
  name: string;
  category: 'Food' | 'Activity' | 'Place';
  lat: number;
  lng: number;
  comment: string;
}
