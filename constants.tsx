
import React from 'react';
import { PrimaryApp, PrimaryAppId } from './types';
import { 
  Wallet, 
  ClipboardList, 
  Layers, 
  BarChart3, 
  Settings,
  ArrowRightLeft,
  Settings2
} from 'lucide-react';

// URL de tu servidor local (Node.js/Express)
export const API_BASE_URL = 'http://localhost:3000/api';

export const PRIMARY_APPS: PrimaryApp[] = [
  {
    id: PrimaryAppId.CAJA,
    label: 'Caja',
    icon: <Wallet className="w-6 h-6" />,
    secondaryMenus: [
      { id: 'caja-movimientos', label: 'Movimientos' },
      { id: 'caja-ingresos', label: 'Ingresos' },
      { id: 'caja-egresos', label: 'Egresos' },
      { id: 'caja-transf', label: 'Transferir' },
      { id: 'caja-ajuste', label: 'Ajuste' },
      { id: 'caja-apertura', label: 'Cerrar Caja' }
    ]
  },
  {
    id: PrimaryAppId.TAREO,
    label: 'Tareo',
    icon: <ClipboardList className="w-6 h-6" />,
    secondaryMenus: [
      { id: 'tareo-diario', label: 'Registro Diario' },
      { id: 'tareo-personal', label: 'Personal' },
      { id: 'tareo-asistencia', label: 'Asistencia' }
    ]
  },
  {
    id: PrimaryAppId.BANDEJAS,
    label: 'Bandejas',
    icon: <Layers className="w-6 h-6" />,
    secondaryMenus: [
      { id: 'band-recepcion', label: 'Recepción' },
      { id: 'band-lavado', label: 'Control Lavado' },
      { id: 'band-inventario', label: 'Inventario' }
    ]
  },
  {
    id: PrimaryAppId.REPORTES,
    label: 'Reportes',
    icon: <BarChart3 className="w-6 h-6" />,
    secondaryMenus: [
      { id: 'rep-ventas', label: 'Ventas' },
      { id: 'rep-produccion', label: 'Producción' },
      { id: 'rep-auditoria', label: 'Auditoría' }
    ]
  },
  {
    id: PrimaryAppId.CONFIG,
    label: 'Config',
    icon: <Settings className="w-6 h-6" />,
    secondaryMenus: [
      { id: 'conf-usuarios', label: 'Usuarios' },
      { id: 'conf-perfil', label: 'Mi Perfil' },
      { id: 'conf-sistema', label: 'Sistema' }
    ]
  }
];
