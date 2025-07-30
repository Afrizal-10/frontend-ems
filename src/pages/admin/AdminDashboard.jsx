import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {
  showConfirmAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../../utils/swetAlert";

const AdminDashboard = () => {
  const [seminars, setSeminars] = useState([]);
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${api}/api/seminars`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSeminars(res.data);
      } catch (err) {
        console.error("Gagal ambil data seminar:", err);
      }
    };

    fetchSeminars();
  }, [api]);

  const handleDelete = async (id) => {
    const confirm = await showConfirmAlert();
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${api}/api/seminars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSeminars((prev) => prev.filter((seminar) => seminar._id !== id));
      showSuccessAlert("Seminar berhasil dihapus.");
    } catch (err) {
      console.error("Gagal hapus seminar:", err);
      showErrorAlert("Gagal menghapus seminar.");
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // Jika sudah URL penuh dari Cloudinary
    if (imagePath.startsWith("http")) return imagePath;

    // Jika path lokal
    const cleanedPath = imagePath.replace(/\\/g, "/");
    return `${api}/${cleanedPath}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Seminar List</h2>
      </div>

      <div className="overflow-x-auto">
        {/* Desktop Table */}
        <table className="min-w-full bg-white shadow-md rounded hidden sm:table">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Foto</th>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Speaker</th>
              <th className="p-3">Location</th>
              <th className="p-3">Date</th>
              <th className="p-3">Capacity</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {seminars.map((seminar) => (
              <tr key={seminar._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  {seminar.image ? (
                    <img
                      src={getImageUrl(seminar.image)}
                      alt={seminar.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="p-3">{seminar.title}</td>
                <td className="p-3">
                  {seminar.description?.slice(0, 60) || "-"}...
                </td>
                <td className="p-3">{seminar.speaker}</td>
                <td className="p-3">{seminar.location}</td>
                <td className="p-3">
                  {new Date(seminar.date).toLocaleDateString()}
                </td>
                <td className="p-3">{seminar.capacity}</td>
                <td className="p-3 flex gap-2">
                  <Link
                    to={`/admin/edit/${seminar._id}`}
                    className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(seminar._id)}
                    className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="flex flex-col gap-4 sm:hidden">
          {seminars.map((seminar) => (
            <div
              key={seminar._id}
              className="bg-white shadow-md rounded p-4 flex gap-4"
            >
              <div className="flex-shrink-0 w-24 h-16 overflow-hidden rounded">
                {seminar.image ? (
                  <img
                    src={getImageUrl(seminar.image)}
                    alt={seminar.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-semibold text-lg">{seminar.title}</h3>
                  <p className="text-sm text-gray-600">
                    Description: {seminar.description?.slice(0, 60) || "-"}...
                  </p>
                  <p className="text-sm text-gray-600">
                    Speaker: {seminar.speaker || "-"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Location: {seminar.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(seminar.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Capacity: {seminar.capacity}
                  </p>
                </div>
                <div className="mt-2 flex gap-2">
                  <Link
                    to={`/admin/edit/${seminar._id}`}
                    className="inline-block bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(seminar._id)}
                    className="inline-block bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
