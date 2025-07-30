import {FaInstagram, FaLinkedinIn, FaGithub} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold mb-2">SeminarHub</h2>
          <p className="text-sm text-gray-400 max-w-xs">
            Platform untuk menemukan seminar inspiratif dan membangun koneksi
            baru.
          </p>
        </div>
        {/*  Media sosial */}
        <div className="text-center sm:text-right">
          <h3 className="text-lg font-semibold mb-2">Ikuti Saya</h3>
          <div className="flex justify-center sm:justify-end space-x-2">
            <a
              href="https://www.instagram.com/izall10_?utm_source=qr&igsh=d294OTM1cGtlYzh6"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/Afrizal-10"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/afrizal-b8242431b"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 text-center text-sm text-gray-400 py-4">
        &copy; {new Date().getFullYear()} Seminar || Adi Juliyanto Afrizal.
      </div>
    </footer>
  );
};

export default Footer;
