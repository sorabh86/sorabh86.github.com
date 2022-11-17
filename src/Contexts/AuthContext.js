import React, { useContext, useEffect, useState, createContext } from 'react';
import { auth, database, postsRef } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth';
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const LOADING_STATES = {
    APP:'Application',
    POSTS:'Posts',
    LOGIN:'Login',
    REGISTER:'Register'
  }

  const [posts, setPosts] = useState([])
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState([])

  function addLoading(str) {
    let arr = loading;
    arr.push(str)
    setLoading(arr)
    // console.log("add loader", loading, loading.length);
  }
  function removeLoading(str) {
    let arr = loading;
    var index = arr.indexOf(str)
    // console.log('index', index);
    if (index !== -1) {
      arr.splice(index, 1);
      setLoading(arr);
      console.log("remove loader", arr);
    }
  }

  function signup(email, pass) {
    return createUserWithEmailAndPassword(auth, email, pass)
  }
  function sendemailverification(user) {
    return sendEmailVerification(user)
  }

  function login(email, pass) {
    addLoading()
    signInWithEmailAndPassword(auth, email, pass)
      .then(userCredential => {
        currentUser = userCredential.user;
      });

  }

  async function logout() {
    await signOut(auth)
  }

  async function createPost(title, content, author) {
    const today = new Date();
    const timestamp = today.toUTCString();
    
    await addDoc(postsRef, {
      title:title,
      content:content,
      author:author,
      modify:timestamp,
      created:timestamp
    }).then(response=>
      console.log('added post', response)
    ).catch(err=>console.error(err))
  }
  async function getPosts() {
    addLoading(LOADING_STATES.POSTS);
    const postRecords = await getDocs(postsRef);
    const data = postRecords.docs.map(p=>{return {...p.data(), id:p.id}})
    console.log(data)
    setPosts(data)
    removeLoading(LOADING_STATES.POSTS);
  }

  async function updatePost(post) {
    const ref = doc(database, 'posts', post.id);
    delete post.id;
    const res = await updateDoc(ref, post);
    console.log(res);
  }
  
  async function deletePost(post) {
    const ref = doc(database, 'posts', post.id);
    const res = await deleteDoc(ref);
    console.log(res);
  }

  const dstore = ['Lorem', 'Ipsum', 'is', 'simply', 'dummy', 'text', 'of', 'the', 'printing', 'and', 'typesetting', 'industry.', 'Lorem', 'Ipsum', 'has', 'been', 'the', 'industry',
  'standard', 'dummy', 'text', 'ever', 'since', 'the', '1500s,', 'when', 'an', 'unknown', 'printer', 'took', 'a', 'galley', 'of', 'type', 'and', 'scrambled', 'it', 'to', 'make', 'a', 'type', 'specimen', 'book.', 'It', 'has', 'survived', 'not', 'only', 'five', 'centuries,', 'but', 'also', 'the', 'leap', 'into',
  'electronic', 'typesetting,', 'remaining', 'essentially', 'unchanged.', 'It', 'was', 'popularised', 'in', 'the', '1960s', 'with', 'the', 'release', 'of', 'Letraset', 'sheets', 'containing', 'Lorem', 'Ipsum', 'passages,', 'and', 'more', 'recently', 'with', 'desktop', 'publishing', 'software', 'like', 'Aldus', 'PageMaker', 'including', 'versions', 'of', 'Lorem', 'Ipsum'];
  function randomStr(len) {
    let tstr = '';
    for(let i =0; i<len; i++) {
      tstr += dstore[Math.round(Math.random()*dstore.length)]+" ";
    }
    return tstr;
  }
  function rand(start, end) {
    return start + Math.round((Math.random()*end)-start);
  }
  
  useEffect(()=>{
    // seting currentUser {authentication status update handler}
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      console.log('auth changed: '+user);
    });

    // getPosts();

    return unsubscribe;
  }, []);

  const value = {
    LOADING_STATES,
    addLoading,
    removeLoading,
    currentUser,
    posts,
    signup,
    login,
    loading,
    logout,
    sendemailverification,
    getPosts
  }

  return (
    <AuthContext.Provider value={value}>
      {/* <div className="container p-4">
        <button className='btn btn-primary' onClick={()=>{createPost(randomStr(rand(4,8)), randomStr(rand(24,80)), 'sorabh')}}>Add Post</button> &nbsp;
        <button className='btn btn-secondary' onClick={getPosts}>Get Posts</button>  &nbsp;
        <button className='btn btn-success' onClick={()=>updatePost({id:"cNEIfUslljacF9hc5dXE", title:'Post3', content:'My content is updated to 3nd post data'})}>Update Post</button> &nbsp;
        <button className='btn btn-danger' onClick={()=>deletePost({id:"yPFRK4kbXW72Y3IBUHaV"})}>Delete Post</button> &nbsp;
      </div> */}
      {children}
    </AuthContext.Provider>
  )
}
