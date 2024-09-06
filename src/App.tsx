import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ModalEdit from "./components/ModalEdit";
import ModalView from "./components/ModalView";
import { setUsers } from "./reducer/userSlice";
import { RootState } from "./store";
import { UserTypes } from "./types/types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);

  const [selectedUser, setSelectedUser] = useState<UserTypes | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    username: "",
    address: {
      street: "",
      city: "",
      suite: "",
      geo: {
        lat: "",
        lng: "",
      },
      zipcode: "",
    },
    company: {
      name: "",
      bs: "",
      catchPhrase: "",
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  // Handle delete user
  const handleDelete = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    dispatch(setUsers(updatedUsers));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Open edit modal and populate form
  const openEditModal = (user: UserTypes) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      username: user.username!,
      email: user.email,
      phone: user.phone,
      website: user.website,
      address: {
        street: user.address.street,
        city: user.address.city,
        suite: user.address.suite,
        geo: {
          lat: user.address.geo.lat,
          lng: user.address.geo.lng,
        },
        zipcode: user.address.zipcode,
      },
      company: {
        name: user.company.name,
        bs: user.company.bs,
        catchPhrase: user.company.catchPhrase,
      },
    });
    setIsEditModalOpen(true);
  };

  // Submit edit form
  const handleEditSubmit = () => {
    const updatedUsers = users.map((user) =>
      user.id === selectedUser?.id ? { ...user, ...editForm } : user
    );
    dispatch(setUsers(updatedUsers));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsEditModalOpen(false);
  };

  // Open view modal
  const openViewModal = (user: UserTypes) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };
  return (
    <div className="">
      <Navbar />
      <Hero />
      <div className="flex flex-col justify-center h-full mt-10 py-16">
        <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Users</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Phone</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {users?.map((user) => (
                    <tr key={user.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <img
                              className="rounded-full"
                              src={`https://picsum.photos/100/100?random=${user.id}`}
                              width="40"
                              height="40"
                              alt="Alex Shatov"
                            />
                          </div>
                          <div className="font-medium text-gray-800">
                            {user.name}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{user.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">
                          {user.phone}
                        </div>
                      </td>
                      <td className="p-2 space-x-2 text-center">
                        <button
                          onClick={() => openViewModal(user)}
                          className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                          title="View User"
                        >
                          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <HiOutlineEye size={24} />
                          </span>
                        </button>
                        <button
                          onClick={() => openEditModal(user)}
                          className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                          title="Edit User"
                        >
                          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <HiOutlinePencil size={24} />
                          </span>
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-red-700 hover:bg-gray-900/10 active:bg-gray-900/20"
                          title="Delete User"
                        >
                          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <HiOutlineTrash size={24} />
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* </section> */}

      <ModalEdit
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        editForm={editForm}
        setEditForm={setEditForm}
        onSave={handleEditSubmit}
      />

      {/* View Modal */}
      {isViewModalOpen && selectedUser && (
        <ModalView
          selectedUser={selectedUser}
          setIsViewModalOpen={setIsViewModalOpen}
        />
      )}

      <Footer />
    </div>
  );
};

export default App;
