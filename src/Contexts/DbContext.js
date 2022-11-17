import React, { createContext, useContext } from 'react'

const DbContext = createContext(null);

export function useDb() {
    return useContext(DbContext);
}

export function DbProvider({children}) {

    const value = {}
  return (
    <DbContext.Provider value={value}>
      {children}
    </DbContext.Provider>
  )
}
