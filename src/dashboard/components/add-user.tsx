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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newUser: User = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      role: formData.get('role') as USER_ROLES,
    };

    // console.log(newUser);
    // return;

    try {
      if(userId && editedUser){
        updateUserById(userId, newUser);
        console.log("try to update");
      }else
        createUser(newUser);

      navigate("/dashboard/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate("/dashboard/users"); // Navigate back to the users list
  };

  useEffect(() => {
    const user = users?.find((u) => u.id === userId) as User;
    setEditedUser(user);
  }, [users])

  return (
    <div className="mx-10 px-12 py-10 bg-white shadow-md rounded-md mb-6">
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
        {!editedUser && (
          <>
            <label>password</label>
            <input type="password" id="password" name="password"
              className="w-full p-2 border rounded" placeholder="Password" required
            />
          </>
        )}
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded"> Save </button>
          <button type="button" onClick={handleCancel} className="bg-gray-300 px-4 py-2 rounded" > Cancel </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;