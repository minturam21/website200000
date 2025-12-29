
import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.tsx';
import { MapPin, Phone, Mail, Send, Loader2, Info, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { db } from '../lib/db.ts';
import { submitEnquiry } from '../services/enquiryService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const settings = db.getSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    try {
      await submitEnquiry(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Transmission failed. Institutional server is unreachable.');
      setStatus('error');
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <PageHeader title="Contact Admissions" subtitle="Institutional enquiry portal." />

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
                <strong>Data Governance:</strong> Your enquiry will be securely stored in our institutional database for review by the academic council.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded border border-slate-200 shadow-sm">
            {status === 'success' ? (
              <div className="text-center py-12 animate-in fade-in zoom-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tight">Enquiry Received</h3>
                <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                  Your application for validation has been successfully transmitted. Our admissions office will reach out within 48 operational hours.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-slate-900 font-bold uppercase text-[10px] tracking-[0.3em] border-b-2 border-slate-900 pb-1 hover:text-green-600 hover:border-green-600 transition-all"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center space-x-3">
                    <Info size={16}/>
                    <span>{errorMessage}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" required value={formData.name} onChange={(v:string) => setFormData({...formData, name: v})} />
                  <Input label="Email Address" type="email" required value={formData.email} onChange={(v:string) => setFormData({...formData, email: v})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Phone Number" required value={formData.phone} onChange={(v:string) => setFormData({...formData, phone: v})} />
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Preferred Program</label>
                    <select 
                      required
                      className="bg-white border border-slate-300 rounded px-4 py-3 focus:border-green-500 outline-none font-medium text-sm"
                      value={formData.course}
                      onChange={e => setFormData({...formData, course: e.target.value})}
                    >
                      <option value="">Select Course</option>
                      <option value="Computer Science Engineering">Computer Science</option>
                      <option value="Business Administration (MBA)">Business Admin</option>
                      <option value="Graphic Design Diploma">Graphic Design</option>
                      <option value="Data Science Bootcamp">Data Science</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Personal Statement</label>
                  <textarea 
                    rows={4}
                    required
                    className="bg-white border border-slate-300 rounded px-4 py-3 focus:border-green-500 outline-none font-medium resize-none text-sm"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    placeholder="Briefly describe your academic interest..."
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-slate-900 hover:bg-black text-white font-bold uppercase tracking-[0.2em] py-4 rounded transition-all flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <><span>Transmit Enquiry</span> <Send size={16} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfo = ({ icon, label, value }: any) => (
  <div className="flex items-start space-x-6">
    <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center text-slate-900 flex-shrink-0">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</h4>
      <p className="text-lg text-slate-800 font-medium">{value}</p>
    </div>
  </div>
);

const Input = ({ label, type = "text", ...props }: any) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">{label}</label>
    <input 
      type={type}
      className="bg-white border border-slate-300 rounded px-4 py-3 focus:border-green-500 outline-none font-medium text-sm"
      onChange={e => props.onChange(e.target.value)}
      {...props}
    />
  </div>
);

export default Contact;
