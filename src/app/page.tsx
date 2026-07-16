'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Place } from '@/types';
import { supabase } from '@/lib/supabase';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import PlaceBottomSheet from '@/components/PlaceBottomSheet';

// Leaflet은 window 객체가 필요하므로 SSR 비활성화
const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <span className="text-gray-400 font-medium animate-pulse">지도를 불러오는 중...</span>
    </div>
  ),
});

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Food' | 'Activity' | 'Place'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      const { data, error } = await supabase.from('places').select('*');
      if (error) {
        console.error('Error fetching places from Supabase:', error);
      } else if (data) {
        setPlaces(data);
      }
    };
    fetchPlaces();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLat(position.coords.latitude);
          setUserLng(position.coords.longitude);
        },
        () => {
          console.warn("GPS 권한이 거부되었거나 위치를 가져올 수 없습니다. 기본 좌표(영남대역)를 사용합니다.");
        }
      );
    }
  }, []);

  const filteredPlaces = places.filter(place => {
    const matchesCategory = activeCategory === 'All' || place.category === activeCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleMarkerClick = useCallback((place: Place) => {
    setSelectedPlace(place);
  }, []);

  return (
    <main className="w-full h-screen relative flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-white/95 via-white/80 to-transparent pb-10 pt-4 flex flex-col">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <CategoryFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        
        {searchQuery.trim().length > 0 && (
          <div className="mx-4 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden max-h-60 overflow-y-auto shrink-0">
            {filteredPlaces.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {filteredPlaces.map(place => (
                  <li 
                    key={place.id}
                    onClick={() => {
                      handleMarkerClick(place);
                      setSearchQuery('');
                    }}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center"
                  >
                    <span className="text-gray-800 font-medium text-sm">{place.name}</span>
                    <span className="ml-auto text-xs text-gray-400">
                      {place.category === 'Food' ? '🍽 먹거리' : place.category === 'Place' ? '☕ 공간' : '🎯 놀거리'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6 text-center text-gray-500 text-sm font-medium">
                "{searchQuery}" 검색 결과가 없습니다.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 w-full relative">
        <Map 
          places={filteredPlaces} 
          userLat={userLat} 
          userLng={userLng} 
          selectedPlace={selectedPlace}
          onMarkerClick={handleMarkerClick} 
        />
      </div>

      <PlaceBottomSheet 
        place={selectedPlace} 
        userLat={userLat} 
        userLng={userLng} 
        onClose={() => setSelectedPlace(null)} 
      />
    </main>
  );
}
