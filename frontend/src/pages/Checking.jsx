import React, { useState } from "react";
import axios from "axios";
import EditApplication from "./EditApplicaiton";

const Checking = () => {
  const [nationalId, setNationalId] = useState("");
  const [status, setStatus] = useState(null);
  const [name, setName] = useState("");
  const [gradeApplyingFor, setGradeApplyingFor] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus(null); // Reset status to hide previous results if any
    setIsEditing(false);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/application/status/${nationalId}`
      );

      if (response.data && response.data.status) {
        setStatus(response.data.status);
        setName(response.data.name || "");
        setNationalId(response.data.nationalId || "");
        setGradeApplyingFor(response.data.gradeApplyingFor || "");
      } else {
        setError("ไม่พบข้อมูลการสมัคร");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("ไม่พบข้อมูลการสมัคร");
      } else {
        setError("เกิดข้อผิดพลาดขณะดึงข้อมูล");
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return <EditApplication nationalId={nationalId} />;
  }

  return (
    <div className="container p-6">
      <h1 className="text-4xl font-bold text-center text-pink-500 mb-8 pt-10">
        ตรวจสอบสถานะการสมัคร
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          กรุณาใส่เลขบัตรประชาชน
        </h2>

        <div className="mb-4">
          <input
            type="text"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            placeholder="กรุณาใส่เลขบัตรประชาชน"
            required
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          ตรวจสอบสถานะ
        </button>
      </form>

      {/* Display only status if available */}
      {status && !error && (
        <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg mt-4">
          <p className="text-pink-500 font-semibold text-xl mb-4">
            <span>{name}</span> <br/>
            {status &&!error&&(
              <span>เลขบัตรประชาชน: {nationalId}</span>
            )}
          
          {gradeApplyingFor}
            สถานะ:{" "}
            <span
              className={`font-medium ${
                status === "Passed" ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {status}
            </span>
          </p>
          {status === "Passed" && (
            <button
              onClick={handleEditClick}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              แก้ไขข้อมูล
            </button>
          )}
        </div>
      )}

      {/* Display error message if no data is found */}
      {error && (
        <p className="text-center text-red-500 font-semibold mt-4">{error}</p>
      )}
    </div>
  );
};

export default Checking;
