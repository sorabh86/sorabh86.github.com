import { FormEvent, useState } from "react";
import useUserStore from "../store/users-store";

export default function ProfilePage() {
  const { currentUser, updateCurrentUserProfile, changeCurrentUserPassword } = useUserStore();
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentUser?.id) return;
    const form = new FormData(event.currentTarget);
    setSaving(true);
    setMessage("");
    const result = await updateCurrentUserProfile(currentUser.id, {
      name: String(form.get("name") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      address: String(form.get("address") ?? "").trim(),
    });
    setMessage(result.success ? "Profile saved." : result.error ?? "Could not save profile.");
    setSaving(false);
  }

  async function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const currentPassword = String(formData.get("currentPassword") ?? "");
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }

    setSavingPassword(true);
    setPasswordMessage("");
    const result = await changeCurrentUserPassword(currentPassword, newPassword);
    setPasswordMessage(result.success ? "Password changed." : result.error ?? "Could not change password.");
    if (result.success) form.reset();
    setSavingPassword(false);
  }

  return (
    <section className="mx-auto max-w-3xl py-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Account</p>
      <h2 className="mt-2 text-2xl font-semibold text-gray-950">Your profile</h2>
      <p className="mt-2 text-sm text-gray-600">Your role and sign-in email are managed separately.</p>
      <form onSubmit={saveProfile} className="mt-6 space-y-5 border-t border-gray-200 py-6">
        {message && <p role="status" className="text-sm text-blue-800">{message}</p>}
        <label className="block text-sm font-medium text-gray-800">
          Name
          <input name="name" required maxLength={100} defaultValue={currentUser?.name ?? ""} className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2 text-gray-950" />
        </label>
        <label className="block text-sm font-medium text-gray-800">
          Email
          <input type="email" readOnly value={currentUser?.email ?? ""} className="mt-1 block w-full border border-gray-200 bg-gray-100 px-3 py-2 text-gray-600" />
        </label>
        <label className="block text-sm font-medium text-gray-800">
          Phone
          <input name="phone" maxLength={40} defaultValue={currentUser?.phone ?? ""} className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2 text-gray-950" />
        </label>
        <label className="block text-sm font-medium text-gray-800">
          Address
          <textarea name="address" maxLength={300} rows={3} defaultValue={currentUser?.address ?? ""} className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2 text-gray-950" />
        </label>
        <p className="text-xs uppercase text-gray-500">Account type: {currentUser?.role ?? "member"}</p>
        <button type="submit" disabled={saving} className="bg-gray-950 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50">
          {saving ? "Saving..." : "Save profile"}
        </button>
      </form>
      <form onSubmit={savePassword} className="mt-6 space-y-5 border-t border-gray-200 py-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-950">Change password</h3>
          <p className="mt-1 text-sm text-gray-600">Confirm your current password to choose a new one.</p>
        </div>
        {passwordMessage && <p role="status" className="text-sm text-blue-800">{passwordMessage}</p>}
        <label className="block text-sm font-medium text-gray-800">
          Current password
          <input name="currentPassword" type="password" required autoComplete="current-password" className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2 text-gray-950" />
        </label>
        <label className="block text-sm font-medium text-gray-800">
          New password
          <input name="newPassword" type="password" required minLength={6} autoComplete="new-password" className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2 text-gray-950" />
        </label>
        <label className="block text-sm font-medium text-gray-800">
          Confirm new password
          <input name="confirmPassword" type="password" required minLength={6} autoComplete="new-password" className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2 text-gray-950" />
        </label>
        <button type="submit" disabled={savingPassword} className="bg-gray-950 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50">
          {savingPassword ? "Changing..." : "Change password"}
        </button>
      </form>
    </section>
  );
}
