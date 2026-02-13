
import React from 'react';
// Fix: Added CheckCircle2 to the imports from lucide-react
import { Package, RefreshCw, AlertTriangle, Download, Upload, Boxes, ClipboardList, CheckCircle2 } from 'lucide-react';

interface BandejasAppProps {
  activeSecondaryId: string;
}

const BandejasApp: React.FC<BandejasAppProps> = ({ activeSecondaryId }) => {
  
  const renderInventario = () => (
    <div className="animate-fadeIn space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-red-600/20 via-black to-black p-6 flex items-center justify-between border-b border-zinc-800">
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Control Global de Bandejas</h2>
            <p className="text-zinc-500 text-xs font-medium">Stock actualizado en tiempo real</p>
          </div>
          <Boxes className="text-red-600 w-10 h-10 opacity-50" />
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center gap-4 hover:border-red-600/40 transition-colors">
            <div className="p-3 bg-zinc-900 text-red-500 rounded-lg">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">Total en Stock</div>
              <div className="text-2xl font-bold text-white">1,240</div>
            </div>
          </div>
          <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center gap-4">
            <div className="p-3 bg-zinc-900 text-yellow-500 rounded-lg">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">En Lavado</div>
              <div className="text-2xl font-bold text-white">215</div>
            </div>
          </div>
          <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center gap-4">
            <div className="p-3 bg-zinc-900 text-orange-500 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">Mantenimiento</div>
              <div className="text-2xl font-bold text-white">12</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
         <div className="p-4 bg-zinc-800/50 flex justify-between items-center border-b border-zinc-700">
            <span className="text-sm font-bold uppercase text-zinc-300">Detalle por Almacén</span>
            <button className="text-xs bg-zinc-700 px-3 py-1 rounded text-zinc-300 hover:text-white">Exportar CSV</button>
         </div>
         <div className="divide-y divide-zinc-800">
            {['Almacén Norte', 'Almacén Sur', 'Planta 1', 'Planta 2'].map((loc, i) => (
              <div key={i} className="p-4 flex justify-between items-center hover:bg-zinc-800/30 transition-colors">
                <span className="text-zinc-400 font-medium">{loc}</span>
                <span className="text-white font-bold">{300 + i * 15} <span className="text-[10px] text-zinc-600">UNDS</span></span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );

  const renderRecepcion = () => (
    <div className="animate-fadeIn space-y-6">
       <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
          <div className="flex items-center gap-3">
             <Download className="text-red-500 w-6 h-6" />
             <h2 className="text-xl font-bold text-white uppercase tracking-wider">Nueva Recepción de Bandejas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500">PROVEEDOR / ORIGEN</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-300 focus:border-red-600 outline-none">
                   <option>Proveedor Externo A</option>
                   <option>Retorno de Campo</option>
                   <option>Compra Nueva</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500">CANTIDAD RECIBIDA</label>
                <input type="number" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-600 outline-none" placeholder="0" />
             </div>
          </div>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-900/30">CONFIRMAR INGRESO</button>
       </div>
    </div>
  );

  const renderLavado = () => (
    <div className="animate-fadeIn space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="font-bold text-yellow-500 flex items-center gap-2">
                   <RefreshCw className="w-5 h-5 animate-spin-slow" /> EN LAVADO
                </h3>
                <span className="text-2xl font-bold">215</span>
             </div>
             <p className="text-xs text-zinc-500">Lotes actualmente en proceso de desinfección y limpieza.</p>
             <button className="w-full border border-yellow-500/30 text-yellow-500 py-2 rounded-lg text-sm hover:bg-yellow-500/10 transition-colors">Ver Detalles del Proceso</button>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="font-bold text-green-500 flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5" /> LISTOS (LIMPIOS)
                </h3>
                <span className="text-2xl font-bold">1,025</span>
             </div>
             <p className="text-xs text-zinc-500">Bandejas aptas para ser enviadas a producción inmediatamente.</p>
             <button className="w-full border border-green-500/30 text-green-500 py-2 rounded-lg text-sm hover:bg-green-500/10 transition-colors">Gestionar Salida</button>
          </div>
       </div>
       
       <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
             <ClipboardList className="w-4 h-4 text-zinc-500" />
             <span className="text-sm font-bold uppercase">Bitácora de Lavado Hoy</span>
          </div>
          <div className="p-4 space-y-3">
             {[1,2].map(i => (
                <div key={i} className="flex justify-between text-sm p-2 bg-zinc-950 rounded border border-zinc-800">
                   <span className="text-zinc-400">Lote #{500+i} - 50 uds.</span>
                   <span className="text-zinc-600 font-mono">Termina: 14:00 PM</span>
                </div>
             ))}
          </div>
       </div>
       <style>{`
          @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .animate-spin-slow { animation: spin-slow 8s linear infinite; }
       `}</style>
    </div>
  );

  switch (activeSecondaryId) {
    case 'band-recepcion': return renderRecepcion();
    case 'band-lavado': return renderLavado();
    case 'band-inventario': return renderInventario();
    default: return renderInventario();
  }
};

export default BandejasApp;
