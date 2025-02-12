import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCamera, faKey } from "@fortawesome/free-solid-svg-icons";

export default function AdminProfile() {
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [profilePic, setProfilePic] = useState("/sorabh-profile.jpg");
  const [password, setPassword] = useState("");
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: "Twitter", url: "https://twitter.com/admin" },
    { id: 2, platform: "LinkedIn", url: "https://linkedin.com/in/admin" }
  ]);

  // Handle Profile Picture Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Adding a New Social Link
  const addSocialLink = () => {
    const newPlatform = prompt("Enter social media platform:");
    const newUrl = prompt("Enter social media URL:");
    if (newPlatform && newUrl) {
      setSocialLinks([...socialLinks, { id: Date.now(), platform: newPlatform, url: newUrl }]);
    }
  };

  // Handle Removing a Social Link
  const removeSocialLink = (id: number) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Profile</h2>
      
      {/* Profile Picture Upload */}
      <div className="text-center">
        <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-2" />
        <label className="cursor-pointer inline-block bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
          <FontAwesomeIcon icon={faCamera} /> Upload
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>
      
      {/* Name & Email Edit */}
      <div className="mt-4">
        <label className="block font-medium">Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded-md mt-1" />
      </div>
      <div className="mt-4">
        <label className="block font-medium">Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded-md mt-1" />
      </div>
      
      {/* Password Change */}
      <div className="mt-4">
        <label className="block font-medium">Change Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded-md mt-1" />
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <FontAwesomeIcon icon={faKey} /> Update Password
        </button>
      </div>
      
      {/* Social Links */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Social Links</h3>
        <ul className="mt-2">
          {socialLinks.map(link => (
            <li key={link.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">{link.platform}</a>
              <button onClick={() => removeSocialLink(link.id)} className="text-red-500 hover:text-red-700">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
        <button onClick={addSocialLink} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          <FontAwesomeIcon icon={faEdit} /> Add Social Link
        </button>
      </div>
    </div>
  );
}
