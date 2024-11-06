import React, { useState, useEffect } from "react";
import axios from "axios";

const EditApplication = () => {
  const [nationalId, setNationalId] = useState("");
  const [applicationData, setApplicationData] = useState({
    title: "",
    name: "",
    nationalId: "",
    dob: "",
    age: "",
    religion: "",
    ethnicity: "",
    nationality: "",
    phone: "",
    address: "",
    previousSchool: "",
    gpa: "",
    gradeApplyingFor: "",
    profilePicture: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ฟังก์ชันเพื่อค้นหาข้อมูลผู้สมัครตาม nationalId
  const fetchApplicationData = async () => {
    setError("");
    setMessage("");
    
    try {
      const response = await axios.get(
        `http://localhost:3000/api/application/status/${nationalId}`
      );
      setApplicationData(response.data);
    } catch (err) {
      setError("ไม่พบข้อมูลการสมัคร");
      setApplicationData(null);
    }
  };

  // ฟังก์ชันเมื่อผู้ใช้กดปุ่มบันทึกเพื่ออัปเดตข้อมูล
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.put(`http://localhost:3000/api/application/${nationalId}`, applicationData);
      setMessage("บันทึกข้อมูลสำเร็จจ้า");
    } catch (err) {
      setError("เกิดข้อผิดพลาดขณะบันทึกข้อมูล");
    }
    
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงในฟอร์มแก้ไขข้อมูล
  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({ ...applicationData, [name]: value });
  };

  return (
    <div className="container p-6">
      <h1 className="text-4xl font-bold text-center text-pink-500 mb-8 pt-10">
        แก้ไขข้อมูลการสมัคร
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchApplicationData();
        }}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          ค้นหาผู้สมัครด้วยเลขบัตรประชาชน
        </h2>

        <div className="mb-4">
          <input
            type="text"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            placeholder="กรุณาใส่เลขบัตรประชาชน"
            required
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ค้นหาข้อมูล
        </button>
      </form>

      {/* แสดงฟอร์มแก้ไขข้อมูลเมื่อพบข้อมูล */}
      {applicationData && (
        <form onSubmit={handleUpdate} className="mt-6">
          <h3 className="text-2xl font-bold text-center mb-6">แก้ไขข้อมูล</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              name="title"
              value={applicationData.title}
              onChange={handleChange}
              placeholder="คำนำหน้า"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              name="name"
              value={applicationData.name}
              onChange={handleChange}
              placeholder="ชื่อ"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              name="nationalId"
              value={applicationData.nationalId}
              onChange={handleChange}
              placeholder="เลขบัตรประชาชน"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              name="dob"
              value={applicationData.dob}
              onChange={handleChange}
              placeholder="วันเกิด"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              name="age"
              value={applicationData.age}
              onChange={handleChange}
              placeholder="อายุ"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              name="religion"
              value={applicationData.religion}
              onChange={handleChange}
              placeholder="ศาสนา"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              name="ethnicity"
              value={applicationData.ethnicity}
              onChange={handleChange}
              placeholder="เชื้อชาติ"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              name="nationality"
              value={applicationData.nationality}
              onChange={handleChange}
              placeholder="สัญชาติ"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              name="phone"
              value={applicationData.phone}
              onChange={handleChange}
              placeholder="เบอร์โทรศัพท์"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              name="address"
              value={applicationData.address}
              onChange={handleChange}
              placeholder="ที่อยู่"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              name="previousSchool"
              value={applicationData.previousSchool}
              onChange={handleChange}
              placeholder="previousSchool"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              name="gpa"
              value={applicationData.gpa}
              onChange={handleChange}
              placeholder="gpa"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              name="gradeApplyingFor"
              value={applicationData.gradeApplyingFor}
              onChange={handleChange}
              placeholder="gradeApplyingFor"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {/* เพิ่ม input fields สำหรับฟิลด์อื่น ๆ ที่ต้องการแก้ไข */}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            บันทึกการเปลี่ยนแปลง
          </button>
        </form>
      )}

      {/* แสดงข้อความสถานะหรือข้อผิดพลาด */}
      {message && <p className="text-green-500 text-center mt-4">{message}</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default EditApplication;
