import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, BloodGroup, DigitalIdCard } from '../types';
import { bloodConnectionStore } from '../services/store';

interface AuthContextType {
  currentUser: UserProfile | null;
  currentRole: UserRole;
  currentIdCard: DigitalIdCard | null;
  switchRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  registerDonor: (data: any) => { user: UserProfile; idCard: DigitalIdCard };
  refreshState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    return bloodConnectionStore.getCurrentUser();
  });

  const [currentIdCard, setCurrentIdCard] = useState<DigitalIdCard | null>(() => {
    const user = bloodConnectionStore.getCurrentUser();
    return user ? bloodConnectionStore.getIdCardByUserId(user.id) || null : null;
  });

  const refreshState = () => {
    const user = bloodConnectionStore.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setCurrentIdCard(bloodConnectionStore.getIdCardByUserId(user.id) || null);
    } else {
      setCurrentIdCard(null);
    }
  };

  const switchRole = (role: UserRole) => {
    const updated = bloodConnectionStore.switchRole(role);
    setCurrentUser(updated);
    setCurrentIdCard(bloodConnectionStore.getIdCardByUserId(updated.id) || null);
  };

  const login = (email: string, role?: UserRole): boolean => {
    const profiles = bloodConnectionStore.getProfiles();
    let found = profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
    
    if (!found && role) {
      found = profiles.find((p) => p.role === role);
    }

    if (found) {
      bloodConnectionStore.setCurrentUser(found);
      setCurrentUser(found);
      setCurrentIdCard(bloodConnectionStore.getIdCardByUserId(found.id) || null);
      return true;
    }
    return false;
  };

  const logout = () => {
    // Switch to visitor
    switchRole('VISITOR');
  };

  const registerDonor = (data: any) => {
    const res = bloodConnectionStore.registerDonor(data);
    setCurrentUser(res.user);
    setCurrentIdCard(res.idCard);
    return { user: res.user, idCard: res.idCard };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: currentUser ? currentUser.role : 'VISITOR',
        currentIdCard,
        switchRole,
        login,
        logout,
        registerDonor,
        refreshState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
