
import React, { useState } from 'react';
import { PrimaryAppId, User as UserType, Permission, PrimaryApp } from '../types';
import { Menu, X, LogOut, User, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: UserType;
  allowedApps: PrimaryApp[];
  activeAppId: PrimaryAppId;
  onAppChange: (id: PrimaryAppId) => void;
  activeSecondaryId: string;
  onSecondaryChange: (id: string) => void;
  onLogout: () => void;
  permissions: Permission[];
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user,
  allowedApps,
  activeAppId, 
  onAppChange, 
  activeSecondaryId, 
  onSecondaryChange,
  onLogout,
  permissions
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const activeApp = allowedApps.find(app => app.id === activeAppId) || allowedApps[0];

  // Filtrar submenús permitidos
  const userPerms = permissions.find(p => p.appId === activeAppId);
  const allowedSubMenus = activeApp ? activeApp.secondaryMenus.filter(menu => 
    !userPerms || userPerms.subMenus.length === 0 || userPerms.subMenus.includes(menu.id)
  ) : [];

  const handleAppSelection = (id: PrimaryAppId) => {
    onAppChange(id);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-zinc-950 overflow-hidden relative">
      
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}

      <div className={`flex flex-col flex-1 transition-all duration-300 w-full ${isSidebarOpen ? 'lg:mr-64' : 'lg:mr-16'}`}>
        
        <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4 md:gap-8 flex-1 overflow-hidden">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 hover:bg-zinc-800 rounded-lg text-zinc-400">
              <Menu className="w-6 h-6" />
            </button>
            
            <h1 className="text-red-600 font-black text-lg md:text-xl uppercase tracking-tighter whitespace-nowrap">
              {activeApp?.label}
            </h1>

            <div className="h-8 w-px bg-zinc-800 mx-2 hidden md:block" />

            <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 pr-4">
              {allowedSubMenus.map((menu) => (
                <button
                  key={menu.id}
                  onClick={() => onSecondaryChange(menu.id)}
                  className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap border
                    ${activeSecondaryId === menu.id 
                      ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-900/30' 
                      : 'text-zinc-500 border-transparent hover:text-zinc-200 hover:bg-zinc-800'}`}
                >
                  {menu.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4 ml-2 flex-shrink-0">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{user.role}</span>
              <span className="text-xs font-semibold text-zinc-200">{user.fullName}</span>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-red-500">
              <User className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 bg-zinc-950">
          <div className="max-w-7xl mx-auto animate-fadeIn pb-20 lg:pb-0">
            {children}
          </div>
        </main>
      </div>

      <aside className={`fixed top-0 right-0 h-full bg-zinc-900 border-l border-zinc-800 transition-all duration-300 z-50 flex flex-col ${isSidebarOpen ? 'translate-x-0 w-64' : 'translate-x-full lg:translate-x-0 lg:w-16'}`}>
        <div className="h-16 flex items-center px-4 justify-between border-b border-zinc-800 shrink-0">
          <span className={`font-black text-red-600 tracking-tighter text-lg transition-opacity duration-300 ${!isSidebarOpen && 'lg:hidden'}`}>
            RENZOS<span className="text-zinc-500">ERP</span>
          </span>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400">
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          {allowedApps.map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppSelection(app.id)}
              className={`w-full flex items-center px-4 py-4 transition-all group relative
                ${activeAppId === app.id ? 'bg-red-600/10 text-red-500 border-r-4 border-red-600' : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300'}`}
            >
              <div className={`p-2 rounded-lg transition-colors ${activeAppId === app.id ? 'bg-red-600 text-white shadow-md' : 'group-hover:text-red-500'}`}>
                {app.icon}
              </div>
              <span className={`ml-4 font-bold text-sm transition-all duration-300 whitespace-nowrap ${!isSidebarOpen && 'lg:opacity-0 lg:w-0 overflow-hidden'}`}>
                {app.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800 shrink-0">
          <button onClick={onLogout} className="w-full flex items-center px-4 py-3 text-zinc-500 hover:text-red-500 transition-colors rounded-lg hover:bg-zinc-800/30">
            <LogOut className="w-5 h-5 shrink-0" />
            <span className={`ml-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${!isSidebarOpen && 'lg:opacity-0 lg:w-0 overflow-hidden'}`}>Salir</span>
          </button>
        </div>
      </aside>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default Layout;
