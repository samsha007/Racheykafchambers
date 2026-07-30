import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Download,
  FileSpreadsheet,
  FileText,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  X,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  Layers,
  Sparkles,
  ChevronDown,
  FileCode,
  PlusCircle,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';
import {
  FormSubmission,
  FormType,
  FormStatus,
  getFormSubmissions,
  updateSubmissionStatus,
  deleteFormSubmission,
  resetToDemoSubmissions,
  addFormSubmission,
  FORMS_UPDATED_EVENT,
} from '../utils/formStore';

interface BackendAdminProps {
  onClose: () => void;
}

export const BackendAdmin: React.FC<BackendAdminProps> = ({ onClose }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('racheykaf_admin_authenticated') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState<string>('admin');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string>('');

  // Submissions state
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubmission, setActiveSubmission] = useState<FormSubmission | null>(null);

  // Success toast
  const [toastMessage, setToastMessage] = useState<string>('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Load submissions and listen for updates
  useEffect(() => {
    const loadData = () => {
      setSubmissions(getFormSubmissions());
    };
    loadData();

    window.addEventListener(FORMS_UPDATED_EVENT, loadData);
    return () => {
      window.removeEventListener(FORMS_UPDATED_EVENT, loadData);
    };
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'racheykaf2026' || passwordInput === 'admin' || passwordInput === '8822') {
      setIsAuthenticated(true);
      setAuthError('');
      if (rememberMe) {
        localStorage.setItem('racheykaf_admin_authenticated', 'true');
      }
      triggerToast('Authenticated successfully. Welcome to Chamber Admin Backend.');
    } else {
      setAuthError('Invalid credentials. (Hint: Use password "racheykaf2026" or PIN "8822")');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('racheykaf_admin_authenticated');
    setPasswordInput('');
    triggerToast('Logged out securely.');
  };

  // Filtered Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      // Form type filter
      if (selectedType !== 'ALL' && sub.formType !== selectedType) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'ALL' && sub.status !== selectedStatus) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = sub.name.toLowerCase().includes(q);
        const matchEmail = sub.email.toLowerCase().includes(q);
        const matchOrg = (sub.organization || '').toLowerCase().includes(q);
        const matchSubject = (sub.subject || '').toLowerCase().includes(q);
        const matchId = sub.id.toLowerCase().includes(q);
        const matchMsg = (sub.message || '').toLowerCase().includes(q);
        return matchName || matchEmail || matchOrg || matchSubject || matchId || matchMsg;
      }
      return true;
    });
  }, [submissions, selectedType, selectedStatus, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = submissions.length;
    const newCount = submissions.filter((s) => s.status === 'New').length;
    const consultationCount = submissions.filter((s) => s.formType === 'Consultation Booking').length;
    const feeEstimateCount = submissions.filter((s) => s.formType === 'Fee Estimate Request').length;
    return { total, newCount, consultationCount, feeEstimateCount };
  }, [submissions]);

  // Export CSV Functionality
  const exportToCSV = () => {
    if (filteredSubmissions.length === 0) {
      alert('No form submissions available to export.');
      return;
    }

    const headers = ['Submission ID', 'Form Type', 'Submitted At (Date)', 'Status', 'Client Name', 'Email', 'Phone', 'Organization', 'Subject', 'Message Details'];

    const csvRows = filteredSubmissions.map((sub) => {
      const escape = (str?: string) => `"${(str || '').replace(/"/g, '""')}"`;
      return [
        escape(sub.id),
        escape(sub.formType),
        escape(sub.submittedAt),
        escape(sub.status),
        escape(sub.name),
        escape(sub.email),
        escape(sub.phone),
        escape(sub.organization),
        escape(sub.subject),
        escape(sub.message),
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...csvRows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const today = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `Racheykaf_Form_Submissions_${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`Exported ${filteredSubmissions.length} form submissions to CSV file.`);
  };

  // Export JSON Functionality
  const exportToJSON = () => {
    if (filteredSubmissions.length === 0) {
      alert('No form submissions available to export.');
      return;
    }

    const jsonStr = JSON.stringify(filteredSubmissions, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const today = new Date().toISOString().slice(0, 10);
    link.download = `Racheykaf_Form_Submissions_${today}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`Exported ${filteredSubmissions.length} records to JSON file.`);
  };

  // Download Individual Report TXT
  const downloadSingleReport = (sub: FormSubmission) => {
    const reportText = `===============================================================
RACHEYKAF CHAMBER - OFFICIAL FORM SUBMISSION TRANSCRIPT
===============================================================
Reference ID:       ${sub.id}
Submission Date:    ${sub.submittedAt}
Form Classification:${sub.formType}
Processing Status:  ${sub.status}
---------------------------------------------------------------
CLIENT DEMOGRAPHICS:
Full Name:          ${sub.name}
Email Address:      ${sub.email}
Telephone:          ${sub.phone || 'N/A'}
Organization:       ${sub.organization || 'N/A'}
---------------------------------------------------------------
SUBJECT / MANDATE SCOPE:
${sub.subject || 'General Advisory'}

DETAILED MESSAGE / NOTES:
${sub.message || 'No additional details submitted.'}
---------------------------------------------------------------
CONFIDENTIALITY NOTICE:
This document contains privileged and confidential information belonging 
to Racheykaf Chamber. Unauthorized distribution is prohibited.
===============================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sub.id}_Submission_Transcript.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`Downloaded report for ${sub.id}`);
  };

  // Add Test Submission
  const handleAddTestSubmission = () => {
    addFormSubmission({
      formType: 'Contact Inquiry',
      name: 'Barrister Kalu Ndukwe',
      email: 'kalu.ndukwe@apexchambers.ng',
      phone: '+234 809 334 5566',
      organization: 'Apex Legal Partners Lagos',
      subject: 'Specialized Arbitration Co-Counsel Mandate',
      message: 'Requesting co-counsel agreement for international energy arbitration pending at the ICC Paris registry.',
      status: 'New',
    });
    triggerToast('Added new live test submission.');
  };

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
        <div className="bg-[#051322] text-white w-full max-w-md rounded-2xl border border-[#C8A84F]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden p-8">
          
          {/* Top Gold Accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#C8A84F] to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#081826] border border-[#C8A84F]/50 text-[#C8A84F] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(200,168,79,0.3)]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C8A84F] block">
              RACHEYKAF CHAMBER PORTAL
            </span>
            <h2 className="text-2xl font-heading font-extrabold text-white">
              Admin & Partner Login
            </h2>
            <p className="text-xs text-gray-400">
              Secure authentication required to review confidential client form submissions and downloadable records.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {authError && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-[#081826] border border-[#143D73] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                  placeholder="admin@racheykaf.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Access Password / Security PIN
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#081826] border border-[#143D73] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                  placeholder="Enter admin password (e.g. racheykaf2026 or 8822)"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#C8A84F] rounded-xs"
                />
                <span>Remember session</span>
              </label>
              <span className="text-[#C8A84F] text-[11px] font-medium">Default PIN: 8822</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C8A84F] via-[#D4B860] to-[#B09344] text-[#051322] font-heading font-extrabold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(200,168,79,0.3)] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Authenticate Portal Access</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <span className="text-[10px] text-gray-500 font-mono flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-[#C8A84F]" />
              256-Bit SSL Encrypted Admin Portal • Racheykaf Chamber
            </span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#051322] text-white w-full max-w-6xl rounded-3xl border border-[#C8A84F]/40 shadow-[0_25px_70px_rgba(0,0,0,0.95)] relative overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Top Gold Specular Bar */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#C8A84F] to-transparent z-20" />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-16 right-6 z-50 bg-[#C8A84F] text-[#051322] text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header Bar */}
        <div className="bg-[#081826] p-5 sm:p-6 border-b border-[#143D73] flex flex-wrap items-center justify-between gap-4 shrink-0 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#040D18] border border-[#C8A84F]/60 text-[#C8A84F] flex items-center justify-center shadow-[0_0_20px_rgba(200,168,79,0.3)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C8A84F]">
                  RACHEYKAF CHAMBER BACKEND
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#0F8B6D]/20 border border-[#0F8B6D]/40 text-[#0F8B6D] text-[9px] font-bold uppercase">
                  Authenticated
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                Client Form Submissions & Advisory Records
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={exportToCSV}
              className="px-4 py-2.5 rounded-xl bg-[#143D73]/80 hover:bg-[#143D73] border border-white/10 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              title="Download all filtered form submissions as CSV spreadsheet"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#C8A84F]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={exportToJSON}
              className="px-4 py-2.5 rounded-xl bg-[#143D73]/80 hover:bg-[#143D73] border border-white/10 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              title="Download raw form submissions data as JSON"
            >
              <FileCode className="w-4 h-4 text-[#C8A84F]" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Lock Admin Portal"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 text-gray-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics Summary Stats Widgets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 sm:p-6 bg-[#040D18]/90 border-b border-[#143D73]/50 shrink-0">
          <div className="bg-[#081826] p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Total Submissions
              </span>
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                {stats.total}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#143D73]/40 text-[#C8A84F] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#081826] p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                New / Pending Review
              </span>
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-[#C8A84F]">
                {stats.newCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#C8A84F]/15 text-[#C8A84F] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#081826] p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Consultations Booked
              </span>
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-blue-400">
                {stats.consultationCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#081826] p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Fee Proposal Requests
              </span>
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-emerald-400">
                {stats.feeEstimateCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-6 bg-[#081826]/70 border-b border-white/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shrink-0">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, email, organization, subject, date, or ref code..."
              className="w-full bg-[#040D18] border border-[#143D73] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Form Type Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Filter className="w-3.5 h-3.5 text-[#C8A84F]" />
              <span>Form Type:</span>
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#040D18] border border-[#143D73] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C8A84F]"
            >
              <option value="ALL">All Form Types</option>
              <option value="Contact Inquiry">Contact Inquiries</option>
              <option value="Consultation Booking">Consultation Bookings</option>
              <option value="Fee Estimate Request">Fee Proposals</option>
              <option value="General Inquiry">General Inquiries</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#040D18] border border-[#143D73] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C8A84F]"
            >
              <option value="ALL">All Statuses</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Archived">Archived</option>
            </select>

            {/* Test Submission & Reset */}
            <button
              onClick={handleAddTestSubmission}
              className="p-2 rounded-xl bg-[#040D18] border border-[#C8A84F]/40 hover:border-[#C8A84F] text-[#C8A84F] text-xs font-bold flex items-center gap-1"
              title="Add mock test submission"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden xl:inline">Add Test Entry</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset form submissions to initial demo dataset?')) {
                  resetToDemoSubmissions();
                  triggerToast('Reset to demo submissions dataset.');
                }
              }}
              className="p-2 rounded-xl bg-[#040D18] border border-white/10 hover:border-white/30 text-gray-400 hover:text-white text-xs"
              title="Reset Demo Dataset"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Form Submissions Table / List View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-16 bg-[#081826]/50 rounded-2xl border border-dashed border-white/10 space-y-3">
              <AlertCircle className="w-10 h-10 text-gray-500 mx-auto" />
              <h4 className="text-base font-heading font-bold text-white">No matching submissions found</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                No form records match your current search query or filter criteria. Try adjusting your filters or adding a test entry.
              </p>
              <button
                onClick={() => {
                  setSelectedType('ALL');
                  setSelectedStatus('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#143D73] text-xs text-white font-bold rounded-xl mt-2"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#040D18]/90">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#081826] border-b border-white/10 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
                    <th className="py-4 px-4 sm:px-6">Ref Code & Date</th>
                    <th className="py-4 px-4 sm:px-6">Client & Organization</th>
                    <th className="py-4 px-4 sm:px-6">Form Type & Subject</th>
                    <th className="py-4 px-4 sm:px-6">Status</th>
                    <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-xs">
                  {filteredSubmissions.map((sub) => {
                    const isNew = sub.status === 'New';
                    return (
                      <tr
                        key={sub.id}
                        className={`hover:bg-[#081826]/80 transition-colors ${
                          isNew ? 'bg-[#C8A84F]/5 font-medium' : ''
                        }`}
                      >
                        {/* Ref Code & Date */}
                        <td className="py-4 px-4 sm:px-6 align-top space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#C8A84F] bg-[#081826] px-2 py-0.5 rounded-md border border-[#C8A84F]/30 text-[11px]">
                              {sub.id}
                            </span>
                            {isNew && (
                              <span className="w-2 h-2 rounded-full bg-[#C8A84F] animate-pulse" title="New Submission" />
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-gray-300 text-[11px] pt-1">
                            <Calendar className="w-3.5 h-3.5 text-[#143D73]" />
                            <span>{sub.submittedAt}</span>
                          </div>
                        </td>

                        {/* Client Demographics */}
                        <td className="py-4 px-4 sm:px-6 align-top space-y-1">
                          <div className="font-bold text-white text-sm">
                            {sub.name}
                          </div>
                          <div className="text-gray-300 text-[11px] flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <a href={`mailto:${sub.email}`} className="hover:text-[#C8A84F] underline">
                              {sub.email}
                            </a>
                          </div>
                          {sub.phone && (
                            <div className="text-gray-400 text-[11px] flex items-center gap-1">
                              <Phone className="w-3 h-3 shrink-0" />
                              <span>{sub.phone}</span>
                            </div>
                          )}
                          {sub.organization && (
                            <div className="text-[#C8A84F] text-[11px] flex items-center gap-1 font-semibold">
                              <Building className="w-3 h-3 shrink-0" />
                              <span>{sub.organization}</span>
                            </div>
                          )}
                        </td>

                        {/* Form Type & Subject */}
                        <td className="py-4 px-4 sm:px-6 align-top space-y-1.5 max-w-xs sm:max-w-md">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              sub.formType === 'Consultation Booking'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : sub.formType === 'Fee Estimate Request'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-[#C8A84F]/20 text-[#C8A84F] border border-[#C8A84F]/30'
                            }`}
                          >
                            {sub.formType}
                          </span>
                          <div className="font-bold text-gray-200 line-clamp-1">
                            {sub.subject || 'No Subject Specified'}
                          </div>
                          {sub.message && (
                            <p className="text-gray-400 text-[11px] line-clamp-2 leading-relaxed">
                              {sub.message}
                            </p>
                          )}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-4 px-4 sm:px-6 align-top">
                          <select
                            value={sub.status}
                            onChange={(e) => {
                              updateSubmissionStatus(sub.id, e.target.value as FormStatus);
                              triggerToast(`Updated status of ${sub.id} to "${e.target.value}"`);
                            }}
                            className={`rounded-xl px-2.5 py-1.5 text-xs font-bold border focus:outline-none cursor-pointer ${
                              sub.status === 'New'
                                ? 'bg-[#C8A84F] text-[#051322] border-[#C8A84F]'
                                : sub.status === 'In Progress'
                                ? 'bg-blue-600 text-white border-blue-500'
                                : sub.status === 'Reviewed'
                                ? 'bg-emerald-600 text-white border-emerald-500'
                                : 'bg-gray-800 text-gray-300 border-gray-700'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-4 sm:px-6 align-top text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setActiveSubmission(sub)}
                              className="p-2 rounded-xl bg-[#081826] hover:bg-[#143D73] border border-white/10 text-white transition-colors"
                              title="Inspect Full Submission Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => downloadSingleReport(sub)}
                              className="p-2 rounded-xl bg-[#081826] hover:bg-[#143D73] border border-white/10 text-[#C8A84F] transition-colors"
                              title="Download Submission Text Report"
                            >
                              <Download className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Delete submission ${sub.id}?`)) {
                                  deleteFormSubmission(sub.id);
                                  triggerToast(`Deleted submission ${sub.id}`);
                                }
                              }}
                              className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900 border border-red-500/30 text-red-400 transition-colors"
                              title="Delete Submission"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* Modal Drawer for Viewing Full Submission */}
        {activeSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#081826] text-white w-full max-w-2xl rounded-2xl border border-[#C8A84F]/50 shadow-2xl relative overflow-hidden p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setActiveSubmission(null)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-[#C8A84F] to-[#B09344] text-[#051322] rounded-xl font-bold">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#C8A84F] font-extrabold text-sm">
                      {activeSubmission.id}
                    </span>
                    <span className="text-xs text-gray-400">({activeSubmission.submittedAt})</span>
                  </div>
                  <h3 className="text-xl font-heading font-extrabold text-white">
                    Form Submission Record
                  </h3>
                </div>
              </div>

              {/* Client Card */}
              <div className="bg-[#040D18] p-4 rounded-xl border border-white/10 space-y-2 text-xs">
                <span className="text-[10px] uppercase font-bold text-[#C8A84F] tracking-wider block">
                  Client Contact Demographics
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
                  <div>
                    <span className="text-gray-500 block">Full Name:</span>
                    <strong className="text-white text-sm">{activeSubmission.name}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Email Address:</span>
                    <a href={`mailto:${activeSubmission.email}`} className="text-[#C8A84F] underline">
                      {activeSubmission.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Telephone Number:</span>
                    <span className="text-white">{activeSubmission.phone || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Organization / Enterprise:</span>
                    <span className="text-white">{activeSubmission.organization || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              {/* Subject & Form Message */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    Form Type & Subject
                  </span>
                  <div className="p-3 bg-[#040D18] rounded-xl border border-white/10 font-bold text-white text-sm">
                    [{activeSubmission.formType}] — {activeSubmission.subject || 'General Inquiry'}
                  </div>
                </div>

                <div>
                  <span className="text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    Complete Submission Details / Message Transcript
                  </span>
                  <div className="p-4 bg-[#040D18] rounded-xl border border-white/10 text-gray-200 leading-relaxed font-normal whitespace-pre-wrap">
                    {activeSubmission.message || 'No additional message text submitted.'}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => downloadSingleReport(activeSubmission)}
                  className="px-4 py-2 bg-[#143D73] text-xs font-bold text-white rounded-xl flex items-center gap-2 hover:bg-[#1A4B8C]"
                >
                  <Download className="w-4 h-4 text-[#C8A84F]" />
                  <span>Download Transcript Report</span>
                </button>

                <button
                  onClick={() => setActiveSubmission(null)}
                  className="px-4 py-2 bg-white/10 text-xs font-bold text-gray-300 rounded-xl hover:bg-white/20"
                >
                  Close Record
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
