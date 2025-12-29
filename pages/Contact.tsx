
import React from 'react';
import PageHeader from '../components/PageHeader.tsx';
import { MapPin, Phone, Mail, ShieldAlert, Send } from 'lucide-react';
import { db } from '../lib/db.ts';

const Contact: React.FC = () => {
  const settings = db.getSettings();

  return (
    <div className="bg-white min-h-screen pb-24">
      <PageHeader title="Contact Admissions" subtitle="Institutional contact directory." />

      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 uppercase tracking-tight">Institutional Contacts</h2>
            <div className="space-y-10">
              <ContactInfo icon={<MapPin/>} label="Campus Address" value={settings.address} />
              <ContactInfo icon={<Phone/>} label="Admissions Helpline" value={settings.phone} />
              <ContactInfo icon={<Mail/>} label="General Email" value={settings.email} />
            </div>

            <div className="mt-16 p-6 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-4">
              <ShieldAlert className="text-slate-400 mt-1 flex-shrink-0" size={20} />
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium uppercase tracking-tight">
                <strong>Data Governance:</strong> Digital enquiry transmission is currently transitioning to a secure institutional server. Please use helplines for immediate response.
              </p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100"></div>
            <h3 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-tight flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 animate-pulse"></span>
              Enquiry Portal
            </h3>
            
            <form className="space-y-6 opacity-60 grayscale-[0.5] pointer-events-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" placeholder="Student Name" />
                <Input label="Phone Number" placeholder="+1..." />
              </div>
              <Input label="Email Address" placeholder="email@example.com" />
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                <textarea className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl h-32 resize-none outline-none" placeholder="How can we help?"></textarea>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col items-center">
              <button disabled className="w-full bg-slate-100 text-slate-400 py-5 rounded-xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center space-x-3 cursor-not-allowed">
                <Send size={14} />
                <span>Portal Syncing...</span>
              </button>
              <p className="mt-4 text-[9px] text-slate-300 font-bold uppercase tracking-widest text-center">
                Transmission layer awaiting backend integration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, placeholder }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <input disabled className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none" placeholder={placeholder} />
  </div>
);

const ContactInfo = ({ icon, label, value }: any) => (
  <div className="flex items-start space-x-6">
    <div className="w-12 h-12 bg-slate-900 rounded flex items-center justify-center text-white flex-shrink-0 shadow-lg">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</h4>
      <p className="text-lg text-slate-800 font-medium">{value}</p>
    </div>
  </div>
);

export default Contact;
