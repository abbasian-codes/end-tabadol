// "use client"

// import { createContext, useState, useEffect, useContext } from "react"

// const AuthContext = createContext()

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     // بررسی وضعیت لاگین در localStorage یا fetch از API
//     const storedUser = localStorage.getItem("user")
//     if (storedUser) setUser(JSON.parse(storedUser))
//   }, [])

//   const login = (userData) => {
//     setUser(userData)
//     localStorage.setItem("user", JSON.stringify(userData))
//   }

//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem("user")
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// // هوک ساده برای استفاده در کامپوننت‌ها
// export const useAuth = () => useContext(AuthContext)
"use client"

import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
