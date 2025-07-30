import {useEffect, useState} from "react";
import axios from "axios";

const TicketCard = () => {
  const [tickets, setTickets] = useState([]);
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${api}/api/registrations/me/all`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        setTickets(res.data);
      } catch (error) {
        console.error(
          "Gagal ambil tiket:",
          error.response?.data || error.message
        );
      }
    };
    fetchTickets();
  }, [api]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Tiket Saya</h1>

      {tickets.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Belum ada tiket yang terdaftar.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tickets.map((ticket) =>
            ticket.seminar && ticket.user ? (
              <div
                key={ticket._id}
                className="bg-white rounded-2xl shadow-xl p-6 relative border border-gray-200"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {ticket.seminar.title}
                </h2>
                <div className="text-gray-700 mb-1">
                  📍 {ticket.seminar.location}
                </div>
                <div className="text-gray-500 mb-3">
                  📅{" "}
                  {new Date(ticket.seminar.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  👤 {ticket.user.name} <br />
                  📧 {ticket.user.email}
                </div>
                <div className="flex justify-center mt-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${ticket._id}&size=100x100`}
                    alt="QR Code"
                    className="w-24 h-24"
                  />
                </div>
                <div className="absolute bottom-3 right-4 text-xs text-gray-400">
                  Ticket ID: {ticket._id.slice(-6).toUpperCase()}
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default TicketCard;
