
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { PrimaryAppId, User, Permission, AuthState } from './types';
import { PRIMARY_APPS } from './constants';
import Login from './components/Login';

// Modular Views
import CajaApp from './apps/Caja/CajaApp';
import TareoApp from './apps/Tareo/TareoApp';
import BandejasApp from './apps/Bandejas/BandejasApp';
import ConfigApp from './apps/Config/ConfigApp';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({ user: null, permissions: [] });
  const [activeAppId, setActiveAppId] = useState<PrimaryAppId>(PrimaryAppId.CAJA);
  const [activeSecondaryId, setActiveSecondaryId] = useState<string>('');

  // Mock de carga de datos iniciales / Simulación de DB
  useEffect(() => {
    const savedUser = localStorage.getItem('renzos_user');
    const savedPerms = localStorage.getItem('renzos_perms');
    if (savedUser && savedPerms) {
      setAuth({
        user: JSON.parse(savedUser),
        permissions: JSON.parse(savedPerms)
      });
    }
  }, []);

  const handleLogin = (user: User, permissions: Permission[]) => {
    setAuth({ user, permissions });
    localStorage.setItem('renzos_user', JSON.stringify(user));
    localStorage.setItem('renzos_perms', JSON.stringify(permissions));
    
    // Seleccionar la primera app permitida
    if (permissions.length > 0) {
      setActiveAppId(permissions[0].appId);
    }
  };

  const handleLogout = () => {
    setAuth({ user: null, permissions: [] });
    localStorage.removeItem('renzos_user');
    localStorage.removeItem('renzos_perms');
  };

  // Filtrar apps según permisos
  const allowedApps = PRIMARY_APPS.filter(app => 
    auth.permissions.some(p => p.appId === app.id)
  );

  useEffect(() => {
    const currentApp = allowedApps.find(a => a.id === activeAppId);
    if (currentApp) {
      // Filtrar submenús según permisos específicos
      const perm = auth.permissions.find(p => p.appId === activeAppId);
      const allowedSubs = currentApp.secondaryMenus.filter(s => 
        !perm || perm.subMenus.length === 0 || perm.subMenus.includes(s.id)
      );
      if (allowedSubs.length > 0 && !allowedSubs.some(s => s.id === activeSecondaryId)) {
        setActiveSecondaryId(allowedSubs[0].id);
      }
    }
  }, [activeAppId, auth.permissions]);

  if (!auth.user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeAppId) {
      case PrimaryAppId.CAJA:
        return <CajaApp activeSecondaryId={activeSecondaryId} auth={auth} />;
      case PrimaryAppId.TAREO:
        return <TareoApp activeSecondaryId={activeSecondaryId} />;
      case PrimaryAppId.BANDEJAS:
        return <BandejasApp activeSecondaryId={activeSecondaryId} />;
      case PrimaryAppId.CONFIG:
        return <ConfigApp activeSecondaryId={activeSecondaryId} auth={auth} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-xl font-bold text-zinc-400">Módulo en Desarrollo</h2>
            <p className="text-zinc-600">Esta sección se encuentra en construcción para el submenú: {activeSecondaryId}</p>
          </div>
        );
    }
  };

  return (
    <Layout 
      user={auth.user}
      allowedApps={allowedApps}
      activeAppId={activeAppId} 
      onAppChange={setActiveAppId}
      activeSecondaryId={activeSecondaryId}
      onSecondaryChange={setActiveSecondaryId}
      onLogout={handleLogout}
      permissions={auth.permissions}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
