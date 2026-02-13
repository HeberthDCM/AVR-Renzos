
// Fix: Added React import to provide access to the React namespace for ReactNode types
import React from 'react';

export enum PrimaryAppId {
  CAJA = 'caja',
  TAREO = 'tareo',
  BANDEJAS = 'bandejas',
  REPORTES = 'reportes',
  CONFIG = 'config'
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

export interface AppState {
  activeAppId: PrimaryAppId;
  activeSecondaryId: string;
}
