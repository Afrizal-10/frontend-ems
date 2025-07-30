import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const api = import.meta.env.VITE_API_URL;

const Seminars = () => {
  const [seminars, setSeminars] = useState([]);

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${api}/api/seminars`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        setSeminars(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeminars();
  }, []);

  return (
    <div>
      <div className="text-center py-10 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Temukan Seminar Berkualitas
        </h1>
        <p className="text-gray-900 text-sm sm:text-base mt-2">
          Ikuti seminar inspiratif dari pembicara terbaik dan dapatkan tiketmu
          sekarang juga. Belajar dan berkembang bersama komunitas!
        </p>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {seminars.map((seminar) => (
          <div
            key={seminar._id}
            className="bg-gray-100 rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow text-gray-900"
          >
            {seminar.image ? (
              <img
                src={seminar.image}
                alt={seminar.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-900">
                No Image
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{seminar.title}</h3>
              <p className="text-sm text-gray-900 mb-2">
                Speaker: {seminar.speaker}
              </p>
              <p className="text-sm text-gray-900 mb-2">
                Location: {seminar.location}
              </p>
              <p className="text-sm text-gray-900 mb-2">
                Date: {new Date(seminar.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-900 mb-4">
                Capacity: {seminar.capacity}
              </p>
              <Link
                to={`/seminars/${seminar._id}`}
                className="inline-block bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded"
              >
                Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seminars;
