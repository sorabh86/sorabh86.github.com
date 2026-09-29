import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { User, USER_ROLES } from "../../types/default-type";
import useUserStore from "../../store/users-store";
import { Timestamp } from "firebase/firestore";

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const { users, updateUserById, createUser } = useUserStore();

  const { userId } = useParams<{ userId: string }>();
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [password, setPassword] = useState("");
  const [pendingUser, setPendingUser] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
    role: USER_ROLES;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const saveUser = async (userData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    role: USER_ROLES;
  }, newPassword: string) => {
    setSaving(true);
    setError(null);

    try {
      const result = userId && editedUser
        ? await updateUserById(userId, userData, newPassword || undefined)
        : await createUser({ ...userData, password: newPassword });

      if (!result.success) {
        setError(result.error || "Could not save the user.");
        return;
      }

      navigate("/dashboard/users");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save the user.");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      role: formData.get("role") as USER_ROLES,
    };

    if (editedUser && password) {
      setPendingUser(userData);
      return;
    }

    await saveUser(userData, password);
  };

  // Handle cancel button click
  const handleCancel = () => navigate("/dashboard/users");

  useEffect(() => {
    const user = users?.find((u) => u.id === userId) as User | undefined;
    setEditedUser(user ?? null);
  }, [userId, users]);

  return (
    <div className="mx-2 sm:mx-10 px-4 sm:px-12 py-10 bg-white shadow-md rounded-md mb-6">
      <h2 className="text-xl font-semibold mb-4">{editedUser ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label>Name</label>
        <input type="text" id="name" name="name"
          defaultValue={editedUser ? editedUser.name : ''}
          className="w-full p-2 border rounded" placeholder="Name" required />
        <label>Email</label>
        <input type="email" id="email" name="email"
          defaultValue={editedUser ? editedUser.email : ''}
          className="w-full p-2 border rounded" placeholder="Email" required
          />
        <label htmlFor="password">Password{editedUser ? " (optional)" : ""}</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full p-2 border rounded"
          placeholder={editedUser ? "Leave blank to keep current password" : "Password"}
          autoComplete="new-password"
          minLength={6}
          required={!editedUser}
          aria-describedby="password-note"
        />
        <p id="password-note" className="text-sm text-gray-600">
          {editedUser
            ? "Strict note: leave this field empty to keep the current password. Any entered password replaces it immediately after confirmation (minimum 6 characters)."
            : "Password must be at least 6 characters."}
        </p>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <label>Phone</label>
        <input type="text" id="phone" name="phone"
          defaultValue={editedUser ? editedUser.phone : ''}
          className="w-full p-2 border rounded" placeholder="Phone" required />
        <label>Address</label>
        <textarea name="address" id="address" className="w-full p-2 border rounded" rows={4}
          defaultValue={editedUser ? editedUser.address : ''} />
        <label>Role</label>
        <select id="role" name="role"
          defaultValue={editedUser ? editedUser.role : ''}
          className="w-full p-2 border rounded"
        >
          {Object.values(USER_ROLES).map((role, index) => (
            <option key={index} defaultValue={role}> {role} </option>
          ))}
          {/* <option value="subscriber">Subscriber</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option> */}
        </select>
        
        {editedUser && (
          <>
            <label>last_login</label>
            <p className="w-full p-2 border rounded">{(editedUser.last_login as Timestamp).toDate().toLocaleString()}</p>
          </>
        )}
        {editedUser && (
          <>
            <label>create_date</label>
            <p className="w-full p-2 border rounded">{(editedUser.create_date as Timestamp).toDate().toLocaleString()}</p>
          </>
        )}
        <div className="flex justify-between">
          <button type="submit" disabled={saving} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
            {saving ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={handleCancel} className="bg-gray-300 px-4 py-2 rounded" disabled={saving}>Cancel</button>
        </div>
      </form>
      {pendingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div role="dialog" aria-modal="true" aria-labelledby="password-dialog-title" className="w-full max-w-md rounded bg-white p-6 shadow-xl">
            <h3 id="password-dialog-title" className="mb-3 text-lg font-semibold">Change this user's password?</h3>
            <p className="mb-5 text-sm text-gray-700">
              This immediately replaces the current Firebase Authentication password. The user will need the new password to sign in.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setPendingUser(null);
                  setPassword("");
                }}
                className="rounded bg-gray-200 px-4 py-2"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (pendingUser) void saveUser(pendingUser, password);
                  setPendingUser(null);
                }}
                className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
                disabled={saving}
              >
                Confirm password change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;