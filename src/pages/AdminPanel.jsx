import React, { useState, useEffect, useRef } from 'react';
import {
  FiGrid, FiVolume2, FiAward, FiImage, FiMessageSquare, FiBookOpen,
  FiTrendingUp, FiCheckCircle, FiPhone, FiInbox, FiSettings, FiLogOut,
  FiMenu, FiX, FiPlus, FiEdit2, FiTrash2, FiDownload, FiUpload,
  FiStar, FiUsers, FiCompass, FiCpu, FiFileText, FiSave, FiEye,
  FiLock, FiRefreshCw, FiAlertTriangle, FiChevronRight, FiSearch,
  FiExternalLink, FiCamera, FiLink, FiArrowLeft, FiVideo, FiLayers
} from 'react-icons/fi';
import { adminData } from '../utils/adminData';
import { inquiryService } from '../utils/inquiryService';
import { getEmbedImageUrl, detectImageUrlSource, handleImageError, FALLBACK_SLIDE_SVG } from '../utils/imageUrl';
import { jagannathPosterB64 } from '../data/jagannathB64';
import { neetRepeaterB64 } from '../data/neetRepeaterB64';
import { jeePyqB64 } from '../data/jeePyqB64';

// ─── Icon map for features section ──────────────────────────────────────────
const ICON_MAP = {
  FiCheckCircle, FiUsers, FiAward, FiCompass, FiCpu, FiFileText,
  FiStar, FiTrendingUp, FiBookOpen, FiGrid, FiPhone, FiImage,
};
const ICON_OPTIONS = Object.keys(ICON_MAP);
const GALLERY_CATEGORIES = ['Classrooms', 'Seminars', 'Activities', 'Events'];

// ─── Toast ───────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '14px 18px', borderRadius: 14, color: '#fff',
      fontSize: 14, fontWeight: 600, minWidth: 280,
      background: type === 'success' ? 'linear-gradient(135deg,#059669,#047857)' : 'linear-gradient(135deg,#DC2626,#B91C1C)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      animation: 'toastIn 0.3s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <span style={{ flex: 1 }}>{type === 'success' ? '✓ ' : '✕ '}{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0 }}>
        <FiX />
      </button>
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="ap-overlay" onClick={onClose}>
      <div className={`ap-modal ${wide ? 'ap-modal-wide' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="ap-modal-head">
          <h3>{title}</h3>
          <button onClick={onClose} className="ap-close-btn"><FiX /></button>
        </div>
        <div className="ap-modal-body">{children}</div>
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="ap-section-head">
      <div>
        <h1 className="ap-section-title">{title}</h1>
        {subtitle && <p className="ap-section-sub">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────
function EmptyState({ icon: Icon, message }) {
  return (
    <div className="ap-empty">
      <Icon size={40} />
      <p>{message}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(adminData.isLoggedIn());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeSection, setActiveSection] = useState(() => {
    try {
      return localStorage.getItem('noble_admin_active_section') || 'dashboard';
    } catch {
      return 'dashboard';
    }
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const [announcements, setAnnouncements] = useState([]);
  const [results, setResults] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState([]);
  const [features, setFeatures] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [inquiries, setInquiries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [popupConfig, setPopupConfig] = useState({ enabled: true, image: '/images/popup_banner.jpg', link: '/contact' });
  const [videoLectures, setVideoLectures] = useState([]);
  const [pageImages, setPageImages] = useState(() => adminData.getData('pageImages') || {});
  const [heroBanners, setHeroBanners] = useState(() => adminData.getData('heroBanners') || []);
  const [partnerSchools, setPartnerSchools] = useState(() => adminData.getData('partnerSchools') || []);
  const [schoolPhotos, setSchoolPhotos] = useState(() => adminData.getData('schoolPhotos') || []);
  const [schoolPhotoFilter, setSchoolPhotoFilter] = useState('All');
  const [editingSchoolPhoto, setEditingSchoolPhoto] = useState(null);
  const [activePhotoSubTab, setActivePhotoSubTab] = useState('schoolPhotos');
  const [inquiryFormFilter, setInquiryFormFilter] = useState('All');
  const [activePageTab, setActivePageTab] = useState('homeClassrooms');
  const [editingPagePhoto, setEditingPagePhoto] = useState(null);
  const [editingHeroBanner, setEditingHeroBanner] = useState(null);
  const [editingPartnerSchool, setEditingPartnerSchool] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [editingResult, setEditingResult] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingFeature, setEditingFeature] = useState(null);
  const [editingVideoLecture, setEditingVideoLecture] = useState(null);

  // Popup Config (Multi-Image Slider Manager)
  const [newPopupUrl, setNewPopupUrl] = useState('');
  const [newPopupTitle, setNewPopupTitle] = useState('');
  const [newPopupLink, setNewPopupLink] = useState('');
  const popupFileRef = useRef(null);

  const navigate = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
    setSearch('');
    try {
      localStorage.setItem('noble_admin_active_section', section);
    } catch (e) {
      console.error(e);
    }
  };

  const [search, setSearch] = useState('');
  const [galleryFilter, setGalleryFilter] = useState('All'); // ← moved here to fix Rules of Hooks
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const fileInputRef = useRef(null);

  const showToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
  };
  const removeToast = (id) => setToasts(p => p.filter(t => t.id !== id));

  const loadAll = () => {
    setAnnouncements(adminData.getData('announcements') || []);
    setResults(adminData.getData('results') || []);
    setGallery(adminData.getData('gallery') || []);
    setTestimonials(adminData.getData('testimonials') || []);
    setStats(adminData.getData('stats') || []);
    setFeatures(adminData.getData('features') || []);
    setContactInfo(adminData.getData('contactInfo') || {});
    setInquiries(inquiryService.getInquiries());
    setCourses(adminData.getData('courses') || []);
    setUsers(adminData.getUsers());
    setPopupConfig(adminData.getData('popupConfig') || { enabled: true, image: '/images/popup_banner.jpg', link: '/contact' });
    setVideoLectures(adminData.getData('videoLectures') || []);
    setPageImages(adminData.getData('pageImages') || {});
    setHeroBanners(adminData.getData('heroBanners') || []);
    setPartnerSchools(adminData.getData('partnerSchools') || []);
    setSchoolPhotos(adminData.getData('schoolPhotos') || []);
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    loadAll();
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setLoginError('Please enter both username and password.');
      return;
    }
    const res = adminData.login(username, password);
    if (res.success) {
      setIsLoggedIn(true);
      setLoginError('');
      setUsername('');
      setPassword('');
      loadAll();
    } else {
      setLoginError(res.error);
    }
  };

  const handleLogout = () => {
    adminData.logout();
    setIsLoggedIn(false);
    setActiveSection('dashboard');
    setSidebarOpen(false);
  };

  // ─── NAV CONFIG ────────────────────────────────────────────────────────
  const totalMediaBadgeCount = (schoolPhotos.length || 0) + (gallery.length || 0) + (heroBanners.length || 0);

  const navItems = [
    { key: 'dashboard',     label: 'Dashboard',            icon: FiGrid,         color: '#3B82F6' },
    { key: 'allPhotos',     label: 'All Photos & Media',   icon: FiCamera,       color: '#8B5CF6', badge: totalMediaBadgeCount },
    { key: 'partnerSchools',label: 'Partner Schools',     icon: FiBookOpen,     color: '#10B981', badge: partnerSchools.length },
    { key: 'announcements', label: 'Announcements',        icon: FiVolume2,      color: '#F59E0B' },
    { key: 'results',       label: 'Student Results',      icon: FiAward,        color: '#10B981' },
    { key: 'testimonials',  label: 'Testimonials',         icon: FiMessageSquare,color: '#EC4899' },
    { key: 'courses',       label: 'Courses',              icon: FiBookOpen,     color: '#06B6D4' },
    { key: 'stats',         label: 'Stats / Counters',     icon: FiTrendingUp,   color: '#F97316' },
    { key: 'features',      label: 'Why Choose Us',        icon: FiCheckCircle,  color: '#22D3EE' },
    { key: 'contactInfo',   label: 'Contact Info',         icon: FiPhone,        color: '#34D399' },
    { key: 'inquiries',     label: 'Inquiries',            icon: FiInbox,        color: '#A78BFA', badge: inquiries.length },
    { key: 'videos',        label: 'Video Lectures',       icon: FiVideo,        color: '#EF4444' },
    { key: 'settings',      label: 'Settings',             icon: FiSettings,     color: '#9CA3AF' },
  ];

  const currentNav = navItems.find(n => n.key === activeSection);

  // ═══════════════════════════════════════════════════════════════════════
  // LOGIN SCREEN
  // ═══════════════════════════════════════════════════════════════════════
  if (!isLoggedIn) {
    return (
      <div className="ap-login-bg">
        <style>{CSS}</style>
        <div className="ap-login-card">
          <div className="ap-login-logo-wrap">
            <img src="/images/logo-white.png" alt="Noble Education" className="ap-login-logo" />
          </div>
          <h2 className="ap-login-title">Admin Panel</h2>
          <p className="ap-login-sub">Noble Education · Secure Access</p>
          <form onSubmit={handleLogin} className="ap-login-form">
            <div className="ap-input-wrap" style={{ marginBottom: 12 }}>
              <FiUsers className="ap-input-ico" style={{ top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text" value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter Username"
                className="ap-input ap-input-padded"
                autoFocus
                required
              />
            </div>
            <div className="ap-input-wrap">
              <FiLock className="ap-input-ico" style={{ top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="ap-input ap-input-padded"
                required
              />
            </div>
            {loginError && <p className="ap-login-err">{loginError}</p>}
            <button type="submit" className="ap-btn ap-btn-primary ap-btn-block" style={{ marginTop: 8 }}>
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // CRUD HANDLERS
  // ═══════════════════════════════════════════════════════════════════════

  // Announcements
  const saveAnn = (item) => {
    let u = item._index !== undefined
      ? announcements.map((a, i) => i === item._index ? { emoji: item.emoji, text: item.text } : a)
      : [...announcements, { emoji: item.emoji, text: item.text }];
    adminData.setData('announcements', u); setAnnouncements(u); setEditingAnnouncement(null); showToast('Announcement saved!');
  };
  const delAnn = (i) => {
    if (!window.confirm('Delete this announcement?')) return;
    const u = announcements.filter((_, x) => x !== i);
    adminData.setData('announcements', u); setAnnouncements(u); showToast('Deleted.', 'error');
  };

  // Results
  const saveResult = (item) => {
    const { _index, ...rest } = item;
    const u = _index !== undefined ? results.map((r, i) => i === _index ? rest : r) : [...results, rest];
    adminData.setData('results', u); setResults(u); setEditingResult(null); showToast('Student result saved successfully!');
  };
  const delResult = (i) => {
    if (!window.confirm('Delete this result?')) return;
    const u = results.filter((_, x) => x !== i);
    adminData.setData('results', u); setResults(u); showToast('Deleted.', 'error');
  };
  const moveResult = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= results.length) return;
    const updated = [...results];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    adminData.setData('results', updated);
    setResults(updated);
    showToast('Reordered rankers list.');
  };

  // Gallery
  const saveGallery = (item) => {
    const { _index, ...rest } = item;
    const u = _index !== undefined ? gallery.map((g, i) => i === _index ? rest : g) : [...gallery, rest];
    adminData.setData('gallery', u); setGallery(u); setEditingGallery(null); showToast('Gallery item saved!');
  };
  const delGallery = (i) => {
    if (!window.confirm('Delete this gallery item?')) return;
    const u = gallery.filter((_, x) => x !== i);
    adminData.setData('gallery', u); setGallery(u); showToast('Deleted.', 'error');
  };

  // Partner Schools
  const savePartnerSchool = (item) => {
    const { _index, ...rest } = item;
    const u = _index !== undefined ? partnerSchools.map((s, i) => i === _index ? rest : s) : [...partnerSchools, rest];
    adminData.setData('partnerSchools', u); setPartnerSchools(u); setEditingPartnerSchool(null); showToast('Partner School saved!');
  };
  const delPartnerSchool = (i) => {
    if (!window.confirm('Delete this partner school?')) return;
    const u = partnerSchools.filter((_, x) => x !== i);
    adminData.setData('partnerSchools', u); setPartnerSchools(u); showToast('Deleted.', 'error');
  };
  const movePartnerSchool = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= partnerSchools.length) return;
    const updated = [...partnerSchools];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    adminData.setData('partnerSchools', updated);
    setPartnerSchools(updated);
    showToast('Reordered.');
  };

  // Testimonials
  const saveTestimonial = (item) => {
    const { _index, ...rest } = item;
    const u = _index !== undefined ? testimonials.map((t, i) => i === _index ? rest : t) : [...testimonials, rest];
    adminData.setData('testimonials', u); setTestimonials(u); setEditingTestimonial(null); showToast('Testimonial saved!');
  };
  const delTestimonial = (i) => {
    if (!window.confirm('Delete this testimonial?')) return;
    const u = testimonials.filter((_, x) => x !== i);
    adminData.setData('testimonials', u); setTestimonials(u); showToast('Deleted.', 'error');
  };

  // Features
  const saveFeature = (item) => {
    const { _index, ...rest } = item;
    const u = _index !== undefined ? features.map((f, i) => i === _index ? rest : f) : [...features, rest];
    adminData.setData('features', u); setFeatures(u); setEditingFeature(null); showToast('Feature saved!');
  };
  const delFeature = (i) => {
    if (!window.confirm('Delete this feature?')) return;
    const u = features.filter((_, x) => x !== i);
    adminData.setData('features', u); setFeatures(u); showToast('Deleted.', 'error');
  };

  // Stats
  const handleStatChange = (i, field, val) => {
    const u = [...stats]; u[i] = { ...u[i], [field]: val }; setStats(u);
  };
  const saveStats = () => { adminData.setData('stats', stats); showToast('Stats saved!'); };

  // Contact
  const handleContactChange = (field, val) => setContactInfo(p => ({ ...p, [field]: val }));
  const saveContact = () => { adminData.setData('contactInfo', contactInfo); showToast('Contact info saved!'); };

  // Video Lectures Handlers
  const saveVideoLecture = (item) => {
    const { _index, ...rest } = item;
    const u = _index !== undefined ? videoLectures.map((v, i) => i === _index ? rest : v) : [...videoLectures, rest];
    adminData.setData('videoLectures', u);
    setVideoLectures(u);
    setEditingVideoLecture(null);
    showToast('Video Lecture saved!');
  };

  const delVideoLecture = (i) => {
    if (!window.confirm('Delete this video lecture?')) return;
    const u = videoLectures.filter((_, x) => x !== i);
    adminData.setData('videoLectures', u);
    setVideoLectures(u);
    showToast('Deleted.', 'error');
  };

  // Popup Config (Multi-Image Slider Manager)
  const handlePopupChange = (field, val) => setPopupConfig(p => ({ ...p, [field]: val }));

  const handleSlideFieldChange = (id, field, val) => {
    setPopupConfig(p => ({
      ...p,
      images: (p.images || []).map(img => img.id === id ? { ...img, [field]: val } : img)
    }));
  };

  const savePopupConfig = () => {
    const toSave = { ...popupConfig };
    if (!toSave.images || !Array.isArray(toSave.images) || toSave.images.length === 0) {
      toSave.images = [
        { id: '1', url: '/images/jagannath_rath_yatra.jpg', title: 'Jagannath Rath Yatra 2026', link: '/contact' }
      ];
    }
    adminData.setData('popupConfig', toSave);
    showToast('Popup Slider settings saved!');
  };

  const addPopupImage = (url, title = '', link = '') => {
    if (!url || !url.trim()) return;
    const newSlide = {
      id: Date.now().toString(),
      url: url.trim(),
      title: title.trim() || `Slide ${ (popupConfig.images?.length || 0) + 1 }`,
      link: link.trim() || popupConfig.link || '/contact'
    };
    setPopupConfig(p => ({
      ...p,
      images: [...(p.images || []), newSlide]
    }));
    setNewPopupUrl('');
    setNewPopupTitle('');
    setNewPopupLink('');
    showToast('New slide added to popup slider!');
  };

  const removePopupImage = (id) => {
    setPopupConfig(p => ({
      ...p,
      images: (p.images || []).filter(img => img.id !== id)
    }));
    showToast('Slide removed.', 'info');
  };

  const handlePopupUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast('Please select an image file', 'error'); return; }
    if (file.size > 5 * 1024 * 1024) { showToast('Image must be under 5 MB', 'error'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 800;
        let w = img.width, h = img.height;
        if (w > MAX || h > MAX) {
          if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
          else { w = Math.round(w * MAX / h); h = MAX; }
        }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        addPopupImage(dataUrl, file.name.split('.')[0] || 'Uploaded Slide');
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Inquiries
  const delInquiry = (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    const u = inquiries.filter(q => q.id !== id);
    localStorage.setItem('noble_education_inquiries', JSON.stringify(u));
    setInquiries(u); showToast('Deleted.', 'error');
  };
  const clearInquiries = () => {
    if (!window.confirm('Delete ALL inquiries?')) return;
    localStorage.setItem('noble_education_inquiries', JSON.stringify([]));
    setInquiries([]); showToast('All cleared.', 'error');
  };

  // Settings
  const handleChangePassword = (e) => {
    e.preventDefault();
    const currentUser = adminData.getCurrentUser();
    if (!currentUser) return;
    if (currentUser.password !== currentPassword) { showToast('Current password wrong.', 'error'); return; }
    if (newPassword.length < 6) { showToast('Min 6 characters required.', 'error'); return; }
    if (newPassword !== confirmPassword) { showToast('Passwords do not match.', 'error'); return; }
    adminData.updateUserPassword(currentUser.id, newPassword);
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    showToast('Password changed!');
  };
  const handleExport = () => {
    const blob = new Blob([adminData.exportAll()], { type: 'application/json' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `noble_backup_${new Date().toISOString().split('T')[0]}.json` });
    a.click();
    showToast('Backup exported!');
  };
  const handleImport = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      if (adminData.importAll(ev.target.result)) { loadAll(); showToast('Data imported!'); }
      else showToast('Invalid JSON file.', 'error');
    };
    reader.readAsText(file); e.target.value = '';
  };
  const handleReset = () => {
    if (!window.confirm('Reset ALL to defaults? Cannot be undone.')) return;
    if (!window.confirm('Final confirmation: Reset everything?')) return;
    adminData.getAllKeys().forEach(k => adminData.resetData(k));
    loadAll(); showToast('Reset complete.');
  };

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION RENDERERS
  // ═══════════════════════════════════════════════════════════════════════

  // ─── DASHBOARD ──────────────────────────────────────────────────────────
  const renderDashboard = () => {
    const totalPagePhotos = Object.values(pageImages || {}).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0);

    const cards = [
      { label: 'Hero Banners', value: heroBanners.length, icon: FiLayers, color: '#3B82F6', bg: '#1E3A5F', section: 'heroBanners' },
      { label: 'Total Inquiries', value: inquiries.length, icon: FiInbox, color: '#06B6D4', bg: '#083344', section: 'inquiries' },
      { label: 'Gallery Photos', value: gallery.length, icon: FiImage, color: '#8B5CF6', bg: '#2D1B69', section: 'gallery' },
      { label: 'Page Photos', value: totalPagePhotos, icon: FiCamera, color: '#F43F5E', bg: '#4C0519', section: 'pagePhotos' },
      { label: 'Student Results', value: results.length, icon: FiAward, color: '#10B981', bg: '#064E3B', section: 'results' },
      { label: 'Announcements', value: announcements.length, icon: FiVolume2, color: '#F59E0B', bg: '#451A03', section: 'announcements' },
      { label: 'Testimonials', value: testimonials.length, icon: FiMessageSquare, color: '#EC4899', bg: '#500724', section: 'testimonials' },
      { label: 'Features Listed', value: features.length, icon: FiCheckCircle, color: '#22D3EE', bg: '#083344', section: 'features' },
      { label: 'Promo Popup', value: (popupConfig.enabled !== false) ? `${popupConfig.images?.length || 1} Slides` : 'Disabled', icon: FiStar, color: '#FBBF24', bg: '#453203', section: 'popup' },
      { label: 'Video Lectures', value: videoLectures.length, icon: FiVideo, color: '#EF4444', bg: '#450A0A', section: 'videos' },
    ];
    
    const filteredCards = cards.filter(c => adminData.hasPermission(c.section, 'view'));
    const recent = inquiries.slice(0, 6);
    const currentUser = adminData.getCurrentUser();

    const quickActions = [
      { label: 'Add Hero Banner', icon: FiLayers, action: () => { navigate('heroBanners'); setTimeout(() => setEditingHeroBanner({ title:'', highlightWord:'', subtitle:'', desc:'', image:'', cardImage:'', buttonText:'Book Free Counselling', buttonLink:'#inquiry-form' }), 100); }, section: 'heroBanners', actionType: 'edit' },
      { label: 'Add Page Photo', icon: FiCamera, action: () => { navigate('pagePhotos'); setTimeout(() => setEditingPagePhoto({ title:'', category:'', image:'', desc:'' }), 100); }, section: 'pagePhotos', actionType: 'edit' },
      { label: 'Add Gallery Photo', icon: FiCamera, action: () => { navigate('gallery'); setTimeout(() => setEditingGallery({ title:'', category:'Classrooms', image:'' }), 100); }, section: 'gallery', actionType: 'edit' },
      { label: 'Add Announcement', icon: FiVolume2, action: () => { navigate('announcements'); setTimeout(() => setEditingAnnouncement({ emoji:'📢', text:'' }), 100); }, section: 'announcements', actionType: 'edit' },
      { label: 'Add Result', icon: FiAward, action: () => { navigate('results'); setTimeout(() => setEditingResult({ name:'', score:'', exam:'', branch:'', status:'' }), 100); }, section: 'results', actionType: 'edit' },
      { label: 'View Inquiries', icon: FiInbox, action: () => navigate('inquiries'), section: 'inquiries', actionType: 'view' },
      { label: 'Edit Contact Info', icon: FiPhone, action: () => navigate('contactInfo'), section: 'contactInfo', actionType: 'edit' },
      { label: 'Backup Data', icon: FiDownload, action: handleExport, section: 'settings', actionType: 'view' },
    ];
    
    const filteredQuickActions = quickActions.filter(qa => adminData.hasPermission(qa.section, qa.actionType));

    return (
      <div>
        <SectionHeader 
          title="Dashboard" 
          subtitle={`Welcome back, ${currentUser?.username || 'Guest'} (${currentUser?.role || 'staff'})! Last updated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`} 
        />
        
        {filteredCards.length > 0 && (
          <div className="ap-dash-grid">
            {filteredCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <button key={i} className="ap-dash-card" onClick={() => navigate(c.section)} style={{ '--card-color': c.color, '--card-bg': c.bg }}>
                  <div className="ap-dash-icon"><Icon size={22} /></div>
                  <div className="ap-dash-val">{c.value}</div>
                  <div className="ap-dash-label">{c.label}</div>
                  <FiChevronRight className="ap-dash-arrow" />
                </button>
              );
            })}
          </div>
        )}

        {adminData.hasPermission('inquiries', 'view') && (
          <div className="ap-card" style={{ marginTop: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 className="ap-card-title"><FiInbox style={{ marginRight: 8 }} />Recent Inquiries</h3>
              <button className="ap-btn ap-btn-ghost ap-btn-sm" onClick={() => navigate('inquiries')}>View All <FiChevronRight /></button>
            </div>
            {recent.length === 0 ? (
              <EmptyState icon={FiInbox} message="No inquiries received yet." />
            ) : (
              <div className="ap-table-wrap">
                <table className="ap-table">
                  <thead><tr><th>Date</th><th>Name</th><th>Phone</th><th>Program</th></tr></thead>
                  <tbody>
                    {recent.map((q, i) => (
                      <tr key={q.id || i}>
                        <td style={{ color: '#6B7280', fontSize: 12, whiteSpace: 'nowrap' }}>{q.timestamp || '—'}</td>
                        <td><strong>{q.name || '—'}</strong></td>
                        <td>{q.phone || '—'}</td>
                        <td><span className="ap-badge">{q.program || '—'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {filteredQuickActions.length > 0 && (
          <div className="ap-quick-actions">
            <h3 className="ap-card-title" style={{ margin: '28px 0 16px' }}>Quick Actions</h3>
            <div className="ap-quick-grid">
              {filteredQuickActions.map((qa, i) => {
                const Icon = qa.icon;
                return (
                  <button key={i} className="ap-quick-btn" onClick={qa.action}>
                    <Icon size={18} />
                    <span>{qa.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── ANNOUNCEMENTS ──────────────────────────────────────────────────────
  const renderAnnouncements = () => {
    const filtered = announcements.filter(a => a.text?.toLowerCase().includes(search.toLowerCase()));
    return (
      <div>
        <SectionHeader
          title="Announcements"
          subtitle="Manage the scrolling ticker bar on the website header"
          action={adminData.hasPermission('announcements', 'edit') && <button className="ap-btn ap-btn-primary" onClick={() => setEditingAnnouncement({ emoji:'📢', text:'' })}><FiPlus /> Add Announcement</button>}
        />
        <div className="ap-search-bar">
          <FiSearch />
          <input placeholder="Search announcements..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="ap-list">
          {filtered.map((ann, i) => (
            <div className="ap-list-item" key={i}>
              <span className="ap-list-emoji">{ann.emoji}</span>
              <span className="ap-list-text">{ann.text}</span>
              <div className="ap-list-actions">
                {adminData.hasPermission('announcements', 'edit') && (
                  <button className="ap-icon-btn" title="Edit" onClick={() => setEditingAnnouncement({ ...ann, _index: i })}><FiEdit2 /></button>
                )}
                {adminData.hasPermission('announcements', 'delete') && (
                  <button className="ap-icon-btn ap-icon-btn-danger" title="Delete" onClick={() => delAnn(i)}><FiTrash2 /></button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <EmptyState icon={FiVolume2} message="No announcements found." />}
        </div>
        {editingAnnouncement && <AnnouncementModal item={editingAnnouncement} onSave={saveAnn} onClose={() => setEditingAnnouncement(null)} />}
      </div>
    );
  };

  // ─── RESULTS ────────────────────────────────────────────────────────────
  const renderResults = () => {
    const filtered = results.filter(r =>
      (r.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (r.exam || '').toLowerCase().includes(search.toLowerCase()) ||
      (r.school || '').toLowerCase().includes(search.toLowerCase())
    );
    return (
      <div>
        <SectionHeader
          title="Student Results Manager"
          subtitle="Add, edit, delete, and reorder student toppers. Top 4 results are featured live on the Homepage!"
          action={adminData.hasPermission('results', 'edit') && <button className="ap-btn ap-btn-primary" onClick={() => setEditingResult({ name:'', score:'', exam:'', branch:'', school:'', status:'', image:'' })}><FiPlus /> Add Student Result</button>}
        />
        <div className="ap-search-bar">
          <FiSearch />
          <input placeholder="Search by student name, school, or exam..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {filtered.length === 0 ? <EmptyState icon={FiAward} message="No student results found. Click 'Add Student Result' to add one." /> : (
          <div className="ap-table-wrap">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Score / Percentile</th>
                  <th>Partner School</th>
                  <th>Exam & Branch</th>
                  <th>Achievement Badge</th>
                  <th>Homepage Display</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => {
                  const realIdx = results.indexOf(r);
                  const isFeaturedOnHome = realIdx < 4;

                  return (
                    <tr key={i}>
                      <td style={{ color: '#6B7280' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {adminData.hasPermission('results', 'edit') && (
                            <button
                              type="button"
                              className="ap-icon-btn"
                              title="Move Up"
                              disabled={realIdx === 0}
                              onClick={() => moveResult(realIdx, -1)}
                              style={{ padding: 2, height: 20, minWidth: 20 }}
                            >
                              ▲
                            </button>
                          )}
                          <span style={{ fontSize: 12, fontWeight: 700, textAlign: 'center' }}>{realIdx + 1}</span>
                          {adminData.hasPermission('results', 'edit') && (
                            <button
                              type="button"
                              className="ap-icon-btn"
                              title="Move Down"
                              disabled={realIdx === results.length - 1}
                              onClick={() => moveResult(realIdx, 1)}
                              style={{ padding: 2, height: 20, minWidth: 20 }}
                            >
                              ▼
                            </button>
                          )}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 42, height: 42, borderRadius: 10, overflow: 'hidden', background: '#21262D', border: '1px solid #30363D', flexShrink: 0 }}>
                            <img
                              src={getEmbedImageUrl(r.image || '/images/shital-result.png')}
                              alt={r.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={e => { e.target.src = '/images/shital-result.png'; }}
                            />
                          </div>
                          <div>
                            <strong style={{ color: '#F3F4F6', fontSize: 14 }}>{r.name}</strong>
                            <p style={{ color: '#9CA3AF', fontSize: 11, margin: 0 }}>{r.branch || 'Board Ranker'}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="ap-badge ap-badge-green" style={{ fontSize: 12, padding: '4px 10px' }}>{r.score}</span></td>
                      <td>
                        <span style={{ color: '#60A5FA', fontSize: 12, fontWeight: 600 }}>
                          🏫 {r.school || 'Vadodara Partner School'}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: '#E5E7EB', fontSize: 12 }}>{r.exam}</span>
                      </td>
                      <td><span className="ap-badge ap-badge-purple">{r.status || 'Topper'}</span></td>
                      <td>
                        {isFeaturedOnHome ? (
                          <span style={{ fontSize: 10, background: '#DC262622', color: '#EF4444', border: '1px solid #DC262644', padding: '3px 8px', borderRadius: 6, fontWeight: 700 }}>
                            🔥 Live on Homepage (Rank #{realIdx + 1})
                          </span>
                        ) : (
                          <span style={{ fontSize: 10, color: '#6B7280' }}>
                            Results Page Only
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="ap-list-actions">
                          {adminData.hasPermission('results', 'edit') && (
                            <button className="ap-icon-btn" title="Edit Result" onClick={() => setEditingResult({ ...r, _index: realIdx })}><FiEdit2 /></button>
                          )}
                          {adminData.hasPermission('results', 'delete') && (
                            <button className="ap-icon-btn ap-icon-btn-danger" title="Delete Result" onClick={() => delResult(realIdx)}><FiTrash2 /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {editingResult && <ResultModal item={editingResult} onSave={saveResult} onClose={() => setEditingResult(null)} />}
      </div>
    );
  };

  // ─── GALLERY ────────────────────────────────────────────────────────────
  const renderGallery = () => {
    const cats = ['All', ...GALLERY_CATEGORIES];
    const filtered = gallery.filter(g =>
      (galleryFilter === 'All' || g.category === galleryFilter) &&
      (g.title || '').toLowerCase().includes(search.toLowerCase())
    );
    return (
      <div>
        <SectionHeader
          title="Gallery"
          subtitle="Upload & manage campus photos shown on the Gallery page"
          action={adminData.hasPermission('gallery', 'edit') && <button className="ap-btn ap-btn-primary" onClick={() => setEditingGallery({ title:'', category:'Classrooms', image:'' })}><FiPlus /> Add Photo</button>}
        />
        <div className="ap-gallery-controls">
          <div className="ap-search-bar" style={{ flex: 1, marginBottom: 0 }}>
            <FiSearch />
            <input placeholder="Search photos..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="ap-cat-tabs">
            {cats.map(c => (
              <button key={c} className={`ap-cat-tab ${galleryFilter === c ? 'active' : ''}`} onClick={() => setGalleryFilter(c)}>{c}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? <EmptyState icon={FiImage} message="No photos found. Click 'Add Photo' to upload one." /> : (
          <div className="ap-gallery-grid">
            {filtered.map((item, i) => {
              const realIdx = gallery.indexOf(item);
              return (
                <div className="ap-gallery-card" key={i}>
                  <div className="ap-gallery-thumb" style={{ position: 'relative', overflow: 'hidden' }}>
                    {item.image ? (
                      <img
                        src={getEmbedImageUrl(item.image)}
                        alt={item.title || 'Gallery'}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                      />
                    ) : null}
                    <div style={{ display: item.image ? 'none' : 'flex', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', background: '#21262D', color: '#374151', flexDirection: 'column', gap: 8 }}>
                      <FiImage size={32} />
                      <span style={{ fontSize: 11, color: '#6B7280' }}>No image</span>
                    </div>
                    <div className="ap-gallery-thumb-overlay">
                      {item.image && <button className="ap-gallery-thumb-btn" onClick={() => window.open(getEmbedImageUrl(item.image), '_blank')} title="View full"><FiEye /></button>}
                    </div>
                  </div>
                  <div className="ap-gallery-info">
                    <div>
                      <p className="ap-gallery-title">{item.title || 'Untitled'}</p>
                      <span className="ap-badge ap-badge-purple">{item.category}</span>
                    </div>
                    <div className="ap-list-actions" style={{ marginTop: 8 }}>
                      {adminData.hasPermission('gallery', 'edit') && (
                        <button className="ap-icon-btn" onClick={() => setEditingGallery({ ...item, _index: realIdx })}><FiEdit2 /></button>
                      )}
                      {adminData.hasPermission('gallery', 'delete') && (
                        <button className="ap-icon-btn ap-icon-btn-danger" onClick={() => delGallery(realIdx)}><FiTrash2 /></button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {editingGallery && <GalleryModal item={editingGallery} onSave={saveGallery} onClose={() => setEditingGallery(null)} />}
      </div>
    );
  };

  // ─── TESTIMONIALS ───────────────────────────────────────────────────────
  const renderTestimonials = () => {
    const filtered = testimonials.filter(t =>
      (t.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (t.program || '').toLowerCase().includes(search.toLowerCase())
    );
    return (
      <div>
        <SectionHeader
          title="Testimonials"
          subtitle="Student & parent reviews shown on the homepage"
          action={adminData.hasPermission('testimonials', 'edit') && <button className="ap-btn ap-btn-primary" onClick={() => setEditingTestimonial({ name:'', program:'', stars:5, quote:'' })}><FiPlus /> Add Review</button>}
        />
        <div className="ap-search-bar">
          <FiSearch />
          <input placeholder="Search by name or program..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="ap-list">
          {filtered.map((t, i) => {
            const realIdx = testimonials.indexOf(t);
            return (
              <div className="ap-card ap-testimonial-card" key={i}>
                <div className="ap-testimonial-top">
                  <div className="ap-testimonial-avatar">{t.name?.charAt(0) || '?'}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#fff', margin: 0, fontSize: 15 }}>{t.name}</p>
                    <p style={{ color: '#9CA3AF', fontSize: 12, margin: '2px 0 0' }}>{t.program}</p>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                    {[1,2,3,4,5].map(s => <FiStar key={s} style={{ color: s <= t.stars ? '#FBBF24' : '#374151', fill: s <= t.stars ? '#FBBF24' : 'none', fontSize: 14 }} />)}
                  </div>
                </div>
                <p className="ap-testimonial-quote">"{t.quote}"</p>
                <div className="ap-list-actions">
                  {adminData.hasPermission('testimonials', 'edit') && (
                    <button className="ap-icon-btn" onClick={() => setEditingTestimonial({ ...t, _index: realIdx })}><FiEdit2 /></button>
                  )}
                  {adminData.hasPermission('testimonials', 'delete') && (
                    <button className="ap-icon-btn ap-icon-btn-danger" onClick={() => delTestimonial(realIdx)}><FiTrash2 /></button>
                  )}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <EmptyState icon={FiMessageSquare} message="No testimonials found." />}
        </div>
        {editingTestimonial && <TestimonialModal item={editingTestimonial} onSave={saveTestimonial} onClose={() => setEditingTestimonial(null)} />}
      </div>
    );
  };

  // ─── COURSES ────────────────────────────────────────────────────────────
  const renderCourses = () => (
    <div>
      <SectionHeader title="Courses" subtitle="Course structure overview (managed in codebase)" />
      <div className="ap-card" style={{ textAlign: 'center', padding: '56px 32px' }}>
        <FiBookOpen size={56} style={{ color: '#3B82F6', marginBottom: 20, display: 'block', margin: '0 auto 20px' }} />
        <h3 style={{ color: '#fff', fontSize: 20, marginBottom: 12 }}>Course Management</h3>
        <p style={{ color: '#9CA3AF', maxWidth: 440, margin: '0 auto 28px', lineHeight: 1.7, fontSize: 14 }}>
          The course catalogue is defined statically in the source code for performance and SEO. To modify courses, update the <code style={{ background: '#0F172A', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>src/data/coursesData.js</code> file.
        </p>
        <div style={{ display: 'inline-flex', gap: 12 }}>
          <div className="ap-card" style={{ display: 'inline-block', padding: '16px 32px', borderColor: '#3B82F6' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#3B82F6' }}>12</div>
            <div style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>Active Courses</div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── STATS ──────────────────────────────────────────────────────────────
  const renderStats = () => (
    <div>
      <SectionHeader
        title="Stats / Counters"
        subtitle="The 4 achievement counters shown on the homepage"
        action={adminData.hasPermission('stats', 'edit') && <button className="ap-btn ap-btn-primary" onClick={saveStats}><FiSave /> Save All Stats</button>}
      />
      <div className="ap-stats-grid">
        {stats.map((stat, i) => (
          <div className="ap-card" key={i}>
            <div className="ap-stat-num-preview">{stat.value}</div>
            <label className="ap-label">Counter Value</label>
            <input className="ap-input" value={stat.value} onChange={e => handleStatChange(i, 'value', e.target.value)} placeholder="e.g. 1500+" disabled={!adminData.hasPermission('stats', 'edit')} />
            <label className="ap-label">Label</label>
            <input className="ap-input" value={stat.label} onChange={e => handleStatChange(i, 'label', e.target.value)} placeholder="e.g. Students Enrolled" disabled={!adminData.hasPermission('stats', 'edit')} />
            <label className="ap-label">Description</label>
            <input className="ap-input" value={stat.description} onChange={e => handleStatChange(i, 'description', e.target.value)} placeholder="Brief description" disabled={!adminData.hasPermission('stats', 'edit')} />
          </div>
        ))}
      </div>
      {adminData.hasPermission('stats', 'edit') && (
        <button className="ap-btn ap-btn-primary" onClick={saveStats} style={{ marginTop: 20 }}><FiSave /> Save All Stats</button>
      )}
    </div>
  );

  // ─── FEATURES ───────────────────────────────────────────────────────────
  const renderFeatures = () => {
    const filtered = features.filter(f =>
      (f.title || '').toLowerCase().includes(search.toLowerCase())
    );
    return (
      <div>
        <SectionHeader
          title="Why Choose Us"
          subtitle="Homepage feature/benefit cards shown in the features section"
          action={adminData.hasPermission('features', 'edit') && <button className="ap-btn ap-btn-primary" onClick={() => setEditingFeature({ icon:'FiCheckCircle', title:'', description:'' })}><FiPlus /> Add Feature</button>}
        />
        <div className="ap-search-bar">
          <FiSearch />
          <input placeholder="Search features..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="ap-list">
          {filtered.map((f, i) => {
            const realIdx = features.indexOf(f);
            const IconComp = ICON_MAP[f.icon] || FiCheckCircle;
            return (
              <div className="ap-list-item" key={i}>
                <div className="ap-feature-ico"><IconComp size={18} /></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, color: '#fff', margin: '0 0 4px', fontSize: 14 }}>{f.title}</p>
                  <p style={{ color: '#9CA3AF', fontSize: 13, margin: 0 }}>{f.description}</p>
                </div>
                <div className="ap-list-actions">
                  {adminData.hasPermission('features', 'edit') && (
                    <button className="ap-icon-btn" onClick={() => setEditingFeature({ ...f, _index: realIdx })}><FiEdit2 /></button>
                  )}
                  {adminData.hasPermission('features', 'delete') && (
                    <button className="ap-icon-btn ap-icon-btn-danger" onClick={() => delFeature(realIdx)}><FiTrash2 /></button>
                  )}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <EmptyState icon={FiCheckCircle} message="No features found." />}
        </div>
        {editingFeature && <FeatureModal item={editingFeature} onSave={saveFeature} onClose={() => setEditingFeature(null)} />}
      </div>
    );
  };

  // ─── CONTACT INFO ───────────────────────────────────────────────────────
  const renderContact = () => (
    <div>
      <SectionHeader
        title="Contact Information"
        subtitle="These details appear on the Contact page, Footer, and WhatsApp buttons"
        action={adminData.hasPermission('contactInfo', 'edit') && <button className="ap-btn ap-btn-primary" onClick={saveContact}><FiSave /> Save Changes</button>}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
        <div className="ap-card">
          <h4 className="ap-card-title">📞 Phone & WhatsApp</h4>
          <label className="ap-label">Primary Phone</label>
          <input className="ap-input" value={contactInfo.phone1 || ''} onChange={e => handleContactChange('phone1', e.target.value)} placeholder="+91 98765 43210" disabled={!adminData.hasPermission('contactInfo', 'edit')} />
          <label className="ap-label">Secondary Phone</label>
          <input className="ap-input" value={contactInfo.phone2 || ''} onChange={e => handleContactChange('phone2', e.target.value)} placeholder="+91 98765 43210" disabled={!adminData.hasPermission('contactInfo', 'edit')} />
          <label className="ap-label">WhatsApp Number (digits only)</label>
          <input className="ap-input" value={contactInfo.whatsapp || ''} onChange={e => handleContactChange('whatsapp', e.target.value)} placeholder="919876543210" disabled={!adminData.hasPermission('contactInfo', 'edit')} />
          <label className="ap-label">Email Address</label>
          <input className="ap-input" value={contactInfo.email || ''} onChange={e => handleContactChange('email', e.target.value)} placeholder="info@nobleedu.in" disabled={!adminData.hasPermission('contactInfo', 'edit')} />
        </div>
        <div className="ap-card">
          <h4 className="ap-card-title">📍 Location & Timings</h4>
          <label className="ap-label">Address</label>
          <textarea className="ap-textarea" value={contactInfo.address || ''} onChange={e => handleContactChange('address', e.target.value)} rows={3} placeholder="Full campus address..." disabled={!adminData.hasPermission('contactInfo', 'edit')} />
          <label className="ap-label">Office Timings</label>
          <input className="ap-input" value={contactInfo.timings || ''} onChange={e => handleContactChange('timings', e.target.value)} placeholder="Mon–Sat: 8:00 AM – 8:00 PM" disabled={!adminData.hasPermission('contactInfo', 'edit')} />
        </div>
        <div className="ap-card" style={{ gridColumn: '1 / -1' }}>
          <h4 className="ap-card-title">🗺️ Google Maps Embed URL</h4>
          <p style={{ color: '#9CA3AF', fontSize: 13, marginBottom: 12 }}>Go to Google Maps → Share → Embed a map → Copy the <code>src="..."</code> URL value and paste it here.</p>
          <textarea className="ap-textarea" value={contactInfo.mapUrl || ''} onChange={e => handleContactChange('mapUrl', e.target.value)} rows={3} placeholder="https://www.google.com/maps/embed?pb=..." disabled={!adminData.hasPermission('contactInfo', 'edit')} />
          {contactInfo.mapUrl && (
            <div style={{ marginTop: 16, borderRadius: 12, overflow: 'hidden', border: '1px solid #374151' }}>
              <iframe src={contactInfo.mapUrl} width="100%" height="220" style={{ border: 'none', display: 'block' }} loading="lazy" title="Map Preview" />
            </div>
          )}
        </div>
      </div>
      {adminData.hasPermission('contactInfo', 'edit') && (
        <button className="ap-btn ap-btn-primary" onClick={saveContact} style={{ marginTop: 24 }}><FiSave /> Save Contact Info</button>
      )}
    </div>
  );

  // ─── INQUIRIES ──────────────────────────────────────────────────────────
  const renderInquiries = () => {
    const getFormCategory = (q) => {
      const src = (q.formSource || q.formType || '').toLowerCase();
      const msg = (q.message || '').toLowerCase();
      const sch = (q.school || '').toLowerCase();

      for (const pSch of partnerSchools) {
        const pName = (pSch.name || '').toLowerCase();
        const pShort = pName.replace(/vidyalay|school|campus/g, '').trim();
        if (sch.includes(pShort) || src.includes(pShort) || msg.includes(pShort)) {
          return `School: ${pSch.name}`;
        }
      }

      if (src.includes('course') || msg.includes('course') || msg.includes('ddcet') || msg.includes('neet') || msg.includes('jee')) {
        return 'Course Forms';
      }
      if (src.includes('counseling') || src.includes('callback') || msg.includes('free counseling') || msg.includes('callback')) {
        return 'Counseling Forms';
      }
      return 'General Admission';
    };

    const schoolFormCategories = partnerSchools.map(sch => ({
      key: `School: ${sch.name}`,
      label: `🏫 ${sch.name} Form`,
      badge: inquiries.filter(q => getFormCategory(q) === `School: ${sch.name}`).length,
      color: '#10B981'
    }));

    const formCategories = [
      { key: 'All', label: '📋 All Forms (Master)', badge: inquiries.length, color: '#388BFD' },
      { key: 'General Admission', label: '🎓 General Admission Form', badge: inquiries.filter(q => getFormCategory(q) === 'General Admission').length, color: '#3B82F6' },
      ...schoolFormCategories,
      { key: 'Course Forms', label: '📚 Course Page Forms', badge: inquiries.filter(q => getFormCategory(q) === 'Course Forms').length, color: '#06B6D4' },
      { key: 'Counseling Forms', label: '💡 Counseling & Callback', badge: inquiries.filter(q => getFormCategory(q) === 'Counseling Forms').length, color: '#F59E0B' }
    ];

    const filtered = inquiries.filter(q => {
      const matchSearch = (q.name || '').toLowerCase().includes(search.toLowerCase()) ||
                          (q.phone || '').toLowerCase().includes(search.toLowerCase()) ||
                          (q.program || '').toLowerCase().includes(search.toLowerCase()) ||
                          (q.message || '').toLowerCase().includes(search.toLowerCase());
      
      const matchForm = inquiryFormFilter === 'All' || getFormCategory(q) === inquiryFormFilter;
      return matchSearch && matchForm;
    });

    return (
      <div>
        <SectionHeader
          title="Form-Wise Inquiries Collection"
          subtitle={`Individual submission views for all website forms (${inquiries.length} total submissions across all forms).`}
          action={
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="ap-btn ap-btn-primary" onClick={() => inquiryService.downloadExcel(filtered)}>
                <FiDownload /> Export {inquiryFormFilter} CSV
              </button>
              {inquiries.length > 0 && adminData.hasPermission('inquiries', 'delete') && (
                <button className="ap-btn ap-btn-danger" onClick={clearInquiries}>
                  <FiTrash2 /> Clear All
                </button>
              )}
            </div>
          }
        />

        {/* Separate Form Category Filter Pills Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {formCategories.map(cat => {
            const isActive = inquiryFormFilter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setInquiryFormFilter(cat.key)}
                style={{
                  padding: '8px 16px', borderRadius: 12, fontSize: 12, fontWeight: 700,
                  display: 'flex', items: 'center', gap: 8, cursor: 'pointer',
                  border: isActive ? `1px solid ${cat.color}` : '1px solid #21262D',
                  background: isActive ? cat.color : '#0F172A',
                  color: '#FFFFFF',
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  background: isActive ? 'rgba(255,255,255,0.25)' : '#1E293B',
                  color: '#FFFFFF',
                  fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 10
                }}>
                  {cat.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="ap-search-bar" style={{ marginBottom: 20 }}>
          <FiSearch />
          <input
            placeholder={`Search ${inquiryFormFilter} inquiries by student name, phone, program, or message...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={FiInbox} message={`No inquiries found under "${inquiryFormFilter}".`} />
        ) : (
          <div className="ap-table-wrap">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Form Source / Origin</th>
                  <th>Student Name</th>
                  <th>Phone Number</th>
                  <th>Interested Program</th>
                  <th>Message / Query Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q) => {
                  const category = getFormCategory(q);
                  const badgeColor = category === 'School Forms' ? '#10B981' :
                                     category === 'Course Forms' ? '#06B6D4' :
                                     category === 'Counseling Forms' ? '#F59E0B' : '#3B82F6';

                  return (
                    <tr key={q.id}>
                      <td style={{ color: '#9CA3AF', fontSize: 11, whiteSpace: 'nowrap' }}>
                        {q.timestamp || '—'}
                      </td>
                      <td>
                        <span style={{
                          background: `${badgeColor}22`,
                          color: badgeColor,
                          border: `1px solid ${badgeColor}44`,
                          fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8,
                          display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap'
                        }}>
                          {q.school ? `🏫 ${q.school}` : q.formSource || category}
                        </span>
                      </td>
                      <td><strong style={{ color: '#F3F4F6' }}>{q.name || '—'}</strong></td>
                      <td>
                        <a href={`tel:${q.phone}`} style={{ color: '#60A5FA', fontWeight: 700 }}>
                          📞 {q.phone || '—'}
                        </a>
                      </td>
                      <td><span className="ap-badge">{q.program || 'General Inquiry'}</span></td>
                      <td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#9CA3AF', fontSize: 12 }}>
                        {q.message || '—'}
                      </td>
                      <td>
                        {adminData.hasPermission('inquiries', 'delete') ? (
                          <button className="ap-icon-btn ap-icon-btn-danger" onClick={() => delInquiry(q.id)} title="Delete inquiry">
                            <FiTrash2 />
                          </button>
                        ) : (
                          <span style={{ color: '#4B5563', fontSize: 12 }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // ─── SETTINGS ───────────────────────────────────────────────────────────
  // ─── SETTINGS ───────────────────────────────────────────────────────────
  const renderSettings = () => {
    const currentUser = adminData.getCurrentUser();
    const isSuper = currentUser?.role === 'superadmin';
    return (
      <div>
        <SectionHeader title="Settings" subtitle="Security, data backup, and system management" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
          <div className="ap-card">
            <h4 className="ap-card-title"><FiLock style={{ marginRight: 8 }} />Change Password</h4>
            <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <label className="ap-label">Current Password</label>
              <input type="password" className="ap-input" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
              <label className="ap-label">New Password</label>
              <input type="password" className="ap-input" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
              <label className="ap-label">Confirm New Password</label>
              <input type="password" className="ap-input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
              <button type="submit" className="ap-btn ap-btn-primary" style={{ marginTop: 16 }}><FiSave /> Update Password</button>
            </form>
          </div>

          <div className="ap-card">
            <h4 className="ap-card-title"><FiDownload style={{ marginRight: 8 }} />Export / Import Data</h4>
            <p style={{ color: '#9CA3AF', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
              Backup all site content to a JSON file, or restore from a previous backup. Use this before migrating to a new device.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="ap-btn ap-btn-secondary ap-btn-block" onClick={handleExport}><FiDownload /> Download JSON Backup</button>
              <button className="ap-btn ap-btn-secondary ap-btn-block" onClick={() => fileInputRef.current?.click()}><FiUpload /> Import JSON Backup</button>
              <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
            </div>
          </div>

          {isSuper && (
            <div className="ap-card" style={{ borderColor: '#7F1D1D' }}>
              <h4 className="ap-card-title" style={{ color: '#EF4444' }}><FiAlertTriangle style={{ marginRight: 8 }} />Danger Zone</h4>
              <p style={{ color: '#9CA3AF', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
                Reset ALL website data to factory defaults. This will erase all your announcements, gallery, results, and other changes. <strong style={{ color: '#EF4444' }}>Cannot be undone.</strong>
              </p>
              <button className="ap-btn ap-btn-danger ap-btn-block" onClick={handleReset}><FiRefreshCw /> Reset All to Defaults</button>
            </div>
          )}
        </div>

        {/* User Management & Role Permissions (superadmin only) */}
        {isSuper && (
          <div className="ap-card" style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
              <h4 className="ap-card-title" style={{ margin: 0 }}><FiUsers style={{ marginRight: 8 }} />User Roles & Permissions Management</h4>
              <button
                type="button"
                className="ap-btn ap-btn-primary ap-btn-sm"
                onClick={() => setEditingUser({ username: '', password: '', role: 'staff', permissions: ['dashboard'] })}
              >
                <FiPlus /> Add New User
              </button>
            </div>
            <div className="ap-table-wrap">
              <table className="ap-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Assigned Permissions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td><strong>{u.username}</strong></td>
                      <td>
                        <span className={`ap-badge ${u.role === 'superadmin' ? 'ap-badge-green' : 'ap-badge-purple'}`} style={{ textTransform: 'uppercase', fontSize: 10 }}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxWidth: 450 }}>
                          {u.role === 'superadmin' ? (
                            <span style={{ color: '#8B949E', fontSize: 12 }}>All Permissions Granted (System Admin)</span>
                          ) : u.permissions.length === 0 ? (
                            <span style={{ color: '#4B5563', fontSize: 12 }}>No Page Access Assigned (Dashboard Only)</span>
                          ) : (
                            u.permissions.map(p => (
                              <span key={p} style={{ fontSize: 10, background: '#21262D', color: '#C9D1D9', padding: '2px 8px', borderRadius: 4, border: '1px solid #30363D' }}>
                                {navItems.find(n => n.key === p)?.label || p}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="ap-list-actions">
                          <button
                            type="button"
                            className="ap-icon-btn"
                            title="Edit Permissions"
                            onClick={() => setEditingUser(u)}
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            type="button"
                            className="ap-icon-btn ap-icon-btn-danger"
                            title="Delete User"
                            disabled={u.username === 'admin'}
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete user "${u.username}"?`)) {
                                const updated = users.filter(x => x.id !== u.id);
                                adminData.saveUsers(updated);
                                setUsers(updated);
                                showToast('User deleted successfully.', 'error');
                              }
                            }}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="ap-card" style={{ marginTop: 20 }}>
          <h4 className="ap-card-title">ℹ️ Admin Panel Information</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginTop: 12 }}>
            {[
              { label: 'Role', value: currentUser?.role || 'staff' },
              { label: 'Logged In As', value: currentUser?.username || 'Guest' },
              { label: 'Accessible At', value: '/admin' },
              { label: 'Default Password', value: 'admin123' },
            ].map((info, i) => (
              <div key={i} style={{ background: '#0F172A', padding: '12px 16px', borderRadius: 10 }}>
                <p style={{ color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>{info.label}</p>
                <p style={{ color: '#E5E7EB', fontSize: 14, fontWeight: 600, margin: 0 }}>{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPopup = () => {
    const slides = popupConfig.images && Array.isArray(popupConfig.images) && popupConfig.images.length > 0
      ? popupConfig.images
      : [{ id: '1', url: '/images/jagannath_rath_yatra.jpg', title: 'Jagannath Rath Yatra 2026' }];

    return (
      <div>
        <SectionHeader
          title="Promotional Popup Slider"
          subtitle="Add and manage multiple banner slides, set auto-rotate timer & animations"
          action={adminData.hasPermission('popup', 'edit') && <button type="button" className="ap-btn ap-btn-primary" onClick={(e) => { e.preventDefault(); savePopupConfig(); }}><FiSave /> Save All Settings</button>}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
          {/* Settings Card */}
          <div className="ap-card">
            <h4 className="ap-card-title">⚙️ Slider Settings</h4>
            
            <label className="ap-label" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, cursor: 'pointer', margin: '12px 0' }}>
              <input type="checkbox" checked={popupConfig.enabled !== false} onChange={e => handlePopupChange('enabled', e.target.checked)} disabled={!adminData.hasPermission('popup', 'edit')} style={{ width: 18, height: 18, cursor: 'pointer' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#C9D1D9' }}>Enable Popup Modal on Homepage</span>
            </label>

            <label className="ap-label" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, cursor: 'pointer', margin: '12px 0' }}>
              <input type="checkbox" checked={popupConfig.autoSlide !== false} onChange={e => handlePopupChange('autoSlide', e.target.checked)} disabled={!adminData.hasPermission('popup', 'edit')} style={{ width: 18, height: 18, cursor: 'pointer' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#C9D1D9' }}>Auto-Rotate Slides (Slider Animation)</span>
            </label>

            <label className="ap-label">Auto-Slide Speed (Interval)</label>
            <select className="ap-input" value={popupConfig.interval || 4000} onChange={e => handlePopupChange('interval', Number(e.target.value))} disabled={!adminData.hasPermission('popup', 'edit')}>
              <option value={2000}>2 Seconds (Fast)</option>
              <option value={3000}>3 Seconds</option>
              <option value={4000}>4 Seconds (Recommended)</option>
              <option value={5000}>5 Seconds</option>
              <option value={7000}>7 Seconds (Slow)</option>
            </select>

            <label className="ap-label" style={{ marginTop: 12 }}>Click Redirect Link</label>
            <input className="ap-input" value={popupConfig.link || ''} onChange={e => handlePopupChange('link', e.target.value)} placeholder="e.g. /contact or WhatsApp link" disabled={!adminData.hasPermission('popup', 'edit')} />
            <p style={{ color: '#6B7280', fontSize: 11, marginTop: 4 }}>Redirect destination when a slide image is clicked.</p>
          </div>

          {/* Add New Slide Card */}
          <div className="ap-card">
            <h4 className="ap-card-title">➕ Add New Popup Slide Image</h4>
            
            {adminData.hasPermission('popup', 'edit') && (
              <div style={{ marginBottom: 16 }}>
                <input ref={popupFileRef} type="file" accept="image/*" onChange={handlePopupUpload} style={{ display: 'none' }} />
                <button className="ap-btn" onClick={() => popupFileRef.current?.click()} style={{ background: '#1D4ED8', color: '#fff', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, width: '100%', justifyContent: 'center' }}>
                  <FiUpload size={16} /> Upload Image from Device
                </button>
                <p style={{ color: '#6B7280', fontSize: 11, marginTop: 6, textAlign: 'center' }}>Compressed automatically (JPG, PNG, WebP up to 5 MB).</p>
              </div>
            )}

            <label className="ap-label">Or Add Image URL / Cloud Link</label>
            <input className="ap-input" value={newPopupUrl} onChange={e => setNewPopupUrl(e.target.value)} placeholder="e.g. Google Drive link or /images/neet_repeater_banner.jpg" disabled={!adminData.hasPermission('popup', 'edit')} />
            
            <label className="ap-label" style={{ marginTop: 8 }}>Slide Title (Optional)</label>
            <input className="ap-input" value={newPopupTitle} onChange={e => setNewPopupTitle(e.target.value)} placeholder="e.g. NEET 2026 Batch Announcement" disabled={!adminData.hasPermission('popup', 'edit')} />
            
            <label className="ap-label" style={{ marginTop: 8 }}>Click Redirect Link for this Slide</label>
            <input className="ap-input" value={newPopupLink} onChange={e => setNewPopupLink(e.target.value)} placeholder="e.g. /courses, /about, or https://wa.me/..." disabled={!adminData.hasPermission('popup', 'edit')} />

            {adminData.hasPermission('popup', 'edit') && (
              <button type="button" className="ap-btn ap-btn-primary" onClick={(e) => { e.preventDefault(); addPopupImage(newPopupUrl, newPopupTitle, newPopupLink); }} style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
                <FiPlus /> Add Slide Image
              </button>
            )}
          </div>
        </div>

        {/* Active Slides Grid */}
        <div className="ap-card" style={{ marginTop: 20 }}>
          <h4 className="ap-card-title">🖼️ Active Popup Slides ({slides.length})</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginTop: 14 }}>
            {slides.map((slide, idx) => {
              let thumbSrc = slide.url || '';
              if (thumbSrc === '/images/jagannath_rath_yatra.jpg' || thumbSrc === '/images/popup_banner.jpg') thumbSrc = jagannathPosterB64;
              else if (thumbSrc === '/images/neet_repeater_banner.jpg') thumbSrc = neetRepeaterB64;
              else if (thumbSrc === '/images/jee_mains_pyq_banner.jpg') thumbSrc = jeePyqB64;
              else if (!thumbSrc.startsWith('data:')) thumbSrc = getEmbedImageUrl(thumbSrc);

              return (
                <div key={slide.id || idx} style={{ background: '#0D1117', border: '1px solid #30363D', borderRadius: 12, overflow: 'hidden', padding: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ height: 130, borderRadius: 8, overflow: 'hidden', background: '#161B22', position: 'relative' }}>
                    <img
                      src={thumbSrc}
                      alt={slide.title || 'Slide'}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={handleImageError}
                    />
                    <span style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(0,0,0,0.75)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>
                      Slide #{idx + 1}
                    </span>
                  </div>

                  <div>
                    <label style={{ fontSize: 10, color: '#8B949E', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 2 }}>Slide Title</label>
                    <input
                      className="ap-input"
                      value={slide.title || ''}
                      onChange={e => handleSlideFieldChange(slide.id, 'title', e.target.value)}
                      placeholder={`Slide #${idx + 1}`}
                      disabled={!adminData.hasPermission('popup', 'edit')}
                      style={{ fontSize: 12, padding: '5px 8px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 10, color: '#38BDF8', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 2 }}>🔗 Click Link / Location</label>
                    <input
                      className="ap-input"
                      value={slide.link || ''}
                      onChange={e => handleSlideFieldChange(slide.id, 'link', e.target.value)}
                      placeholder="e.g. /courses, /contact"
                      disabled={!adminData.hasPermission('popup', 'edit')}
                      style={{ fontSize: 12, padding: '5px 8px', color: '#38BDF8', borderColor: 'rgba(56, 189, 248, 0.4)' }}
                    />
                  </div>

                  {adminData.hasPermission('popup', 'edit') && slides.length > 1 && (
                    <button className="ap-btn" onClick={() => removePopupImage(slide.id)} style={{ background: '#7F1D1D', color: '#FECDD3', border: 'none', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, width: '100%', marginTop: 2 }}>
                      <FiTrash2 size={12} /> Remove Slide
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {adminData.hasPermission('popup', 'edit') && (
          <button type="button" className="ap-btn ap-btn-primary" onClick={(e) => { e.preventDefault(); savePopupConfig(); }} style={{ marginTop: 20 }}><FiSave /> Save All Settings</button>
        )}
      </div>
    );
  };

  const renderVideoLectures = () => {
    return (
      <div>
        <SectionHeader
          title="Video Lectures & YouTube Series"
          subtitle="Add and manage YouTube lecture links, video thumbnails & course categories"
          action={adminData.hasPermission('videos', 'edit') && (
            <button type="button" className="ap-btn ap-btn-primary" onClick={() => setEditingVideoLecture({ title: '', youtubeUrl: '', category: 'Std 12 Biology', description: '' })}>
              <FiPlus /> Add New Video Lecture
            </button>
          )}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {videoLectures.map((vid, i) => {
            const thumb = getEmbedImageUrl(vid.youtubeUrl || vid.url || '');
            return (
              <div key={vid.id || i} className="ap-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ position: 'relative', width: '100%', height: 170, borderRadius: 12, overflow: 'hidden', background: '#0f172a' }}>
                  <img
                    src={thumb}
                    alt={vid.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={handleImageError}
                  />
                  <a
                    href={vid.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, textDecoration: 'none' }}
                  >
                    <div style={{ width: 54, height: 54, borderRadius: '50%', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(239, 68, 68, 0.6)' }}>
                      ▶
                    </div>
                  </a>
                  <span style={{ position: 'absolute', top: 8, left: 8, background: '#1E293B', color: '#38BDF8', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8, border: '1px solid rgba(56,189,248,0.3)' }}>
                    {vid.category || 'Lecture'}
                  </span>
                </div>

                <div>
                  <h4 style={{ color: '#F8FAFC', fontSize: 15, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.4 }}>{vid.title}</h4>
                  {vid.description && <p style={{ color: '#94A3B8', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{vid.description}</p>}
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                  <a
                    href={vid.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ap-btn"
                    style={{ flex: 1, background: '#1E293B', color: '#38BDF8', border: '1px solid rgba(56,189,248,0.3)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, fontWeight: 600, padding: '8px 12px', borderRadius: 8 }}
                  >
                    <FiExternalLink size={14} /> Watch on YouTube
                  </a>

                  {adminData.hasPermission('videos', 'edit') && (
                    <>
                      <button type="button" className="ap-btn" onClick={() => setEditingVideoLecture({ ...vid, _index: i })} style={{ background: '#334155', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}>
                        <FiEdit2 size={14} />
                      </button>
                      <button type="button" className="ap-btn" onClick={() => delVideoLecture(i)} style={{ background: '#7F1D1D', color: '#FECDD3', border: 'none', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}>
                        <FiTrash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Add / Edit Video Lecture */}
        {editingVideoLecture && (
          <Modal title={editingVideoLecture._index !== undefined ? 'Edit Video Lecture' : 'Add New Video Lecture'} onClose={() => setEditingVideoLecture(null)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="ap-label">YouTube Video / Shorts Link *</label>
                <input
                  className="ap-input"
                  value={editingVideoLecture.youtubeUrl || ''}
                  onChange={e => setEditingVideoLecture(p => ({ ...p, youtubeUrl: e.target.value }))}
                  placeholder="e.g. https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/..."
                />
                <p style={{ color: '#6B7280', fontSize: 11, marginTop: 4 }}>Paste YouTube video URL. Thumbnail will be extracted automatically.</p>
              </div>

              <div>
                <label className="ap-label">Lecture Title *</label>
                <input
                  className="ap-input"
                  value={editingVideoLecture.title || ''}
                  onChange={e => setEditingVideoLecture(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Std 12 Biology - Apomixis & Polyembryony"
                />
              </div>

              <div>
                <label className="ap-label">Subject / Category Tag</label>
                <input
                  className="ap-input"
                  value={editingVideoLecture.category || ''}
                  onChange={e => setEditingVideoLecture(p => ({ ...p, category: e.target.value }))}
                  placeholder="e.g. Std 12 Biology, NEET Physics, Class 10 Board"
                />
              </div>

              <div>
                <label className="ap-label">Description (Optional)</label>
                <textarea
                  className="ap-input"
                  rows={3}
                  value={editingVideoLecture.description || ''}
                  onChange={e => setEditingVideoLecture(p => ({ ...p, description: e.target.value }))}
                  placeholder="Brief summary of topics covered in this lecture video..."
                />
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
                <button type="button" className="ap-btn" onClick={() => setEditingVideoLecture(null)}>Cancel</button>
                <button type="button" className="ap-btn ap-btn-primary" onClick={() => saveVideoLecture(editingVideoLecture)}><FiSave /> Save Lecture</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  // ─── PAGE PHOTOS MANAGER ─────────────────────────────────────────────
  const pageTabs = [
    { key: 'homeClassrooms', label: '🏫 Home: Classrooms & Test Halls' },
    { key: 'homeInfrastructure', label: '🏛️ Home: Campus Infrastructure' },
    { key: 'homeHighlights', label: '🌟 Home: Campus Life Highlights' },
    { key: 'about', label: '🏢 About Us Page' },
    { key: 'courses', label: '📚 Courses Page' },
    { key: 'admission', label: '🎓 Admission Guidance Page' },
    { key: 'studentCorner', label: '💻 Student Corner Page' },
    { key: 'contact', label: '📍 Contact & Location Page' }
  ];

  const savePagePhoto = (form) => {
    if (!form.title.trim()) { showToast('Title is required.', 'error'); return; }
    const curPages = adminData.getData('pageImages') || {};
    const list = [...(curPages[activePageTab] || [])];

    if (form._index !== undefined) {
      list[form._index] = {
        id: form.id || String(Date.now()),
        title: form.title.trim(),
        category: form.category?.trim() || 'General',
        image: form.image || form.url || '',
        desc: form.desc?.trim() || ''
      };
      showToast('Page photo updated successfully!');
    } else {
      list.push({
        id: String(Date.now()),
        title: form.title.trim(),
        category: form.category?.trim() || 'General',
        image: form.image || form.url || '',
        desc: form.desc?.trim() || ''
      });
      showToast('New page photo added!');
    }

    const updatedAllPages = { ...curPages, [activePageTab]: list };
    adminData.setData('pageImages', updatedAllPages);
    setPageImages(updatedAllPages);
    setEditingPagePhoto(null);
  };

  const deletePagePhoto = (index) => {
    if (!window.confirm('Delete this photo?')) return;
    const curPages = adminData.getData('pageImages') || {};
    const list = [...(curPages[activePageTab] || [])];
    list.splice(index, 1);
    const updatedAllPages = { ...curPages, [activePageTab]: list };
    adminData.setData('pageImages', updatedAllPages);
    setPageImages(updatedAllPages);
    showToast('Photo deleted!');
  };

  const renderPagePhotos = () => {
    const curPages = pageImages || {};
    const currentList = curPages[activePageTab] || [];

    const filteredList = currentList.filter(item =>
      (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.desc || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div>
        <SectionHeader
          title="Page Photos Manager"
          subtitle="Manage content-relevant photos for each website page (About, Courses, Admission, Student Corner, Contact)."
          action={
            adminData.hasPermission('pagePhotos', 'edit') && (
              <button className="ap-btn ap-btn-primary" onClick={() => setEditingPagePhoto({ title: '', category: '', image: '', desc: '' })}>
                <FiPlus /> Add Page Photo
              </button>
            )
          }
        />

        <div className="ap-gallery-controls">
          <div className="ap-search-bar" style={{ flex: 1, marginBottom: 0 }}>
            <FiSearch />
            <input placeholder="Search page photos by title, tag, or description..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {/* Page Selector Tabs */}
          <div className="ap-cat-tabs">
            {pageTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActivePageTab(tab.key)}
                className={`ap-cat-tab ${activePageTab === tab.key ? 'active' : ''}`}
              >
                {tab.label} ({(curPages[tab.key] || []).length})
              </button>
            ))}
          </div>
        </div>

        {filteredList.length === 0 ? (
          <EmptyState icon={FiCamera} message={search ? "No matching photos found." : "No photos added for this page yet. Click 'Add Page Photo' to upload one."} />
        ) : (
          <div className="ap-gallery-grid">
            {filteredList.map((item, idx) => {
              const realIdx = currentList.indexOf(item);
              const imgUrl = getEmbedImageUrl(item.image || item.url);

              return (
                <div key={item.id || idx} className="ap-gallery-card">
                  <div className="ap-gallery-thumb" style={{ position: 'relative', overflow: 'hidden' }}>
                    {item.image || item.url ? (
                      <img
                        src={imgUrl}
                        alt={item.title || 'Page Photo'}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={e => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }}
                      />
                    ) : null}
                    <div style={{ display: (item.image || item.url) ? 'none' : 'flex', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', background: '#21262D', color: '#374151', flexDirection: 'column', gap: 8 }}>
                      <FiImage size={32} />
                      <span style={{ fontSize: 11, color: '#6B7280' }}>No image</span>
                    </div>
                    <div className="ap-gallery-thumb-overlay">
                      {(item.image || item.url) && (
                        <button className="ap-gallery-thumb-btn" onClick={() => window.open(imgUrl, '_blank')} title="View Full Photo">
                          <FiEye />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="ap-gallery-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                      <h4 className="ap-gallery-title" style={{ flex: 1 }}>{item.title}</h4>
                      {item.category && <span className="ap-badge ap-badge-purple" style={{ flexShrink: 0 }}>{item.category}</span>}
                    </div>

                    {item.desc && <p style={{ color: '#6B7280', fontSize: 12, margin: '4px 0 8px', lineHeight: 1.4 }}>{item.desc}</p>}

                    <div className="ap-list-actions" style={{ marginTop: 10, pt: 6, borderTop: '1px solid #21262D' }}>
                      {adminData.hasPermission('pagePhotos', 'edit') && (
                        <button className="ap-icon-btn" onClick={() => setEditingPagePhoto({ ...item, _index: realIdx })} title="Edit Photo">
                          <FiEdit2 />
                        </button>
                      )}
                      {adminData.hasPermission('pagePhotos', 'delete') && (
                        <button className="ap-icon-btn ap-icon-btn-danger" onClick={() => deletePagePhoto(realIdx)} title="Delete Photo">
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for Add / Edit Page Photo */}
        {editingPagePhoto && (
          <PagePhotoModal
            item={editingPagePhoto}
            onSave={savePagePhoto}
            onClose={() => setEditingPagePhoto(null)}
          />
        )}
      </div>
    );
  };

  // ─── HERO BANNERS MANAGER ─────────────────────────────────────────────
  const saveHeroBanner = (form) => {
    if (!form.title.trim()) { showToast('Title is required.', 'error'); return; }
    const list = [...(heroBanners || [])];
    const itemObj = {
      id: form.id || 'hb_' + Date.now(),
      title: form.title.trim(),
      highlightWord: form.highlightWord?.trim() || '',
      subtitle: form.subtitle?.trim() || '',
      desc: form.desc?.trim() || '',
      image: form.image || '',
      cardImage: form.cardImage || '',
      buttonText: form.buttonText?.trim() || 'Book Free Counselling',
      buttonLink: form.buttonLink?.trim() || '#inquiry-form'
    };

    if (form._index !== undefined) {
      list[form._index] = itemObj;
      showToast('Hero banner updated!');
    } else {
      list.push(itemObj);
      showToast('New hero banner added!');
    }

    adminData.setData('heroBanners', list);
    setHeroBanners(list);
    setEditingHeroBanner(null);
  };

  const deleteHeroBanner = (index) => {
    if (!window.confirm('Delete this hero banner slide?')) return;
    const list = [...(heroBanners || [])];
    list.splice(index, 1);
    adminData.setData('heroBanners', list);
    setHeroBanners(list);
    showToast('Hero banner slide deleted!');
  };

  const moveHeroBanner = (index, direction) => {
    const list = [...(heroBanners || [])];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    adminData.setData('heroBanners', list);
    setHeroBanners(list);
    showToast('Slide order updated!');
  };

  const renderHeroBanners = () => {
    const list = heroBanners || [];
    const filteredList = list.filter(item =>
      (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.subtitle || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.desc || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div>
        <SectionHeader
          title="Hero Banners Manager"
          subtitle="Manage, reorder, add, and edit the main homepage hero banner carousel slides."
          action={
            adminData.hasPermission('heroBanners', 'edit') && (
              <button className="ap-btn ap-btn-primary" onClick={() => setEditingHeroBanner({ title: '', highlightWord: '', subtitle: '', desc: '', image: '', cardImage: '', buttonText: 'Book Free Counselling', buttonLink: '#inquiry-form' })}>
                <FiPlus /> Add Hero Banner
              </button>
            )
          }
        />

        <div className="ap-search-bar">
          <FiSearch />
          <input placeholder="Search hero banners..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {filteredList.length === 0 ? (
          <EmptyState icon={FiLayers} message={search ? "No matching hero banners." : "No hero banners added yet."} />
        ) : (
          <div className="ap-list">
            {filteredList.map((item, idx) => {
              const realIdx = list.indexOf(item);
              const imgUrl = getEmbedImageUrl(item.image);

              return (
                <div key={item.id || idx} className="ap-list-card" style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 120, height: 75, borderRadius: 12, overflow: 'hidden', background: '#21262D', position: 'relative', border: '1px solid #30363D' }}>
                    {item.image ? (
                      <img src={imgUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                    ) : (
                      <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyCenter: 'center', color: '#6B7280' }}>
                        <FiImage size={24} />
                      </div>
                    )}
                    <span style={{ position: 'absolute', top: 4, left: 4, background: 'rgba(15,23,42,0.85)', color: '#38BDF8', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4 }}>
                      #{realIdx + 1}
                    </span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <h4 style={{ color: '#F0F6FC', fontWeight: 800, fontSize: 15, margin: 0 }}>{item.title}</h4>
                      {item.highlightWord && (
                        <span className="ap-badge ap-badge-red" style={{ fontSize: 10 }}>Highlight: "{item.highlightWord}"</span>
                      )}
                    </div>
                    {item.subtitle && <p style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 700, margin: '2px 0 4px' }}>{item.subtitle}</p>}
                    {item.desc && <p style={{ color: '#8B949E', fontSize: 12, margin: 0, lineHeight: 1.4 }} className="line-clamp-2">{item.desc}</p>}
                  </div>

                  <div className="ap-list-actions" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button className="ap-icon-btn" onClick={() => moveHeroBanner(realIdx, -1)} disabled={realIdx === 0} title="Move Up">
                      ↑
                    </button>
                    <button className="ap-icon-btn" onClick={() => moveHeroBanner(realIdx, 1)} disabled={realIdx === list.length - 1} title="Move Down">
                      ↓
                    </button>
                    {adminData.hasPermission('heroBanners', 'edit') && (
                      <button className="ap-icon-btn" onClick={() => setEditingHeroBanner({ ...item, _index: realIdx })} title="Edit Banner">
                        <FiEdit2 />
                      </button>
                    )}
                    {adminData.hasPermission('heroBanners', 'delete') && (
                      <button className="ap-icon-btn ap-icon-btn-danger" onClick={() => deleteHeroBanner(realIdx)} title="Delete Banner">
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {editingHeroBanner && (
          <HeroBannerModal
            item={editingHeroBanner}
            onSave={saveHeroBanner}
            onClose={() => setEditingHeroBanner(null)}
          />
        )}
      </div>
    );
  };

  // ─── PARTNER SCHOOLS MANAGER ─────────────────────────────────────────────
  const renderPartnerSchools = () => {
    const list = partnerSchools || [];
    const filteredList = list.filter(item =>
      (item.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.address || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.medium || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.standards || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div>
        <SectionHeader
          title="Partner Schools Manager"
          subtitle="Manage campus partner schools, school building photos, medium, standards, location maps, and contact phone numbers."
          action={
            adminData.hasPermission('partnerSchools', 'edit') && (
              <button className="ap-btn ap-btn-primary" onClick={() => setEditingPartnerSchool({ name: '', medium: 'English Medium', standards: '', address: '', mapUrl: '', contact: '', image: '', description: '' })}>
                <FiPlus /> Add Partner School
              </button>
            )
          }
        />
        <div className="ap-search-bar">
          <FiSearch />
          <input placeholder="Search partner schools by name, address, or standards..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {filteredList.length === 0 ? <EmptyState icon={FiBookOpen} message="No partner schools found." /> : (
          <div className="ap-table-wrap">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order</th>
                  <th>School Photo</th>
                  <th>School Name</th>
                  <th>Medium & Standards</th>
                  <th>Address (Clickable Map)</th>
                  <th>Contact (Clickable Call)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((s, i) => {
                  const realIdx = list.indexOf(s);
                  const imgUrl = getEmbedImageUrl(s.image);
                  return (
                    <tr key={i}>
                      <td style={{ color: '#6B7280' }}>{i + 1}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 2 }}>
                          <button className="ap-icon-btn" disabled={realIdx === 0} onClick={() => movePartnerSchool(realIdx, -1)} title="Move Up">↑</button>
                          <button className="ap-icon-btn" disabled={realIdx === list.length - 1} onClick={() => movePartnerSchool(realIdx, 1)} title="Move Down">↓</button>
                        </div>
                      </td>
                      <td>
                        <div style={{ width: 56, height: 40, borderRadius: 8, overflow: 'hidden', background: '#21262D', border: '1px solid #30363D' }}>
                          <img src={imgUrl || '/images/bg-about-hero.png'} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.src = '/images/bg-about-hero.png'; }} />
                        </div>
                      </td>
                      <td><strong style={{ color: '#F0F6FC' }}>🏫 {s.name}</strong></td>
                      <td>
                        <div>
                          <span className="ap-badge ap-badge-blue" style={{ fontSize: 10 }}>{s.medium || 'Partner School'}</span>
                          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{s.standards}</div>
                        </div>
                      </td>
                      <td>
                        <a href={s.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(s.name)}`} target="_blank" rel="noreferrer" style={{ color: '#60A5FA', fontSize: 12, textDecoration: 'underline' }}>
                          📍 {s.address || 'View Location Map'}
                        </a>
                      </td>
                      <td>
                        <a href={`tel:${(s.contact || '').replace(/\s+/g, '')}`} style={{ color: '#34D399', fontSize: 12, fontWeight: 700 }}>
                          📞 {s.contact || 'N/A'}
                        </a>
                      </td>
                      <td>
                        <div className="ap-list-actions">
                          {adminData.hasPermission('partnerSchools', 'edit') && (
                            <button className="ap-icon-btn" onClick={() => setEditingPartnerSchool({ ...s, _index: realIdx })}><FiEdit2 /></button>
                          )}
                          {adminData.hasPermission('partnerSchools', 'delete') && (
                            <button className="ap-icon-btn ap-icon-btn-danger" onClick={() => delPartnerSchool(realIdx)}><FiTrash2 /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {editingPartnerSchool && <PartnerSchoolModal item={editingPartnerSchool} onSave={savePartnerSchool} onClose={() => setEditingPartnerSchool(null)} />}
      </div>
    );
  };

  // ─── SCHOOL PHOTOS ──────────────────────────────────────────────────────
  const saveSchoolPhoto = (form) => {
    if (!form.title.trim() || !form.image.trim()) {
      showToast('Photo title and image are required.', 'error');
      return;
    }
    const currentList = adminData.getData('schoolPhotos') || [];
    let updatedList = [];

    if (form._index !== undefined) {
      updatedList = [...currentList];
      updatedList[form._index] = {
        id: form.id || `sp_${Date.now()}`,
        schoolName: form.schoolName || partnerSchools[0]?.name || 'Royal School',
        title: form.title.trim(),
        category: form.category?.trim() || 'Classrooms',
        image: form.image || '',
        desc: form.desc?.trim() || ''
      };
      showToast('School photo updated successfully!');
    } else {
      const newPhoto = {
        id: `sp_${Date.now()}`,
        schoolName: form.schoolName || partnerSchools[0]?.name || 'Royal School',
        title: form.title.trim(),
        category: form.category?.trim() || 'Classrooms',
        image: form.image || '',
        desc: form.desc?.trim() || ''
      };
      updatedList = [newPhoto, ...currentList];
      showToast('New school photo added successfully!');
    }

    setSchoolPhotos(updatedList);
    adminData.setData('schoolPhotos', updatedList);
    setEditingSchoolPhoto(null);
  };

  const delSchoolPhoto = (index) => {
    if (!window.confirm('Delete this school photo?')) return;
    const currentList = adminData.getData('schoolPhotos') || [];
    const updatedList = currentList.filter((_, i) => i !== index);
    setSchoolPhotos(updatedList);
    adminData.setData('schoolPhotos', updatedList);
    showToast('School photo deleted.', 'error');
  };

  const renderSchoolPhotos = () => {
    const list = schoolPhotos;
    const filtered = list.filter(p => {
      const matchSearch = (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
                          (p.schoolName || '').toLowerCase().includes(search.toLowerCase()) ||
                          (p.category || '').toLowerCase().includes(search.toLowerCase());
      const matchSchool = schoolPhotoFilter === 'All' || (p.schoolName || '').toLowerCase() === schoolPhotoFilter.toLowerCase();
      return matchSearch && matchSchool;
    });

    const schoolsList = ['All', ...partnerSchools.map(s => s.name)];

    return (
      <div>
        <SectionHeader
          title="School Pages Photo Gallery Manager"
          subtitle="Add, edit & delete photos for individual partner school pages (Royal School, Raghukul Vidyalay, New Heaven Vidyalaya)."
          action={
            adminData.hasPermission('schoolPhotos', 'edit') && (
              <button
                className="ap-btn ap-btn-primary"
                onClick={() => setEditingSchoolPhoto({ schoolName: partnerSchools[0]?.name || 'Royal School', title: '', category: 'Classrooms', image: '', desc: '' })}
              >
                <FiPlus /> Add School Photo
              </button>
            )
          }
        />

        {/* Filter Pills & Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 20 }}>
          <div className="ap-search-bar" style={{ flex: 1, minWidth: 260, marginBottom: 0 }}>
            <FiSearch />
            <input
              placeholder="Search by photo title, school name, category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {schoolsList.map(sch => (
              <button
                key={sch}
                onClick={() => setSchoolPhotoFilter(sch)}
                className={`ap-btn ${schoolPhotoFilter === sch ? 'ap-btn-primary' : 'ap-btn-secondary'}`}
                style={{ fontSize: 12, padding: '6px 14px', borderRadius: 20 }}
              >
                🏫 {sch}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Grid Cards */}
        {filtered.length === 0 ? (
          <EmptyState icon={FiCamera} message="No school photos found. Click 'Add School Photo' to upload one!" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {filtered.map((item) => {
              const realIdx = list.indexOf(item);
              return (
                <div key={item.id || realIdx} className="ap-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: 180, background: '#0F172A', overflow: 'hidden' }}>
                    <img
                      src={getEmbedImageUrl(item.image)}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/images/hero-classroom.png'; }}
                    />
                    <span style={{
                      position: 'absolute', top: 10, left: 10,
                      background: 'rgba(0,0,0,0.85)', color: '#60A5FA',
                      fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      🏫 {item.schoolName}
                    </span>
                    <span style={{
                      position: 'absolute', bottom: 10, right: 10,
                      background: '#10B981', color: '#fff',
                      fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6
                    }}>
                      {item.category || 'Premises'}
                    </span>
                  </div>

                  <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#F3F4F6' }}>{item.title}</h4>
                      <p style={{ margin: '6px 0 0 0', fontSize: 12, color: '#9CA3AF', lineHeight: 1.4 }}>{item.desc || 'No description'}</p>
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginTop: 14, paddingTop: 10, borderTop: '1px solid #1F2937' }}>
                      {adminData.hasPermission('schoolPhotos', 'edit') && (
                        <button
                          className="ap-btn ap-btn-secondary"
                          style={{ flex: 1, fontSize: 12, padding: '6px 10px' }}
                          onClick={() => setEditingSchoolPhoto({ ...item, _index: realIdx })}
                        >
                          <FiEdit2 /> Edit
                        </button>
                      )}
                      {adminData.hasPermission('schoolPhotos', 'delete') && (
                        <button
                          className="ap-btn ap-btn-danger"
                          style={{ fontSize: 12, padding: '6px 10px' }}
                          onClick={() => delSchoolPhoto(realIdx)}
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {editingSchoolPhoto && (
          <SchoolPhotoModal
            item={editingSchoolPhoto}
            schools={partnerSchools}
            onSave={saveSchoolPhoto}
            onClose={() => setEditingSchoolPhoto(null)}
          />
        )}
      </div>
    );
  };

  // ─── ALL PHOTOS & MEDIA MASTER TAB ────────────────────────────────────
  const renderAllPhotos = () => {
    const totalCount = (schoolPhotos.length || 0) + (gallery.length || 0) + (heroBanners.length || 0);

    const photoSubTabs = [
      { key: 'schoolPhotos', label: '🏫 School Pages Photos', badge: schoolPhotos.length },
      { key: 'gallery',      label: '📸 Main Campus Gallery', badge: gallery.length },
      { key: 'pagePhotos',   label: '🖼️ Website Page Photos' },
      { key: 'heroBanners',  label: '🎆 Hero Banners', badge: heroBanners.length },
      { key: 'popup',        label: '🌟 Promo Popup Banners', badge: popupConfig.images?.length || 1 }
    ];

    return (
      <div>
        <SectionHeader
          title="All Photos & Media Manager"
          subtitle={`Centralized photo management hub for all website images (${totalCount} total media items).`}
        />

        {/* Master Sub-Navigation Bar */}
        <div style={{
          display: 'flex', gap: 8, overflowX: 'auto', padding: '6px',
          background: '#0F172A', borderRadius: 16, border: '1px solid #1E293B',
          marginBottom: 24
        }}>
          {photoSubTabs.map(tab => {
            const isActive = activePhotoSubTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActivePhotoSubTab(tab.key)}
                style={{
                  padding: '10px 18px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                  border: isActive ? '1px solid #388BFD' : '1px solid transparent',
                  background: isActive ? '#1F6FEB' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span style={{
                    background: isActive ? 'rgba(255,255,255,0.25)' : '#1E293B',
                    color: isActive ? '#FFFFFF' : '#CBD5E1',
                    fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 10
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Render Selected Sub-Tab Content */}
        {activePhotoSubTab === 'schoolPhotos' && renderSchoolPhotos()}
        {activePhotoSubTab === 'gallery' && renderGallery()}
        {activePhotoSubTab === 'pagePhotos' && renderPagePhotos()}
        {activePhotoSubTab === 'heroBanners' && renderHeroBanners()}
        {activePhotoSubTab === 'popup' && renderPopup()}
      </div>
    );
  };

  const renderSection = () => {
    if (activeSection !== 'dashboard' && activeSection !== 'settings' && !adminData.hasPermission(activeSection)) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#EF4444', textAlign: 'center', padding: 40 }}>
          <FiAlertTriangle size={56} style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px', color: '#fff' }}>Access Denied</h3>
          <p style={{ color: '#6B7280', fontSize: 14, maxWidth: 360, lineHeight: 1.6, margin: 0 }}>
            Your account does not have permission to view or edit this section. Please contact your administrator.
          </p>
        </div>
      );
    }
    switch (activeSection) {
      case 'dashboard':     return renderDashboard();
      case 'allPhotos':     return renderAllPhotos();
      case 'heroBanners':   return renderHeroBanners();
      case 'partnerSchools':return renderPartnerSchools();
      case 'schoolPhotos':  return renderSchoolPhotos();
      case 'announcements': return renderAnnouncements();
      case 'results':       return renderResults();
      case 'gallery':       return renderGallery();
      case 'testimonials':  return renderTestimonials();
      case 'courses':       return renderCourses();
      case 'stats':         return renderStats();
      case 'features':      return renderFeatures();
      case 'contactInfo':   return renderContact();
      case 'pagePhotos':    return renderPagePhotos();
      case 'inquiries':     return renderInquiries();
      case 'popup':         return renderPopup();
      case 'videos':        return renderVideoLectures();
      case 'settings':      return renderSettings();
      default:              return renderDashboard();
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // MAIN LAYOUT
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div className="ap-root">
      <style>{CSS}</style>

      {/* Toast Container */}
      <div className="ap-toast-stack">
        {toasts.map(t => <Toast key={t.id} message={t.msg} type={t.type} onClose={() => removeToast(t.id)} />)}
      </div>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && <div className="ap-overlay-bg" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`ap-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="ap-sidebar-top">
          <img src="/images/logo-white.png" alt="Noble Education" className="ap-sidebar-logo" />
          <div className="ap-sidebar-badge">Admin</div>
        </div>
        <nav className="ap-sidebar-nav">
          {navItems.filter(item => adminData.hasPermission(item.key)).map(item => {
            const Icon = item.icon;
            const active = activeSection === item.key;
            return (
              <button
                key={item.key}
                className={`ap-nav-btn ${active ? 'active' : ''}`}
                onClick={() => navigate(item.key)}
                style={active ? { '--nav-color': item.color } : {}}
              >
                <span className="ap-nav-icon" style={{ color: active ? item.color : undefined }}><Icon size={18} /></span>
                <span className="ap-nav-label">{item.label}</span>
                {item.badge > 0 && <span className="ap-nav-badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>
        <div className="ap-sidebar-bottom">
          <a href="/" target="_blank" rel="noopener noreferrer" className="ap-nav-btn">
            <span className="ap-nav-icon"><FiExternalLink size={18} /></span>
            <span className="ap-nav-label">View Website</span>
          </a>
          <button className="ap-nav-btn ap-nav-logout" onClick={handleLogout}>
            <span className="ap-nav-icon"><FiLogOut size={18} /></span>
            <span className="ap-nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="ap-main">
        {/* Top Bar */}
        <header className="ap-topbar">
          <button className="ap-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <div className="ap-topbar-title">
            {currentNav && <currentNav.icon size={18} style={{ color: currentNav.color }} />}
            <span>{currentNav?.label || 'Dashboard'}</span>
          </div>
          <div className="ap-topbar-right">
            <a href="/" target="_blank" rel="noopener noreferrer" className="ap-topbar-link"><FiExternalLink size={16} /> Website</a>
          </div>
        </header>

        {/* Content */}
        <main className="ap-content">
          {renderSection()}
        </main>
      </div>

      {editingUser && (
        <UserModal 
          user={editingUser} 
          navItems={navItems}
          onSave={(savedUser) => {
            let updated;
            if (savedUser.id) {
              updated = users.map(u => u.id === savedUser.id ? savedUser : u);
              showToast('User updated successfully!');
            } else {
              const newUser = {
                ...savedUser,
                id: String(Date.now())
              };
              updated = [...users, newUser];
              showToast('User created successfully!');
            }
            adminData.saveUsers(updated);
            setUsers(updated);
            setEditingUser(null);
          }} 
          onClose={() => setEditingUser(null)} 
        />
      )}
    </div>
  );
}

// ─── USER ROLES & PERMISSIONS EDITING MODAL ──────────────────────────────────────
function UserModal({ user, navItems, onSave, onClose }) {
  const [form, setForm] = useState({
    id: user.id,
    username: user.username || '',
    password: user.password || '',
    role: user.role || 'staff',
    permissions: user.permissions || ['dashboard']
  });

  const togglePermissionAction = (key, action) => {
    const perm = `${key}:${action}`;
    setForm(prev => {
      let perms = prev.permissions.includes(perm)
        ? prev.permissions.filter(p => p !== perm)
        : [...prev.permissions, perm];
      
      // Auto-enable view if editing or deleting is checked
      if ((action === 'edit' || action === 'delete') && !perms.includes(`${key}:view`)) {
        perms.push(`${key}:view`);
      }
      // Auto-disable editing/deleting if view is unchecked
      if (action === 'view' && !perms.includes(`${key}:view`)) {
        perms = perms.filter(p => p !== `${key}:edit` && p !== `${key}:delete`);
      }

      return { ...prev, permissions: perms };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      alert('Username and password are required');
      return;
    }
    onSave(form);
  };

  return (
    <Modal title={user.id ? 'Edit User & Permissions' : 'Add New User'} onClose={onClose} wide={true}>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label className="ap-label">Username</label>
            <input 
              className="ap-input" 
              value={form.username} 
              onChange={e => setForm({ ...form, username: e.target.value })} 
              disabled={user.username === 'admin'}
              required 
              placeholder="e.g. jame.smith"
              style={{ marginBottom: 4 }}
            />
          </div>
          <div>
            <label className="ap-label">Password</label>
            <input 
              className="ap-input" 
              type="text"
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })} 
              required 
              placeholder="Enter user password"
              style={{ marginBottom: 4 }}
            />
          </div>
        </div>

        <label className="ap-label" style={{ marginTop: 12 }}>Role Type</label>
        <select 
          className="ap-input ap-select" 
          value={form.role} 
          onChange={e => setForm({ ...form, role: e.target.value })}
          disabled={user.username === 'admin'}
          style={{ marginBottom: 4 }}
        >
          <option value="staff">Staff (Limited Access)</option>
          <option value="editor">Editor (Content Manager)</option>
          <option value="superadmin">Super Admin (Full Access)</option>
        </select>

        {form.role !== 'superadmin' && (
          <>
            <label className="ap-label" style={{ marginTop: 18, marginBottom: 8 }}>Granted Page Permissions & Actions</label>
            <div style={{ background: '#0D1117', padding: '12px 16px', borderRadius: 12, border: '1px solid #21262D' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 10, paddingBottom: 8, borderBottom: '1px solid #21262D', marginBottom: 8, fontSize: 10, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span>Feature / Page</span>
                <span style={{ textAlign: 'center' }}>View</span>
                <span style={{ textAlign: 'center' }}>Edit / Add</span>
                <span style={{ textAlign: 'center' }}>Delete</span>
              </div>
              {navItems.filter(n => n.key !== 'dashboard' && n.key !== 'settings').map(n => {
                const hasView = form.permissions.includes(`${n.key}:view`);
                const hasEdit = form.permissions.includes(`${n.key}:edit`);
                const hasDelete = form.permissions.includes(`${n.key}:delete`);

                return (
                  <div key={n.key} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #21262D44', fontSize: 13, color: '#C9D1D9' }}>
                    <span style={{ fontWeight: 600 }}>{n.label}</span>
                    <input 
                      type="checkbox" 
                      checked={hasView} 
                      onChange={() => togglePermissionAction(n.key, 'view')} 
                      style={{ justifySelf: 'center', cursor: 'pointer', width: 15, height: 15 }} 
                    />
                    <input 
                      type="checkbox" 
                      checked={hasEdit} 
                      onChange={() => togglePermissionAction(n.key, 'edit')} 
                      style={{ justifySelf: 'center', cursor: 'pointer', width: 15, height: 15 }} 
                    />
                    <input 
                      type="checkbox" 
                      checked={hasDelete} 
                      onChange={() => togglePermissionAction(n.key, 'delete')} 
                      style={{ justifySelf: 'center', cursor: 'pointer', width: 15, height: 15 }} 
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}

        <button type="submit" className="ap-btn ap-btn-primary ap-btn-block" style={{ marginTop: 24 }}>
          <FiSave /> Save User & Permissions
        </button>
      </form>
    </Modal>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODAL FORMS
// ═══════════════════════════════════════════════════════════════════════════

function PagePhotoModal({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    title: item.title || '',
    category: item.category || '',
    image: item.image || item.url || '',
    desc: item.desc || '',
    _index: item._index
  });
  const [uploadMode, setUploadMode] = useState('url');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height;
          const MAX = 900;
          if (w > h ? w > MAX : h > MAX) {
            if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
            else { w = Math.round(w * MAX / h); h = MAX; }
          }
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          const data = canvas.toDataURL('image/jpeg', 0.75);
          setForm(p => ({ ...p, image: data }));
          setIsProcessing(false);
        } catch { setIsProcessing(false); }
      };
      img.onerror = () => setIsProcessing(false);
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal title={item._index !== undefined ? 'Edit Page Photo' : 'Add Page Photo'} onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label className="ap-label">Photo Title *</label>
          <input
            className="ap-input"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Science Lab & Theory Desk"
            autoFocus
          />
        </div>

        <div>
          <label className="ap-label">Category / Badge Tag</label>
          <input
            className="ap-input"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            placeholder="e.g. Premises, Science, Counseling, Study, Campus"
          />
        </div>

        <div>
          <label className="ap-label">Short Description</label>
          <input
            className="ap-input"
            value={form.desc}
            onChange={e => setForm({ ...form, desc: e.target.value })}
            placeholder="Brief explanation of this photo..."
          />
        </div>

        <div>
          <label className="ap-label">Photo Source</label>
          <div className="ap-toggle-row">
            <button type="button" className={`ap-toggle-btn ${uploadMode === 'url' ? 'active' : ''}`} onClick={() => setUploadMode('url')}>
              <FiLink /> External URL / Link
            </button>
            <button type="button" className={`ap-toggle-btn ${uploadMode === 'file' ? 'active' : ''}`} onClick={() => setUploadMode('file')}>
              <FiCamera /> Upload Device Photo
            </button>
          </div>

          {uploadMode === 'url' ? (
            <UrlImageInput value={form.image} onChange={url => setForm({ ...form, image: url })} />
          ) : (
            <div style={{ marginTop: 12 }}>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              <button type="button" className="ap-btn ap-btn-secondary" style={{ width: '100%' }} onClick={() => fileRef.current?.click()} disabled={isProcessing}>
                <FiUpload /> {isProcessing ? 'Compressing...' : 'Choose Photo from Device'}
              </button>
            </div>
          )}

          {form.image && (
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <p style={{ color: '#6B7280', fontSize: 11, marginBottom: 6 }}>Photo Preview:</p>
              <img src={getEmbedImageUrl(form.image)} alt="Preview" style={{ maxHeight: 160, maxWidth: '100%', borderRadius: 12, border: '1px solid #30363D', objectFit: 'contain' }} onError={handleImageError} />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
          <button type="button" className="ap-btn" onClick={onClose}>Cancel</button>
          <button type="button" className="ap-btn ap-btn-primary" onClick={() => onSave(form)}><FiSave /> Save Photo</button>
        </div>
      </div>
    </Modal>
  );
}

function AnnouncementModal({ item, onSave, onClose }) {
  const [form, setForm] = useState({ emoji: item.emoji || '📢', text: item.text || '', _index: item._index });
  return (
    <Modal title={item._index !== undefined ? 'Edit Announcement' : 'Add Announcement'} onClose={onClose}>
      <label className="ap-label">Emoji</label>
      <input className="ap-input" value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} placeholder="📢" />
      <label className="ap-label">Announcement Text</label>
      <input className="ap-input" value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="e.g. Admissions open for 2025-26 batch!" autoFocus />
      <p style={{ color: '#6B7280', fontSize: 12, margin: '6px 0 0' }}>This text will scroll in the announcement ticker bar.</p>
      <button className="ap-btn ap-btn-primary ap-btn-block" onClick={() => onSave(form)} style={{ marginTop: 20 }}><FiSave /> Save Announcement</button>
    </Modal>
  );
}

function ResultModal({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    name: item.name || '',
    score: item.score || '',
    exam: item.exam || '',
    branch: item.branch || '',
    school: item.school || '',
    image: item.image || '',
    status: item.status || '',
    _index: item._index
  });
  return (
    <Modal title={item._index !== undefined ? 'Edit Result' : 'Add Student Result'} onClose={onClose} wide>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label className="ap-label">Student Name *</label>
            <input className="ap-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Shital Kumavat" autoFocus />
          </div>
          <div>
            <label className="ap-label">Partner School Name</label>
            <input className="ap-input" value={form.school} onChange={e => setForm({ ...form, school: e.target.value })} placeholder="e.g. Bright Day School, Vadodara" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label className="ap-label">Score / Percentile *</label>
            <input className="ap-input" value={form.score} onChange={e => setForm({ ...form, score: e.target.value })} placeholder="e.g. 99.60 PR or 10.0 SPI" />
          </div>
          <div>
            <label className="ap-label">Exam / Board Name</label>
            <input className="ap-input" value={form.exam} onChange={e => setForm({ ...form, exam: e.target.value })} placeholder="e.g. SSC Board 2025 / NEET 2025" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label className="ap-label">Branch / Stream Tag</label>
            <input className="ap-input" value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })} placeholder="e.g. 10th Standard Topper / A-Group" />
          </div>
          <div>
            <label className="ap-label">Achievement Status</label>
            <input className="ap-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} placeholder="e.g. A1-Grade Performer" />
          </div>
        </div>

        <div>
          <label className="ap-label">Student Photo (Upload or Paste Drive/Web URL)</label>
          <UrlImageInput
            value={form.image}
            onChange={url => setForm({ ...form, image: url })}
          />
        </div>

        <button className="ap-btn ap-btn-primary ap-btn-block" onClick={() => onSave(form)} style={{ marginTop: 14 }}><FiSave /> Save Result</button>
      </div>
    </Modal>
  );
}

function PartnerSchoolModal({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    name: item.name || '',
    medium: item.medium || 'English Medium',
    standards: item.standards || '',
    address: item.address || '',
    mapUrl: item.mapUrl || '',
    contact: item.contact || '',
    image: item.image || '',
    description: item.description || '',
    _index: item._index
  });
  return (
    <Modal title={item._index !== undefined ? 'Edit Partner School' : 'Add Partner School'} onClose={onClose} wide>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label className="ap-label">Partner School Name *</label>
            <input className="ap-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Royal School" autoFocus />
          </div>
          <div>
            <label className="ap-label">Medium / Tag</label>
            <input className="ap-input" value={form.medium} onChange={e => setForm({ ...form, medium: e.target.value })} placeholder="e.g. English Medium / GSEB" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label className="ap-label">Standards Supported</label>
            <input className="ap-input" value={form.standards} onChange={e => setForm({ ...form, standards: e.target.value })} placeholder="e.g. Standards 8, 9, 10, 11 and 12 Science" />
          </div>
          <div>
            <label className="ap-label">Contact Number (Click to Call Link)</label>
            <input className="ap-input" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} placeholder="e.g. 96382 56222" />
          </div>
        </div>

        <div>
          <label className="ap-label">School Building / Campus Photo (Upload or Paste Drive/Web Image URL)</label>
          <UrlImageInput
            value={form.image}
            onChange={url => setForm({ ...form, image: url })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label className="ap-label">Location Address (Clickable Map Link)</label>
            <input className="ap-input" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="e.g. Kamla Nagar Lake Road, Ajwa Road, Vadodara" />
          </div>
          <div>
            <label className="ap-label">Google Maps Link URL</label>
            <input className="ap-input" value={form.mapUrl} onChange={e => setForm({ ...form, mapUrl: e.target.value })} placeholder="https://maps.google.com/?q=..." />
          </div>
        </div>

        <div>
          <label className="ap-label">Description</label>
          <textarea className="ap-input" style={{ height: 60 }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short summary of integrated tuition & coaching features..." />
        </div>

        <button className="ap-btn ap-btn-primary ap-btn-block" onClick={() => onSave(form)} style={{ marginTop: 14 }}><FiSave /> Save Partner School</button>
      </div>
    </Modal>
  );
}

// ─── Smart URL converter – handles Google Drive, Dropbox, OneDrive ────────────
// Delegates to the shared imageUrl utility for consistency
function convertToEmbedUrl(raw) {
  return getEmbedImageUrl(raw);
}

// Detect what kind of URL the user pasted
function detectUrlType(url) {
  const source = detectImageUrlSource(url);
  return source;
}

// ─── URL Input sub-component ──────────────────────────────────────────────────
function UrlImageInput({ value, onChange }) {
  const [raw, setRaw] = useState(value || '');
  const type = detectUrlType(raw);
  const converted = convertToEmbedUrl(raw);
  const isConverted = converted !== raw && raw.length > 0;

  const handleChange = (e) => {
    const v = e.target.value;
    setRaw(v);
    onChange(convertToEmbedUrl(v));
  };

  const TYPE_LABELS = {
    googledrive: { label: '✅ Google Drive detected — link auto-converted!', color: '#10B981', bg: '#064E3B22' },
    dropbox:     { label: '✅ Dropbox detected — link auto-converted!', color: '#10B981', bg: '#064E3B22' },
    onedrive:    { label: '✅ OneDrive detected — link auto-converted!', color: '#10B981', bg: '#064E3B22' },
    direct:      { label: '✅ Direct image URL — ready to use', color: '#10B981', bg: '#064E3B22' },
    unknown:     { label: '⚠️ Unrecognised URL — preview below to check if it loads', color: '#F59E0B', bg: '#78350F22' },
  };

  const badge = raw.length > 10 && type ? TYPE_LABELS[type] : null;

  return (
    <div style={{ marginTop: 12 }}>
      <input
        className="ap-input"
        value={raw}
        onChange={handleChange}
        placeholder="Paste any image URL — Google Drive, Dropbox, Imgur, direct .jpg link…"
      />

      {badge && (
        <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 10, background: badge.bg, border: `1px solid ${badge.color}33`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: badge.color, fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>{badge.label}</span>
        </div>
      )}

      {isConverted && (
        <details style={{ marginTop: 6 }}>
          <summary style={{ color: '#6B7280', fontSize: 11, cursor: 'pointer' }}>View converted embed URL</summary>
          <code style={{ display: 'block', fontSize: 10, wordBreak: 'break-all', color: '#9CA3AF', background: '#161B22', padding: '6px 10px', borderRadius: 8, marginTop: 4 }}>{converted}</code>
        </details>
      )}

      <p style={{ color: '#6B7280', fontSize: 11, marginTop: 8, lineHeight: 1.6 }}>
        ✅ Supported: <strong style={{ color: '#9CA3AF' }}>Google Drive</strong>, Dropbox, OneDrive, Imgur, Imgbb, Cloudinary, PostImages, direct .jpg/.png links<br />
        ⚠️ Google Drive: file must be shared as <strong style={{ color: '#9CA3AF' }}>"Anyone with the link"</strong>
      </p>
    </div>
  );
}

function GalleryModal({ item, onSave, onClose }) {
  const [form, setForm] = useState({ title: item.title || '', category: item.category || 'Classrooms', image: item.image || '', _index: item._index });
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'url'
  const [errorMsg, setErrorMsg] = useState('');
  const fileRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    setIsProcessing(true); setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height;
          const MAX = 900;
          if (w > h ? w > MAX : h > MAX) {
            if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
            else { w = Math.round(w * MAX / h); h = MAX; }
          }
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          const data = canvas.toDataURL('image/jpeg', 0.75);
          const kb = Math.round(data.length * 3 / 4 / 1024);
          if (kb > 150) {
            const c2 = document.createElement('canvas');
            c2.width = w * 0.7; c2.height = h * 0.7;
            c2.getContext('2d').drawImage(canvas, 0, 0, c2.width, c2.height);
            setForm(p => ({ ...p, image: c2.toDataURL('image/jpeg', 0.6) }));
          } else {
            setForm(p => ({ ...p, image: data }));
          }
          setIsProcessing(false);
        } catch { setErrorMsg('Failed to process image.'); setIsProcessing(false); }
      };
      img.onerror = () => { setErrorMsg('Could not load image.'); setIsProcessing(false); };
      img.src = ev.target.result;
    };
    reader.onerror = () => { setErrorMsg('Could not read file.'); setIsProcessing(false); };
    reader.readAsDataURL(file);
  };

  return (
    <Modal title={item._index !== undefined ? 'Edit Gallery Photo' : 'Add Gallery Photo'} onClose={onClose}>
      <label className="ap-label">Photo Title</label>
      <input className="ap-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Smart Classroom Session" autoFocus />
      <label className="ap-label">Category</label>
      <select className="ap-input ap-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
        {GALLERY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <label className="ap-label">Image Source</label>
      <div className="ap-toggle-row">
        <button type="button" className={`ap-toggle-btn ${uploadMode === 'file' ? 'active' : ''}`} onClick={() => setUploadMode('file')}>
          <FiCamera /> Upload File
        </button>
        <button type="button" className={`ap-toggle-btn ${uploadMode === 'url' ? 'active' : ''}`} onClick={() => setUploadMode('url')}>
          <FiLink /> External URL
        </button>
      </div>

      {uploadMode === 'file' ? (
        <div>
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <button type="button" className="ap-btn ap-btn-secondary" style={{ flex: 1 }} onClick={() => fileRef.current?.click()} disabled={isProcessing}>
              <FiUpload /> {isProcessing ? 'Compressing...' : 'Choose Photo from Device'}
            </button>
            {form.image && (
              <button type="button" className="ap-btn ap-btn-danger" onClick={() => setForm({ ...form, image: '' })}>Clear</button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          <p style={{ color: '#6B7280', fontSize: 11, marginTop: 8 }}>
            📦 Photo is auto-resized to 900px & compressed to JPEG for storage efficiency.
          </p>
        </div>
      ) : (
        <UrlImageInput
          value={form.image}
          onChange={url => setForm({ ...form, image: url })}
        />
      )}

      {errorMsg && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 8 }}>{errorMsg}</p>}

      {form.image && (
        <div className="ap-img-preview">
          <img
            src={form.image}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 10, display: 'block' }}
            onError={e => {
              e.target.style.display = 'none';
              const msg = e.target.parentNode.querySelector('.img-err-msg');
              if (msg) msg.style.display = 'flex';
            }}
            onLoad={e => {
              e.target.style.display = 'block';
              const msg = e.target.parentNode.querySelector('.img-err-msg');
              if (msg) msg.style.display = 'none';
            }}
          />
          <div className="img-err-msg" style={{ display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 24, color: '#EF4444', fontSize: 12, textAlign: 'center' }}>
            <FiAlertTriangle size={24} />
            <strong>Image could not be loaded.</strong>
            <span style={{ color: '#9CA3AF' }}>Check the URL is a direct image link (not a webpage).<br />Try right-clicking an image on the web → "Copy image address".</span>
          </div>
          <p className="ap-img-preview-label">Preview</p>
        </div>
      )}

      <button className="ap-btn ap-btn-primary ap-btn-block" onClick={() => onSave(form)} disabled={isProcessing} style={{ marginTop: 20 }}>
        <FiSave /> {isProcessing ? 'Processing...' : 'Save Photo'}
      </button>
    </Modal>
  );
}

function SchoolPhotoModal({ item, schools, onSave, onClose }) {
  const [form, setForm] = useState(item || {
    schoolName: schools[0]?.name || 'Royal School',
    title: '',
    category: 'Classrooms',
    image: '',
    desc: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.image.trim()) return;
    onSave(form);
  };

  return (
    <Modal title={item.id ? "Edit School Photo" : "Add New School Photo"} onClose={onClose}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label className="ap-label">Select Target School *</label>
          <select
            className="ap-input"
            value={form.schoolName}
            onChange={e => setForm({ ...form, schoolName: e.target.value })}
            required
          >
            {schools.map(sch => (
              <option key={sch.id || sch.name} value={sch.name}>{sch.name} ({sch.medium || 'Partner'})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="ap-label">Photo Title / Caption *</label>
          <input
            className="ap-input"
            required
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Smart Learning Interactive Board Classroom"
          />
        </div>

        <div>
          <label className="ap-label">Category *</label>
          <select
            className="ap-input"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option value="Premises">Premises & Building</option>
            <option value="Classrooms">Classrooms & Labs</option>
            <option value="Seminars">Seminars & Workshops</option>
            <option value="Events">Events & Celebrations</option>
          </select>
        </div>

        <div>
          <label className="ap-label">Image (Upload File or Drive/Web URL) *</label>
          <UrlImageInput
            value={form.image}
            onChange={url => setForm({ ...form, image: url })}
          />
        </div>

        <div>
          <label className="ap-label">Description / Details</label>
          <textarea
            className="ap-textarea"
            rows={3}
            value={form.desc}
            onChange={e => setForm({ ...form, desc: e.target.value })}
            placeholder="e.g. Modern classroom setup with digital interactive boards for 11th & 12th Science."
          />
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
          <button type="button" className="ap-btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="ap-btn ap-btn-primary"><FiSave /> Save School Photo</button>
        </div>
      </form>
    </Modal>
  );
}

function HeroBannerModal({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    id: item.id || '',
    title: item.title || '',
    highlightWord: item.highlightWord || '',
    subtitle: item.subtitle || '',
    desc: item.desc || '',
    image: item.image || '',
    cardImage: item.cardImage || '',
    buttonText: item.buttonText || 'Book Free Counselling',
    buttonLink: item.buttonLink || '#inquiry-form',
    _index: item._index
  });

  return (
    <Modal title={item._index !== undefined ? "Edit Hero Banner Slide" : "Add Hero Banner Slide"} onClose={onClose} wide>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label className="ap-label">Banner Main Title *</label>
            <input
              className="ap-input"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Admissions Open 2026-27"
              autoFocus
            />
          </div>
          <div>
            <label className="ap-label">Highlighted Word (Red Accent)</label>
            <input
              className="ap-input"
              value={form.highlightWord}
              onChange={e => setForm({ ...form, highlightWord: e.target.value })}
              placeholder="e.g. Admissions Open"
            />
          </div>
        </div>

        <div>
          <label className="ap-label">Subtitle / Tagline</label>
          <input
            className="ap-input"
            value={form.subtitle}
            onChange={e => setForm({ ...form, subtitle: e.target.value })}
            placeholder="e.g. Std 8th to 12th Science (GSEB / CBSE)"
          />
        </div>

        <div>
          <label className="ap-label">Description Text</label>
          <textarea
            className="ap-textarea"
            rows={3}
            value={form.desc}
            onChange={e => setForm({ ...form, desc: e.target.value })}
            placeholder="Enroll in Vadodara's elite concept-based coaching..."
          />
        </div>

        <div>
          <label className="ap-label">Background Banner Image (Upload or Drive/Web URL)</label>
          <UrlImageInput
            value={form.image}
            onChange={url => setForm({ ...form, image: url })}
          />
        </div>

        <div>
          <label className="ap-label">Optional Side Card Image (Upload or Web URL)</label>
          <UrlImageInput
            value={form.cardImage}
            onChange={url => setForm({ ...form, cardImage: url })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label className="ap-label">CTA Button Label</label>
            <input
              className="ap-input"
              value={form.buttonText}
              onChange={e => setForm({ ...form, buttonText: e.target.value })}
              placeholder="e.g. Book Free Counselling"
            />
          </div>
          <div>
            <label className="ap-label">CTA Button Link</label>
            <input
              className="ap-input"
              value={form.buttonLink}
              onChange={e => setForm({ ...form, buttonLink: e.target.value })}
              placeholder="e.g. #inquiry-form or /contact"
            />
          </div>
        </div>

        <button className="ap-btn ap-btn-primary ap-btn-block" onClick={() => onSave(form)} style={{ marginTop: 10 }}>
          <FiSave /> Save Hero Banner Slide
        </button>
      </div>
    </Modal>
  );
}

function TestimonialModal({ item, onSave, onClose }) {
  const [form, setForm] = useState({ name: item.name || '', program: item.program || '', stars: item.stars || 5, quote: item.quote || '', _index: item._index });
  return (
    <Modal title={item._index !== undefined ? 'Edit Testimonial' : 'Add Testimonial'} onClose={onClose}>
      <label className="ap-label">Student / Parent Name</label>
      <input className="ap-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} autoFocus />
      <label className="ap-label">Program / Class</label>
      <input className="ap-input" value={form.program} onChange={e => setForm({ ...form, program: e.target.value })} placeholder="e.g. NEET Batch 2025" />
      <label className="ap-label">Star Rating</label>
      <div style={{ display: 'flex', gap: 8, marginTop: 6, marginBottom: 4 }}>
        {[1,2,3,4,5].map(s => (
          <button key={s} type="button" onClick={() => setForm({ ...form, stars: s })} style={{ background: s <= form.stars ? '#FBBF2422' : '#374151', border: 'none', color: s <= form.stars ? '#FBBF24' : '#4B5563', width: 40, height: 40, borderRadius: 10, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
            <FiStar style={{ fill: s <= form.stars ? '#FBBF24' : 'none' }} />
          </button>
        ))}
        <span style={{ color: '#9CA3AF', fontSize: 13, alignSelf: 'center', marginLeft: 4 }}>{form.stars} star{form.stars !== 1 ? 's' : ''}</span>
      </div>
      <label className="ap-label">Review Quote</label>
      <textarea className="ap-textarea" value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} rows={4} placeholder="What the student/parent said..." />
      <button className="ap-btn ap-btn-primary ap-btn-block" onClick={() => onSave(form)} style={{ marginTop: 20 }}><FiSave /> Save Review</button>
    </Modal>
  );
}

function FeatureModal({ item, onSave, onClose }) {
  const [form, setForm] = useState({ icon: item.icon || 'FiCheckCircle', title: item.title || '', description: item.description || '', _index: item._index });
  const PreviewIcon = ICON_MAP[form.icon] || FiCheckCircle;
  return (
    <Modal title={item._index !== undefined ? 'Edit Feature' : 'Add Feature'} onClose={onClose}>
      <label className="ap-label">Icon</label>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#3B82F622', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <PreviewIcon size={20} />
        </div>
        <select className="ap-input ap-select" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} style={{ flex: 1 }}>
          {ICON_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <label className="ap-label">Feature Title</label>
      <input className="ap-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Expert Faculty" autoFocus />
      <label className="ap-label">Description</label>
      <textarea className="ap-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Short description of this feature..." />
      <button className="ap-btn ap-btn-primary ap-btn-block" onClick={() => onSave(form)} style={{ marginTop: 20 }}><FiSave /> Save Feature</button>
    </Modal>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CSS
// ═══════════════════════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; }

.ap-root {
  display: flex;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: #0D1117;
  font-family: 'Inter', system-ui, sans-serif;
  color: #E5E7EB;
}

/* ─── LOGIN ─────────────────────────────────────────── */
.ap-login-bg {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, #1E3A5F33, transparent), #0D1117;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 24px;
}
.ap-login-card {
  background: #161B22;
  border: 1px solid #30363D;
  border-radius: 24px;
  padding: 48px 40px;
  max-width: 420px;
  width: 100%;
  text-align: center;
}
.ap-login-logo-wrap { display: flex; justify-content: center; margin-bottom: 24px; }
.ap-login-logo { height: 48px; object-fit: contain; }
.ap-login-title { color: #fff; font-size: 26px; font-weight: 800; margin: 0 0 6px; }
.ap-login-sub { color: #6B7280; font-size: 13px; margin: 0 0 32px; }
.ap-login-form { display: flex; flex-direction: column; gap: 14px; }
.ap-login-err { color: #EF4444; font-size: 13px; margin: 0; }

/* ─── SIDEBAR ───────────────────────────────────────── */
.ap-sidebar {
  width: 260px;
  min-width: 260px;
  background: #161B22;
  border-right: 1px solid #21262D;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  top: 0; left: 0;
  z-index: 200;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  overflow: hidden;
}
.ap-sidebar-top {
  padding: 20px 20px 16px;
  border-bottom: 1px solid #21262D;
  display: flex;
  align-items: center;
  gap: 12px;
}
.ap-sidebar-logo { height: 32px; object-fit: contain; flex: 1; }
.ap-sidebar-badge {
  background: #1F6FEB22;
  color: #58A6FF;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 20px;
  border: 1px solid #58A6FF33;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.ap-sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 12px 8px;
  scrollbar-width: thin;
  scrollbar-color: #30363D transparent;
}
.ap-sidebar-bottom {
  padding: 8px 8px 16px;
  border-top: 1px solid #21262D;
}
.ap-nav-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  color: #8B949E;
  font-size: 13.5px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  text-decoration: none;
  margin-bottom: 1px;
}
.ap-nav-btn:hover { background: #21262D; color: #E5E7EB; }
.ap-nav-btn.active { background: #1F6FEB22; color: var(--nav-color, #58A6FF); font-weight: 600; }
.ap-nav-btn.active .ap-nav-icon { color: var(--nav-color, #58A6FF); }
.ap-nav-icon { width: 20px; display: flex; align-items: center; flex-shrink: 0; }
.ap-nav-label { flex: 1; }
.ap-nav-badge {
  background: #EF444422;
  color: #EF4444;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 20px;
}
.ap-nav-logout { color: #EF4444 !important; margin-top: 4px; }
.ap-nav-logout:hover { background: #EF444411 !important; }

/* ─── MAIN ──────────────────────────────────────────── */
.ap-main {
  flex: 1;
  margin-left: 260px;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.ap-topbar {
  height: 58px;
  background: #161B22;
  border-bottom: 1px solid #21262D;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
}
.ap-hamburger {
  display: none;
  background: #21262D;
  border: 1px solid #30363D;
  color: #E5E7EB;
  width: 36px; height: 36px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}
.ap-topbar-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: #E5E7EB;
  flex: 1;
}
.ap-topbar-right { display: flex; align-items: center; gap: 12px; }
.ap-topbar-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #58A6FF;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  background: #1F6FEB11;
  border: 1px solid #1F6FEB33;
  transition: all 0.2s;
}
.ap-topbar-link:hover { background: #1F6FEB22; }
.ap-content {
  flex: 1;
  padding: 28px 32px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #30363D transparent;
}
.ap-overlay-bg {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 190;
}

/* ─── SECTION HEADER ────────────────────────────────── */
.ap-section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.ap-section-title { color: #fff; font-size: 24px; font-weight: 800; margin: 0 0 4px; }
.ap-section-sub { color: #6B7280; font-size: 13px; margin: 0; }

/* ─── CARDS ─────────────────────────────────────────── */
.ap-card {
  background: #161B22;
  border: 1px solid #21262D;
  border-radius: 14px;
  padding: 20px 24px;
}
.ap-card-title {
  color: #E5E7EB;
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
}

/* ─── DASHBOARD GRID ────────────────────────────────── */
.ap-dash-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  gap: 14px;
}
.ap-dash-card {
  background: var(--card-bg, #161B22);
  border: 1px solid #21262D;
  border-radius: 14px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  position: relative;
  overflow: hidden;
}
.ap-dash-card:hover { transform: translateY(-2px); border-color: var(--card-color, #3B82F6); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
.ap-dash-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.08); color: var(--card-color, #3B82F6); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
.ap-dash-val { font-size: 30px; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 4px; }
.ap-dash-label { font-size: 12px; color: #6B7280; font-weight: 500; }
.ap-dash-arrow { position: absolute; bottom: 16px; right: 16px; color: #374151; font-size: 16px; }

/* ─── QUICK ACTIONS ─────────────────────────────────── */
.ap-quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 10px;
}
.ap-quick-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #161B22;
  border: 1px solid #21262D;
  border-radius: 10px;
  color: #C9D1D9;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}
.ap-quick-btn:hover { background: #21262D; border-color: #30363D; color: #fff; }

/* ─── SEARCH BAR ────────────────────────────────────── */
.ap-search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #161B22;
  border: 1px solid #21262D;
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 16px;
  color: #6B7280;
}
.ap-search-bar input {
  background: none;
  border: none;
  outline: none;
  color: #E5E7EB;
  font-size: 14px;
  font-family: inherit;
  flex: 1;
}
.ap-search-bar input::placeholder { color: #4B5563; }

/* ─── LIST ITEMS ─────────────────────────────────────── */
.ap-list { display: flex; flex-direction: column; gap: 10px; }
.ap-list-item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #161B22;
  border: 1px solid #21262D;
  border-radius: 12px;
  padding: 14px 18px;
  transition: border-color 0.2s;
}
.ap-list-item:hover { border-color: #30363D; }
.ap-list-emoji { font-size: 22px; flex-shrink: 0; }
.ap-list-text { flex: 1; font-size: 14px; color: #C9D1D9; }
.ap-list-actions { display: flex; gap: 8px; flex-shrink: 0; }

/* ─── GALLERY ────────────────────────────────────────── */
.ap-gallery-controls { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; }
.ap-cat-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
.ap-cat-tab {
  padding: 7px 14px;
  border: 1px solid #21262D;
  border-radius: 8px;
  background: transparent;
  color: #6B7280;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.ap-cat-tab.active { background: #1F6FEB22; border-color: #1F6FEB55; color: #58A6FF; }
.ap-cat-tab:hover:not(.active) { background: #21262D; color: #C9D1D9; }
.ap-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.ap-gallery-card {
  background: #161B22;
  border: 1px solid #21262D;
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.2s;
}
.ap-gallery-card:hover { border-color: #30363D; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
.ap-gallery-thumb {
  height: 150px;
  background-size: cover;
  background-position: center;
  background-color: #21262D;
  position: relative;
}
.ap-gallery-empty-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
}
.ap-gallery-thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}
.ap-gallery-thumb:hover .ap-gallery-thumb-overlay { opacity: 1; }
.ap-gallery-thumb-btn {
  background: rgba(255,255,255,0.15);
  border: none;
  color: #fff;
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  backdrop-filter: blur(4px);
}
.ap-gallery-info { padding: 12px 14px; }
.ap-gallery-title { font-weight: 700; color: #E5E7EB; margin: 0 0 6px; font-size: 13px; }

/* ─── TESTIMONIALS ───────────────────────────────────── */
.ap-testimonial-card { margin-bottom: 10px; }
.ap-testimonial-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.ap-testimonial-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.ap-testimonial-quote { color: #9CA3AF; font-style: italic; font-size: 13px; line-height: 1.6; margin: 0 0 12px; }

/* ─── FEATURES ───────────────────────────────────────── */
.ap-feature-ico {
  width: 42px; height: 42px;
  border-radius: 10px;
  background: #1F6FEB22;
  color: #58A6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ─── STATS GRID ─────────────────────────────────────── */
.ap-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.ap-stat-num-preview {
  font-size: 36px;
  font-weight: 800;
  color: #58A6FF;
  margin-bottom: 16px;
}

/* ─── INPUTS ─────────────────────────────────────────── */
.ap-input-wrap { position: relative; }
.ap-input-ico {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #4B5563;
  font-size: 17px;
}
.ap-input-padded { padding-left: 44px !important; }
.ap-input, .ap-textarea {
  width: 100%;
  padding: 11px 14px;
  background: #0D1117;
  border: 1px solid #30363D;
  border-radius: 10px;
  color: #E5E7EB;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
  box-sizing: border-box;
}
.ap-input:focus, .ap-textarea:focus { border-color: #1F6FEB; box-shadow: 0 0 0 3px #1F6FEB22; }
.ap-textarea { resize: vertical; min-height: 80px; }
.ap-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}
.ap-label {
  display: block;
  color: #6B7280;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 14px 0 6px;
}
.ap-label:first-child { margin-top: 0; }

/* ─── BUTTONS ─────────────────────────────────────────── */
.ap-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 18px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  white-space: nowrap;
  text-decoration: none;
}
.ap-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.ap-btn-primary { background: #1F6FEB; color: #fff; }
.ap-btn-primary:hover:not(:disabled) { background: #388BFD; }
.ap-btn-secondary { background: #21262D; color: #C9D1D9; border: 1px solid #30363D; }
.ap-btn-secondary:hover { background: #30363D; color: #fff; }
.ap-btn-danger { background: #DA3633; color: #fff; }
.ap-btn-danger:hover { background: #F85149; }
.ap-btn-ghost { background: transparent; color: #58A6FF; padding: 6px 10px; font-size: 12px; }
.ap-btn-ghost:hover { background: #1F6FEB11; }
.ap-btn-block { width: 100%; }
.ap-btn-sm { padding: 6px 12px; font-size: 12px; }

/* ─── ICON BUTTONS ───────────────────────────────────── */
.ap-icon-btn {
  background: #21262D;
  border: 1px solid #30363D;
  color: #C9D1D9;
  width: 34px; height: 34px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}
.ap-icon-btn:hover { background: #30363D; color: #fff; }
.ap-icon-btn-danger { color: #EF4444; }
.ap-icon-btn-danger:hover { background: #DA363322; color: #F85149; border-color: #DA3633; }

/* ─── TABLE ──────────────────────────────────────────── */
.ap-table-wrap {
  overflow-x: auto;
  border: 1px solid #21262D;
  border-radius: 12px;
  background: #161B22;
}
.ap-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.ap-table thead { background: #0D1117; }
.ap-table th {
  padding: 12px 16px;
  text-align: left;
  color: #6B7280;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-bottom: 1px solid #21262D;
}
.ap-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #21262D;
  color: #C9D1D9;
}
.ap-table tbody tr:last-child td { border-bottom: none; }
.ap-table tbody tr:hover { background: #21262D; }

/* ─── BADGES ─────────────────────────────────────────── */
.ap-badge {
  display: inline-block;
  padding: 3px 9px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  background: #1F6FEB22;
  color: #58A6FF;
}
.ap-badge-green { background: #23863622; color: #3FB950; }
.ap-badge-purple { background: #8B5CF622; color: #A78BFA; }

/* ─── EMPTY STATE ─────────────────────────────────────── */
.ap-empty {
  text-align: center;
  padding: 56px 32px;
  color: #374151;
}
.ap-empty p { margin: 14px 0 0; font-size: 14px; }

/* ─── MODAL ──────────────────────────────────────────── */
.ap-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(6px);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.ap-modal {
  background: #161B22;
  border: 1px solid #30363D;
  border-radius: 18px;
  width: 100%;
  max-width: 460px;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalIn 0.2s cubic-bezier(0.4,0,0.2,1);
}
.ap-modal-wide { max-width: 600px; }
.ap-modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px 16px;
  border-bottom: 1px solid #21262D;
  position: sticky; top: 0;
  background: #161B22;
  z-index: 1;
  border-radius: 18px 18px 0 0;
}
.ap-modal-head h3 { color: #fff; font-size: 17px; font-weight: 800; margin: 0; }
.ap-close-btn {
  background: #21262D;
  border: 1px solid #30363D;
  color: #C9D1D9;
  width: 32px; height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}
.ap-close-btn:hover { background: #30363D; }
.ap-modal-body { padding: 18px 22px 22px; }

/* ─── IMAGE PREVIEW ──────────────────────────────────── */
.ap-img-preview {
  margin-top: 14px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #30363D;
  position: relative;
}
.ap-img-preview img { width: 100%; max-height: 180px; object-fit: cover; display: block; }
.ap-img-preview-label {
  position: absolute; bottom: 6px; left: 8px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

/* ─── TOGGLE ROW ─────────────────────────────────────── */
.ap-toggle-row {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.ap-toggle-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px;
  border: 1px solid #30363D;
  border-radius: 10px;
  background: transparent;
  color: #6B7280;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.ap-toggle-btn.active { background: #1F6FEB22; border-color: #1F6FEB55; color: #58A6FF; }
.ap-toggle-btn:hover:not(.active) { background: #21262D; color: #C9D1D9; }

/* ─── TOAST ──────────────────────────────────────────── */
.ap-toast-stack {
  position: fixed;
  top: 20px; right: 20px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}
.ap-toast-stack > * { pointer-events: all; }
@keyframes toastIn {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 900px) {
  .ap-sidebar { transform: translateX(-100%); }
  .ap-sidebar.open { transform: translateX(0); }
  .ap-main { margin-left: 0; }
  .ap-hamburger { display: flex; }
}
@media (max-width: 640px) {
  .ap-content { padding: 20px 16px; }
  .ap-dash-grid { grid-template-columns: repeat(2, 1fr); }
  .ap-gallery-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
  .ap-section-head { flex-direction: column; }
  .ap-stats-grid { grid-template-columns: 1fr; }
}
@media (max-width: 420px) {
  .ap-dash-grid { grid-template-columns: 1fr; }
  .ap-login-card { padding: 32px 24px; }
}
`;
