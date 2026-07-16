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
          
          <div className="bg-white rounded-[24px] w-full max-w-sm shadow-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* 닫기 버튼 */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 pt-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">제보하기</h2>
              </div>
              
              <div className="text-[14px] text-gray-600 leading-relaxed mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="mb-3">
                  오류를 제보하실 경우 자유롭게 제보해 주시고, 
                  장소를 제보하실 경우 아래 양식에 맞추어 제보해주세요.
                </p>
                <div className="bg-white p-3 rounded-xl border border-gray-200/60 shadow-sm">
                  <ol className="list-decimal pl-5 space-y-1.5 font-medium text-gray-700">
                    <li>장소 이름</li>
                    <li>주소</li>
                    <li>카테고리 (먹거리, 놀거리, 공간)</li>
                  </ol>
                </div>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-center mb-6">
                <p className="text-[11px] text-blue-600/80 font-bold mb-1 uppercase tracking-wider">제보 메일 주소</p>
                <a 
                  href="mailto:gyeongsanplace_contact@proton.me" 
                  className="text-base font-bold text-blue-600 hover:text-blue-800 transition-colors select-all"
                >
                  gyeongsanplace_contact@proton.me
                </a>
              </div>
              
              <a 
                href="mailto:gyeongsanplace_contact@proton.me"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center transition-all active:scale-[0.98] shadow-lg shadow-blue-500/25"
                onClick={() => setIsOpen(false)}
              >
                메일 앱 열기
              </a>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
