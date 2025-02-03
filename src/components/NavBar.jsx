import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

// Función para unir clases condicionalmente
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
  const { permissions } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Determinamos qué secciones se pueden ver según los permisos
  const canViewEmployees = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_employees"
  );
  const canViewCustomers = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_customers"
  );
  const canViewProducts = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_products"
  );
  const canViewOrders = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_orders"
  );
  const canViewRepairs = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_repairs"
  );
  const canViewInvoices = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_invoices"
  );
  const canViewFinancialReports = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_financial_reports"
  );
  const canViewRoles = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_roles"
  );

  // Definimos los links de navegación según las condiciones del usuario.
  // En este ejemplo, se omite el link si ya estamos en la ruta correspondiente.
  const navigation = [
    {
      name: "Employees",
      href: "/employees",
      show: canViewEmployees && location.pathname !== "/employees",
    },
    {
      name: "Customers",
      href: "/customers",
      show: canViewCustomers && location.pathname !== "/customers",
    },
    {
      name: "Products",
      href: "/products",
      show: canViewProducts && location.pathname !== "/products",
    },
    {
      name: "Orders",
      href: "/orders",
      show: canViewOrders && location.pathname !== "/orders",
    },
    {
      name: "Repairs",
      href: "/repairs",
      show: canViewRepairs && location.pathname !== "/repairs",
    },
    {
      name: "Invoices",
      href: "/invoices",
      show: canViewInvoices && location.pathname !== "/invoices",
    },
    {
      name: "Financial Reports",
      href: "/financial-reports",
      show:
        canViewFinancialReports && location.pathname !== "/financial-reports",
    },
    {
      name: "Roles",
      href: "/roles",
      show: canViewRoles && location.pathname !== "/roles",
    },
  ].filter((link) => link.show);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Botón para menú móvil */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[state=open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[state=open]:block"
              />
            </DisclosureButton>
          </div>
          {/* Logo y links principales */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                className="block h-8 w-auto cursor-pointer"
                onClick={() => navigate("/dashboard")}
              />
            </div>
            {/* Links de navegación en escritorio */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      // Si estuviera en la ruta actual, se podría marcar de otra forma.
                      // En este caso se omiten los links de la ruta actual, según la lógica original.
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Sección derecha: notificaciones y dropdown de perfil */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Dropdown del perfil */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="/Not_found"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Your Profile
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="/Not_found"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Settings
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="/Not_found"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Sign out
                    </Link>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              className={classNames(
                "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default NavBar;
