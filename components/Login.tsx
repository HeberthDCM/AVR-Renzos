
import React, { useState } from 'react';
import { User as UserIcon, Lock, ChevronRight, AlertCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { User as UserType, Permission, PrimaryAppId } from '../types';
import { API_BASE_URL } from '../constants';

interface LoginProps {
  onLogin: (user: UserType, permissions: Permission[]) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        // Si no tienes permisos en DB aún, usamos los de root para pruebas
        const fallbackPerms: Permission[] = [
          { appId: PrimaryAppId.CAJA, userId: data.user.id, subMenus: [], cajasPermitidas: ['C1', 'C2', 'C3', 'C4'] },
          { appId: PrimaryAppId.TAREO, userId: data.user.id, subMenus: [], cajasPermitidas: [] },
          { appId: PrimaryAppId.BANDEJAS, userId: data.user.id, subMenus: [], cajasPermitidas: [] },
          { appId: PrimaryAppId.CONFIG, userId: data.user.id, subMenus: [], cajasPermitidas: [] }
        ];
        onLogin(data.user, data.permissions.length > 0 ? data.permissions : fallbackPerms);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor local');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* ... (Diseño del Login igual al anterior) ... */}
      <div className="w-full max-w-md z-10">
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
           <form onSubmit={handleSubmit} className="space-y-5">
             {error && <div className="text-red-500 text-[10px] font-black uppercase text-center">{error}</div>}
             <input 
               type="text" 
               className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-white" 
               placeholder="Usuario" 
               value={username}
               onChange={e => setUsername(e.target.value)}
             />
             <input 
               type="password" 
               className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-white" 
               placeholder="Contraseña" 
               value={password}
               onChange={e => setPassword(e.target.value)}
             />
             <button type="submit" className="w-full bg-red-600 py-4 rounded-2xl font-black uppercase text-white">
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "Acceder"}
             </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
