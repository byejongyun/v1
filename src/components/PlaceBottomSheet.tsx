import { Place } from '@/types';
import { X, MapPin, Navigation } from 'lucide-react';

interface Props {
  place: Place | null;
  userLat: number | null;
  userLng: number | null;
  onClose: () => void;
}

export default function PlaceBottomSheet({ place, userLat, userLng, onClose }: Props) {
  if (!place) return null;

  const getDistance = () => {
    if (!userLat || !userLng) return null;
    const R = 6371e3; // metres
    const φ1 = userLat * Math.PI/180; 
    const φ2 = place.lat * Math.PI/180;
    const Δφ = (place.lat-userLat) * Math.PI/180;
    const Δλ = (place.lng-userLng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; 
    if (d > 1000) {
      return (d/1000).toFixed(1) + 'km';
    }
    return Math.round(d) + 'm';
  };

  const distance = getDistance();

  const handleRouteClick = () => {
    const url = `https://map.kakao.com/link/to/${place.name},${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Food': return { bg: 'bg-orange-100', text: 'text-orange-700', label: '🍽 먹거리' };
      case 'Activity': return { bg: 'bg-purple-100', text: 'text-purple-700', label: '🎯 놀거리' };
      case 'Place': return { bg: 'bg-green-100', text: 'text-green-700', label: '☕ 공간' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', label: '📍 장소' };
    }
  };

  const catStyle = getCategoryStyles(place.category);

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] z-50 animate-in slide-in-from-bottom-full duration-300 max-w-md mx-auto">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />
        <div className="px-6 pb-8 pt-2 relative">
          <button 
            onClick={onClose}
            className="absolute right-5 top-2 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${catStyle.bg} ${catStyle.text}`}>
              {catStyle.label}
            </span>
            {distance && (
              <span className="flex items-center text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                내 위치에서 {distance}
              </span>
            )}
          </div>
          
          <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">{place.name}</h2>
          <p className="text-gray-600 mb-6 text-base leading-relaxed">{place.comment}</p>
          
          <button 
            onClick={handleRouteClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-2xl flex items-center justify-center transition-all active:scale-[0.98] shadow-lg shadow-blue-500/25"
          >
            <Navigation className="w-5 h-5 mr-2" />
            카카오맵으로 길찾기
          </button>
        </div>
      </div>
    </>
  );
}
