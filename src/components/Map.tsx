'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '@/types';
import gyeongsanGeo from '@/data/gyeongsan.json';

// Leaflet 기본 마커 아이콘 설정 (Next.js에서 깨지는 문제 해결)
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface Props {
  places: Place[];
  userLat: number | null;
  userLng: number | null;
  selectedPlace: Place | null;
  onMarkerClick: (place: Place) => void;
}

// 지도 중심 이동용 헬퍼 컴포넌트 (초기 로드용)
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

// 특정 장소 선택 시 이동하는 컴포넌트
function FlyToPlace({ place }: { place: Place | null }) {
  const map = useMap();
  useEffect(() => {
    if (place) {
      map.flyTo([place.lat, place.lng], 16, { animate: true, duration: 1 });
    }
  }, [place, map]);
  return null;
}

// 내 위치로 이동하는 버튼 컴포넌트
function LocationButton({ center }: { center: [number, number] }) {
  const map = useMap();
  return (
    <div className="leaflet-bottom leaflet-right" style={{ bottom: '100px', right: '0px' }}>
      <div className="leaflet-control leaflet-bar" style={{ border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', margin: '10px' }}>
        <button 
          onClick={(e) => {
            e.preventDefault();
            map.flyTo(center, 15, { animate: true, duration: 1 });
          }}
          className="bg-white hover:bg-gray-50 w-[34px] h-[34px] flex items-center justify-center rounded-[4px] cursor-pointer"
          title="내 위치로 이동"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </div>
    </div>
  );
}


const worldCoords: [number, number][] = [
  [-90, -180],
  [90, -180],
  [90, 180],
  [-90, 180],
];
const gyeongsanCoords = gyeongsanGeo.coordinates[0].map((c: number[]) => [c[1], c[0]] as [number, number]);
const maskPositions = [worldCoords, gyeongsanCoords];

export default function Map({ places, userLat, userLng, selectedPlace, onMarkerClick }: Props) {
  const centerLat = userLat ?? 35.8294; // 영남대역 기본값
  const centerLng = userLng ?? 128.7545;
  const center: [number, number] = useMemo(() => [centerLat, centerLng], [centerLat, centerLng]);

  return (
    <MapContainer
      center={center}
      zoom={15}
      zoomControl={false}
      scrollWheelZoom={true}
      className="w-full h-full z-0"
      style={{ minHeight: '100%' }}
    >
      <ZoomControl position="bottomright" />
      <LocationButton center={center} />
      <ChangeView center={center} />
      <FlyToPlace place={selectedPlace} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* 경산 이외 지역 회색 블러(반투명) 마스크 */}
      <Polygon
        positions={maskPositions}
        pathOptions={{ color: '#000', fillColor: '#000', fillOpacity: 0.3, weight: 2, opacity: 0.5 }}
      />

      {/* 사용자 위치 마커 */}
      {userLat && userLng && (
        <Marker position={[userLat, userLng]} icon={userIcon}>
          <Popup>📍 내 위치</Popup>
        </Marker>
      )}

      {/* 장소 마커들 */}
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={defaultIcon}
          eventHandlers={{
            click: () => onMarkerClick(place),
          }}
        >
          <Popup>
            <strong>{place.name}</strong>
            <br />
            {place.comment}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
