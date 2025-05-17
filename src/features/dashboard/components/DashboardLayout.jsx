"use client"
import useAccountStore from '@/stores/useAccountStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
// import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
// import { LogOut,DollarSign } from 'lucide-react';
const DashboardLayout = ({ children }) => {
    const router = useRouter()
    const { token } = useAccountStore.getState();
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [])


    return (
        <>
            <div className="antialiased bg-gray-50 dark:bg-gray-900">

                {/* Navbar */}
                <DashboardNavbar />

                {/* Sidebar */}
                <DashboardSidebar />

                {/* Content */}
                {children}
            </div>
        </>
    )
}

export default DashboardLayout