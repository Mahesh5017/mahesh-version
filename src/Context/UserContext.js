import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    rooms: [],
    devices: [],
  });

  const logout = () => setUser(null);

  const newDevice = (device) => {
    setUser((prev) => ({
      ...prev,
      devices: [...prev.devices, device],
    }));
  };

  const newRoom = (room) => {
    setUser((prev) => ({
      ...prev,
      rooms: [...prev.rooms, room],
    }));
  };

  const removeDevice = (deviceId) => {
    setUser((prev) => ({
      ...prev,
      devices: prev.devices.filter(device => device.deviceid !== deviceId),
    }));
  };

  const updateDevice = (deviceId, updatedDevice) => {
    setUser((prev) => ({
      ...prev,
      devices: prev.devices.map((device) =>
        device.deviceid === deviceId ? { ...device, ...updatedDevice } : device
      ),
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, newDevice, newRoom, removeDevice, updateDevice }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
