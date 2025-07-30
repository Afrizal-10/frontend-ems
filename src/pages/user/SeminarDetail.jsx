import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {showErrorAlert, showSuccessAlert} from "../../utils/swetAlert";

const api = import.meta.env.VITE_API_URL;

const SeminarDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [seminar, setSeminar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
  });

  useEffect(() => {
    const fetchSeminar = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${api}/api/seminars/${id}`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        setSeminar(res.data);
      } catch (error) {
        console.error("Gagal mengambil data seminar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeminar();
  }, [id]);

  const handleInput = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${api}/api/registrations`,
        {
          seminarId: id,
          fullName: form.fullName,
          phone: form.phone,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );
      showSuccessAlert("Pendaftaran berhasil!");
      navigate(`/ticket/${res.data.registration._id}`);
    } catch (error) {
      showErrorAlert(error.response?.data?.message || "Gagal mendaftar");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!seminar) return <p>Seminar tidak ditemukan.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      {seminar.image && (
        <img
          src={seminar.image}
          alt={seminar.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{seminar.title}</h1>
      <p className="text-gray-700 mb-1">Speaker: {seminar.speaker}</p>
      <p className="text-gray-700 mb-1">Location: {seminar.location}</p>
      <p className="text-gray-700 mb-1">
        Date: {new Date(seminar.date).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-1">Capacity: {seminar.capacity}</p>
      <p className="mt-4 mb-4">{seminar.description}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Formulir Pendaftaran</h2>
        <div className="mb-3">
          <label className="block text-sm">Nama Lengkap</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleInput}
            className="w-full border rounded px-3 py-2"
            placeholder="Masukkan nama lengkap"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm">No. HP</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleInput}
            className="w-full border rounded px-3 py-2"
            placeholder="Masukkan nomor HP aktif"
          />
        </div>
        <button
          onClick={handleRegister}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Daftar
        </button>
      </div>
    </div>
  );
};

export default SeminarDetail;
