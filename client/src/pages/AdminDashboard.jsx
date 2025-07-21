import React from "react";
import {
  UserPlus,
  School,
  LogIn,
  FileText,
  Bell,
  CalendarCheck,
  Activity,
  HelpCircle,
  BarChart3,
  Cloud,
} from "lucide-react";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <div className="min-h-screen bg-blue-50 text-gray-800 p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-700">Admin Dashboard</h1>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <KpiCard icon={<UserPlus />} label="Users" value="1,320" />
          <KpiCard icon={<School />} label="Schools" value="24" />
          <KpiCard icon={<LogIn />} label="Today’s Logins" value="87" />
          <KpiCard icon={<FileText />} label="Assignments" value="58" />
        </div>

        {/* Grid layout */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Column 1 */}
          <div className="space-y-4">
            <SectionCard title="Recent Activity" icon={<Activity />}>
              <ul className="text-sm space-y-2">
                <li>👩🏽‍🏫 Ms. Jane uploaded exam results</li>
                <li>🧑🏿‍🎓 New student account created</li>
                <li>📣 Admin sent announcement</li>
              </ul>
            </SectionCard>

            <SectionCard title="Top Performing" icon={<BarChart3 />}>
              <ul className="text-sm space-y-1">
                <li>Greenwood High: 98% Attendance</li>
                <li>BrightStars School: 90% Logins</li>
              </ul>
            </SectionCard>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <SectionCard title="Quick Actions" icon={<Bell />}>
              <div className="flex flex-wrap gap-2">
                <QuickAction icon={<UserPlus />} label="Add User" />
                <QuickAction icon={<School />} label="Create School" />
                <QuickAction icon={<Bell />} label="Send Announcement" />
                <QuickAction icon={<FileText />} label="Assign Task" />
              </div>
            </SectionCard>

            <SectionCard title="Pending Approvals" icon={<HelpCircle />}>
              <ul className="text-sm space-y-1">
                <li>5 new student signups</li>
                <li>3 educator requests</li>
                <li>2 lesson drafts</li>
              </ul>
            </SectionCard>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <SectionCard title="Feedback & Support" icon={<HelpCircle />}>
              <ul className="text-sm space-y-1">
                <li>📝 "App loads slowly on mobile."</li>
                <li>📧 "Can we add a calendar view?"</li>
              </ul>
            </SectionCard>

            <SectionCard title="System Health" icon={<Cloud />}>
              <ul className="text-sm space-y-1">
                <li>✅ API: All systems go</li>
                <li>🔁 Uptime: 99.98%</li>
                <li>📦 Version: v1.2.3</li>
              </ul>
            </SectionCard>

            <SectionCard title="Calendar" icon={<CalendarCheck />}>
              <ul className="text-sm space-y-1">
                <li>📅 PTA Meeting - July 22</li>
                <li>📆 Exams Start - Aug 5</li>
              </ul>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔵 KPI Card (light theme)
const KpiCard = ({ icon, label, value }) => (
  <div className="bg-white shadow-md p-4 rounded-xl flex items-center space-x-4 border-l-4 border-blue-500">
    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-blue-700">{value}</p>
    </div>
  </div>
);

// 🔵 Section Card (light theme)
const SectionCard = ({ title, icon, children }) => (
  <div className="bg-white shadow-sm p-4 rounded-xl border-t-4 border-blue-500">
    <div className="flex items-center mb-2 space-x-2 text-lg font-semibold text-blue-700">
      {icon}
      <span>{title}</span>
    </div>
    {children}
  </div>
);

// 🔵 Quick Action Button (light theme)
const QuickAction = ({ icon, label }) => (
  <button className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md hover:bg-blue-200 text-sm font-medium transition">
    {icon}
    <span>{label}</span>
  </button>
);






