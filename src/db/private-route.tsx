import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "./firebase";
import { db } from "./firebase";
import useUserStore from "../store/users-store";
import { User } from "../types/default-type";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        useUserStore.setState({ currentUser: null });
        localStorage.removeItem("currentUser");
        navigate("/login");
        setUser(false);
        setLoading(false);
        return;
      }

      try {
        const profile = await getDoc(doc(db, "users", currentUser.uid));
        if (!profile.exists()) {
          await auth.signOut();
          navigate("/login");
          setUser(false);
          return;
        }

        const userData = { ...profile.data(), id: currentUser.uid } as User;
        useUserStore.setState({ currentUser: userData });
        localStorage.setItem("currentUser", JSON.stringify(userData));
        setUser(true);
      } catch {
        setUser(false);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return user ? <>{children}</> : null;
};

export default PrivateRoute;
