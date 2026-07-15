export interface Place {
  id: number;
  name: string;
  category: 'Food' | 'Activity';
  lat: number;
  lng: number;
  comment: string;
}
