import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-[#151521] overflow-hidden font-['Inter']">
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <TopBar />

                <div className="flex-1 overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
