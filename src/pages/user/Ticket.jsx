import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const Ticket = () => {
  const {id} = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${api}/api/registrations/${id}`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        setTicket(res.data);
      } catch (error) {
        console.error("Gagal ambil tiket:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [api, id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!ticket)
    return <div className="text-center mt-10">Tiket tidak ditemukan.</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-blue-200">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-t-2xl" />

        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          🎫 Seminar E-Ticket
        </h1>

        <div className="space-y-3 text-gray-800 text-sm leading-relaxed">
          <div>
            <span className="font-semibold text-gray-900">👤 Nama:</span>{" "}
            {ticket.user?.name}
          </div>
          <div>
            <span className="font-semibold text-gray-900">📧 Email:</span>{" "}
            {ticket.user?.email}
          </div>
          <div>
            <span className="font-semibold text-gray-900">📌 Seminar:</span>{" "}
            {ticket.seminar.title}
          </div>
          <div>
            <span className="font-semibold text-gray-900">📍 Lokasi:</span>{" "}
            {ticket.seminar.location}
          </div>
          <div>
            <span className="font-semibold text-gray-900">🗓️ Tanggal:</span>{" "}
            {new Date(ticket.seminar.date).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="text-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=ID:${ticket._id}&size=100x100`}
              alt="QR Code"
              className="rounded-md shadow"
            />
            <p className="text-xs text-gray-500 mt-1">Scan saat hadir</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
