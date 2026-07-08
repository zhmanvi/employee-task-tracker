import React, { useState, useEffect } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import ManagerDashboard from './components/Dashboard/ManagerDashboard'

const App = () => {
  const [user, setUser] = useState(null)
  const [currentUserData, setCurrentUserData] = useState(null)

  // Initialize the database and check session on load
  useEffect(() => {
    const systemDatabase = localStorage.getItem('ems_db')
    if (!systemDatabase) {
      const defaultState = {
        managers: [{ email: "manager@test.com", password: "123", name: "Lead Admin" }],
        employees: []
      }
      localStorage.setItem('ems_db', JSON.stringify(defaultState))
    }

    const session = localStorage.getItem('user_session')
    if (session) {
      const parsedSession = JSON.parse(session)
      setUser(parsedSession.role)
      setCurrentUserData(parsedSession.data)
    }
  }, [])

  // 3-hour alert checker for active employees
  useEffect(() => {
    if (user === 'employee' && currentUserData) {
      const threeHours = 3 * 60 * 60 * 1000
      const reminderInterval = setInterval(() => {
        alert(`Hi ${currentUserData.name}, this is your 3-hour check-in reminder! Please audit your workflow list logs.`)
      }, threeHours)
      return () => clearInterval(reminderInterval)
    }
  }, [user, currentUserData])

  const handleLogin = (email, password, displayName = "") => {
    const db = JSON.parse(localStorage.getItem('ems_db'))

    // Check if Manager
    const managerAccount = db.managers.find(m => m.email === email && m.password === password)
    if (managerAccount) {
      setUser('manager')
      setCurrentUserData(managerAccount)
      localStorage.setItem('user_session', JSON.stringify({ role: 'manager', data: managerAccount }))
      return
    }

    // Check or Register Employee
    let employeeAccount = db.employees.find(e => e.email === email && e.password === password)

    if (!employeeAccount && displayName.trim() !== "") {
      employeeAccount = {
        name: displayName,
        email: email,
        password: password,
        tasks: []
      }
      db.employees.push(employeeAccount)
      localStorage.setItem('ems_db', JSON.stringify(db))
    }

    if (employeeAccount) {
      setUser('employee')
      setCurrentUserData(employeeAccount)
      localStorage.setItem('user_session', JSON.stringify({ role: 'employee', data: employeeAccount }))
    } else {
      alert("Account credentials error. To create a new user profile, fill out the full name field.")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user_session')
    setUser(null)
    setCurrentUserData(null)
  }

  // Syncs structural status updates back up to parent storage layer
  const updateDatabase = (updatedEmployeesList) => {
    const db = JSON.parse(localStorage.getItem('ems_db'))
    db.employees = updatedEmployeesList
    localStorage.setItem('ems_db', JSON.stringify(db))
    
    if (user === 'employee') {
      const current = updatedEmployeesList.find(e => e.email === currentUserData.email)
      setCurrentUserData(current)
    }
  }

  return (
    <div className="min-h-screen w-screen p-6 bg-[#0f172a]">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : user === 'manager' ? (
        <ManagerDashboard changeUser={handleLogout} data={currentUserData} />
      ) : (
        <EmployeeDashboard changeUser={handleLogout} data={currentUserData} updateDatabase={updateDatabase} />
      )}
    </div>
  )
}

export default App