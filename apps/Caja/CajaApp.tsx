
import React from 'react';
import { Wallet, TrendingUp, ArrowDownCircle, ArrowUpCircle, Lock, Unlock, FileText, Search } from 'lucide-react';

interface CajaAppProps {
  activeSecondaryId: string;
}

const CajaApp: React.FC<CajaAppProps> = ({ activeSecondaryId }) => {
  
  const renderApertura = () => (
    <div className="animate-fadeIn space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-center space-y-4">
        <div className="w-20 h-20 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <Unlock className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-white">Estado de Caja: Abierta</h2>
        <p className="text-zinc-400 max-w-md mx-auto">La caja fue abierta hoy a las 08:30 AM por el usuario Admin. Saldo inicial: S/ 500.00</p>
        <div className="flex justify-center gap-4 pt-4">
          <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors border border-zinc-700">Imprimir Reporte</button>
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Cerrar Caja
          </button>
        </div>
      </div>
    </div>
  );

  const renderMovimientos = () => (
    <div className="animate-fadeIn space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-zinc-400 text-sm font-medium">Saldo Actual</span>
            <Wallet className="text-red-600 w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-white">S/ 4,250.00</div>
          <div className="text-green-500 text-xs mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% respecto ayer
          </div>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-zinc-400 text-sm font-medium">Ingresos Hoy</span>
            <ArrowUpCircle className="text-green-500 w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-white">S/ 1,800.00</div>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-zinc-400 text-sm font-medium">Egresos Hoy</span>
            <ArrowDownCircle className="text-red-500 w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-white">S/ 450.00</div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
          <h3 className="font-semibold text-zinc-200 uppercase tracking-wider text-xs">Historial de Movimientos</h3>
          <div className="relative">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
             <input type="text" placeholder="Buscar..." className="bg-zinc-950 border border-zinc-800 rounded-md pl-9 pr-4 py-1 text-sm focus:outline-none focus:border-red-600" />
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="text-zinc-500 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-3 font-medium">Fecha</th>
              <th className="px-6 py-3 font-medium">Concepto</th>
              <th className="px-6 py-3 font-medium">Categoría</th>
              <th className="px-6 py-3 font-medium text-right">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 text-zinc-400 font-mono text-xs">12/05/2024 10:30</td>
                <td className="px-6 py-4 text-zinc-200">Venta de Productos Varios</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-green-900/30 text-green-500 rounded text-[10px] font-bold uppercase tracking-tighter">Venta</span>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-white">S/ 150.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFormulario = (tipo: 'ingreso' | 'egreso') => (
    <div className="animate-fadeIn max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className={`h-2 ${tipo === 'ingreso' ? 'bg-green-600' : 'bg-red-600'}`}></div>
      <div className="p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          {tipo === 'ingreso' ? <ArrowUpCircle className="text-green-500" /> : <ArrowDownCircle className="text-red-500" />}
          Registrar {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-zinc-500 uppercase font-bold">Concepto</label>
            <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600" placeholder="Ej. Pago servicio..." />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-zinc-500 uppercase font-bold">Monto (S/)</label>
            <input type="number" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600" placeholder="0.00" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs text-zinc-500 uppercase font-bold">Descripción Adicional</label>
            <textarea className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 h-24" placeholder="..." />
          </div>
        </div>
        <button className={`w-full py-3 rounded-lg font-bold text-white transition-transform active:scale-95 ${tipo === 'ingreso' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
          Guardar Transacción
        </button>
      </div>
    </div>
  );

  switch (activeSecondaryId) {
    case 'caja-apertura': return renderApertura();
    case 'caja-ingresos': return renderFormulario('ingreso');
    case 'caja-egresos': return renderFormulario('egreso');
    case 'caja-movimientos': return renderMovimientos();
    default: return renderMovimientos();
  }
};

export default CajaApp;
