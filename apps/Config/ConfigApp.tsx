
import React, { useState } from 'react';
import { 
  User, Shield, Key, Save, Trash2, Edit, Plus, 
  Check, X, ShieldCheck, UserCog, ToggleLeft, ToggleRight,
  ChevronRight, Search, Lock, UserPlus
} from 'lucide-react';
import { User as UserType, Permission, PrimaryAppId, AuthState } from '../../types';
import { PRIMARY_APPS } from '../../constants';

interface ConfigAppProps {
  activeSecondaryId: string;
  auth: AuthState;
}

const ConfigApp: React.FC<ConfigAppProps> = ({ activeSecondaryId, auth }) => {
  // Estado local para simular la persistencia del CRUD de Usuarios
  const [users, setUsers] = useState<UserType[]>([
    { id: '1', username: 'root', fullName: 'Administrador Root', role: 'admin', active: true },
    { id: '2', username: 'jperal', fullName: 'Juan Peralta', role: 'operator', active: true },
    { id: '3', username: 'mrojas', fullName: 'Maria Rojas', role: 'operator', active: false },
  ]);

  const [selectedUserForPerms, setSelectedUserForPerms] = useState<string>('1');

  const renderUsuarios = () => (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900 border border-zinc-800 p-6 rounded-3xl gap-4 shadow-xl">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <UserCog className="text-red-600" /> Directorio de Usuarios
          </h2>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Gestión de credenciales y perfiles</p>
        </div>
        <button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 transition-all active:scale-95">
          <UserPlus className="w-4 h-4" /> Crear Nuevo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col gap-4 hover:border-red-600/30 transition-all shadow-lg group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-1 h-full ${u.active ? 'bg-green-600' : 'bg-zinc-700'}`}></div>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-center text-red-600 font-black text-xl shadow-inner">
                {u.fullName.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-black text-zinc-100 uppercase tracking-tight">{u.fullName}</div>
                <div className="text-[10px] text-zinc-500 font-bold font-mono uppercase">@{u.username}</div>
                <div className="mt-1 flex items-center gap-2">
                   <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                     {u.role}
                   </span>
                   <span className={`text-[8px] font-black uppercase ${u.active ? 'text-green-500' : 'text-zinc-600'}`}>
                     {u.active ? 'En Línea' : 'Inactivo'}
                   </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2 pt-4 border-t border-zinc-800/50">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest">
                <Edit className="w-3 h-3" /> Editar
              </button>
              <button className="p-2 bg-zinc-800 hover:bg-red-900/20 text-zinc-500 hover:text-red-500 rounded-xl transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPermisos = () => (
    <div className="animate-fadeIn space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8 bg-zinc-950/50 border-b border-zinc-800 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">Matriz de Privilegios</h2>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Configuración por usuario</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-2xl border border-zinc-800">
             <span className="text-[10px] text-zinc-500 font-black uppercase px-2">Usuario:</span>
             <select 
               value={selectedUserForPerms}
               onChange={(e) => setSelectedUserForPerms(e.target.value)}
               className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-red-600 transition-all text-white"
             >
               {users.map(u => <option key={u.id} value={u.id}>{u.fullName}</option>)}
             </select>
          </div>
        </div>

        <div className="p-4 md:p-8 space-y-6">
          {PRIMARY_APPS.map((app) => (
            <div key={app.id} className="bg-zinc-950/30 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="p-4 bg-zinc-900/50 flex items-center justify-between border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-900 rounded-lg text-red-600">{app.icon}</div>
                  <span className="font-black text-zinc-100 uppercase tracking-tight text-sm">{app.label}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer scale-90">
                  <input type="checkbox" className="sr-only peer" defaultChecked={selectedUserForPerms === '1'} />
                  <div className="w-10 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
              
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {app.secondaryMenus.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between p-3 bg-zinc-900/30 rounded-xl border border-zinc-800/50 group hover:border-zinc-700 transition-all">
                    <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-tight">{sub.label}</span>
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-red-600 focus:ring-red-600 focus:ring-offset-zinc-950" 
                      defaultChecked={selectedUserForPerms === '1'} 
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 md:p-8 border-t border-zinc-800 bg-zinc-950/50 flex justify-end">
          <button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-red-900/40 flex items-center justify-center gap-3 transition-all active:scale-95 group">
            <Save className="w-5 h-5 group-hover:scale-110 transition-transform" /> Guardar Perfil de Acceso
          </button>
        </div>
      </div>
    </div>
  );

  switch (activeSecondaryId) {
    case 'conf-usuarios': return renderUsuarios();
    case 'conf-sistema': return renderPermisos();
    default: return renderUsuarios();
  }
};

export default ConfigApp;
