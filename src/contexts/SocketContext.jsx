import { API_BASE_URL } from '../config';
import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';



const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    const role = localStorage.getItem('role');
    
    if (!token || !userData || role !== 'user') {
      return null;
    }

    if (socketRef.current?.connected) {
      return socketRef.current;
    }

    let userId;
    try {
      const user = JSON.parse(userData);
      userId = user._id || user.id;
    } catch (e) {
      console.error('Error parsing user data for socket:', e);
      return null;
    }

    if (!userId) return null;

    const newSocket = io(API_BASE_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log(' Socket connected:', newSocket.id);
      setIsConnected(true);
      newSocket.emit('register', userId);
    });

    newSocket.on('connect_error', (error) => {
      console.error(' Socket connection error:', error.message);
    });

    newSocket.on('disconnect', (reason) => {
      console.log(' Socket disconnected:', reason);
      setIsConnected(false);
    });

    newSocket.on('new-notification', (data) => {
      console.log(' Received new notification:', data);
      
      // EXTRA GUARD: Verifying role at time of reception
      const currentRole = localStorage.getItem('role');
      if (currentRole !== 'user') {
        console.log(' Suppressing student notification on non-student role:', currentRole);
        return;
      }
      
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-2 ring-indigo-500`}>
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
      
      window.dispatchEvent(new CustomEvent('notification-received', { detail: data.notification }));
    });

    socketRef.current = newSocket;
    setSocket(newSocket);
    return newSocket;
  }, []);

  useEffect(() => {
    connectSocket();

    const handleStorageChange = (e) => {
      if (e.key === 'userToken' && e.newValue) {
        setTimeout(() => connectSocket(), 500);
      }
      if (e.key === 'userToken' && !e.newValue) {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
          setSocket(null);
          setIsConnected(false);
        }
      }
    };

    const checkConnection = setInterval(() => {
      const token = localStorage.getItem('userToken');
      const role = localStorage.getItem('role');
      
      if (token && role === 'user' && !socketRef.current?.connected) {
        connectSocket();
      } else if ((!token || role !== 'user') && socketRef.current?.connected) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
        setIsConnected(false);
      }
    }, 5000);

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkConnection);
    };
  }, [connectSocket]);

  const manualConnect = useCallback(() => {
    connectSocket();
  }, [connectSocket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, manualConnect }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;


