import React, { useState } from 'react'

const EmployeeDashboard = ({ changeUser, data, updateDatabase }) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [clientName, setClientName] = useState('')

    const handleCreateTask = (e) => {
        e.preventDefault()
        if(!taskTitle.trim() || !clientName.trim()) return

        const newTask = {
            id: Date.now(),
            title: taskTitle,
            client: clientName,
            status: 'active'
        }

        const db = JSON.parse(localStorage.getItem('ems_db'))
        const updatedEmployees = db.employees.map(emp => {
            if (emp.email === data.email) {
                return { ...emp, tasks: [newTask, ...emp.tasks] }
            }
            return emp
        })

        updateDatabase(updatedEmployees)
        setTaskTitle('')
        setClientName('')
    }

    const toggleTaskStatus = (taskId, newStatus) => {
        const db = JSON.parse(localStorage.getItem('ems_db'))
        const updatedEmployees = db.employees.map(emp => {
            if (emp.email === data.email) {
                const updatedTasks = emp.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
                return { ...emp, tasks: updatedTasks }
            }
            return emp
        })
        updateDatabase(updatedEmployees)
    }

    return (
        <div className='max-w-5xl mx-auto text-white'>
            <div className='flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-6'>
                <div>
                    <h1 className='text-xl font-bold'>Welcome Back, <span className='text-sky-400'>{data.name}</span> 👋</h1>
                    <p className='text-xs text-slate-400 mt-1'>3-Hour Check-In Reminders: <span className='text-emerald-400 font-semibold'>Active</span></p>
                </div>
                <button onClick={changeUser} className='bg-red-600 hover:bg-red-500 text-xs font-semibold py-2 px-4 rounded-xl transition-all active:scale-95 cursor-pointer'>Log Out</button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit'>
                    <h2 className='text-sm font-bold text-slate-300 mb-4 tracking-wide uppercase'>Log Ongoing Task</h2>
                    <form onSubmit={handleCreateTask} className='flex flex-col gap-3'>
                        <input value={clientName} onChange={e => setClientName(e.target.value)} required type="text" placeholder="Client Name" className='bg-slate-800 border border-slate-700 text-xs py-3 px-4 rounded-xl outline-none focus:border-sky-500 text-white' />
                        <input value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required type="text" placeholder="What are you working on?" className='bg-slate-800 border border-slate-700 text-xs py-3 px-4 rounded-xl outline-none focus:border-sky-500 text-white' />
                        <button className='bg-sky-600 hover:bg-sky-500 text-xs font-semibold py-3 px-4 rounded-xl mt-2 transition-all active:scale-95 cursor-pointer'>Add Task Link</button>
                    </form>
                </div>

                <div className='md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl'>
                    <h2 className='text-sm font-bold text-slate-300 mb-4 tracking-wide uppercase'>Your Workspace Task List</h2>
                    <div className='flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-1'>
                        {data.tasks?.length === 0 ? (
                            <p className='text-slate-500 text-xs text-center py-8'>No logs listed yet. Create an assignment to track layout progress!</p>
                        ) : data.tasks?.map(task => (
                            <div key={task.id} className='bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl flex justify-between items-center'>
                                <div>
                                    <span className='text-[10px] uppercase tracking-wider font-bold text-sky-400 px-2 py-0.5 bg-sky-950/50 border border-sky-800 rounded-md'>{task.client}</span>
                                    <p className='text-sm font-medium mt-2 text-slate-200'>{task.title}</p>
                                </div>
                                <div className='flex gap-2'>
                                    {task.status === 'active' ? (
                                        <>
                                            <button onClick={() => toggleTaskStatus(task.id, 'completed')} className='bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white text-[11px] font-semibold py-1.5 px-3 rounded-lg border border-emerald-500/30 transition-all cursor-pointer'>Complete</button>
                                            <button onClick={() => toggleTaskStatus(task.id, 'failed')} className='bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white text-[11px] font-semibold py-1.5 px-3 rounded-lg border border-red-500/30 transition-all cursor-pointer'>Drop</button>
                                        </>
                                    ) : (
                                        <span className={`text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-md ${task.status === 'completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                                            {task.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDashboard