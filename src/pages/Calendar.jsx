import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import CalendarMain from '../partials/calendar/CalendarMain';
import CalendarWatering from '../partials/calendar/CalendarWatering';
import CalendarFlower from '../partials/calendar/CalendarFlower';
import Banner from '../partials/Banner';
import axios from 'axios';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [wateredDates, setWateredDates] = useState([]);
  const [floweringDates, setFloweringDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/watering-history/1', {
          withCredentials: true
        });
        if (!Array.isArray(response.data)) {
          setWateredDates([]);
        } else {
          setWateredDates(response.data);
        }
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch plant data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleWatering = async (date) => {
    const dateString = date.toDateString();
    if (wateredDates.some(item => item.checkDate === dateString)) {
      const itemToRemove = wateredDates.find(item => item.checkDate === dateString);
      await axios.delete(`watering-checked/delete/${itemToRemove.id}`);
      setWateredDates(wateredDates.filter(item => item.checkDate !== dateString));
    } else {
      const response = await axios.post('watering/checked', { "checkDate": dateString });
      setWateredDates([...wateredDates, response.data]);
    }
  };

  const handleFlowering = (date) => {
    const dateString = date.toDateString();
    if (floweringDates.includes(dateString)) {
      setFloweringDates(floweringDates.filter(d => d !== dateString));
    } else {
      setFloweringDates([...floweringDates, dateString]);
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-2xl font-semibold text-slate-800 mb-8 flex items-center">
              달력
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                className="shrink-0 fill-current text-gray-400 ml-2 mb-1 cursor-pointer"
                style={{ width: '0.8em', height: '0.8em' }}
                onClick={toggleModal}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
            </h1>
            <div className="grid grid-cols-12 gap-6">
              <CalendarMain 
                currentDate={currentDate} 
                wateredDates={wateredDates}
                floweringDates={floweringDates}
                onWatering={handleWatering}
                onFlowering={handleFlowering}
              />
              <div className="col-span-full grid grid-cols-12 gap-6">
                <CalendarWatering wateredDates={wateredDates} />
                <CalendarFlower floweringDates={floweringDates} />
              </div>
            </div>
          </div>
        </main>
        <Banner />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white p-8 rounded-lg max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">달력 페이지</h2>
            <p className="mb-4">
              이 달력에서는 물주기와 개화를 수동으로 버튼으로 관리할 수 있습니다.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">물을 주면 자동으로 달력에 해당 날짜가 표시됩니다.</li>
              <li className="mb-2">마지막으로 물을 준 날짜와 개화한 날짜로부터 얼마나 시간이 지났는지를 디데이로 계산하여 보여줍니다.</li>
              <li className="mb-2">물주기와 개화 날짜를 쉽게 기록하고 추적할 수 있습니다.</li>
            </ul>
            <p className="mb-4">
              이 기능을 통해 식물 관리를 더욱 효율적으로 할 수 있으며, 식물의 생장 주기를 더 잘 이해할 수 있습니다.
            </p>
            <button 
              onClick={toggleModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;