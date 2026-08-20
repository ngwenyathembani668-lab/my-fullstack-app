import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import Avatar from './Avatar';
import MenuItem from './MenuItem';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { openLogin } = useModal();
  const navigate = useNavigate();
  const toggleOpen = () => setIsOpen((v) => !v);
  const handleBecomeHost = () => navigate('/become-a-host');
  const handleLogin = () => { setIsOpen(false); openLogin(); };
  const handleLogout = () => { setIsOpen(false); logout(); };
  const firstName = user?.name ? user.name.split(' ')[0] : '';
  const initial = firstName ? firstName.charAt(0).toUpperCase() : '?';
  return (
    <div className='relative'>
      <div className="flex flex-row items-center gap-3">
        <div onClick={handleBecomeHost} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">Become a Host</div>
        <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <HiMenu size={22} />
          <div className='hidden md:block'>
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">Hello, {firstName}</span>
                <div className="hosts-avatar">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="h-[25px] w-[25px] rounded-full object-cover" />
                  ) : (
                    <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">{initial}</div>
                  )}
                </div>
              </div>
            ) : (
              <Avatar />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {isAuthenticated && user ? (
              <>
                <MenuItem onClick={() => { setIsOpen(false); navigate('/reservations'); }} label="My Reservations" />
                <MenuItem onClick={() => { setIsOpen(false); navigate('/become-a-host'); }} label="Become a Host" />
                <MenuItem onClick={handleLogout} label="Log out" />
              </>
            ) : (
              <>
                <MenuItem onClick={handleLogin} label="Log in" />
                <MenuItem onClick={handleLogin} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
