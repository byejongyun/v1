'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MessageSquarePlus, X, Mail } from 'lucide-react';

export default function ReportFeature() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* 왼쪽 하단 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-4 z-[99999] flex items-center justify-center w-14 h-14 bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-gray-100 text-blue-600 hover:text-blue-700 hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="제보하기"
      >
        <MessageSquarePlus className="w-6 h-6" />
      </button>

      {/* 제보하기 모달 */}
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          {/* 모달 밖 클릭시 닫기 */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
          
          <div className="bg-[#f8fbff] border border-blue-100/80 rounded-3xl w-full max-w-sm shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 p-10 text-center flex flex-col items-center justify-center">
            {/* 닫기 버튼 */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-1.5 text-blue-300 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-sm text-blue-500 font-bold mb-3 tracking-wide">제보 메일 주소</p>
            <a 
              href="mailto:gyeongsanplace_contact@proton.me" 
              className="text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors select-all break-all"
            >
              gyeongsanplace_contact@proton.me
            </a>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
