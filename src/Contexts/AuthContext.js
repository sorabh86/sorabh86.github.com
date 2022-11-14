import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth';
import React, { useContext, useEffect, useState, createContext } from 'react';
import {auth} from "../firebase";

const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, pass) {
    return createUserWithEmailAndPassword(auth, email, pass)
  }
  function sendemailverification(user) {
    return sendEmailVerification(user)
  }

  function login(email, pass) {
    return signInWithEmailAndPassword(auth, email, pass);
  }

  function logout() {
    return signOut(auth)
  }
  
  useEffect(()=>{
    // logout();
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    login,
    loading,
    setLoading,
    logout,
    sendemailverification
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
