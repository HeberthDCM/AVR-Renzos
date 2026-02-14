
import React, { useState, useEffect } from 'react';
import { 
  Wallet, TrendingUp, ArrowDownCircle, ArrowUpCircle, 
  Lock, Unlock, Search, CreditCard, Repeat, ShieldAlert,
  ChevronRight, Building2, User as UserIcon, Clock, ArrowRightLeft,
  Settings2, Loader2
} from 'lucide-react';
import { Caja, Transaccion, TipoTransaccion, AuthState } from '../../types';
import { API_BASE_URL } from '../../constants';

interface CajaAppProps {
  activeSecondaryId: string;
  auth: AuthState;
}

const CajaApp: React.FC<CajaAppProps> = ({ activeSecondaryId, auth }) => {
  const [selectedCajaId, setSelectedCajaId] = useState<string | null>(null);
  const [cajas, setCajas] = useState<Caja[]>([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Transaccion[]>([]);

  // CARGAR CAJAS DESDE EL SERVIDOR
  useEffect(() => {
    fetch(`${API_BASE_URL}/cajas`)
      .then(res => res.json())
      .then(data => {
        setCajas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando cajas:", err);
        setLoading(false);
      });
  }, []);
  
  // Filtrar cajas permitidas
  const userCajaPerms = auth.permissions.find(p => p.appId === 'caja')?.cajasPermitidas || [];
  const allowedCajas = cajas.filter(c => auth.user?.role === 'admin' || userCajaPerms.includes(c.id));
  
  const selectedCaja = cajas.find(c => c.id === selectedCajaId);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-4" />
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Conectando con base de datos...</p>
      </div>
    );
  }

  if (!selectedCajaId) {
    return (
      <div className="animate-fadeIn space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Selección de Caja Operativa</h2>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Elige una terminal autorizada para iniciar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {allowedCajas.map((caja) => (
            <button 
              key={caja.id}
              onClick={() => setSelectedCajaId(caja.id)}
              className="bg-zinc-900 border-2 border-zinc-800 p-8 rounded-[2rem] text-left hover:border-red-600 transition-all group relative overflow-hidden shadow-2xl"
            >
              <div className={`absolute top-0 right-0 p-4 ${caja.estado === 'abierta' ? 'text-green-500' : 'text-zinc-700'}`}>
                {caja.estado === 'abierta' ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              </div>
              
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center text-red-600 border border-zinc-800 group-hover:bg-red-600 group-hover:text-white transition-all shadow-inner">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none">{caja.nombre}</h3>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">{caja.id}</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-zinc-500 text-xs font-medium mb-4">{caja.descripcion}</p>
                <div className="flex justify-between items-end border-t border-zinc-800 pt-4">
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Saldo Actual</span>
                  <span className="text-2xl font-black text-white tracking-tighter">S/ {caja.saldo.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const handleRegister = (e: React.FormEvent, tipo: TipoTransaccion) => {
    e.preventDefault();
    // Ejemplo de cómo enviar a la base de datos real
    alert(`Enviando ${tipo} a base de datos real...`);
    // fetch(`${API_BASE_URL}/movimientos`, { method: 'POST', body: ... })
  };

  // ... (resto del renderizado se mantiene similar, usando los datos de la base de datos)
  return (
    <div className="text-white">Caja Seleccionada: {selectedCaja?.nombre}</div>
  );
};

export default CajaApp;
