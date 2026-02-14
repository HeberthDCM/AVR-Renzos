
import React from 'react';
import { Package, RefreshCw, AlertTriangle, Download, Upload, Boxes, ClipboardList, CheckCircle2, MoreVertical } from 'lucide-react';

interface BandejasAppProps {
  activeSecondaryId: string;
}

const BandejasApp: React.FC<BandejasAppProps> = ({ activeSecondaryId }) => {
  
  const renderInventario = () => (
    <div className="animate-fadeIn space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="h-28 md:h-36 bg-gradient-to-br from-red-600/30 via-black to-zinc-950 p-6 md:p-8 flex items-center justify-between border-b border-zinc-800/50">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Stock Crítico</h2>
            <p className="text-zinc-500 text-[10px] md:text-xs font-black uppercase tracking-widest">Actualizado: Hace 2 minutos</p>
          </div>
          <Boxes className="text-red-600 w-12 h-12 md:w-16 md:h-16 opacity-30 animate-pulse" />
        </div>
        
        <div className="p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <div className="p-6 bg-zinc-950/50 rounded-2xl border border-zinc-800 flex items-center gap-5 hover:border-red-600/40 transition-all group shadow-xl">
            <div className="p-4 bg-zinc-900 text-red-500 rounded-2xl shadow-inner group-hover:bg-red-600 group-hover:text-white transition-all">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest leading-none mb-1">Stock Total</div>
              <div className="text-3xl font-black text-white tracking-tighter">1,240</div>
            </div>
          </div>
          <div className="p-6 bg-zinc-950/50 rounded-2xl border border-zinc-800 flex items-center gap-5 hover:border-yellow-600/40 transition-all group shadow-xl">
            <div className="p-4 bg-zinc-900 text-yellow-500 rounded-2xl shadow-inner group-hover:bg-yellow-600 group-hover:text-white transition-all">
              <RefreshCw className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest leading-none mb-1">En Lavado</div>
              <div className="text-3xl font-black text-white tracking-tighter">215</div>
            </div>
          </div>
          <div className="p-6 bg-zinc-950/50 rounded-2xl border border-zinc-800 flex items-center gap-5 hover:border-orange-600/40 transition-all group sm:col-span-2 lg:col-span-1 shadow-xl">
            <div className="p-4 bg-zinc-900 text-orange-500 rounded-2xl shadow-inner group-hover:bg-orange-600 group-hover:text-white transition-all">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest leading-none mb-1">Dañadas</div>
              <div className="text-3xl font-black text-white tracking-tighter">12</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
         <div className="p-5 bg-zinc-950/50 flex justify-between items-center border-b border-zinc-800">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Distribución de Activos</span>
            <button className="text-[10px] font-black uppercase tracking-widest bg-zinc-800 px-4 py-2 rounded-full text-zinc-300 hover:text-white transition-colors border border-zinc-700">Reporte Full</button>
         </div>
         <div className="divide-y divide-zinc-800">
            {[
              { loc: 'Almacén Norte (Central)', val: 450, cap: '80%' },
              { loc: 'Almacén Sur (Reserva)', val: 320, cap: '55%' },
              { loc: 'Planta Beneficiado 1', val: 180, cap: '95%' },
              { loc: 'Planta Beneficiado 2', val: 290, cap: '70%' },
            ].map((item, i) => (
              <div key={i} className="p-5 flex justify-between items-center hover:bg-zinc-800/40 transition-all group">
                <div className="flex flex-col">
                  <span className="text-zinc-200 font-bold text-sm uppercase tracking-tight group-hover:text-red-500 transition-colors">{item.loc}</span>
                  <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Capacidad: {item.cap}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-white tracking-tighter">{item.val}</span>
                  <span className="text-[9px] text-zinc-600 font-black ml-2 uppercase">UNDS</span>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );

  const renderRecepcion = () => (
    <div className="animate-fadeIn max-w-3xl mx-auto">
       <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-[2.5rem] space-y-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Download className="w-24 h-24 text-red-600" />
          </div>
          <div className="space-y-2">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-900/30">
                   <Download className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Recepción Lote</h2>
             </div>
             <p className="text-zinc-500 text-xs font-medium ml-1">Ingreso manual de bandejas retornadas o nuevas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Origen / Carga</label>
                <select className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl p-4 text-zinc-200 focus:border-red-600 outline-none transition-all font-bold text-sm appearance-none shadow-inner">
                   <option>Retorno de Campo (Granjas)</option>
                   <option>Proveedor: Plásticos Sur</option>
                   <option>Proveedor: Indus-Poly</option>
                   <option>Devolución de Cliente</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Cantidad (Unidades)</label>
                <input type="number" className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl p-4 text-white focus:border-red-600 outline-none transition-all font-black text-xl shadow-inner" placeholder="0" />
             </div>
             <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Documento / Guía N°</label>
                <input type="text" className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl p-4 text-zinc-400 focus:border-red-600 outline-none transition-all text-sm shadow-inner" placeholder="Ej. G-001-20392" />
             </div>
          </div>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all shadow-2xl shadow-red-900/40 transform active:scale-[0.98]">
             Validar y Procesar Ingreso
          </button>
       </div>
    </div>
  );

  const renderLavado = () => (
    <div className="animate-fadeIn space-y-6 md:space-y-10">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl space-y-5 shadow-xl relative group overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-yellow-500/10 transition-all"></div>
             <div className="flex items-center justify-between">
                <h3 className="font-black text-yellow-500 flex items-center gap-3 uppercase tracking-tighter text-lg">
                   <RefreshCw className="w-6 h-6 animate-spin-slow" /> En Desinfección
                </h3>
                <span className="text-4xl font-black text-white tracking-tighter">215</span>
             </div>
             <p className="text-xs text-zinc-500 font-medium leading-relaxed">Bandejas sometidas a proceso térmico y químico de limpieza profunda.</p>
             <button className="w-full border-2 border-yellow-500/20 text-yellow-500 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500/10 transition-all">Reporte de Sensores</button>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl space-y-5 shadow-xl relative group overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-green-500/10 transition-all"></div>
             <div className="flex items-center justify-between">
                <h3 className="font-black text-green-500 flex items-center gap-3 uppercase tracking-tighter text-lg">
                   <CheckCircle2 className="w-6 h-6" /> Aptas (Inocuas)
                </h3>
                <span className="text-4xl font-black text-white tracking-tighter">1,025</span>
             </div>
             <p className="text-xs text-zinc-500 font-medium leading-relaxed">Listas para el carguío de aves en área de beneficiado final.</p>
             <button className="w-full border-2 border-green-500/20 text-green-500 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-500/10 transition-all">Gestionar Despacho</button>
          </div>
       </div>
       
       <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-5 bg-zinc-950/50 flex items-center justify-between border-b border-zinc-800">
             <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 text-red-600" />
                <span className="text-sm font-black uppercase tracking-tighter text-zinc-300">Monitor de Ciclos</span>
             </div>
             <MoreVertical className="w-4 h-4 text-zinc-700 cursor-pointer" />
          </div>
          <div className="p-4 md:p-6 space-y-4">
             {[
               { id: 501, qty: 50, time: '14:00 PM', status: '80%' },
               { id: 502, qty: 120, time: '14:45 PM', status: '45%' },
               { id: 503, qty: 45, time: '15:10 PM', status: '10%' },
             ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-lg group hover:border-zinc-600 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="text-red-600 font-black text-lg font-mono">#{item.id}</div>
                      <div>
                        <div className="text-zinc-200 font-bold text-sm">Lote Industrial de {item.qty} uds.</div>
                        <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Estimado: {item.time}</div>
                      </div>
                   </div>
                   <div className="w-full sm:w-48 space-y-1.5">
                      <div className="flex justify-between text-[9px] font-black uppercase text-zinc-500 tracking-widest">
                        <span>Progreso</span>
                        <span className="text-yellow-500">{item.status}</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 shadow-inner">
                        <div className="h-full bg-yellow-600 rounded-full" style={{ width: item.status }}></div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
       <style>{`
          @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .animate-spin-slow { animation: spin-slow 12s linear infinite; }
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