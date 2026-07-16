import { Place } from '@/types';

type Category = 'All' | 'Food' | 'Activity' | 'Place';

interface Props {
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
}

export default function CategoryFilter({ activeCategory, onSelectCategory }: Props) {
  const categories: { id: Category; label: string }[] = [
    { id: 'All', label: '전체' },
    { id: 'Food', label: '먹거리(맛집/카페)' },
    { id: 'Activity', label: '놀거리(코노/PC등)' },
    { id: 'Place', label: '공간(휴식/모임)' },
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide px-4 pt-1">
      {categories.map(c => (
        <button
          key={c.id}
          onClick={() => onSelectCategory(c.id)}
          className={`whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
            activeCategory === c.id
              ? 'bg-blue-600 text-white shadow-md transform scale-105'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
