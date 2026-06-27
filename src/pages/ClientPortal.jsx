import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, User, FileText, CheckCircle2, AlertTriangle, FileUp, Send, MessageSquare, Download, LogOut, Plus, Clock, HelpCircle, X, Eye, EyeOff } from 'lucide-react';
import SEO from '../components/SEO';
import { api } from '../api/api';
import { useToast } from '../components/Toast';
import Logo from '../components/Logo';

export default function ClientPortal() {
  const { toast } = useToast();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'verify' | 'forgot' | 'reset'
  const [isLoading, setIsLoading] = useState(false);

  // Login Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register Form States
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerCompany, setRegisterCompany] = useState('');

  // OTP Verification Form States
  const [verifyOtpVal, setVerifyOtpVal] = useState('');
  const [verifyEmail, setVerifyEmail] = useState('');

  // Forgot Password & Reset Form States
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetOtpVal, setResetOtpVal] = useState('');
  const [resetPasswordVal, setResetPasswordVal] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'invoices' | 'tickets' | 'files' | 'profile'
  const [portalState, setPortalState] = useState({
    user: { name: '', company: '', joinedDate: 'Joined recently', avatar: 'U' },
    projects: [],
    invoices: [],
    supportTickets: [],
    files: []
  });
  const [invoicePreview, setInvoicePreview] = useState(null);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', category: 'UI Bug', urgency: 'Low', message: '' });

  // Profile Form States
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileCompany, setProfileCompany] = useState(user?.company || '');
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith('http') || avatarPath.startsWith('data:')) return avatarPath;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
    const hostUrl = baseUrl.replace('/api/v1', '');
    return `${hostUrl}${avatarPath}`;
  };

  useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfileCompany(user.company || '');
      setProfilePreview(user.avatar ? getAvatarUrl(user.avatar) : null);
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');

    if (!profileName.trim() || !profileCompany.trim()) {
      setProfileError('Name and company are required.');
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('name', profileName);
      formData.append('company', profileCompany);
      if (profileFile) {
        formData.append('avatar', profileFile);
      }

      const res = await api.updateProfile(formData);

      if (res.success) {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
        setProfileFile(null);
        setProfileSuccess('Profile updated successfully!');
        
        // Re-sync parent dashboard portal state name/company
        const nameParts = (res.data.name || 'Client').split(' ');
        const avatarInitials = nameParts.map(part => part[0]).join('').substring(0, 2).toUpperCase();
        setPortalState(prev => ({
          ...prev,
          user: {
            ...prev.user,
            name: res.data.name || 'Client Partner',
            company: res.data.company || 'Partner',
            avatar: avatarInitials || 'CP'
          }
        }));
      } else {
        setProfileError(res.message || 'Failed to update profile.');
      }
    } catch (err) {
      setProfileError(err.message || 'Error occurred while updating profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggedIn = !!token;
  const isRegistering = authMode === 'register';

  // Handle Demo login bypass
  const handleDemoLogin = () => {
    setUsername('alex.rivera@apexretail.com');
    setPassword('demopassword');
  };

  // Fetch all dynamic client data from backend
  const fetchPortalData = async (authToken) => {
    try {
      setIsLoading(true);
      const projData = await api.getProjects();
      const invData = await api.getInvoices();
      const tckData = await api.getTickets();

      const projects = projData.success ? projData.data : [];
      const invoices = invData.success ? invData.data : [];
      const supportTickets = tckData.success ? tckData.data : [];
      
      const files = projects.flatMap(p => (p.files || []).map(f => ({
        category: f.category || 'Shared Asset',
        name: f.name,
        size: f.size || 'N/A',
        date: f.date || 'N/A',
        url: f.url
      })));

      const currentUser = JSON.parse(localStorage.getItem('user')) || {};
      const nameParts = (currentUser.name || 'Client').split(' ');
      const avatarInitials = nameParts.map(part => part[0]).join('').substring(0, 2).toUpperCase();

      setPortalState({
        user: {
          name: currentUser.name || 'Client Partner',
          company: currentUser.company || 'Partner',
          joinedDate: 'Joined recently',
          avatar: avatarInitials || 'CP'
        },
        projects: projects.map(p => ({
          id: p._id,
          name: p.title,
          description: p.description || '',
          status: p.status || 'Planning',
          completeness: p.progress || 0,
          milestones: p.milestones || []
        })),
        invoices: invoices.map(i => ({
          id: i.invoiceId,
          project: i.project,
          amount: i.amount,
          date: i.date,
          status: i.status,
          pdfUrl: i.pdfUrl
        })),
        supportTickets: supportTickets.map(t => ({
          id: t._id,
          ticketId: t.ticketId,
          subject: t.subject,
          category: t.category || 'General',
          urgency: t.urgency || 'Low',
          status: t.status || 'Open',
          messages: (t.messages || []).map(m => ({
            sender: m.sender,
            text: m.text,
            time: new Date(m.time).toLocaleDateString() + ' ' + new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }))
        })),
        files: files
      });
    } catch (err) {
      console.error('Failed to retrieve client portal data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load client data on state changes or initial mounting
  useEffect(() => {
    if (token) {
      fetchPortalData(token);
    }
  }, [token]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.warning('Please fill out login credentials.');
      return;
    }
    
    try {
      setIsLoading(true);
      const data = await api.login(username, password);
      
      if (data.success) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.accessToken);
        setUser(data.user);
      } else {
        toast.error(data.message || 'Login failed.');
      }
    } catch (err) {
      if (err.message && (err.message.toLowerCase().includes('verification') || err.message.toLowerCase().includes('pending'))) {
        toast.info(err.message);
        setVerifyEmail(username);
        setAuthMode('verify');
      } else {
        toast.error(err.message || 'Login credentials incorrect.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerName.trim() || !registerEmail.trim() || !registerPassword.trim() || !registerCompany.trim()) {
      toast.warning('Please fill out all registration fields.');
      return;
    }
    
    try {
      setIsLoading(true);
      const data = await api.register(
        registerName,
        registerEmail,
        registerPassword,
        registerCompany
      );
      
      if (data.success) {
        toast.success(data.message || 'Registration pending verification. Verification code sent.');
        setVerifyEmail(registerEmail);
        setAuthMode('verify');
      } else {
        toast.error(data.message || 'Registration failed.');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create workspace.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    if (!verifyEmail.trim() || !verifyOtpVal.trim()) {
      toast.warning('Please provide your email and the 6-digit verification code.');
      return;
    }

    try {
      setIsLoading(true);
      const data = await api.verifyOtp(verifyEmail, verifyOtpVal);
      if (data.success) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.accessToken);
        setUser(data.user);
        setVerifyOtpVal('');
        toast.success('Email verified successfully! Welcome to your workspace.');
      } else {
        toast.error(data.message || 'Verification failed.');
      }
    } catch (err) {
      toast.error(err.message || 'Invalid or expired OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!verifyEmail.trim()) {
      toast.warning('Please enter your verification email.');
      return;
    }

    try {
      setIsLoading(true);
      const data = await api.resendOtp(verifyEmail);
      if (data.success) {
        toast.success(data.message || 'A new verification code has been sent.');
      } else {
        toast.error(data.message || 'Failed to resend code.');
      }
    } catch (err) {
      toast.error(err.message || 'Error resending verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      toast.warning('Please enter your workspace email.');
      return;
    }

    try {
      setIsLoading(true);
      const data = await api.forgotPassword(forgotEmail);
      if (data.success) {
        toast.success('A verification code has been sent to your email.');
        setAuthMode('reset');
      } else {
        toast.error(data.message || 'Failed to request reset.');
      }
    } catch (err) {
      toast.error(err.message || 'Error occurred during password reset request.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !resetOtpVal.trim() || !resetPasswordVal.trim()) {
      toast.warning('Please provide email, verification code, and new password.');
      return;
    }

    try {
      setIsLoading(true);
      const data = await api.resetPasswordOtp(forgotEmail, resetOtpVal, resetPasswordVal);
      if (data.success) {
        toast.success('Password updated successfully! Please login.');
        setAuthMode('login');
        setUsername(forgotEmail);
        setPassword('');
        setResetOtpVal('');
        setResetPasswordVal('');
      } else {
        toast.error(data.message || 'Reset failed.');
      }
    } catch (err) {
      toast.error(err.message || 'Verification code expired or invalid.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!newTicket.subject.trim() || !newTicket.message.trim()) {
      toast.warning('Please fill ticket subject and message.');
      return;
    }

    try {
      setIsLoading(true);
      const data = await api.createTicket(
        newTicket.subject,
        newTicket.category,
        newTicket.urgency,
        newTicket.message
      );

      if (data.success) {
        setNewTicket({ subject: '', category: 'UI Bug', urgency: 'Low', message: '' });
        setShowNewTicketModal(false);
        await fetchPortalData(token);
      } else {
        toast.error(data.message || 'Failed to submit ticket.');
      }
    } catch (err) {
      toast.error(err.message || 'Network error submitting ticket.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <SEO 
        title="Client Management Portal" 
        description="Access Nextora Studio's secure customer workspace to review project milestones, view invoices, download design files, and lodge support tickets." 
        noindex={true}
      />

      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- LOGIN / REGISTER / FORGOT / RESET SCREEN --- */}
      {!isLoggedIn ? (
        <section className="max-w-md mx-auto px-4 py-16 relative z-10">
          <div className="glass-card p-8 rounded-xl border border-brand-slateAccent">
            <div className="text-center mb-6">
              <Logo size={48} className="mx-auto mb-3" />
              <h2 className="text-lg font-bold text-white font-display">
                {authMode === 'login' && 'Nextora Client Portal'}
                {authMode === 'register' && 'Create Client Workspace'}
                {authMode === 'verify' && 'Verify Email OTP'}
                {authMode === 'forgot' && 'Reset Secure Workspace'}
                {authMode === 'reset' && 'Create New Password'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {authMode === 'login' && 'Access your secure corporate sandbox environments'}
                {authMode === 'register' && 'Sign up for secure project & billing dashboards'}
                {authMode === 'verify' && 'Check your email for the 6-digit verification code'}
                {authMode === 'forgot' && 'Provide your email to receive a secure authorization code'}
                {authMode === 'reset' && 'Provide the code from your email and define a new secure password'}
              </p>
            </div>

            {authMode === 'login' && (
              /* --- LOGIN FORM --- */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Corporate Email</label>
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="name@company.com"
                    className="glass-input"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] uppercase font-semibold text-slate-400">Workspace Password</label>
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-[10px] text-brand-primary hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      className="glass-input !pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-bold rounded-md shadow-premium hover:shadow-glow transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Connecting...' : 'Enter Workspace'}
                  </button>
                  
                  <div className="text-center mt-2">
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className="text-xs text-brand-primary hover:underline"
                    >
                      Don't have an account? Sign Up
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 my-1">
                    <span className="h-[1px] bg-brand-slateAccent w-full mr-2" />
                    <span>OR</span>
                    <span className="h-[1px] bg-brand-slateAccent w-full ml-2" />
                  </div>

                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="w-full py-2.5 bg-white/5 hover:bg-brand-primary/10 border border-brand-slateAccent hover:border-brand-primary/30 text-white text-xs font-bold rounded-md transition-all duration-300 flex items-center justify-center space-x-1.5"
                  >
                    <User size={12} className="text-brand-primary" />
                    <span>Autofill Demo Login</span>
                  </button>
                </div>
              </form>
            )}

            {authMode === 'register' && (
              /* --- REGISTER FORM --- */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="glass-input"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="glass-input"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Workspace Password</label>
                  <div className="relative flex items-center">
                    <input
                      type={showRegisterPassword ? 'text' : 'password'}
                      required
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="glass-input !pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute right-3 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {showRegisterPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={registerCompany}
                    onChange={(e) => setRegisterCompany(e.target.value)}
                    placeholder="Apex Retail Int."
                    className="glass-input"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-bold rounded-md shadow-premium hover:shadow-glow transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Register Workspace'}
                  </button>

                  <div className="text-center mt-2">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-xs text-brand-primary hover:underline"
                    >
                      Already have an account? Sign In
                    </button>
                  </div>
                </div>
              </form>
            )}

            {authMode === 'verify' && (
              /* --- OTP VERIFICATION FORM --- */
              <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Verification Email</label>
                  <input
                    type="email"
                    required
                    value={verifyEmail}
                    onChange={(e) => setVerifyEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="glass-input"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">6-Digit Verification Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={verifyOtpVal}
                    onChange={(e) => setVerifyOtpVal(e.target.value)}
                    placeholder="123456"
                    className="glass-input text-center font-bold tracking-[0.5em] text-lg font-mono"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-bold rounded-md shadow-premium hover:shadow-glow transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Activate'}
                  </button>

                  <div className="flex justify-between items-center text-xs mt-2">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="text-brand-primary hover:underline font-semibold"
                    >
                      Resend Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-slate-400 hover:text-white"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>
              </form>
            )}

            {authMode === 'forgot' && (
              /* --- FORGOT PASSWORD FORM --- */
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="glass-input"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-bold rounded-md shadow-premium hover:shadow-glow transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Sending Request...' : 'Send Verification Code'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMode('reset')}
                    className="w-full py-2 bg-white/5 border border-brand-slateAccent text-white text-xs font-semibold rounded-md hover:bg-white/10"
                  >
                    Already have a Reset Code?
                  </button>

                  <div className="text-center mt-2">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-xs text-brand-primary hover:underline"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>
              </form>
            )}

            {authMode === 'reset' && (
              /* --- RESET PASSWORD FORM --- */
              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Workspace Email</label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="glass-input text-left"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">6-Digit Verification Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={resetOtpVal}
                    onChange={(e) => setResetOtpVal(e.target.value)}
                    placeholder="123456"
                    className="glass-input text-center font-bold tracking-[0.5em] text-lg font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">New Workspace Password</label>
                  <div className="relative flex items-center">
                    <input
                      type={showResetPassword ? 'text' : 'password'}
                      required
                      value={resetPasswordVal}
                      onChange={(e) => setResetPasswordVal(e.target.value)}
                      placeholder="Min 6 characters"
                      className="glass-input !pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetPassword(!showResetPassword)}
                      className="absolute right-3 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {showResetPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-bold rounded-md shadow-premium hover:shadow-glow transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Resetting Password...' : 'Save New Password'}
                  </button>

                  <div className="text-center mt-2">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-xs text-brand-primary hover:underline"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>
      ) : (
        /* --- PORTAL DASHBOARD SCREEN --- */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Dashboard Header Bar */}
          <div className="glass-card p-6 rounded-xl border border-brand-slateAccent mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-lg overflow-hidden shrink-0">
                {user?.avatar ? (
                  <img 
                    src={getAvatarUrl(user.avatar)} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <span>{portalState.user.avatar}</span>
                )}
              </div>
              <div>
                <h2 className="text-base font-bold text-white font-display">{portalState.user.name}</h2>
                <p className="text-xs text-slate-400">{portalState.user.company} &bull; <span className="text-slate-500">Partner since {portalState.user.joinedDate}</span></p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-4 py-2 border border-red-500/20 text-red-400 hover:bg-red-500/5 text-xs font-semibold rounded-md transition-colors"
            >
              <LogOut size={12} />
              <span>Exit Portal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-2">
              {[
                { id: 'projects', label: 'Active Projects', icon: <FileText size={14} /> },
                { id: 'invoices', label: 'Invoices & Receipts', icon: <FileText size={14} /> },
                { id: 'tickets', label: 'Support Tickets', icon: <MessageSquare size={14} /> },
                { id: 'files', label: 'Shared Vault Files', icon: <FileUp size={14} /> },
                { id: 'profile', label: 'Edit Profile', icon: <User size={14} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-2.5 px-4 py-3 rounded-md text-xs font-semibold transition-all text-left ${
                    activeTab === tab.id
                      ? 'bg-brand-primary/10 border-l-2 border-brand-primary text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Main Workspace Frame */}
            <div className="lg:col-span-9 glass-card p-6 sm:p-8 rounded-xl min-h-[400px]">
              
              {/* --- ACTIVE PROJECTS TAB --- */}
              {activeTab === 'projects' && (
                <div className="space-y-8">
                  {portalState.projects.length === 0 ? (
                    <div className="text-center py-16 text-slate-500 text-xs">
                      No active projects bound to your account.
                    </div>
                  ) : (
                    portalState.projects.map((proj) => (
                      <div key={proj.id} className="space-y-6">
                        <div className="flex justify-between items-start border-b border-brand-slateAccent/40 pb-4">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded border border-brand-primary/10">
                              {proj.status}
                            </span>
                            <h3 className="text-lg font-bold text-white font-display mt-2">{proj.name}</h3>
                            <p className="text-xs text-slate-400 leading-relaxed mt-1">{proj.description}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-white tracking-tight">{proj.completeness}%</span>
                            <span className="text-[10px] text-slate-500 block">Milestone Completion</span>
                          </div>
                        </div>

                        {/* Milestones stepper board */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Milestone Roadmap Checklist</h4>
                          {proj.milestones.length === 0 ? (
                            <p className="text-xs text-slate-500">No milestones registered.</p>
                          ) : (
                            <div className="relative border-l border-brand-slateAccent pl-5 space-y-6">
                              {proj.milestones.map((m, i) => (
                                <div key={i} className="relative">
                                  <span className={`absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-brand-darker flex items-center justify-center ${
                                    m.status === 'completed' ? 'border-brand-primary bg-brand-primary/20' : 
                                    m.status === 'current' ? 'border-brand-accent animate-pulse' : 'border-slate-700'
                                  }`} />
                                  <div>
                                    <h5 className={`text-xs font-bold ${m.status === 'completed' ? 'text-slate-400' : 'text-white'}`}>{m.title}</h5>
                                    <p className="text-[10px] text-slate-500 mt-0.5">{m.date}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* --- INVOICES TAB --- */}
              {activeTab === 'invoices' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-white font-display">Invoices & Financial Records</h3>
                  
                  {portalState.invoices.length === 0 ? (
                    <div className="text-center py-16 text-slate-500 text-xs">
                      No invoices found for your account.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-brand-slateAccent/40 text-[10px] text-slate-500 uppercase tracking-widest">
                            <th className="pb-3">Invoice ID</th>
                            <th className="pb-3">Project / Sprint</th>
                            <th className="pb-3">Amount</th>
                            <th className="pb-3">Due Date</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3 text-right">Receipt</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-slateAccent/20 text-xs">
                          {portalState.invoices.map((inv) => (
                            <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                              <td className="py-4 font-semibold text-white">{inv.id}</td>
                              <td className="py-4 text-slate-400">{inv.project}</td>
                              <td className="py-4 text-white font-medium">{inv.amount}</td>
                              <td className="py-4 text-slate-400">{inv.date}</td>
                              <td className="py-4">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                  inv.status === 'Paid' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                }`}>
                                  {inv.status}
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <button
                                  onClick={() => setInvoicePreview(inv)}
                                  className="inline-flex items-center space-x-1 text-brand-primary hover:text-white transition-colors"
                                >
                                  <Download size={12} />
                                  <span>Preview</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* --- SUPPORT TICKETS TAB --- */}
              {activeTab === 'tickets' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-brand-slateAccent/40 pb-4">
                    <h3 className="text-base font-bold text-white font-display">Lodged Support Tickets</h3>
                    <button
                      onClick={() => setShowNewTicketModal(true)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-brand-primary text-white text-xs font-semibold rounded-md shadow-premium hover:shadow-glow transition-all"
                    >
                      <Plus size={12} />
                      <span>New Ticket</span>
                    </button>
                  </div>

                  {portalState.supportTickets.length === 0 ? (
                    <div className="text-center py-16 text-slate-500 text-xs">
                      No support tickets logged. Click 'New Ticket' to request support.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {portalState.supportTickets.map((tck) => (
                        <div key={tck.id} className="p-4 bg-brand-slateAccent/20 border border-brand-slateAccent/40 rounded-lg">
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-white font-display">{tck.subject}</span>
                              <span className="text-[10px] text-slate-500">({tck.ticketId})</span>
                            </div>
                            <div className="flex gap-2">
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                tck.urgency === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-slate-700/50 text-slate-400'
                              }`}>
                                {tck.urgency} Urgency
                              </span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                tck.status === 'Resolved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                              }`}>
                                {tck.status}
                              </span>
                            </div>
                          </div>

                          {/* Message log feed */}
                          <div className="space-y-3 bg-brand-darker/60 rounded border border-brand-slateAccent/30 p-3 mt-3">
                            {tck.messages.map((msg, mIdx) => (
                              <div key={mIdx} className="space-y-1">
                                <div className="flex justify-between text-[9px] text-slate-500">
                                  <span className="font-semibold text-slate-300">{msg.sender === 'client' ? `${portalState.user.name} (Client)` : 'Nextora Support'}</span>
                                  <span>{msg.time}</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">{msg.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- VAULT SHARED FILES TAB --- */}
              {activeTab === 'files' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-white font-display">Shared File Vault</h3>
                  <p className="text-xs text-slate-500">Repository for wireframes, legal agreements, and scope lists.</p>

                  {portalState.files.length === 0 ? (
                    <div className="text-center py-16 text-slate-500 text-xs">
                      No files found in shared vault.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {portalState.files.map((file, i) => (
                        <div key={i} className="p-4 bg-brand-slateAccent/20 hover:bg-brand-slateAccent/30 border border-brand-slateAccent/40 rounded-lg flex items-center justify-between gap-4 transition-colors">
                          <div>
                            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider block">{file.category}</span>
                            <span className="text-xs font-semibold text-white mt-1 block leading-tight">{file.name}</span>
                            <span className="text-[10px] text-slate-500 mt-1 block">{file.size} &bull; Uploaded {file.date}</span>
                          </div>
                          <button
                            onClick={() => window.open(file.url, '_blank')}
                            className="p-2 bg-brand-darker hover:bg-white/5 border border-brand-slateAccent text-slate-400 hover:text-white rounded-full transition-colors flex-shrink-0"
                            title="Download File"
                          >
                            <Download size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- EDIT PROFILE TAB --- */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="border-b border-brand-slateAccent/40 pb-4">
                    <h3 className="text-base font-bold text-white font-display">Edit Workspace Profile</h3>
                    <p className="text-xs text-slate-500 mt-1">Configure your corporate account credentials and workspace logo</p>
                  </div>

                  {profileSuccess && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-md">
                      {profileSuccess}
                    </div>
                  )}

                  {profileError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-md">
                      {profileError}
                    </div>
                  )}

                  <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-xl">
                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-2">
                      {/* Avatar preview and file upload input */}
                      <div className="relative group w-20 h-20 rounded-full bg-brand-slateAccent border border-brand-slateAccent overflow-hidden flex items-center justify-center shrink-0">
                        {profilePreview ? (
                          <img 
                            src={profilePreview} 
                            alt="Avatar Preview" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <User className="text-slate-500" size={32} />
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                          <FileUp className="text-white" size={18} />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setProfileFile(file);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setProfilePreview(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="text-center sm:text-left">
                        <span className="text-xs font-bold text-white block">Profile Picture</span>
                        <span className="text-[10px] text-slate-500 mt-1 block">Supports JPG, PNG, or WEBP up to 5MB. Click preview circle to upload.</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Corporate Profile Name</label>
                        <input
                          type="text"
                          required
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="glass-input"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Company / Organization</label>
                        <input
                          type="text"
                          required
                          value={profileCompany}
                          onChange={(e) => setProfileCompany(e.target.value)}
                          className="glass-input"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Registered Workspace Email</label>
                        <input
                          type="email"
                          disabled
                          value={user?.email || ''}
                          className="glass-input opacity-50 cursor-not-allowed"
                        />
                        <span className="text-[9px] text-slate-500 mt-1 block">Corporate email address cannot be edited once verified.</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-bold rounded-md shadow-premium hover:shadow-glow transition-all disabled:opacity-50"
                      >
                        {isLoading ? 'Saving Changes...' : 'Save Profile Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* --- INVOICE RECEIPT MODAL OVERLAY --- */}
      <AnimatePresence>
        {invoicePreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInvoicePreview(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-brand-darker border border-brand-slateAccent p-6 sm:p-8 rounded-xl z-10 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-brand-slateAccent pb-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Receipt Preview</h3>
                  <span className="text-[10px] text-slate-500">Nextora Invoice System</span>
                </div>
                <button
                  onClick={() => setInvoicePreview(null)}
                  className="p-1 border border-brand-slateAccent text-slate-500 hover:text-white rounded-full transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Receipt Visual Sheet */}
              <div className="bg-slate-950 p-6 rounded-lg border border-brand-slateAccent/60 space-y-4 font-mono text-[10px] text-slate-400">
                <div className="flex justify-between">
                  <span>VENDOR:</span>
                  <span className="text-white">NEXTORA STUDIO INC.</span>
                </div>
                <div className="flex justify-between">
                  <span>BILL TO:</span>
                  <span className="text-white">{portalState.user.company.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>INVOICE NO:</span>
                  <span className="text-white">{invoicePreview.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>ISSUED DATE:</span>
                  <span className="text-white">{invoicePreview.date}</span>
                </div>
                <hr className="border-slate-800" />
                <div className="flex justify-between font-bold text-white">
                  <span>DESCRIPTION</span>
                  <span>TOTAL AMOUNT</span>
                </div>
                <div className="flex justify-between">
                  <span>{invoicePreview.project}</span>
                  <span>{invoicePreview.amount}</span>
                </div>
                <hr className="border-slate-800" />
                <div className="flex justify-between font-bold text-white">
                  <span>STATUS:</span>
                  <span className={invoicePreview.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'}>
                    {invoicePreview.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setInvoicePreview(null)}
                  className="w-1/2 py-2.5 bg-brand-slateAccent/40 hover:bg-brand-slateAccent border border-brand-slateAccent text-white text-xs font-semibold rounded-md transition-colors"
                >
                  Close Receipt
                </button>
                <button
                  onClick={() => invoicePreview.pdfUrl ? window.open(invoicePreview.pdfUrl, '_blank') : toast.success('Receipt PDF downloaded successfully.')}
                  className="w-1/2 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-md shadow-premium hover:shadow-glow transition-all"
                >
                  Download PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- NEW TICKET SUBMISSION MODAL --- */}
      <AnimatePresence>
        {showNewTicketModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewTicketModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-brand-darker border border-brand-slateAccent p-6 sm:p-8 rounded-xl z-10 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-brand-slateAccent pb-3 mb-5">
                <h3 className="text-sm font-bold text-white font-display">Lodge Support Ticket</h3>
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="p-1 border border-brand-slateAccent text-slate-500 hover:text-white rounded-full transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Ticket Subject</label>
                  <input
                    type="text"
                    required
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="e.g., Apple Pay layout button overlaps"
                    className="glass-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Category</label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, category: e.target.value }))}
                      className="glass-input"
                    >
                      <option>UI Bug</option>
                      <option>Billing Feature</option>
                      <option>SLA Request</option>
                      <option>Server Operations</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Urgency</label>
                    <select
                      value={newTicket.urgency}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, urgency: e.target.value }))}
                      className="glass-input"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    value={newTicket.message}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Detail the bug or engineering request here..."
                    className="glass-input resize-none"
                  />
                </div>

                <div className="pt-2 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowNewTicketModal(false)}
                    className="w-1/2 py-2.5 bg-brand-slateAccent/40 border border-brand-slateAccent text-white text-xs font-semibold rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-md shadow-premium hover:shadow-glow transition-all"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
