import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useEffect, useState, createContext } from 'react';
import { Spinner } from 'react-bootstrap';
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

  function login(email, pass) {
    return signInWithEmailAndPassword(auth, email, pass);
  }

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loading,
    setLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div className='loading'>
        <div className="inner-loading">
          <Spinner /> <span>Loading...</span>
        </div>
      </div>}
    </AuthContext.Provider>
  )
}
