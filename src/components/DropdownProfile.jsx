import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';
import UserAvatar from '../images/user-avatar-32.png';

function DropdownProfile({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

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
    <div className="relative inline-flex items-center">
      <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group ml-2"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <div className="text-l/3g font-semibold">GrowMate</div>
        <div className="flex items-center truncate ml-2">
          <svg className="w-3 h-3 shrink-0 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
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
            <div className="font-medium text-gray-800 dark:text-gray-100">by 팀 개발제한구역</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 italic text-right">Team GreenBelt</div>
          </div>
          <ul>
            <li>
              <a
                className="font-medium text-sm text-gray-800 hover:text-gray-400 dark:hover:text-gray-500 flex items-center justify-between py-1 px-3"
                href="https://drive.google.com/drive/folders/1SosAuvV6TMRLLiMhhFkMO748fXNXxUWT?usp=drive_link"
                onClick={() => setDropdownOpen(false)}
              >
                GoogleDrive
              </a>
            </li>
            <li>
              <a
                className="font-medium text-sm text-gray-800 hover:text-gray-400 dark:hover:text-gray-500 flex items-center justify-between py-1 px-3"
                href="https://www.youtube.com/watch?v=weny0ejzWdU"
                onClick={() => setDropdownOpen(false)}
              >
                Youtube
              </a>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;