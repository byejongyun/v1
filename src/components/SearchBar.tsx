import { Search } from 'lucide-react';
import Image from 'next/image';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: Props) {
  return (
    <div className="px-4 pb-2 pt-2 relative z-10 flex items-center gap-3">
      <Image 
        src="/logo.png" 
        alt="경산 플레이스 로고" 
        width={200} 
        height={50} 
        className="shrink-0 h-auto w-auto max-h-[50px] object-contain"
        priority
      />
      <div className="relative flex items-center flex-1 min-w-0">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-20 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="장소명 검색 (예: 코인노래방)"
          className="w-full pl-11 pr-4 py-3 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800 placeholder-gray-400 relative z-10"
        />
      </div>
    </div>
  );
}
