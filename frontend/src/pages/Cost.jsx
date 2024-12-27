import Foot from "@/components/footer";
import React from "react";

const Cost = () => {
  const tuitionData = [
    {
      subject: "วิทยาศาสตร์ - คณิตศาสตร์ (AI-Robotic-Coding)",
      term1: "11,150",
      term2: "10,400",
    },
    {
      subject:
        "วิทยาศาสตร์ - คณิตศาสตร์ (เพชรกัลปพฤกษ์) + ค่าเรียนเสริมเพื่อพัฒนาศักยภาพเทอมละ 7,000 บาท",
      term1: "4,150 + 7,000",
      term2: "3,400 + 7,000",
    },
    {
      subject: "วิทยาศาสตร์ - คณิตศาสตร์",
      term1: "4,150",
      term2: "3,400",
    },
    {
      subject: "คณิตศาสตร์ - อังกฤษ (ธุรกิจการบิน)",
      term1: "7,150",
      term2: "6,400",
    },
    {
      subject: "คณิตศาสตร์ - อังกฤษ",
      term1: "4,150",
      term2: "3,400",
    },
    {
      subject: "ภาษาอังกฤษ - ภาษาจีน",
      term1: "6,150",
      term2: "5,400",
    },
    {
      subject: "ภาษาอังกฤษ - ภาษาญี่ปุ่น",
      term1: "6,150",
      term2: "5,400",
    },
    {
      subject: "ภาษาอังกฤษ - ภาษาเกาหลี",
      term1: "6,150",
      term2: "5,400",
    },
    {
      subject: "พลศึกษา",
      term1: "6,150",
      term2: "5,400",
    },
    {
      subject: "ทวีศึกษา",
      term1: "4,150",
      term2: "3,400",
    },
  ];
  const totalExpenses = (term1, term2) => term1 + term2;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-2 py-10 flex flex-col items-center">
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-bold text-center text-pink-500 mb-8">
            ค่าบำรุงการศึกษา
          </h1>
          <div className="overflow-hidden rounded-lg shadow-lg mb-8">
            <table className="min-w-full bg-white">
              <thead> 
                {/* table head */}
                <tr className="bg-pink-500 text-white text-lg">
                  <th className="py-3 px-4">วิชา</th>
                  <th className="py-3 px-4">ภาคเรียนที่ 1</th>
                  <th className="py-3 px-4">ภาคเรียนที่ 2</th>
                </tr>
              </thead>
              <tbody>
                                {/* table body */}

                {tuitionData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-200 transition duration-300 ease-in-out "
                  >
                    <td className="py-2 px-4 text-left">{item.subject}</td>
                    <td className="py-2 px-4 text-left">{item.term1} บาท</td>
                    <td className="py-2 px-4 text-left">{item.term2} บาท</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <style jsx>{`
            table {
              animation: fadeIn 1s ease-in;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      </main>
      <Foot/>
    </div>
  );
};

export default Cost;
