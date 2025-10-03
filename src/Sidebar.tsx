import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Database, ShieldCheck, Beaker, Zap } from 'lucide-react';

const navLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: '/artifacts', label: 'Artifacts', icon: <BookOpen className="w-5 h-5" /> },
  { path: '/datasets', label: 'Datasets', icon: <Database className="w-5 h-5" /> },
  { path: '/protocols', label: 'Protocols', icon: <ShieldCheck className="w-5 h-5" /> },
  { path: '/mining', label: 'Mining', icon: <Beaker className="w-5 h-5" /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/' || location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-900">Wrongness Portfolio</h1>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map(link => (
          <Link key={link.label} to={link.path} className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(link.path) ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;