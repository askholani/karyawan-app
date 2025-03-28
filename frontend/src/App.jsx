import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserValidationSchema } from "./helpers/validation";
import RadioInput from "./components/Input/RadioInput";
import CheckboxInput from "./components/Input/CheckboxInput";
import TextInput from "./components/Input/TextInput";
import SelectInput from "./components/Input/SelectInput";
import DateInput from "./components/Input/DateInput";
import { useEffect, useState } from "react";
import DomicileService from "./core/use-cases/DomicileService";
import UserService from "./core/use-cases/UserService";
import UserRepository from "./repositories/UserRepository";

const App = () => {
  const {
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserValidationSchema),
    defaultValues: {
      role: [],
    },
  });

  const userRepository = new UserRepository("http://localhost:4091/api/user");
  const userService = new UserService(userRepository);

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [subdistrict, setSubdistrict] = useState([]);
  const [headman, setHeadman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const domicileService = new DomicileService();
        const [provinceData, userData] = await Promise.all([
          domicileService.getProvinces(),
          userService.get(),
        ]);

        setProvinces(
          provinceData.map((province) => ({
            label: province.nama,
            value: province.kode,
          }))
        );

        // console.log("userData", userData.data);
        setUser(userData.data);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("user", user);

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toISOString().split("T")[0] : "";
  };

  const handleShowUpdate = (index) => {
    const data = user[index];
    setIsEdit(true);
    setValue("fullName", data.fullName);
    setValue("ktp", data.ktp);
    setValue("gender", data.gender);
    setValue("birthPlace", data.birthPlace);
    setValue("birthDate", formatDate(data.birthDate));
    setValue("phone", data.phone);
    setValue("email", data.email);
    setValue("role", data.role); // Array tetap dipertahankan
    setValue("startContract", formatDate(data.startContract));
    setValue("endContract", formatDate(data.endContract));
    setValue("address", data.address);
    setValue("bpjsCode", data.bpjsCode);
    setValue("martial", data.martial);
    setValue("username", data.username);
  };

  const onSubmit = async (data) => {
    try {
      const mappedData = {
        ...data,
        province: provinces.find((p) => p.value === data.province)?.label || "",
        city: cities.find((c) => c.value === data.city)?.label || "",
        subdistrict:
          subdistrict.find((s) => s.value === data.subdistrict)?.label || "",
        headman: headman.find((h) => h.value === data.headman)?.label || "",
      };

      if (!isEdit) {
        const res = await userService.create(mappedData);
        console.log("res", res);
      } else {
        const res = await userService.update(mappedData);
        console.log("res", res);
        setIsEdit(false);
      }

      const userData = await userService.get();
      setUser(userData.data);
      reset();
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  const onProvinceChange = async (id) => {
    try {
      console.log("get province id", id);
      const domicileService = new DomicileService();
      const data = await domicileService.getCities(id);

      const citiesData = data.map((cities) => ({
        label: cities.nama,
        value: cities.kode,
      }));

      setCities(citiesData);
    } catch (error) {
      console.error(error);
    }
  };

  const onCityChange = async (id) => {
    try {
      console.log("city id", id);
      const domicileService = new DomicileService();
      const data = await domicileService.getSubdistricts(id);

      const subdistrictData = data.map((subdistrict) => ({
        label: subdistrict.nama,
        value: subdistrict.kode,
      }));

      console.log("subdistrictData", subdistrictData);

      setSubdistrict(subdistrictData);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubdistrictChange = async (id) => {
    try {
      const domicileService = new DomicileService();
      const data = await domicileService.getHeadmen(id);

      const headmandData = data.map((subdistrict) => ({
        label: subdistrict.nama,
        value: subdistrict.kode,
      }));
      console.log("headmandData", headmandData);

      setHeadman(headmandData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="d-flex flex-column h-100 bg-light"
      style={{ minHeight: "100vh" }}
    >
      <Navbar />
      <div className="d-flex w-100" style={{ paddingLeft: "100px" }}>
        <Sidebar />
        <div
          className="container-fluid w-100"
          style={{ marginTop: "80px", maxWidth: "100vw" }}
        >
          {/* Perbaikan utama di bagian ini */}
          <div className="row w-100 g-2 d-flex flex-nowrap column-gap-4 px-4">
            <div className="col-4 bg-white p-3 d-flex flex-column shadow-sm row-gap-3">
              <div className="d-flex justify-content-between">
                <h5 className="fw-bold text-uppercase fs-6">
                  data karyawan & tenaga kesehatan
                </h5>
                <div className="dropdown">
                  <button
                    type="button"
                    className="nav-link text-dark"
                    itemType="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-three-dots"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end  text-xs">
                    <li className="d-flex column-gap-2 px-2 text-capitalize align-items-center">
                      <i className="bi bi-plus-lg "></i>
                      <p>tambah karyawan</p>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="d-flex column-gap-2 px-2 text-capitalize align-items-center">
                      <i className="bi bi-copy "></i>
                      <p>salin data karyawan</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="d-flex flex-column ">
                <h5 className="text-capitalize fs-6">Status</h5>
                <ul className="nav nav-pills nav-fill text-uppercase bg-light text-xs p-2 rounded-2 fw-bold border">
                  <li className="nav-item">
                    <a
                      className="nav-link active py-1  text-dark bg-white shadow-sm"
                      aria-current="page"
                      href="#"
                    >
                      semua
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link py-1" href="#">
                      aktif
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link py-1" href="#">
                      non-aktif
                    </a>
                  </li>
                </ul>
              </div>
              <div className="d-flex flex-column row-gap-3">
                <form className="d-flex" role="search">
                  <div className="input-group">
                    <input
                      className="form-control text-sm"
                      type="search"
                      placeholder="Pencarian"
                      aria-label="Search"
                    />
                    <button
                      className="btn border input-group-text bg-white cursor-pointer"
                      type="submit"
                    >
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </form>

                <table className="table table-bordered rounded-3 text-capitalize">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="text-sm"
                        style={{ width: "40px" }}
                      >
                        No.
                      </th>
                      <th scope="col" colSpan={2} className="text-sm">
                        Karyawan / Tenaga Kesehatan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.length > 0 &&
                      user.map((item, index) => (
                        <tr key={index}>
                          <th scope="row" className="text-sm">
                            {index + 1}
                          </th>
                          <td>
                            <div className="d-flex flex-column">
                              <p className="text-base fw-bold">
                                {item.fullName}
                              </p>
                              <span className="text-xs fw-light">
                                {item.role.join(", ")}
                              </span>
                              <div className="w-auto">
                                <span
                                  className={`badge text-bg-${
                                    item.isActive ? "success" : "danger"
                                  }`}
                                >
                                  {item.isActive ? "Aktif" : "non-aktif"}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="text-center" style={{ width: "50px" }}>
                            <button
                              onClick={() => handleShowUpdate(index)}
                              type="button"
                              className="btn btn-sm btn-primary rounded-circle"
                            >
                              <i className="bi bi-arrow-right"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-8 bg-white shadow-sm p-3 text-sm">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h5 className="fw-bold text-uppercase fs-6">
                  Form Tambah Karyawan
                </h5>

                <div className="row w-100 g-4 d-flex flex-nowrap row-cols-2">
                  <div className="col row-gap-2 d-flex flex-column">
                    <TextInput
                      label="Nama Lengkap"
                      id="fullName"
                      register={register}
                      error={errors.fullName}
                    />
                    <TextInput
                      label="No. Kartu Identitas (KTP)"
                      id="ktp"
                      register={register}
                      error={errors.ktp}
                    />
                    <RadioInput
                      label="Jenis Kelamin"
                      name="gender"
                      register={register}
                      error={errors.gender}
                      options={[
                        { value: "male", label: "Laki-Laki" },
                        { value: "female", label: "Perempuan" },
                      ]}
                    />
                    <TextInput
                      label="Tempat Lahir"
                      id="birthPlace"
                      register={register}
                      error={errors.birthPlace}
                    />
                    <DateInput
                      label="Tanggal Lahir"
                      id="birthDate"
                      register={register}
                      error={errors.birthDate}
                    />
                    <TextInput
                      label="No. Telepon"
                      id="phone"
                      register={register}
                      error={errors.phone}
                    />

                    <div className="row d-flex flex-column">
                      <div className="row d-flex flex-nowrap column-gap-2">
                        <SelectInput
                          className={"mb-2 col"}
                          label="Provinsi"
                          id="province"
                          register={register}
                          options={[
                            { value: "", label: "Pilih Provinsi" },
                            ...provinces,
                          ]}
                          onChange={(id) => onProvinceChange(id)}
                          error={errors.province}
                        />

                        <SelectInput
                          className={"mb-2 col"}
                          label="Kota/Kabupaten"
                          id="city"
                          register={register}
                          options={[
                            { value: "", label: "Pilih Kota/Kabupaten" },
                            ...cities,
                          ]}
                          onChange={(id) => onCityChange(id)}
                          error={errors.city}
                        />
                      </div>

                      <div className="row d-flex flex-nowrap column-gap-2">
                        <SelectInput
                          className={"mb-2 col"}
                          label="Kecamatan"
                          id="subdistrict"
                          register={register}
                          onChange={(id) => onSubdistrictChange(id)}
                          options={[
                            { value: "", label: "Pilih Kecamatan" },
                            ...subdistrict,
                          ]}
                          error={errors.subdistrict}
                        />
                        <SelectInput
                          className={"mb-2 col"}
                          label="Kelurahan"
                          id="headman"
                          register={register}
                          options={[
                            { value: "", label: "Pilih Kelurahan" },
                            ...headman,
                          ]}
                          error={errors.headman}
                        />
                      </div>
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="address"
                        className="form-label text-sm fw-medium"
                      >
                        Detail Alamat
                      </label>
                      <textarea
                        className={`form-control ${
                          errors.address ? "is-invalid" : ""
                        }`}
                        id="address"
                        {...register("address")}
                        placeholder="Alamat"
                        style={{ height: "100px" }}
                      ></textarea>
                      {errors.address && (
                        <div className="invalid-feedback">
                          {errors.address.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col row-gap-2 d-flex flex-column">
                    <TextInput
                      label="Username"
                      id="username"
                      register={register}
                      error={errors.username}
                    />

                    <TextInput
                      label="Email"
                      id="email"
                      register={register}
                      error={errors.email}
                    />
                    <TextInput
                      type={"password"}
                      label="Password"
                      id="password"
                      register={register}
                      error={errors.password}
                    />

                    <CheckboxInput
                      watch={watch}
                      label="Tipe"
                      name="role"
                      setValue={setValue}
                      register={register}
                      error={errors.role}
                      options={{
                        left: [
                          { value: "manager", label: "Manager", input: false },
                          { value: "admin", label: "Admin", input: false },
                          {
                            value: "receptionist",
                            label: "Resepsionis",
                            input: false,
                          },
                          {
                            value: "management",
                            label: "Management",
                            input: false,
                          },
                          { value: "finance", label: "Finance", input: false },
                          { value: "cashier", label: "Kasir", input: false },
                          {
                            value: "purchasing",
                            label: "Purchasing",
                            input: false,
                          },
                        ],
                        right: [
                          { value: "doctor", label: "Dokter", input: false },
                          { value: "nurse", label: "Perawat", input: false },
                          { value: "midwife", label: "Bidan", input: false },
                          { value: "other", label: "Lainnya", input: true },
                        ],
                      }}
                    />

                    <DateInput
                      label="Tanggal Mulai Kontrak"
                      id="startContract"
                      register={register}
                      error={errors.startContract}
                    />
                    <DateInput
                      label="Tanggal Selesai Kontrak"
                      id="endContract"
                      register={register}
                      error={errors.endContract}
                    />

                    <SelectInput
                      label="Status Menikah"
                      id="martial"
                      register={register}
                      options={[
                        { value: "single", label: "Belum Menikah" },
                        { value: "married", label: "Menikah" },
                      ]}
                      error={errors.martial}
                    />

                    <SelectInput
                      label="Kode Dokter BPJS"
                      id="bpjsCode"
                      register={register}
                      options={[
                        { value: "112200", label: "112200" },
                        { value: "112201", label: "112201" },
                        { value: "112202", label: "112202" },
                        { value: "112203", label: "112203" },
                        { value: "112204", label: "112204" },
                      ]}
                      error={errors.bpjsCode}
                    />

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
