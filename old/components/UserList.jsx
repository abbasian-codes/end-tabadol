"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users") // آدرس API بک‌اند
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error("خطا در دریافت یوزرها:", error)
      })
  }, [])

  return (
    <div>
      <h2>لیست کاربران</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
