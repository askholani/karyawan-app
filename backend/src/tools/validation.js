const Yup = require("yup");

const userValidation = Yup.object().shape({
  fullName: Yup.string().required("Nama lengkap wajib diisi"),
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username hanya boleh huruf, angka, dan underscore"
    )
    .required("Username wajib diisi"),
  ktp: Yup.string()
    .matches(/^[0-9]+$/, "Nomor KTP hanya boleh angka")
    .required("Nomor KTP wajib diisi"),
  gender: Yup.string().required("Jenis kelamin wajib dipilih"),
  birthPlace: Yup.string().required("Tempat lahir wajib diisi"),
  birthDate: Yup.date().required("Tanggal lahir wajib diisi"),
  phone: Yup.string().matches(/^[0-9]+$/, "Nomor telepon hanya boleh angka"),
  province: Yup.string().required("Provinsi wajib dipilih"),
  city: Yup.string().required("Kabupaten atau Kota wajib dipilih"),
  subdistrict: Yup.string().required("Kecamatan wajib dipilih"),
  headman: Yup.string().required("Kelurahan wajib dipilih"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
  role: Yup.array().min(1, "Pilih setidaknya satu peran"),
  startContract: Yup.date().required("Tanggal mulai kontrak wajib diisi"),
  endContract: Yup.date().required("Tanggal selesai kontrak wajib diisi"),
  address: Yup.string().required("Alamat wajib diisi"),
  bpjsCode: Yup.string().required("Nomor BPJS wajib diisi"),
  martial: Yup.string().required("Status pernikahan wajib dipilih"),
});

module.exports = { userValidation };
