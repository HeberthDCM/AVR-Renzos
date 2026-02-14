
import React from 'react';

export enum PrimaryAppId {
  CAJA = 'caja',
  TAREO = 'tareo',
  BANDEJAS = 'bandejas',
  REPORTES = 'reportes',
  CONFIG = 'config'
}

export type TipoTransaccion = 'ingreso' | 'gasto' | 'transferencia' | 'ajuste';

export interface Caja {
  id: string;
  nombre: string;
  descripcion: string;
  saldo: number;
  estado: 'abierta' | 'cerrada';
}

export interface Transaccion {
  id: string;
  fecha: string;
  tipo: TipoTransaccion;
  monto: number;
  concepto: string;
  usuarioId: string;
  usuarioNombre: string;
  cajaId: string;
  cajaNombre: string;
  cajaDestinoId?: string; // Para transferencias
  observaciones?: string;
}

export interface User {
  id: string;
  username: string;
  password?: string;
  fullName: string;
  role: 'admin' | 'operator';
  active: boolean;
}

export interface Permission {
  userId: string;
  appId: PrimaryAppId;
  subMenus: string[];
  cajasPermitidas: string[]; // IDs de las cajas que puede operar
}

export interface SecondaryMenu {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface PrimaryApp {
  id: PrimaryAppId;
  label: string;
  icon: React.ReactNode;
  secondaryMenus: SecondaryMenu[];
}

export interface AuthState {
  user: User | null;
  permissions: Permission[];
}
