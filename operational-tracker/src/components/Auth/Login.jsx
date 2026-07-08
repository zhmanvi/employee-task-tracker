import React, { useState } from 'react'

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isNewEmployee, setIsNewEmployee] = useState(false)

    const handleEmailChange = (e) => {
        const val = e.target.value
        setEmail(val)
        
        if (val !== 'manager@test.com' && val.includes('@')) {
            const db = JSON.parse(localStorage.getItem('ems_db'))
            const existing = db?.employees?.find(emp => emp.email === val)
            setIsNewEmployee(!existing)
        } else {
            setIsNewEmployee(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        onLogin(email, password, name)
    }

    return (
        <div className='flex h-[85vh] items-center justify-center'>
            <div className='border border-slate-700 p-12 rounded-2xl bg-slate-900 shadow-2xl w-96'>
                <h2 className='text-2xl font-bold mb-2 text-center text-white tracking-tight'>WorkTracker Portal</h2>
                <p className='text-xs text-slate-400 text-center mb-8'>Sign in as Manager or create an Employee link</p>
                
                <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                    <input 
                        value={email}
                        onChange={handleEmailChange}
                        required 
                        className='bg-slate-800 border border-slate-700 text-sm py-3 px-4 rounded-xl placeholder:text-slate-500 text-white outline-none focus:border-emerald-500 transition-all' 
                        type="email" 
                        placeholder="Work Email" 
                    />

                    {isNewEmployee && (
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                            className='bg-slate-800 border border-emerald-600 text-sm py-3 px-4 rounded-xl placeholder:text-slate-300 text-white outline-none' 
                            type="text" 
                            placeholder="Enter Your Full Name" 
                        />
                    )}

                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        className='bg-slate-800 border border-slate-700 text-sm py-3 px-4 rounded-xl placeholder:text-slate-500 text-white outline-none focus:border-emerald-500 transition-all' 
                        type="password" 
                        placeholder="Password" 
                    />
                    
                    <button className='text-white font-semibold bg-emerald-600 hover:bg-emerald-500 text-sm py-3 px-4 rounded-xl mt-4 transition-all duration-200 active:scale-95'>
                        {isNewEmployee ? 'Register & Sign In' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login