// src/dashboard/users.page.tsx

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { OrderByDirection, Timestamp } from "firebase/firestore";
import { User, UserSortKey } from "../types/default-type";
import useUserStore from "../store/users-store";

export default function UsersPage() {
  const { 
    users, hasPreviousPage, hasNextPage,
    fetchAllUsers, loadUsersForSearch, deleteUserById
  } = useUserStore();

  const [error, setError] = useState<string | undefined>();
  const [loading, setPageLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // For success/error messages

  const [selectedSort, setSelectedSort] = useState<UserSortKey>("name");
  const [selectedOrder, setSelectedOrder] = useState<OrderByDirection>("asc");
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchUsers, setSearchUsers] = useState<User[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchPage, setSearchPage] = useState(0);
  const searchLoadStarted = useRef(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // For confirmation dialog
  const [userToDelete, setUserToDelete] = useState<string | null>(null); // Store user ID to delete

  const fetchUsers = useCallback(async (direction: "next" | "prev" | '') => {
    setPageLoading(true);
    setError(undefined);
    try {
      const { firstUser: currentFirstUser, lastUser: currentLastUser } = useUserStore.getState();
      const res = await fetchAllUsers(
        selectedLimit,
        direction === "next" ? currentLastUser : null,
        direction === "prev" ? currentFirstUser : null,
        direction || 'next',
        selectedSort,
        selectedOrder
      );
      if (!res?.success) {
        setError(res?.error || "Failed to fetch users.");
      }
    } catch {
      setError("Network error. Please check your internet connection.");
    } finally {
      setPageLoading(false);
    }
  }, [fetchAllUsers, selectedLimit, selectedOrder, selectedSort]);

  useEffect(() => {
    fetchUsers("");
  }, [fetchUsers]);

  const toggleSortOrder = () => {
    setSelectedOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setSearchPage(0);

    if (!value.trim() || searchLoadStarted.current) return;

    searchLoadStarted.current = true;
    setSearchLoading(true);
    setError(undefined);
    void loadUsersForSearch().then((result) => {
      if (result.success && Array.isArray(result.data)) {
        setSearchUsers(result.data as User[]);
      } else {
        setError(result.error || "Failed to load users for search.");
        searchLoadStarted.current = false;
      }
    }).finally(() => setSearchLoading(false));
  };

  const isSearchActive = searchTerm.trim().length > 0;
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase();
  const matchingUsers = (searchUsers ?? [])
    .filter((user) =>
      [user.name, user.email, user.phone, user.role]
        .some((value) => value?.toLocaleLowerCase().includes(normalizedSearchTerm))
    )
    .sort((leftUser, rightUser) => {
      const getSortValue = (user: User) => {
        const value = user[selectedSort];
        return value instanceof Timestamp
          ? value.toMillis()
          : String(value ?? "").toLocaleLowerCase();
      };
      const leftValue = getSortValue(leftUser);
      const rightValue = getSortValue(rightUser);
      const comparison = leftValue < rightValue ? -1 : leftValue > rightValue ? 1 : 0;
      return selectedOrder === "asc" ? comparison : -comparison;
    });
  const displayedUsers = isSearchActive
    ? matchingUsers.slice(searchPage * selectedLimit, (searchPage + 1) * selectedLimit)
    : users ?? [];
  const searchPageCount = Math.ceil(matchingUsers.length / selectedLimit);

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
        setSearchUsers((current) => current?.filter((user) => user.id !== userToDelete) ?? null);
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
    <div className="p-2 sm:p-6">
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
      <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Search name, email, phone, or role"
          aria-label="Search users"
          className="w-full rounded-lg border px-3 py-2 sm:w-72"
        />
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

        <label className="hidden sm:inline-block">Per page:</label>
        <select
          value={selectedLimit}
          onChange={(e) => {
            setSelectedLimit(Number(e.target.value));
            setSearchPage(0);
          }}
          className="px-3 py-1 border rounded-lg"
        >
          {[10,20,50,100].map((item, key) => (
            <option key={key} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white w-full shadow-md rounded-lg p-4">
        {(loading || searchLoading) && <p role="status" className="mb-3 text-sm text-gray-600">Loading users...</p>}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <table className="w-full border-collapse">
          <thead className="hidden md:table-row-group">
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
              {displayedUsers.length > 0 &&
              displayedUsers.map((user: User) => (
                <tr key={user.id} className="border-b w-auto flex flex-col md:table-row">
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
                      onClick={() => user.id && handleDeleteConfirmation(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && !searchLoading && displayedUsers.length === 0 && (!isSearchActive || searchUsers !== null) && (
                <tr><td colSpan={4} className="p-4 text-center text-gray-600">
                  {isSearchActive ? "No matching users found." : "No users found."}
                </td></tr>
              )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => isSearchActive ? setSearchPage((page) => Math.max(0, page - 1)) : fetchUsers("prev")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 cursor-pointer"
          disabled={isSearchActive ? searchPage === 0 : !hasPreviousPage}
        >
          Previous
        </button>

        <button
          onClick={() => isSearchActive ? setSearchPage((page) => page + 1) : fetchUsers("next")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 cursor-pointer"
          disabled={isSearchActive ? searchPage + 1 >= searchPageCount : !hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
