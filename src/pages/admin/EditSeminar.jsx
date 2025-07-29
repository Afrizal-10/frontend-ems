import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const EditSeminar = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    location: "",
    date: "",
    capacity: "",
    description: "",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    const fetchSeminar = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${api}/api/seminars/${id}`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        const seminar = res.data;

        setFormData({
          title: seminar.title || "",
          speaker: seminar.speaker || "",
          location: seminar.location || "",
          date: seminar.date ? seminar.date.split("T")[0] : "",
          capacity: seminar.capacity || "",
          description: seminar.description || "",
          image: null,
          imagePreview: seminar.image || "", // Langsung dari Cloudinary
        });
      } catch (error) {
        console.error("Gagal ambil data seminar:", error);
        alert("Gagal ambil data seminar");
      }
    };

    fetchSeminar();
  }, [id, api]);

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
        imagePreview: files[0]
          ? URL.createObjectURL(files[0])
          : formData.imagePreview,
      });
    } else {
      setFormData({...formData, [name]: value});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      data.append("title", formData.title);
      data.append("speaker", formData.speaker);
      data.append("location", formData.location);
      data.append("date", formData.date);
      data.append("capacity", formData.capacity);
      data.append("description", formData.description);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.put(`${api}/api/seminars/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Seminar berhasil diperbarui");
      navigate("/admin");
    } catch (error) {
      console.error("Gagal update seminar:", error);
      alert("Gagal update seminar");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Edit Seminar</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Judul"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="speaker"
          placeholder="Pembicara"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={formData.speaker}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Lokasi"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Kapasitas"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={formData.capacity}
          onChange={handleChange}
          min={1}
          required
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Foto Saat Ini:</label>
          {formData.imagePreview ? (
            <img
              src={formData.imagePreview}
              alt="Preview"
              className="w-40 h-24 object-cover rounded"
            />
          ) : (
            <span>No Image</span>
          )}
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full mb-4"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditSeminar;
