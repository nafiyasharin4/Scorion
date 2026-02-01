import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    console.log('Socket connect attempt - token:', !!token, 'userData:', !!userData);
    
    if (!token || !userData) {
      console.log('No token or userData, skipping socket connection');
      return null;
    }

    let userId;
    try {
      const user = JSON.parse(userData);
      userId = user._id || user.id;
      console.log('Parsed userId for socket:', userId);
    } catch (e) {
      console.error('Error parsing user data for socket:', e);
      return null;
    }

    if (!userId) {
      console.log('No userId found in userData');
      return null;
    }

    // Connect to socket server
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('✅ Socket connected:', newSocket.id);
      setIsConnected(true);
      
      // Register user with their ID
      newSocket.emit('register', userId);
      console.log('✅ Registered user with server:', userId);
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('⚠️ Socket disconnected:', reason);
      setIsConnected(false);
    });

    // Listen for new notifications
    newSocket.on('new-notification', (data) => {
      console.log('🔔 Received new notification:', data);
      
      // Show toast notification
      toast.custom((t) => (
        <div 
          className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-2 ring-indigo-500`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔔</span>
              <div>
                <p className="font-bold text-slate-900">{data.notification?.title || 'New Notification'}</p>
                <p className="text-sm text-slate-500">{data.message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-r-2xl p-4 flex items-center justify-center text-sm font-bold text-indigo-600 hover:text-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ), {
        duration: 6000,
        position: 'top-right',
      });
      
      // Dispatch custom event for components to listen
      window.dispatchEvent(new CustomEvent('notification-received', { 
        detail: data.notification 
      }));
    });

    return newSocket;
  }, []);

  useEffect(() => {
    // Initial connection attempt
    const newSocket = connectSocket();
    if (newSocket) {
      setSocket(newSocket);
    }

    // Listen for login events to reconnect
    const handleStorageChange = (e) => {
      if (e.key === 'userToken' && e.newValue) {
        console.log('User logged in, connecting socket...');
        setTimeout(() => {
          const sock = connectSocket();
          if (sock) setSocket(sock);
        }, 500); // Small delay to ensure userData is also set
      }
    };

    // Also check periodically if user is logged in but socket not connected
    const checkConnection = setInterval(() => {
      const token = localStorage.getItem('userToken');
      if (token && !socket?.connected) {
        console.log('Token exists but socket not connected, attempting reconnect...');
        const sock = connectSocket();
        if (sock) setSocket(sock);
      }
    }, 5000);

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkConnection);
      socket?.disconnect();
    };
  }, [connectSocket]);

  // Expose a manual connect function
  const manualConnect = useCallback(() => {
    if (socket?.connected) {
      console.log('Socket already connected');
      return;
    }
    const newSocket = connectSocket();
    if (newSocket) {
      setSocket(newSocket);
    }
  }, [socket, connectSocket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, manualConnect }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
