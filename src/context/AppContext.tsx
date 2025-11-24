import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Provider {
  id: string;
  name: string;
  serviceType: string;
  city: string;
  location: { lat: number; lng: number }; // Added location coordinates
  contact: string;
  experience: number;
  photo: string;
  rating: number;
  reviews: Review[];
}

export interface Reminder {
  id: string;
  serviceType: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
}

export interface Device {
  id: string;
  name: string;
  type: 'refrigerator' | 'air-conditioner' | 'washing-machine' | 'water-heater' | 'tv' | 'fan' | 'other';
  brand: string;
  model: string;
  status: 'working' | 'needs-service' | 'critical';
  lastServiceDate?: string;
  purchaseDate: string;
  warrantyExpiry?: string;
  notes?: string;
  powerConsumption?: number; // in watts
  isConnected: boolean; // Simulated connection status
}

export interface PaymentMethod {
  id: string;
  type: 'credit-card' | 'debit-card' | 'jazzcash' | 'easypaisa' | 'bank-transfer';
  cardNumber?: string; // Last 4 digits
  cardholderName?: string;
  expiryDate?: string;
  phoneNumber?: string; // For mobile wallets
  bankName?: string;
  accountNumber?: string; // Last 4 digits
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  location?: { lat: number; lng: number; address: string }; // Added user location
  paymentMethods: PaymentMethod[];
}

interface AppContextType {
  providers: Provider[];
  addProvider: (provider: Provider) => void;
  addReview: (providerId: string, review: Review) => void;
  reminders: Reminder[];
  addReminder: (reminder: Reminder) => void;
  deleteReminder: (id: string) => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUserLocation: (location: { lat: number; lng: number; address: string }) => void;
  favorites: string[];
  toggleFavorite: (providerId: string) => Promise<{ success: boolean; error?: string }>;
  isFavorite: (providerId: string) => boolean;
  isOnline: boolean;
  devices: Device[];
  addDevice: (device: Device) => void;
  updateDevice: (deviceId: string, updates: Partial<Device>) => void;
  deleteDevice: (deviceId: string) => void;
  simulateDeviceStatus: (deviceId: string) => void;
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: PaymentMethod) => void;
  deletePaymentMethod: (methodId: string) => void;
  setDefaultPaymentMethod: (methodId: string) => void;
  getNearbyProviders: (serviceType: string, maxDistance?: number) => Provider[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialProviders: Provider[] = [
  // Plumbers
  {
    id: '1',
    name: 'Ali Raza',
    serviceType: 'Plumber',
    city: 'DHA Phase 3, Lahore',
    contact: '0321-6547890',
    experience: 6,
    photo: 'https://ui-avatars.com/api/?name=Ali+Raza&size=400&background=4FC3F7&color=fff',
    rating: 4.7,
    reviews: [
      { id: '1', name: 'Ahmed Khan', rating: 5, comment: 'Very professional and quick service!', date: '2025-01-10' },
      { id: '2', name: 'Sara Ahmed', rating: 4, comment: 'Good work, reasonable prices.', date: '2025-01-08' }
    ],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '2',
    name: 'Waqas & Sons',
    serviceType: 'Plumber',
    city: 'Karim Park, Lahore',
    contact: '0300-9876541',
    experience: 8,
    photo: 'https://ui-avatars.com/api/?name=Waqas+Sons&size=400&background=4FC3F7&color=fff',
    rating: 4.5,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '3',
    name: 'Shahid',
    serviceType: 'Plumber',
    city: 'DHA Phase 5, Lahore',
    contact: '0332-1122334',
    experience: 10,
    photo: 'https://ui-avatars.com/api/?name=Shahid&size=400&background=4FC3F7&color=fff',
    rating: 4.8,
    reviews: [
      { id: '3', name: 'Fatima Ali', rating: 5, comment: 'Fixed the leak perfectly!', date: '2025-01-12' }
    ],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '4',
    name: 'Umar Plumber',
    serviceType: 'Plumber',
    city: 'Model Town, Lahore',
    contact: '0314-6677889',
    experience: 5,
    photo: 'https://ui-avatars.com/api/?name=Umar+Plumber&size=400&background=4FC3F7&color=fff',
    rating: 4.6,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '5',
    name: 'Mubeen',
    serviceType: 'Plumber',
    city: 'Garden Town, Lahore',
    contact: '0345-1122443',
    experience: 7,
    photo: 'https://ui-avatars.com/api/?name=Mubeen&size=400&background=4FC3F7&color=fff',
    rating: 4.9,
    reviews: [
      { id: '4', name: 'Zainab Hassan', rating: 5, comment: 'Excellent service, highly recommended!', date: '2025-01-11' }
    ],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  // Electricians
  {
    id: '6',
    name: 'Bilal',
    serviceType: 'Electrician',
    city: 'DHA Phase 6, Lahore',
    contact: '0321-8899001',
    experience: 9,
    photo: 'https://ui-avatars.com/api/?name=Bilal&size=400&background=4FC3F7&color=fff',
    rating: 4.8,
    reviews: [
      { id: '5', name: 'Hassan Malik', rating: 5, comment: 'Very knowledgeable and professional.', date: '2025-01-09' }
    ],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '7',
    name: 'Rehman Electrical Experts',
    serviceType: 'Electrician',
    city: 'Karim Park, Lahore',
    contact: '0333-4455667',
    experience: 6,
    photo: 'https://ui-avatars.com/api/?name=Rehman+Electrical&size=400&background=4FC3F7&color=fff',
    rating: 4.6,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '8',
    name: 'Hamza',
    serviceType: 'Electrician',
    city: 'Faisal Town, Lahore',
    contact: '0305-9988776',
    experience: 5,
    photo: 'https://ui-avatars.com/api/?name=Hamza&size=400&background=4FC3F7&color=fff',
    rating: 4.7,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '9',
    name: 'Zain',
    serviceType: 'Electrician',
    city: 'DHA Phase 2, Lahore',
    contact: '0324-5544332',
    experience: 11,
    photo: 'https://ui-avatars.com/api/?name=Zain&size=400&background=4FC3F7&color=fff',
    rating: 4.9,
    reviews: [
      { id: '6', name: 'Ayesha Tariq', rating: 5, comment: 'Best electrician in Lahore!', date: '2025-01-13' }
    ],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '10',
    name: 'Asim Wiring Services',
    serviceType: 'Electrician',
    city: 'Iqbal Town, Lahore',
    contact: '0311-3322110',
    experience: 4,
    photo: 'https://ui-avatars.com/api/?name=Asim+Wiring&size=400&background=4FC3F7&color=fff',
    rating: 4.5,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  // AC Service
  {
    id: '11',
    name: 'Bilaal',
    serviceType: 'AC Service',
    city: 'DHA Phase 5, Lahore',
    contact: '0331-5544667',
    experience: 8,
    photo: 'https://ui-avatars.com/api/?name=Bilaal&size=400&background=4FC3F7&color=fff',
    rating: 4.7,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '12',
    name: 'Arslan',
    serviceType: 'AC Service',
    city: 'Karim Park, Lahore',
    contact: '0344-6655778',
    experience: 5,
    photo: 'https://ui-avatars.com/api/?name=Arslan&size=400&background=4FC3F7&color=fff',
    rating: 4.6,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '13',
    name: 'Nadeem',
    serviceType: 'AC Service',
    city: 'Model Town, Lahore',
    contact: '0321-7788990',
    experience: 10,
    photo: 'https://ui-avatars.com/api/?name=Nadeem&size=400&background=4FC3F7&color=fff',
    rating: 4.8,
    reviews: [
      { id: '7', name: 'Usman Ali', rating: 5, comment: 'AC is cooling perfectly now!', date: '2025-01-14' }
    ],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '14',
    name: 'Naeem Cooling Experts',
    serviceType: 'AC Service',
    city: 'Garden Town, Lahore',
    contact: '0335-5566771',
    experience: 12,
    photo: 'https://ui-avatars.com/api/?name=Naeem+Cooling&size=400&background=4FC3F7&color=fff',
    rating: 4.9,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '15',
    name: 'Rashid AC Maintenance',
    serviceType: 'AC Service',
    city: 'DHA Phase 8, Lahore',
    contact: '0302-6677885',
    experience: 7,
    photo: 'https://ui-avatars.com/api/?name=Rashid+AC&size=400&background=4FC3F7&color=fff',
    rating: 4.7,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  // Cleaning Services
  {
    id: '16',
    name: 'Shafia',
    serviceType: 'Cleaning',
    city: 'DHA Phase 4, Lahore',
    contact: '0320-8899220',
    experience: 5,
    photo: 'https://ui-avatars.com/api/?name=Shafia&size=400&background=4FC3F7&color=fff',
    rating: 4.9,
    reviews: [
      { id: '8', name: 'Mariam Sheikh', rating: 5, comment: 'House looks spotless, amazing work!', date: '2025-01-15' }
    ],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '17',
    name: 'Saima',
    serviceType: 'Cleaning',
    city: 'Karim Park, Lahore',
    contact: '0345-6677881',
    experience: 4,
    photo: 'https://ui-avatars.com/api/?name=Saima&size=400&background=4FC3F7&color=fff',
    rating: 4.8,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '18',
    name: 'Nabeela',
    serviceType: 'Cleaning',
    city: 'Gulberg, Lahore',
    contact: '0332-9988772',
    experience: 3,
    photo: 'https://ui-avatars.com/api/?name=Nabeela&size=400&background=4FC3F7&color=fff',
    rating: 4.6,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '19',
    name: 'Samreen',
    serviceType: 'Cleaning',
    city: 'Model Town, Lahore',
    contact: '0304-5566772',
    experience: 6,
    photo: 'https://ui-avatars.com/api/?name=Samreen&size=400&background=4FC3F7&color=fff',
    rating: 4.7,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  },
  {
    id: '20',
    name: 'Ayesha',
    serviceType: 'Cleaning',
    city: 'DHA Phase 2, Lahore',
    contact: '0323-4455660',
    experience: 7,
    photo: 'https://ui-avatars.com/api/?name=Ayesha&size=400&background=4FC3F7&color=fff',
    rating: 4.8,
    reviews: [],
    location: { lat: 31.4641, lng: 74.3901 }
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [providers, setProviders] = useState<Provider[]>(() => {
    try {
      const saved = localStorage.getItem('homeservices_providers');
      return saved ? JSON.parse(saved) : initialProviders;
    } catch {
      return initialProviders;
    }
  });

  const [reminders, setReminders] = useState<Reminder[]>(() => {
    try {
      const saved = localStorage.getItem('homeservices_reminders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('homeservices_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('homeservices_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [devices, setDevices] = useState<Device[]>(() => {
    try {
      const saved = localStorage.getItem('homeservices_devices');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    try {
      const saved = localStorage.getItem('homeservices_paymentMethods');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('homeservices_providers', JSON.stringify(providers));
    } catch (error) {
      console.error('Failed to save providers:', error);
    }
  }, [providers]);

  useEffect(() => {
    try {
      localStorage.setItem('homeservices_reminders', JSON.stringify(reminders));
    } catch (error) {
      console.error('Failed to save reminders:', error);
    }
  }, [reminders]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('homeservices_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('homeservices_user');
      }
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('homeservices_favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('homeservices_devices', JSON.stringify(devices));
    } catch (error) {
      console.error('Failed to save devices:', error);
    }
  }, [devices]);

  useEffect(() => {
    try {
      localStorage.setItem('homeservices_paymentMethods', JSON.stringify(paymentMethods));
    } catch (error) {
      console.error('Failed to save payment methods:', error);
    }
  }, [paymentMethods]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addProvider = (provider: Provider) => {
    setProviders([...providers, provider]);
  };

  const addReview = (providerId: string, review: Review) => {
    setProviders(providers.map(provider => {
      if (provider.id === providerId) {
        const updatedReviews = [...provider.reviews, review];
        const avgRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return {
          ...provider,
          reviews: updatedReviews,
          rating: Math.round(avgRating * 10) / 10
        };
      }
      return provider;
    }));
  };

  const addReminder = (reminder: Reminder) => {
    setReminders([...reminders, reminder]);
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = async (providerId: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Check if offline
    if (!navigator.onLine) {
      return { success: false, error: 'You are offline. Please check your connection.' };
    }

    // Simulate random errors (10% chance)
    if (Math.random() < 0.1) {
      return { success: false, error: 'Failed to update favorites. Please try again.' };
    }

    try {
      setFavorites(prev => {
        if (prev.includes(providerId)) {
          return prev.filter(id => id !== providerId);
        } else {
          return [...prev, providerId];
        }
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred.' };
    }
  };

  const isFavorite = (providerId: string) => {
    return favorites.includes(providerId);
  };

  const updateUserLocation = (location: { lat: number; lng: number; address: string }) => {
    if (user) {
      setUser({ ...user, location });
    }
  };

  const addDevice = (device: Device) => {
    setDevices([...devices, device]);
  };

  const updateDevice = (deviceId: string, updates: Partial<Device>) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        return { ...device, ...updates };
      }
      return device;
    }));
  };

  const deleteDevice = (deviceId: string) => {
    setDevices(devices.filter(device => device.id !== deviceId));
  };

  const simulateDeviceStatus = (deviceId: string) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        const newStatus = device.status === 'working' ? 'needs-service' : 'working';
        return { ...device, status: newStatus };
      }
      return device;
    }));
  };

  const addPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethods([...paymentMethods, method]);
  };

  const deletePaymentMethod = (methodId: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== methodId));
  };

  const setDefaultPaymentMethod = (methodId: string) => {
    setPaymentMethods(paymentMethods.map(method => {
      if (method.id === methodId) {
        return { ...method, isDefault: true };
      } else {
        return { ...method, isDefault: false };
      }
    }));
  };

  const getNearbyProviders = (serviceType: string, maxDistance?: number) => {
    if (!user || !user.location) {
      return [];
    }

    const userLat = user.location.lat;
    const userLng = user.location.lng;

    return providers
      .filter(provider => provider.serviceType === serviceType)
      .filter(provider => {
        const providerLat = provider.location.lat;
        const providerLng = provider.location.lng;

        const distance = getDistance(userLat, userLng, providerLat, providerLng);

        return maxDistance ? distance <= maxDistance : true;
      });
  };

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  return (
    <AppContext.Provider
      value={{
        providers,
        addProvider,
        addReview,
        reminders,
        addReminder,
        deleteReminder,
        user,
        login,
        logout,
        updateUserLocation,
        favorites,
        toggleFavorite,
        isFavorite,
        isOnline,
        devices,
        addDevice,
        updateDevice,
        deleteDevice,
        simulateDeviceStatus,
        paymentMethods,
        addPaymentMethod,
        deletePaymentMethod,
        setDefaultPaymentMethod,
        getNearbyProviders
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}