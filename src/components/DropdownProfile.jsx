import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';
import UserAvatar from '../images/user-avatar-32.png';
import axios from 'axios';

function DropdownProfile({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [plantProfiles, setPlantProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeProfileId, setActiveProfileId] = useState(1); // 기본값을 1로 설정

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const fetchPlantProfiles = async () => {
      try {
        const response = await axios.get('http://192.168.0.21:8000/');
        setPlantProfiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plant profiles:', error);
        setLoading(false);
      }
    };
    fetchPlantProfiles();
  }, []);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />
        <div className="flex items-center truncate">
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
            <div className="font-medium text-gray-800 dark:text-gray-100">계정관리</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 italic">여러 식물을 관리하세요!</div>
          </div>
          <ul>
            {loading ? (
              <li className="text-center py-2">Loading...</li>
            ) : (
              plantProfiles.map((profile) => (
                <li key={profile.id}>
                  <Link
                    className={`font-medium text-sm ${profile.id === activeProfileId ? 'text-green-500' : 'text-gray-800'} hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3`}
                    to="/Home_PlantProfile"
                    onClick={() => {
                      setActiveProfileId(profile.id);
                      setDropdownOpen(false);
                    }}
                  >
                    {profile.plant_profile_name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;