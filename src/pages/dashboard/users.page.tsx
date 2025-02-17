// src/pages/dashboard/users.page.tsx

import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { OrderByDirection } from "firebase/firestore";
import { User, UserSortKey } from "../../types/default-type";
import useUserStore from "../../store/users-store";
import sorabhStore from "../../store/sorabh-store";

export default function UsersPage() {
  const { 
    users, firstUser, lastUser, hasPreviousPage, hasNextPage,
    fetchAllUsers, deleteUserById 
  } = useUserStore();

  const {setLoading} = sorabhStore();
  const [error, setError] = useState<string | undefined>();
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // For success/error messages

  const [selectedSort, setSelectedSort] = useState<UserSortKey>("name");
  const [selectedOrder, setSelectedOrder] = useState<OrderByDirection>("asc");
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [showConfirmation, setShowConfirmation] = useState(false); // For confirmation dialog
  const [userToDelete, setUserToDelete] = useState<string | null>(null); // Store user ID to delete

  const fetchUsers = async (direction: "next" | "prev" | '') => {
    setLoading(true);
    try {
      const res = await fetchAllUsers(
        selectedLimit, 
        direction === "next" ? lastUser : null,
        direction === "prev" ? firstUser : null,
        direction || 'next',
        selectedSort, 
        selectedOrder
      );
      if (!res?.success) {
        setError(res?.error || "Failed to fetch users.");
      } else {
        console.log(`Fetched ${direction} page successfully`);
      }
    } catch (err) {
      setError("Network error. Please check your internet connection.");
    }
    setLoading(false);
  };

  useEffect(() => {
    // Initial load is the first page (no cursors passed)
    fetchUsers("");
  }, [selectedSort, selectedOrder, selectedLimit]);

  const toggleSortOrder = () => {
    setSelectedOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (userId: string) => {
    setUserToDelete(userId);
    setShowConfirmation(true);
  };

  // Handle delete action
  const handleDelete = async () => {
    if (userToDelete) {
      const result = await deleteUserById(userToDelete);
      if (result.success) {
        setAlertMessage("User deleted successfully!");
        fetchUsers("next"); // Refresh user list
      } else {
        setAlertMessage(`Failed to delete user: ${result.error}`);
      }
      setShowConfirmation(false); // Close confirmation dialog
      setUserToDelete(null); // Reset user to delete
    }
  };

  // Close confirmation dialog
  const closeConfirmation = () => {
    setShowConfirmation(false);
    setUserToDelete(null);
  };

  return (
    <div className="p-6">
      <Outlet />
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      {/* Alert Message */}
      {alertMessage && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <p>{alertMessage}</p>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">
              Do you really want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeConfirmation}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sorting and Limit Controls */}
      <div className="mb-4 flex gap-4">
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value as UserSortKey)}
          className="px-3 py-1 border rounded-lg"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="role">Role</option>
          <option value="create_date">Created Date</option>
          <option value="last_login">Last Login</option>
        </select>

        <button
          onClick={toggleSortOrder}
          className="px-3 py-1 bg-gray-500 text-white rounded-lg"
        >
          {selectedOrder === "asc" ? "⬆ Ascending" : "⬇ Descending"}
        </button>

        <select
          value={selectedLimit}
          onChange={(e) => setSelectedLimit(Number(e.target.value))}
          className="px-3 py-1 border rounded-lg"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user: User, index: number) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <Link
                      to={`/dashboard/users/edit/${user.id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteConfirmation(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => fetchUsers("prev")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 cursor-pointer"
          disabled={!hasPreviousPage} // Disable if this is the first page
        >
          Previous
        </button>

        <button
          onClick={() => fetchUsers("next")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 cursor-pointer"
          disabled={!hasNextPage} // Disable if there is no next page
        >
          Next
        </button>
      </div>
    </div>
  );
}
