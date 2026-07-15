import { Search } from 'lucide-react';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: Props) {
  return (
    <div className="px-4 pb-4 pt-2 relative z-10">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="장소명 검색 (예: 코인노래방)"
          className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800 placeholder-gray-400"
        />
      </div>
    </div>
  );
}
