import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChevronDown, LogOut, User, Settings, Key } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-end shadow-sm">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-2 transition-colors"
        >
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium hidden sm:inline">{user?.name}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
            <button
              className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate('/profile');
              }}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
            <button
              className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate('/change-password');
              }}
            >
              <Key className="h-4 w-4" />
              <span>Change Password</span>
            </button>
            <button
              className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate('/settings');
              }}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
            <hr className="my-1" />
            <button
              className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 text-red-600"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}