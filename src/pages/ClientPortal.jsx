import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, User, FileText, CheckCircle2, AlertTriangle, FileUp, Send, MessageSquare, Download, LogOut, Plus, Clock, HelpCircle, X, Eye, EyeOff } from 'lucide-react';
import SEO from '../components/SEO';
import { api } from '../api/api';
import { useToast } from '../components/Toast';
import Logo from '../components/Logo';

// Import Reusable UI Components
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassBadge from '../components/ui/GlassBadge';
import GlassInput from '../components/ui/GlassInput';
import GlassModal from '../components/ui/GlassModal';
import GlassAvatar from '../components/ui/GlassAvatar';

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

  const handleDemoLogin = () => {
    setUsername('alex.rivera@apexretail.com');
    setPassword('demopassword');
  };

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
      className="pt-24 pb-16 min-h-screen relative text-left"
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
          <GlassCard className="p-8 sm:p-10 border-slate-200 dark:border-white/5" hoverEffect="none">
            <div className="text-center mb-8">
              <Logo size={52} className="mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                {authMode === 'login' && 'Nextora Client Portal'}
                {authMode === 'register' && 'Create Client Workspace'}
                {authMode === 'verify' && 'Verify Email OTP'}
                {authMode === 'forgot' && 'Reset Secure Workspace'}
                {authMode === 'reset' && 'Create New Password'}
              </h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {authMode === 'login' && 'Access your secure corporate sandbox environments'}
                {authMode === 'register' && 'Sign up for secure project & billing dashboards'}
                {authMode === 'verify' && 'Check your email for the 6-digit verification code'}
                {authMode === 'forgot' && 'Provide your email to receive a secure authorization code'}
                {authMode === 'reset' && 'Provide the code from your email and define a new secure password'}
              </p>
            </div>

            {authMode === 'login' && (
              /* --- LOGIN FORM --- */
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <GlassInput
                  label="Corporate Email"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="name@company.com"
                  required
                />

                <div className="space-y-1.5 text-left">
                  <div className="flex justify-between items-center pl-1 mb-1">
                    <span className="text-xs font-semibold text-slate-550 dark:text-slate-450 uppercase tracking-wider">Workspace Password</span>
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-xs text-brand-primary font-bold hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-100/50 dark:bg-brand-slateAccent/20 border border-slate-200 dark:border-brand-slateAccent text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand-primary/50 focus:bg-white dark:focus:bg-brand-slateAccent/35 focus:ring-2 focus:ring-brand-primary/10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-450 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-3.5">
                  <GlassButton
                    type="submit"
                    disabled={isLoading}
                    variant="primary"
                    className="w-full py-3"
                  >
                    {isLoading ? 'Connecting...' : 'Enter Workspace'}
                  </GlassButton>
                  
                  <div className="text-center mt-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className="text-xs font-semibold text-brand-primary hover:underline"
                    >
                      Don't have an account? Sign Up
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 my-2 uppercase font-bold tracking-wider">
                    <span className="h-[1px] bg-slate-200 dark:bg-white/5 w-full mr-3" />
                    <span>OR</span>
                    <span className="h-[1px] bg-slate-200 dark:bg-white/5 w-full ml-3" />
                  </div>

                  <GlassButton
                    type="button"
                    onClick={handleDemoLogin}
                    variant="glass"
                    className="w-full flex items-center justify-center space-x-2 py-3"
                  >
                    <User size={14} className="text-brand-primary" />
                    <span>Autofill Demo Login</span>
                  </GlassButton>
                </div>
              </form>
            )}

            {authMode === 'register' && (
              /* --- REGISTER FORM --- */
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <GlassInput
                  label="Full Name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Alex Rivera"
                  required
                />

                <GlassInput
                  label="Corporate Email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="alex@company.com"
                  required
                />

                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider pl-1">
                    Workspace Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showRegisterPassword ? 'text' : 'password'}
                      required
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full bg-slate-100/50 dark:bg-brand-slateAccent/20 border border-slate-200 dark:border-brand-slateAccent text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand-primary/50 focus:bg-white dark:focus:bg-brand-slateAccent/35 focus:ring-2 focus:ring-brand-primary/10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute right-3.5 text-slate-450 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                      {showRegisterPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <GlassInput
                  label="Company Name"
                  value={registerCompany}
                  onChange={(e) => setRegisterCompany(e.target.value)}
                  placeholder="Apex Retail Int."
                  required
                />

                <div className="pt-2 flex flex-col gap-3.5">
                  <GlassButton
                    type="submit"
                    disabled={isLoading}
                    variant="primary"
                    className="w-full py-3"
                  >
                    {isLoading ? 'Creating Account...' : 'Register Workspace'}
                  </GlassButton>

                  <div className="text-center mt-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-xs font-semibold text-brand-primary hover:underline"
                    >
                      Already have an account? Sign In
                    </button>
                  </div>
                </div>
              </form>
            )}

            {authMode === 'verify' && (
              /* --- OTP VERIFICATION FORM --- */
              <form onSubmit={handleVerifyOtpSubmit} className="space-y-5">
                <GlassInput
                  label="Verification Email"
                  type="email"
                  value={verifyEmail}
                  onChange={(e) => setVerifyEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                />

                <GlassInput
                  label="6-Digit Verification Code"
                  value={verifyOtpVal}
                  onChange={(e) => setVerifyOtpVal(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="text-center font-bold tracking-[0.4em] text-lg font-mono"
                  required
                />

                <div className="pt-2 flex flex-col gap-3.5">
                  <GlassButton
                    type="submit"
                    disabled={isLoading}
                    variant="primary"
                    className="w-full py-3"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Activate'}
                  </GlassButton>

                  <div className="flex justify-between items-center text-xs mt-2 px-1">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="text-brand-primary hover:underline font-bold"
                    >
                      Resend Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-slate-500 dark:text-slate-450 hover:text-slate-800 dark:hover:text-white transition-colors"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>
              </form>
            )}

            {authMode === 'forgot' && (
              /* --- FORGOT PASSWORD FORM --- */
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-5">
                <GlassInput
                  label="Corporate Email"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                />

                <div className="pt-2 flex flex-col gap-3.5">
                  <GlassButton
                    type="submit"
                    disabled={isLoading}
                    variant="primary"
                    className="w-full py-3"
                  >
                    {isLoading ? 'Sending Request...' : 'Send Verification Code'}
                  </GlassButton>

                  <GlassButton
                    type="button"
                    onClick={() => setAuthMode('reset')}
                    variant="outline"
                    className="w-full py-3"
                  >
                    Already have a Reset Code?
                  </GlassButton>

                  <div className="text-center mt-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-xs font-semibold text-brand-primary hover:underline"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>
              </form>
            )}

            {authMode === 'reset' && (
              /* --- RESET PASSWORD FORM --- */
              <form onSubmit={handleResetPasswordSubmit} className="space-y-5">
                <GlassInput
                  label="Workspace Email"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                />

                <GlassInput
                  label="6-Digit Verification Code"
                  value={resetOtpVal}
                  onChange={(e) => setResetOtpVal(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="text-center font-bold tracking-[0.4em] text-lg font-mono"
                  required
                />

                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider pl-1">
                    New Workspace Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showResetPassword ? 'text' : 'password'}
                      required
                      value={resetPasswordVal}
                      onChange={(e) => setResetPasswordVal(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full bg-slate-100/50 dark:bg-brand-slateAccent/20 border border-slate-200 dark:border-brand-slateAccent text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand-primary/50 focus:bg-white dark:focus:bg-brand-slateAccent/35 focus:ring-2 focus:ring-brand-primary/10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetPassword(!showResetPassword)}
                      className="absolute right-3.5 text-slate-450 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                      {showResetPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-3.5">
                  <GlassButton
                    type="submit"
                    disabled={isLoading}
                    variant="primary"
                    className="w-full py-3"
                  >
                    {isLoading ? 'Resetting Password...' : 'Save New Password'}
                  </GlassButton>

                  <div className="text-center mt-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-xs font-semibold text-brand-primary hover:underline"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>
              </form>
            )}
          </GlassCard>
        </section>
      ) : (
        /* --- PORTAL DASHBOARD SCREEN --- */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Dashboard Header Bar */}
          <GlassCard className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 hover:border-slate-200/50 dark:hover:border-white/5" hoverEffect="none">
            <div className="flex items-center space-x-4">
              <GlassAvatar
                src={user?.avatar ? getAvatarUrl(user.avatar) : null}
                initials={portalState.user.avatar}
                gradient="from-brand-primary to-brand-accent"
                size="lg"
              />
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display leading-tight">{portalState.user.name}</h2>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">{portalState.user.company} &bull; <span className="font-normal text-slate-400 dark:text-slate-500">Partner since {portalState.user.joinedDate}</span></p>
              </div>
            </div>

            <GlassButton
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 border-red-500/20 text-red-500 hover:bg-red-500/5 hover:border-red-500/40 text-xs py-2.5 px-4"
            >
              <LogOut size={13} />
              <span>Exit Portal</span>
            </GlassButton>
          </GlassCard>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-2">
              {[
                { id: 'projects', label: 'Active Projects', icon: <FileText size={14} /> },
                { id: 'invoices', label: 'Invoices & Receipts', icon: <FileText size={14} /> },
                { id: 'tickets', label: 'Support Tickets', icon: <MessageSquare size={14} /> },
                { id: 'files', label: 'Shared Vault Files', icon: <FileUp size={14} /> },
                { id: 'profile', label: 'Edit Profile', icon: <User size={14} /> }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all text-left ${
                      isActive
                        ? 'bg-brand-primary/10 border-l-2 border-brand-primary text-brand-primary shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <span className={isActive ? 'text-brand-primary' : 'text-slate-400 dark:text-slate-500'}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Workspace Frame */}
            <div className="lg:col-span-9">
              <GlassCard className="min-h-[420px] p-6 sm:p-8" hoverEffect="none">
                
                {/* --- ACTIVE PROJECTS TAB --- */}
                {activeTab === 'projects' && (
                  <div className="space-y-8">
                    {portalState.projects.length === 0 ? (
                      <div className="text-center py-20 text-slate-500 text-sm font-medium">
                        No active projects bound to your account.
                      </div>
                    ) : (
                      portalState.projects.map((proj) => (
                        <div key={proj.id} className="space-y-6">
                          <div className="flex justify-between items-start border-b border-slate-200/50 dark:border-white/5 pb-5">
                            <div>
                              <GlassBadge variant="primary" className="mb-2.5 font-bold">
                                {proj.status}
                              </GlassBadge>
                              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display leading-tight">{proj.name}</h3>
                              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">{proj.description}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{proj.completeness}%</span>
                              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block mt-1 uppercase tracking-wider">Progress</span>
                            </div>
                          </div>

                          {/* Milestones stepper board */}
                          <div className="space-y-5">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-350 pl-1">Milestone Roadmap Checklist</h4>
                            {proj.milestones.length === 0 ? (
                              <p className="text-xs text-slate-500 italic pl-1">No milestones registered.</p>
                            ) : (
                              <div className="relative border-l-2 border-slate-200 dark:border-brand-slateAccent pl-6 space-y-6">
                                {proj.milestones.map((m, i) => {
                                  const isComp = m.status === 'completed';
                                  const isCurr = m.status === 'current';
                                  return (
                                    <div key={i} className="relative text-left">
                                      <span className={`absolute -left-[32px] top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-white dark:bg-brand-darker flex items-center justify-center ${
                                        isComp ? 'border-brand-primary bg-brand-primary/20' : 
                                        isCurr ? 'border-brand-accent bg-brand-accent/20 animate-pulse' : 'border-slate-300 dark:border-slate-700'
                                      }`} />
                                      <div>
                                        <h5 className={`text-xs sm:text-sm font-bold ${isComp ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-800 dark:text-white'}`}>{m.title}</h5>
                                        <p className="text-[10px] sm:text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">{m.date}</p>
                                      </div>
                                    </div>
                                  );
                                })}
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
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display border-b border-slate-200/50 dark:border-white/5 pb-4 uppercase tracking-widest text-slate-400 dark:text-slate-500">Invoices & Financial Records</h3>
                    
                    {portalState.invoices.length === 0 ? (
                      <div className="text-center py-20 text-slate-500 text-sm font-medium">
                        No invoices found for your account.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                          <thead>
                            <tr className="border-b border-slate-200/50 dark:border-white/5 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                              <th className="pb-3 pl-1">Invoice ID</th>
                              <th className="pb-3">Project / Sprint</th>
                              <th className="pb-3">Amount</th>
                              <th className="pb-3">Due Date</th>
                              <th className="pb-3">Status</th>
                              <th className="pb-3 text-right pr-1">Receipt</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            {portalState.invoices.map((inv) => (
                              <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                <td className="py-4 font-bold text-slate-800 dark:text-white pl-1">{inv.id}</td>
                                <td className="py-4 font-medium">{inv.project}</td>
                                <td className="py-4 font-bold text-slate-900 dark:text-white">{inv.amount}</td>
                                <td className="py-4 font-semibold text-slate-400 dark:text-slate-500">{inv.date}</td>
                                <td className="py-4">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                                    inv.status === 'Paid' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                  }`}>
                                    {inv.status}
                                  </span>
                                </td>
                                <td className="py-4 text-right pr-1">
                                  <button
                                    onClick={() => setInvoicePreview(inv)}
                                    className="inline-flex items-center space-x-1.5 text-brand-primary hover:text-brand-accent transition-colors font-bold text-xs"
                                  >
                                    <Download size={13} />
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
                    <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-white/5 pb-4">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display uppercase tracking-widest text-slate-400 dark:text-slate-500">Lodged Support Tickets</h3>
                      <GlassButton
                        onClick={() => setShowNewTicketModal(true)}
                        variant="primary"
                        className="px-4 py-2"
                      >
                        <Plus size={13} />
                        <span>New Ticket</span>
                      </GlassButton>
                    </div>

                    {portalState.supportTickets.length === 0 ? (
                      <div className="text-center py-20 text-slate-500 text-sm font-medium">
                        No support tickets logged. Click 'New Ticket' to request support.
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {portalState.supportTickets.map((tck) => (
                          <div key={tck.id} className="p-5 bg-slate-50/50 dark:bg-brand-slateAccent/10 border border-slate-200 dark:border-white/5 rounded-2xl text-left">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-white font-display leading-tight">{tck.subject}</span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">({tck.ticketId})</span>
                              </div>
                              <div className="flex gap-2">
                                <GlassBadge variant="secondary" className="font-bold text-[9px]">
                                  {tck.urgency} Urgency
                                </GlassBadge>
                                <GlassBadge variant={tck.status === 'Resolved' ? 'secondary' : 'primary'} className="font-bold text-[9px]">
                                  {tck.status}
                                </GlassBadge>
                              </div>
                            </div>

                            {/* Message log feed */}
                            <div className="space-y-4 bg-white dark:bg-brand-darker/60 rounded-xl border border-slate-100 dark:border-white/5 p-4 mt-4">
                              {tck.messages.map((msg, mIdx) => (
                                <div key={mIdx} className="space-y-1.5 pb-3 last:pb-0 border-b border-slate-100 last:border-b-0 dark:border-white/5">
                                  <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                    <span className="text-slate-700 dark:text-slate-300">{msg.sender === 'client' ? `${portalState.user.name} (Client)` : 'Nextora Support'}</span>
                                    <span>{msg.time}</span>
                                  </div>
                                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{msg.text}</p>
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
                    <div className="border-b border-slate-200/50 dark:border-white/5 pb-4">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display uppercase tracking-widest text-slate-400 dark:text-slate-500">Shared File Vault</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 pl-1">Repository for wireframes, legal agreements, and scope lists.</p>
                    </div>

                    {portalState.files.length === 0 ? (
                      <div className="text-center py-20 text-slate-500 text-sm font-medium">
                        No files found in shared vault.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {portalState.files.map((file, i) => (
                          <div key={i} className="p-4 sm:p-5 bg-slate-50/50 dark:bg-brand-slateAccent/10 border border-slate-200 dark:border-white/5 rounded-2xl flex items-center justify-between gap-4 transition-all duration-300 hover:border-brand-primary/30">
                            <div>
                              <GlassBadge variant="primary" className="font-semibold text-[8px] mb-1.5">
                                {file.category}
                              </GlassBadge>
                              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white block leading-tight">{file.name}</span>
                              <span className="text-[10px] text-slate-450 dark:text-slate-550 mt-1.5 block font-semibold">{file.size} &bull; Uploaded {file.date}</span>
                            </div>
                            <button
                              onClick={() => window.open(file.url, '_blank')}
                              className="p-2.5 bg-slate-100 dark:bg-brand-darker border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-450 hover:text-brand-primary hover:border-brand-primary/45 rounded-full transition-colors shrink-0"
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
                    <div className="border-b border-slate-200/50 dark:border-white/5 pb-4">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display uppercase tracking-widest text-slate-400 dark:text-slate-500">Edit Workspace Profile</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 pl-1">Configure your corporate account credentials and workspace logo</p>
                    </div>

                    {profileSuccess && (
                      <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-500 text-xs sm:text-sm rounded-xl font-semibold">
                        {profileSuccess}
                      </div>
                    )}

                    {profileError && (
                      <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-xs sm:text-sm rounded-xl font-semibold">
                        {profileError}
                      </div>
                    )}

                    <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-xl">
                      <div className="flex flex-col sm:flex-row items-center gap-6 pb-2">
                        <div className="relative group w-20 h-20 rounded-full bg-slate-100 dark:bg-brand-slateAccent border border-slate-200 dark:border-brand-slateAccent overflow-hidden flex items-center justify-center shrink-0">
                          {profilePreview ? (
                            <img 
                              src={profilePreview} 
                              alt="Avatar Preview" 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <User className="text-slate-400" size={32} />
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                            <FileUp className="text-white" size={20} />
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
                          <span className="text-sm font-bold text-slate-800 dark:text-white block">Profile Picture</span>
                          <span className="text-[10px] sm:text-xs text-slate-450 dark:text-slate-500 mt-1 block">Supports JPG, PNG, or WEBP up to 5MB. Click preview circle to upload.</span>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <GlassInput
                          label="Corporate Profile Name"
                          required
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                        />

                        <GlassInput
                          label="Company / Organization"
                          required
                          value={profileCompany}
                          onChange={(e) => setProfileCompany(e.target.value)}
                        />

                        <div className="space-y-1.5 text-left">
                          <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider pl-1">
                            Registered Workspace Email
                          </label>
                          <input
                            type="email"
                            disabled
                            value={user?.email || ''}
                            className="w-full bg-slate-100/30 dark:bg-brand-slateAccent/10 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm outline-none opacity-55 cursor-not-allowed"
                          />
                          <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 mt-1.5 block pl-1">Corporate email address cannot be edited once verified.</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <GlassButton
                          type="submit"
                          disabled={isLoading}
                          variant="primary"
                          className="px-8 py-3"
                        >
                          {isLoading ? 'Saving Changes...' : 'Save Profile Changes'}
                        </GlassButton>
                      </div>
                    </form>
                  </div>
                )}

              </GlassCard>
            </div>
          </div>
        </section>
      )}

      {/* --- INVOICE RECEIPT MODAL OVERLAY --- */}
      <GlassModal
        isOpen={!!invoicePreview}
        onClose={() => setInvoicePreview(null)}
        title="Receipt Preview"
      >
        {invoicePreview && (
          <div className="space-y-6 pt-2 text-left">
            <div className="bg-slate-950 p-6 rounded-xl border border-brand-slateAccent/50 space-y-4 font-mono text-[10px] text-slate-400">
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
              <GlassButton
                onClick={() => setInvoicePreview(null)}
                variant="secondary"
                className="w-1/2"
              >
                Close Receipt
              </GlassButton>
              <GlassButton
                onClick={() => invoicePreview.pdfUrl ? window.open(invoicePreview.pdfUrl, '_blank') : toast.success('Receipt PDF downloaded successfully.')}
                variant="primary"
                className="w-1/2"
              >
                Download PDF
              </GlassButton>
            </div>
          </div>
        )}
      </GlassModal>

      {/* --- NEW TICKET SUBMISSION MODAL --- */}
      <GlassModal
        isOpen={showNewTicketModal}
        onClose={() => setShowNewTicketModal(false)}
        title="Lodge Support Ticket"
      >
        <form onSubmit={handleCreateTicket} className="space-y-5 pt-2 text-left">
          <GlassInput
            label="Ticket Subject"
            required
            value={newTicket.subject}
            onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
            placeholder="e.g., Apple Pay layout button overlaps"
          />

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider pl-1">Category</label>
              <select
                value={newTicket.category}
                onChange={(e) => setNewTicket(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-slate-100/50 dark:bg-brand-slateAccent/20 border border-slate-200 dark:border-brand-slateAccent text-slate-900 dark:text-white rounded-xl px-4 py-3.5 text-xs sm:text-sm outline-none transition-all focus:border-brand-primary/50 focus:bg-white dark:focus:bg-brand-slateAccent/35 focus:ring-2 focus:ring-brand-primary/10"
              >
                <option>UI Bug</option>
                <option>Billing Feature</option>
                <option>SLA Request</option>
                <option>Server Operations</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider pl-1">Urgency</label>
              <select
                value={newTicket.urgency}
                onChange={(e) => setNewTicket(prev => ({ ...prev, urgency: e.target.value }))}
                className="w-full bg-slate-100/50 dark:bg-brand-slateAccent/20 border border-slate-200 dark:border-brand-slateAccent text-slate-900 dark:text-white rounded-xl px-4 py-3.5 text-xs sm:text-sm outline-none transition-all focus:border-brand-primary/50 focus:bg-white dark:focus:bg-brand-slateAccent/35 focus:ring-2 focus:ring-brand-primary/10"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <GlassInput
            label="Message Details"
            textarea
            rows={4}
            required
            value={newTicket.message}
            onChange={(e) => setNewTicket(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Detail the bug or engineering request here..."
          />

          <div className="pt-2 flex gap-4">
            <GlassButton
              type="button"
              onClick={() => setShowNewTicketModal(false)}
              variant="secondary"
              className="w-1/2"
            >
              Cancel
            </GlassButton>
            <GlassButton
              type="submit"
              variant="primary"
              className="w-1/2"
            >
              Submit Ticket
            </GlassButton>
          </div>
        </form>
      </GlassModal>

    </motion.div>
  );
}
