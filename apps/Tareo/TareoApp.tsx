
import React from 'react';
import { Users, Clock, CheckCircle2, UserPlus, Calendar, ListChecks, ArrowRight } from 'lucide-react';

interface TareoAppProps {
  activeSecondaryId: string;
}

const TareoApp: React.FC<TareoAppProps> = ({ activeSecondaryId }) => {
  
  const renderResumenDiario = () => (
    <div className="animate-fadeIn space-y-6 md:space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Tareo Operativo</h2>
          <p className="text-zinc-500 text-xs md:text-sm font-medium">Control de personal y productividad</p>
        </div>
        <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20">
          <Calendar className="w-4 h-4" /> Seleccionar Fecha
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {[
          { label: 'Presentes', count: 42, color: 'text-green-500', icon: Users, bg: 'bg-green-500/5' },
          { label: 'Ausentes', count: 3, color: 'text-red-500', icon: Users, bg: 'bg-red-500/5' },
          { label: 'Tardanza', count: 5, color: 'text-yellow-500', icon: Clock, bg: 'bg-yellow-500/5' },
          { label: 'Completos', count: 12, color: 'text-blue-500', icon: CheckCircle2, bg: 'bg-blue-500/5' },
        ].map((stat, idx) => (
          <div key={idx} className={`bg-zinc-900 p-4 md:p-6 rounded-2xl border border-zinc-800 shadow-xl group hover:-translate-y-1 transition-all ${stat.bg}`}>
            <div className="flex flex-col gap-3">
              <div className={`w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[9px] md:text-[10px] text-zinc-500 uppercase font-black tracking-widest">{stat.label}</div>
                <div className="text-xl md:text-3xl font-black text-white tracking-tighter">{stat.count}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 md:p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-zinc-300 uppercase tracking-tighter text-sm">Personal en Planta</h3>
          <span className="text-[10px] bg-red-600/10 text-red-500 px-2 py-0.5 rounded-full font-black">EN VIVO</span>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 group hover:border-red-600/50 transition-all cursor-pointer gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-red-600 font-black border border-zinc-800 group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg">
                  {i}
                </div>
                <div>
                  <div className="font-black text-zinc-100 uppercase tracking-tight text-sm">Operario Renzos #{i}</div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Área: Beneficiado</div>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-6 md:gap-12 w-full sm:w-auto border-t sm:border-none border-zinc-800 pt-3 sm:pt-0">
                <div className="text-center sm:text-right">
                  <div className="text-[9px] text-zinc-600 uppercase font-black">Turno Inicio</div>
                  <div className="text-sm text-zinc-300 font-mono font-bold tracking-tighter">07:30 AM</div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-[9px] text-zinc-600 uppercase font-black">Estatus</div>
                  <div className="text-[10px] px-3 py-1 bg-green-900/20 text-green-500 rounded-full border border-green-900/40 font-black uppercase">Activo</div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-red-600 transition-all hidden md:block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPersonal = () => (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-zinc-900 border border-zinc-800 p-6 rounded-3xl gap-4 shadow-xl">
        <h2 className="text-xl font-black text-white uppercase tracking-tighter">Directorio Colaboradores</h2>
        <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-900/20 flex items-center justify-center gap-2">
          <UserPlus className="w-4 h-4" /> Alta Personal
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center gap-4 hover:border-red-600/40 hover:bg-zinc-800/40 transition-all shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/5 rounded-full -mr-8 -mt-8 blur-xl group-hover:bg-red-600/20 transition-all"></div>
            <div className="w-14 h-14 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-center text-red-600 font-black text-xl shadow-inner group-hover:scale-110 transition-all">
               {i}
            </div>
            <div className="flex-1">
              <div className="text-sm font-black text-zinc-100 uppercase tracking-tight">C. Trabajador {i}</div>
              <div className="text-[10px] text-zinc-500 font-bold font-mono">ID: 2024-RZ-0{i}</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded font-black uppercase tracking-widest">Planta</span>
                <span className="text-[9px] text-zinc-600 font-bold uppercase">Nivel 1</span>
              </div>
            </div>
            <button className="p-2 text-zinc-700 hover:text-white transition-colors relative z-10">
              <ListChecks className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAsistencia = () => (
    <div className="animate-fadeIn max-w-2xl mx-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 text-center space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none"></div>
        <div className="w-24 h-24 bg-zinc-950 rounded-3xl flex items-center justify-center mx-auto text-red-600 border border-zinc-800 shadow-2xl group transition-all">
            <ListChecks className="w-12 h-12 group-hover:scale-110 transition-transform" />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Control Biométrico</h2>
          <p className="text-zinc-500 max-w-sm mx-auto text-sm leading-relaxed font-medium">
            Ingresa el <span className="text-zinc-300 font-bold">Código de Empleado</span> o utiliza el lector de huellas/QR para registrar jornada.
          </p>
        </div>
        <div className="max-w-xs mx-auto space-y-4">
            <input type="text" className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-6 py-5 text-center text-2xl tracking-[0.3em] font-black focus:border-red-600 focus:outline-none transition-all text-white shadow-inner placeholder-zinc-800" placeholder="RZ-0000" />
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-red-900/40 transition-all transform active:scale-[0.97]">
              Validar Acceso
            </button>
        </div>
        <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">V 2.1 - Avicola Renzos Security</div>
      </div>
    </div>
  );

  switch (activeSecondaryId) {
    case 'tareo-diario': return renderResumenDiario();
    case 'tareo-personal': return renderPersonal();
    case 'tareo-asistencia': return renderAsistencia();
    default: return renderResumenDiario();
  }
};

export default TareoApp;