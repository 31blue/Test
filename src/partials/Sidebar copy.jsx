import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  messageCount = 0,
  variant = 'default',
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-sm'}`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          {/* Logo */}
          <NavLink end to="/home_plantprofile" className="block">
            <div className="w-9.6 h-9.6 rounded-full overflow-hidden">
              <img 
                src="/src/images/album/android-icon-72x72.png" 
                
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">GrowMate</span>
            </h3>
            <ul className="mt-3">



              {/* Home 홈 */}
              <SidebarLinkGroup activecondition={pathname.includes("home_plantprofile") || pathname.includes("home_now")}>
                {(handleClick, open) => (
                  <div className="mb-0.5 rounded-sm">
                    <a
                      href="#0"
                      className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                        pathname.includes("home_plantprofile") || pathname.includes("home_now")
                          ? ""
                          : "hover:text-gray-900 dark:hover:text-white"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                        setSidebarExpanded(true);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="grow flex items-center">
                          <svg
                            className={`shrink-0 fill-current ${
                              pathname.includes("home_plantprofile") || pathname.includes("home_now")
                                ? "text-green-500"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                            <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                          </svg>
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            홈
                          </span>
                        </div>
                        <div className="flex shrink-0 ml-2">
                        </div>
                      </div>
                    </a>
                    <div className={`lg:hidden lg:sidebar-expanded:block 2xl:block ${!open && "hidden"}`}>
                      <ul className="pl-9 mt-1">
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/home_plantprofile"
                            className={({ isActive }) =>
                              `block transition duration-150 truncate ${
                                isActive ? "text-green-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                              }`
                            }
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              식물 프로필
                            </span>
                          </NavLink>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/home_now"
                            className={({ isActive }) =>
                              `block transition duration-150 truncate ${
                                isActive ? "text-green-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                              }`
                            }
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              실시간 온습도
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </SidebarLinkGroup>

              {/* Analysis 분석 */}
              <SidebarLinkGroup activecondition={pathname.includes("analysis_summary") || pathname.includes("analysis_photosynthesis") || pathname.includes("analysis_transpiration")}>
                {(handleClick, open) => (
                  <div className="mb-0.5 rounded-sm">
                    <a
                      href="#0"
                      className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                        pathname.includes("analysis_summary") || pathname.includes("analysis_photosynthesis") || pathname.includes("analysis_transpiration")
                          ? ""
                          : "hover:text-gray-900 dark:hover:text-white"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                        setSidebarExpanded(true);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="grow flex items-center">
                          <svg
                            className={`shrink-0 fill-current ${
                              pathname.includes("analysis_summary") || pathname.includes("analysis_photosynthesis") || pathname.includes("analysis_transpiration")
                                ? "text-green-500"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7.586 9H1a1 1 0 1 1 0-2h6.586L6.293 5.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414L7.586 9ZM3.075 4.572a1 1 0 1 1-1.64-1.144 8 8 0 1 1 0 9.144 1 1 0 0 1 1.64-1.144 6 6 0 1 0 0-6.856Z" />
                          </svg>
                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            분석
                          </span>
                        </div>
                        <div className="flex shrink-0 ml-2">

                        </div>
                      </div>
                    </a>
                    <div className={`lg:hidden lg:sidebar-expanded:block 2xl:block ${!open && "hidden"}`}>
                      <ul className="pl-9 mt-1">
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/analysis_summary"
                            className={({ isActive }) =>
                              `block transition duration-150 truncate ${
                                isActive ? "text-green-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                              }`
                            }
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              요약
                            </span>
                          </NavLink>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/analysis_photosynthesis"
                            className={({ isActive }) =>
                              `block transition duration-150 truncate ${
                                isActive ? "text-green-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                              }`
                            }
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              광합성량 자세히
                            </span>
                          </NavLink>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/analysis_transpiration"
                            className={({ isActive }) =>
                              `block transition duration-150 truncate ${
                                isActive ? "text-green-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                              }`
                            }
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              증발산량 자세히
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </SidebarLinkGroup>








              {/* Messages */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${pathname.includes("messages") && "from-green-500/[0.12] dark:from-green-500/[0.24] to-green-500/[0.04]"}`}>
                <NavLink
                  end
                  to="/messages"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("messages") ? "" : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <svg className={`shrink-0 fill-current ${pathname.includes('messages') ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M13.95.879a3 3 0 0 0-4.243 0L1.293 9.293a1 1 0 0 0-.274.51l-1 5a1 1 0 0 0 1.177 1.177l5-1a1 1 0 0 0 .511-.273l8.414-8.414a3 3 0 0 0 0-4.242L13.95.879ZM11.12 2.293a1 1 0 0 1 1.414 0l1.172 1.172a1 1 0 0 1 0 1.414l-8.2 8.2-3.232.646.646-3.232 8.2-8.2Z" />
                        <path d="M10 14a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5Z" />
                      </svg>
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        메세지
                      </span>
                    </div>
                    {/* Badge */}
                    {messageCount > 0 && (
                      <div className="flex flex-shrink-0 ml-2">
                        <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-green-400 px-2 rounded">{messageCount}</span>
                      </div>
                    )}
                  </div>
                </NavLink>
              </li>



              {/* Calendar */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${pathname.includes("calendar") && "from-green-500/[0.12] dark:from-green-500/[0.24] to-green-500/[0.04]"}`}>
                <NavLink
                  end
                  to="/calendar"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("calendar") ? "" : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${pathname.includes('calendar') ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" />
                      <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
                      <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      달력
                    </span>
                  </div>
                </NavLink>
              </li>


            {/* Album */}
            <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
              pathname.includes("album") && "from-green-500/[0.12] dark:from-green-500/[0.24] to-green-500/[0.04]"
            }`}>
              <NavLink
                end
                to="/album"
                className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                  pathname.includes("album") ? "" : "hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center">
                  <svg className={`shrink-0 fill-current ${pathname.includes('album') ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M6.649 1.018a1 1 0 0 1 .793 1.171L6.997 4.5h3.464l.517-2.689a1 1 0 1 1 1.964.378L12.498 4.5h2.422a1 1 0 0 1 0 2h-2.807l-.77 4h2.117a1 1 0 1 1 0 2h-2.501l-.517 2.689a1 1 0 1 1-1.964-.378l.444-2.311H5.46l-.517 2.689a1 1 0 1 1-1.964-.378l.444-2.311H1a1 1 0 1 1 0-2h2.807l.77-4H2.46a1 1 0 0 1 0-2h2.5l.518-2.689a1 1 0 0 1 1.17-.793ZM9.307 10.5l.77-4H6.612l-.77 4h3.464Z" />
                  </svg>
                  <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    앨범
                  </span>
                </div>
              </NavLink>
            </li>




            </ul>
          </div>
          
          More group
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">설정</span>
            </h3>
            <ul className="mt-3">

              {/* Authentication */}
              {/* 유저 설정 */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${pathname.includes("settings_user") && "from-green-500/[0.12] dark:from-green-500/[0.24] to-green-500/[0.04]"}`}>
                  <NavLink
                    end
                    to="/settings_user"
                    className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                      pathname.includes("settings_user") ? "" : "hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className={`shrink-0 fill-current ${pathname.includes('settings_user') ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M11.442 4.576a1 1 0 1 0-1.634-1.152L4.22 11.35 1.773 8.366A1 1 0 1 0 .227 9.634l3.281 4a1 1 0 0 0 1.59-.058l6.344-9ZM15.817 4.576a1 1 0 1 0-1.634-1.152l-5.609 7.957a1 1 0 0 0-1.347 1.453l.656.8a1 1 0 0 0 1.59-.058l6.344-9Z" />
                      </svg>
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        유저 설정
                      </span>
                    </div>
                  </NavLink>
              </li>

              {/* Notification Settings */}
              {/* 알림 설정 */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${pathname.includes("settings_notification") && "from-green-500/[0.12] dark:from-green-500/[0.24] to-green-500/[0.04]"}`}>
                <NavLink
                  end
                  to="/settings_notification"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${pathname.includes("settings_notification") ? "" : "hover:text-gray-900 dark:hover:text-white"}`}
                >
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${pathname.includes('settings_notification') ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M10.5 1a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2h-1.145a3.502 3.502 0 0 1-6.71 0H1a1 1 0 0 1 0-2h6.145A3.502 3.502 0 0 1 10.5 1ZM9 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM5.5 9a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2H8.855a3.502 3.502 0 0 1-6.71 0H1a1 1 0 1 1 0-2h1.145A3.502 3.502 0 0 1 5.5 9ZM4 12.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" fillRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      알림 설정
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Test */}
              {/* Test Page */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${pathname.includes("pagetest") && "from-blue-500/[0.12] dark:from-blue-500/[0.24] to-blue-500/[0.04]"}`}>
              <NavLink
                end
                to="/pagetest"
                className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                  pathname.includes("pagetest") ? "" : "hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="grow flex items-center">
                    <svg className={`shrink-0 fill-current ${pathname.includes('pagetest') ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M14.5 0h-13C.673 0 0 .673 0 1.5v13c0 .827.673 1.5 1.5 1.5h13c.827 0 1.5-.673 1.5-1.5v-13c0-.827-.673-1.5-1.5-1.5zm-13 1h13a.5.5 0 0 1 .5.5V4H1V1.5a.5.5 0 0 1 .5-.5zM1 14.5v-9h14v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5z"/>
                      <path d="M6 10h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1zm0-2h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1zm0-2h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1z"/>
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      관리
                    </span>
                  </div>
                </div>
              </NavLink>
            </li>


            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
