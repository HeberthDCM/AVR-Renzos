
import React from 'react';
import { PrimaryApp, PrimaryAppId } from './types';
import { 
  Wallet, 
  ClipboardList, 
  Layers, 
  BarChart3, 
  Settings,
  PlusCircle,
  History,
  Users,
  Calendar,
  Box,
  Truck,
  FileText
} from 'lucide-react';

export const PRIMARY_APPS: PrimaryApp[] = [
  {
    id: PrimaryAppId.CAJA,
    label: 'Caja',
    icon: <Wallet className="w-6 h-6" />,
    secondaryMenus: [
      { id: 'caja-apertura', label: 'Apertura/Cierre' },
      { id: 'caja-ingresos', label: 'Ingresos' },
      { id: 'caja-egresos', label: 'Egresos' },
      { id: 'caja-movimientos', label: 'Movimientos' }
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
