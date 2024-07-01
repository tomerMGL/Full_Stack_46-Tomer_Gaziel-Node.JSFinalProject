import React, { useEffect, useState } from "react";
import axios from "axios";

const Logs = () => {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/logs")
      .then((data) => setLogs(data.data.logs.slice(-30).reverse()))
  }, [])
  

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <h2 className="w-full text-center font-bold text-5xl">Logs <span className="text-xl">(Last 30)</span></h2>
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>Id</th>
            <th>date</th>
            <th>max actions</th>
            <th>allowed actions</th>
          </tr>
        </thead>
        <tbody>
          {logs &&
            logs.map((log, index) => (
              <tr
                key={`userKey-${index}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-lg"
              >
                <td>{log.id}</td>
                <td>{log.date}</td>
                <td>{log.maxActions}</td>
                <td>{log.actionAllowed}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
