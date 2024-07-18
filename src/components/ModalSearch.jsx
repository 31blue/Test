import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';

function ModalSearch({
  id,
  searchId,
  modalOpen,
  setModalOpen
}) {
  const modalContent = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div ref={modalContent} className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg">
          <div className="py-4 px-6">
            <h2 className="text-2xl font-bold text-black mb-4">Site Map (사이트 맵)</h2>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">홈</h3>
              <ul>
                <li><Link to="/home_plantprofile" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setModalOpen(false)}>식물 프로필</Link></li>
                <li><Link to="/home_now" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setModalOpen(false)}>실시간 온습도</Link></li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">분석</h3>
              <ul>
                <li><Link to="/analysis_summary" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setModalOpen(false)}>요약</Link></li>
                <li><Link to="/analysis_photosynthesis" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setModalOpen(false)}>광합성량 자세히</Link></li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">그밖의</h3>
              <ul>
                <li><Link to="/messages" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setModalOpen(false)}>메세지</Link></li>
                <li><Link to="/calendar" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setModalOpen(false)}>달력</Link></li>
                <li><Link to="/album" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setModalOpen(false)}>앨범</Link></li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">설정</h3>
              <ul>
                <li><Link to="/settings_user" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setModalOpen(false)}>유저 설정</Link></li>
                <li><Link to="/settings_notification" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setModalOpen(false)}>알림 설정</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalSearch;