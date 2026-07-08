import React from 'react'

const ManagerDashboard = ({ changeUser, data }) => {
    const db = JSON.parse(localStorage.getItem('ems_db')) || { employees: [] }

    return (
        <div className='max-w-5xl mx-auto text-white'>
            <div className='flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-6'>
                <div>
                    <h1 className='text-xl font-bold'>Manager Control Suite: <span className='text-emerald-400'>{data.name}</span></h1>
                    <p className='text-xs text-slate-400 mt-1'>Operational Overview Panel</p>
                </div>
                <button onClick={changeUser} className='bg-red-600 hover:bg-red-500 text-xs font-semibold py-2 px-4 rounded-xl transition-all active:scale-95 cursor-pointer'>Log Out</button>
            </div>

            <div className='bg-slate-900 border border-slate-800 p-6 rounded-2xl'>
                <h2 className='text-sm font-bold text-slate-300 mb-4 tracking-wide uppercase'>Team Task Logs Directory</h2>
                <div className='overflow-x-auto'>
                    <table className='w-full text-left text-xs border-collapse'>
                        <thead>
                            <tr className='border-b border-slate-800 text-slate-400 font-semibold uppercase'>
                                <th className='pb-3 pl-2'>Employee</th>
                                <th className='pb-3'>Active Logs</th>
                                <th className='pb-3 text-emerald-400'>Completed</th>
                                <th className='pb-3 text-red-400'>Dropped</th>
                            </tr>
                        </thead>
                        <tbody>
                            {db.employees.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className='text-center py-8 text-slate-500'>No registered staff links yet. Have an employee register via the portal link.</td>
                                </tr>
                            ) : db.employees.map((emp, idx) => {
                                const activeCount = emp.tasks?.filter(t => t.status === 'active').length || 0
                                const completedCount = emp.tasks?.filter(t => t.status === 'completed').length || 0
                                const failedCount = emp.tasks?.filter(t => t.status === 'failed').length || 0

                                return (
                                    <tr key={idx} className='border-b border-slate-800/50 hover:bg-slate-800/30 transition-all'>
                                        <td className='py-4 pl-2 font-medium'>
                                            <p className='text-slate-200 text-sm'>{emp.name}</p>
                                            <p className='text-slate-500 text-[11px] mt-0.5'>{emp.email}</p>
                                        </td>
                                        <td className='py-4 text-slate-300 font-semibold'>{activeCount}</td>
                                        <td className='py-4 text-emerald-400 font-semibold'>{completedCount}</td>
                                        <td className='py-4 text-rose-400 font-semibold'>{failedCount}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManagerDashboard