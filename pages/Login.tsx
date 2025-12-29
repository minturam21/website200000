
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, User, ShieldAlert, ShieldCheck, ChevronRight, Info } from 'lucide-react';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (sessionStorage.getItem('sm_skills_token')) {
      navigate(from, { replace: true });
    }
  }, [navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Verification failed.');
      }

      sessionStorage.setItem('sm_skills_token', result.token);
      sessionStorage.setItem('sm_skills_username', credentials.username);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="absolute top-10 left-10 hidden lg:block text-slate-400 hover:text-slate-900">
        <Link to="/" className="flex items-center transition-colors font-bold text-[10px] uppercase tracking-widest group">
          <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Institutional Home
        </Link>
      </div>

      <div className="w-full max-w-[440px]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 rounded-2xl mb-6 shadow-2xl">
            <ShieldCheck className="text-white" size={40} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter tracking-widest">SM Skills</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em]">Administrative Governance</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="p-10">
            <h2 className="text-xl font-bold text-slate-800 mb-8 uppercase tracking-tight">Identity Verification</h2>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 flex items-center text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-xl animate-in fade-in slide-in-from-top-2">
                <ShieldAlert size={16} className="mr-3" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1">Username</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-slate-400 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300"
                    placeholder="Enter Username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="password"
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-slate-400 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-black text-white font-bold uppercase tracking-[0.3em] text-[11px] py-5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-2xl active:scale-95"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Begin Session</span>
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">
            Institutional Control Center &copy; 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
