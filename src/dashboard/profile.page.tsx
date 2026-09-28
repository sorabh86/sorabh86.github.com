import { FormEvent, useState } from "react";
import useUserStore from "../store/users-store";

export default function ProfilePage() {
  const { currentUser, updateCurrentUserProfile } = useUserStore();
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

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

  return (
    <section className="mx-auto max-w-3xl py-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Account</p>
      <h2 className="mt-2 text-2xl font-semibold text-gray-950">Your profile</h2>
      <p className="mt-2 text-sm text-gray-600">Your account role and sign-in email are managed separately and cannot be changed here.</p>
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
    </section>
  );
}
