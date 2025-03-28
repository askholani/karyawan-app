import React from "react";

import doctor from "../assets/svg/doctor.svg";
import dashboard from "../assets/svg/dashboard.svg";
import visitor from "../assets/svg/visitor.svg";
import patient from "../assets/svg/patient.svg";
import cashier from "../assets/svg/cashier.svg";
import pharmacy from "../assets/svg/medicine-box.svg";
import inventory from "../assets/svg/inventory.svg";
import purchasing from "../assets/svg/cart.svg";

// Data Menu
const menuItems = [
  { label: "Dashboard", icon: dashboard },
  { label: "Pasien", icon: patient },
  { label: "Kunjungan", icon: visitor },
  { label: "Pelayanan", icon: doctor },
  { label: "Kasir", icon: cashier },
  { label: "Farmasi", icon: pharmacy },
  { label: "Inventori", icon: inventory },
  { label: "Purchasing", icon: purchasing },
];

// Komponen Item Sidebar
const SidebarItem = ({ icon, label }) => (
  <li className="py-3 w-100 border-top">
    <a
      href="#"
      className="nav-link text-dark d-flex flex-column justify-content-center align-items-center"
    >
      <img src={icon} alt={label} className="bi" width={20} />
      <p className="mb-0 fs-6">{label}</p>
    </a>
  </li>
);

// Komponen Sidebar
export const Sidebar = () => {
  return (
    <nav
      className="sidebar d-flex flex-column bg-light vh-100 p-2 bg-white shadow-sm overflow-y-scroll position-fixed start-0 z-2"
      style={{ width: "100px" }}
    >
      <ul className="nav flex-column mt-5">
        {menuItems.map((item, index) => (
          <SidebarItem key={index} icon={item.icon} label={item.label} />
        ))}
      </ul>
    </nav>
  );
};
