
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { PrimaryAppId } from './types';
import { PRIMARY_APPS } from './constants';

// Modular Views
import CajaApp from './apps/Caja/CajaApp';
import TareoApp from './apps/Tareo/TareoApp';
import BandejasApp from './apps/Bandejas/BandejasApp';

const App: React.FC = () => {
  const [activeAppId, setActiveAppId] = useState<PrimaryAppId>(PrimaryAppId.CAJA);
  const [activeSecondaryId, setActiveSecondaryId] = useState<string>('');

  // Auto-select first secondary menu when primary changes
  useEffect(() => {
    const app = PRIMARY_APPS.find(a => a.id === activeAppId);
    if (app && app.secondaryMenus.length > 0) {
      setActiveSecondaryId(app.secondaryMenus[0].id);
    }
  }, [activeAppId]);

  const renderContent = () => {
    switch (activeAppId) {
      case PrimaryAppId.CAJA:
        return <CajaApp activeSecondaryId={activeSecondaryId} />;
      case PrimaryAppId.TAREO:
        return <TareoApp activeSecondaryId={activeSecondaryId} />;
      case PrimaryAppId.BANDEJAS:
        return <BandejasApp activeSecondaryId={activeSecondaryId} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-600">
              ?
            </div>
            <h2 className="text-xl font-bold text-zinc-400">Módulo en Desarrollo</h2>
            <p className="text-zinc-600">Esta sección se encuentra actualmente en construcción para el submenú: {activeSecondaryId}</p>
          </div>
        );
    }
  };

  return (
    <Layout 
      activeAppId={activeAppId} 
      onAppChange={setActiveAppId}
      activeSecondaryId={activeSecondaryId}
      onSecondaryChange={setActiveSecondaryId}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
