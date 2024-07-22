import axios from "axios";
import React, { useState, useEffect } from 'react';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function CurrentHumidity() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [a, setA] = useState("");
  const [b, setB] = useState(""); // 'b' 변수를 추가합니다.

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://221.160.142.241:9000/home/temperature-humidity');
        setMessage("연결 성공");
        setData(response.data);
        setA(response.data);
        setB(response.data.substring(0, 5)); // 'a'의 첫 5글자를 'b'에 설정합니다.
        console.log(response.data);
        setError(false);
      } catch (error) {
        setMessage("연결 실패");
        setError(true);
        console.error("Error:", error);
      }
      setIsLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 2000); // Fetch data every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">대기 습도</h2>
      </header>
      <div className="px-5 py-3">
        {isLoading ? (
          <p>연결 중...</p>
        ) : error ? (
          <p className="text-red-500">{message}</p>
        ) : (
          <p className="text-green-500">{message}</p>
        )}
        <p className="text-blue-500 mt-2">
          받은 데이터:
        </p>
        <pre className="bg-gray-100 p-2 mt-2 rounded overflow-x-auto">
          {data}
        </pre>
        <p className="text-purple-500 mt-2">
          문자열로 처리된 데이터 (a):
        </p>
        <pre className="bg-gray-100 p-2 mt-2 rounded overflow-x-auto">
          {a}
        </pre>
        <p className="text-orange-500 mt-2">
          첫 5글자 (b):
        </p>
        <pre className="bg-gray-100 p-2 mt-2 rounded overflow-x-auto">
          {b}
        </pre>
      </div>
    </div>
  );
}

export default CurrentHumidity;