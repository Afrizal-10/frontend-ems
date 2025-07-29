import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {showErrorAlert, showSuccessAlert} from "../../utils/swetAlert";

const AddSeminar = () => {
  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    location: "",
    date: "",
    description: "",
    capacity: "",
    image: null,
  });

  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if (name === "image") {
      setFormData({...formData, image: files[0]});
    } else {
      setFormData({...formData, [name]: value});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("date", formData.date);
    data.append("speaker", formData.speaker);
    data.append("capacity", formData.capacity);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${api}/api/seminars`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccessAlert("Seminar berhasil ditambahkan");
      navigate("/admin");

      // Reset form
      setFormData({
        title: "",
        location: "",
        date: "",
        description: "",
        speaker: "",
        capacity: "",
        image: null,
      });
    } catch (error) {
      console.error("Error saat mengirim data:", error);
      showErrorAlert("Gagal menambahkan seminar");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Tambah Seminar</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Judul"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          onChange={handleChange}
          value={formData.title}
          required
        />
        <input
          type="text"
          name="speaker"
          placeholder="Pembicara"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          onChange={handleChange}
          value={formData.speaker}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Lokasi"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          onChange={handleChange}
          value={formData.location}
          required
        />
        <input
          type="date"
          name="date"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          onChange={handleChange}
          value={formData.date}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Kapasitas"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          onChange={handleChange}
          value={formData.capacity}
          required
          min={1}
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          onChange={handleChange}
          value={formData.description}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full mb-4"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default AddSeminar;
