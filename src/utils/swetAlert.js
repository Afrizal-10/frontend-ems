import Swal from "sweetalert2";

// Success alert
export const showSuccessAlert = (message = "Berhasil!", title = "Sukses") => {
  Swal.fire({
    icon: "success",
    title,
    text: message,
    confirmButtonColor: "#3085d6",
  });
};

// Error alert
export const showErrorAlert = (
  message = "Terjadi kesalahan!",
  title = "Gagal"
) => {
  Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonColor: "#d33",
  });
};

// Confirm alert
export const showConfirmAlert = async (
  message = "Data akan dihapus secara permanen!",
  title = "Yakin ingin menghapus?"
) => {
  const result = await Swal.fire({
    title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  return result.isConfirmed;
};

// confirm logout
export const showConfirmAlertLogout = async (title = "Yakin ingin logout") => {
  const result = await Swal.fire({
    title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  return result.isConfirmed;
};
