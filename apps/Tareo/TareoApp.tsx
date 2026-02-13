
import React from 'react';
import { Users, Clock, CheckCircle2, UserPlus, Calendar, ListChecks } from 'lucide-react';

interface TareoAppProps {
  activeSecondaryId: string;
}

const TareoApp: React.FC<TareoAppProps> = ({ activeSecondaryId }) => {
  
  const renderResumenDiario = () => (
    <div className="animate-fadeIn space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white">Registro Diario de Labores</h2>
          <p className="text-zinc-500 text-sm">Resumen operativo del día</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Cambiar Fecha
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Presentes', count: 42, color: 'text-green-500', icon: Users },
          { label: 'Ausentes', count: 3, color: 'text-red-500', icon: Users },
          { label: 'Tardanza', count: 5, color: 'text-yellow-500', icon: Clock },
          { label: 'Completados', count: 12, color: 'text-blue-500', icon: CheckCircle2 },
        ].map((stat, idx) => (
          <div key={idx} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-zinc-800 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">{stat.label}</div>
                <div className="text-xl font-bold text-white">{stat.count}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <h3 className="font-semibold mb-4 text-zinc-300">Jornada Activa</h3>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 group hover:border-red-600/50 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300 font-bold border border-zinc-600">
                  {String.fromCharCode(64 + i)}
                </div>
                <div>
                  <div className="font-medium text-zinc-200">Colaborador ID #2024-{i}</div>
                  <div className="text-xs text-zinc-500">Actividad: Clasificación de Producto</div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-[10px] text-zinc-500 uppercase font-bold">Inicio</div>
                  <div className="text-sm text-zinc-300 font-mono">08:00 AM</div>
                </div>
                <div className="hidden sm:block text-right">
                  <div className="text-[10px] text-zinc-500 uppercase font-bold">Horas Acum.</div>
                  <div className="text-sm text-red-500 font-bold">4.5h</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPersonal = () => (
    <div className="animate-fadeIn space-y-6">
      <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-white">Directorio de Personal</h2>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Nuevo Empleado
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center gap-4 hover:bg-zinc-800/50 transition-colors">
            <div className="w-12 h-12 bg-zinc-800 rounded-full border border-zinc-700 flex items-center justify-center text-red-600 font-bold">
               {i}
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-zinc-200 uppercase">Juan Pérez {i}</div>
              <div className="text-xs text-zinc-500">DNI: 7283492{i}</div>
              <div className="text-[10px] text-red-500 font-bold">ALMACENERO</div>
            </div>
            <button className="text-zinc-600 hover:text-white">...</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAsistencia = () => (
    <div className="animate-fadeIn bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center space-y-6">
       <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-red-600 border border-red-600/20">
          <ListChecks className="w-10 h-10" />
       </div>
       <h2 className="text-2xl font-bold">Control de Asistencia Biométrico / Manual</h2>
       <p className="text-zinc-500 max-w-sm mx-auto text-sm">Escanee el código QR del trabajador o ingrese el ID manualmente para registrar la entrada o salida del personal.</p>
       <div className="max-w-xs mx-auto space-y-4">
          <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-center text-xl tracking-[0.5em] font-bold focus:border-red-600 focus:outline-none" placeholder="ID-TRABAJADOR" />
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-red-900/40">MARCAR REGISTRO</button>
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
