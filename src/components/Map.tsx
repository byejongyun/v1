'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '@/types';

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
  onMarkerClick: (place: Place) => void;
}

// 지도 중심 이동용 헬퍼 컴포넌트
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function Map({ places, userLat, userLng, onMarkerClick }: Props) {
  const centerLat = userLat ?? 35.8294; // 영남대역 기본값
  const centerLng = userLng ?? 128.7545;
  const center: [number, number] = [centerLat, centerLng];

  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom={true}
      className="w-full h-full z-0"
      style={{ minHeight: '100%' }}
    >
      <ChangeView center={center} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
