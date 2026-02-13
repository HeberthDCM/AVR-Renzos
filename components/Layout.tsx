
import React, { useState } from 'react';
import { PrimaryAppId, SecondaryMenu } from '../types';
import { PRIMARY_APPS } from '../constants';
import { Menu, X, LogOut, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeAppId: PrimaryAppId;
  onAppChange: (id: PrimaryAppId) => void;
  activeSecondaryId: string;
  onSecondaryChange: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeAppId, 
  onAppChange, 
  activeSecondaryId, 
  onSecondaryChange 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const activeApp = PRIMARY_APPS.find(app => app.id === activeAppId) || PRIMARY_APPS[0];

  return (
    <div className="flex h-screen w-full bg-zinc-950 overflow-hidden">
      
      {/* Main Content Area */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-64' : 'mr-16'}`}>
        
        {/* Top Navigation Bar */}
        <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth">
            <h1 className="text-red-600 font-bold text-xl uppercase tracking-wider whitespace-nowrap hidden md:block">
              {activeApp.label}
            </h1>
            <nav className="flex items-center gap-1 md:gap-4 h-full">
              {activeApp.secondaryMenus.map((menu) => (
                <button
                  key={menu.id}
                  onClick={() => onSecondaryChange(menu.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap
                    ${activeSecondaryId === menu.id 
                      ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'}`}
                >
                  {menu.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-zinc-500">Operador</span>
              <span className="text-sm font-semibold text-zinc-200">Admin User</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-red-500 cursor-pointer hover:bg-zinc-700 transition-colors">
              <User className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Content Render Body */}
        <main className="flex-1 overflow-auto p-4 md:p-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto animate-fadeIn">
            {children}
          </div>
        </main>
      </div>

      {/* Right Primary Sidebar */}
      <aside 
        className={`fixed top-0 right-0 h-full bg-zinc-900 border-l border-zinc-800 transition-all duration-300 z-50 flex flex-col
          ${isSidebarOpen ? 'w-64' : 'w-16'}`}
      >
        <div className="h-16 flex items-center px-4 justify-between border-b border-zinc-800">
          {isSidebarOpen && <span className="font-bold text-red-600 tracking-tighter text-xl">RED<span className="text-zinc-400">BLACK</span></span>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          {PRIMARY_APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => onAppChange(app.id)}
              className={`w-full flex items-center px-4 py-4 transition-all group relative
                ${activeAppId === app.id 
                  ? 'bg-red-600/10 text-red-500 border-r-4 border-red-600' 
                  : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300'}`}
            >
              <div className={`p-2 rounded-lg transition-colors ${activeAppId === app.id ? 'bg-red-600 text-white' : 'group-hover:text-red-500'}`}>
                {app.icon}
              </div>
              {isSidebarOpen && (
                <span className="ml-4 font-semibold text-sm transition-all duration-300">
                  {app.label}
                </span>
              )}
              {!isSidebarOpen && (
                <div className="absolute right-full mr-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
                  {app.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button className="w-full flex items-center px-4 py-2 text-zinc-500 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-4 text-sm font-medium">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay (Only for small screens when side menu is open, if needed) */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Layout;
