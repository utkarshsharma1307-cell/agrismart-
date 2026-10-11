const fs = require('fs');
const path = require('path');

const root = __dirname;
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));

// --- HTML Modifications ---
const pwaHead = `    <!-- PWA Manifest -->
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#4A6741" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#1A1A18" media="(prefers-color-scheme: dark)">
    <link rel="apple-touch-icon" href="img/logo.jpeg">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="AgriProtect">`;

const pwaScript = `    <!-- Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js').then(reg => {
                    console.log('[SW] Registered:', reg.scope);
                    setInterval(() => reg.update(), 6 * 60 * 60 * 1000);
                }).catch(err => console.warn('[SW] Registration failed:', err));
            });
        }
    </script>`;

const farmSwitcherHtml = `<!-- Farm Switcher -->
                    <div class="farm-switcher" style="position: relative;">
                        <button class="btn btn-ghost btn-sm" id="farmSwitcherBtn" aria-expanded="false" aria-haspopup="listbox">
                            <i data-lucide="farm" style="width: 16px; height: 16px;"></i>
                            <span id="currentFarmName">Main Farm</span>
                            <i data-lucide="chevron-down" style="width: 14px; height: 14px; margin-left: 4px;"></i>
                        </button>
                        <div class="farm-dropdown hidden" id="farmDropdown" role="listbox" style="position: absolute; top: 100%; right: 0; margin-top: var(--space-xs); background: var(--color-paper); border: 1px solid var(--color-border); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); min-width: 200px; z-index: 100; overflow: hidden;">
                            <div class="farm-list" style="max-height: 300px; overflow-y: auto;"></div>
                            <div style="border-top: 1px solid var(--color-border); padding: var(--space-sm);">
                                <a href="settings.html#farms" class="btn btn-sm btn-secondary" style="width: 100%; justify-content: center;" data-i18n="manageFarms">Manage Farms</a>
                            </div>
                        </div>
                    </div>`;

const pdfScripts = `    <!-- PDF Generation -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.1/jspdf.plugin.autotable.min.js"></script>`;

const chartScript = `    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>`;

const calculators = ['profit-planner.html', 'irrigation-calculator.html', 'fertilizer-calculator.html', 'harvest-planner.html', 'crop-comparison.html'];

for (const file of htmlFiles) {
    const fp = path.join(root, file);
    let content = fs.readFileSync(fp, 'utf8');

    // 1. PWA Additions
    if (!content.includes('manifest.json')) {
        content = content.replace(/<\/head>/i, '\n' + pwaHead + '\n</head>');
    }
    if (!content.includes('serviceWorker.register')) {
        content = content.replace(/<\/body>/i, '\n' + pwaScript + '\n</body>');
    }

    // 2. PDF Scripts
    if (calculators.includes(file) && !content.includes('jspdf.umd.min.js')) {
        content = content.replace(/<\/head>/i, '\n' + pdfScripts + '\n</head>');
    }

    // 3. Chart Scripts
    if (['expenses.html', 'farmer-finance.html'].includes(file) && !content.includes('chart.umd.min.js')) {
        content = content.replace(/<\/head>/i, '\n' + chartScript + '\n</head>');
    }

    // 4. Farm Switcher
    if (file !== 'login.html' && file !== 'create-account.html' && file !== 'index.html' && !content.includes('farm-switcher')) {
        content = content.replace(/<button class="btn btn-icon" data-theme-toggle/i, farmSwitcherHtml + '\n                    <button class="btn btn-icon" data-theme-toggle');
    }

    fs.writeFileSync(fp, content);
}

console.log('HTML files successfully updated with Phase 1 & 2 additions.');

// --- Rewrite app.js Extensions ---
const appJsPath = path.join(root, 'js', 'app.js');
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

if (!appJsContent.includes('const PWA = {')) {
    const pwaModule = `
// ============================================
// PWA MANAGEMENT
// ============================================
const PWA = {
  deferredPrompt: null,
  init() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      setTimeout(() => this.maybeShowPrompt(), 30000);
    });

    window.addEventListener('appinstalled', () => {
      this.hidePrompt();
      Storage.set('pwaInstallDismissed', true);
      Toast.success('App installed! Works offline now.');
    });
  },

  maybeShowPrompt() {
    if (Storage.get('pwaInstallDismissed')) return;
    if (Storage.get('pwaInstallPromptShown')) return;
    if (!this.deferredPrompt) return;

    const pageViews = (Storage.get('pageViewCount') || 0) + 1;
    Storage.set('pageViewCount', pageViews);
    if (pageViews < 2) return;

    this.showPrompt();
    Storage.set('pwaInstallPromptShown', true);
  },

  showPrompt() {
    if (document.getElementById('pwaInstallBanner')) return;
    const banner = document.createElement('div');
    banner.id = 'pwaInstallBanner';
    banner.className = 'pwa-install-banner';
    banner.innerHTML = \`
      <div class="banner-content">
        <div class="banner-icon" style="background: var(--color-primary-light); color: var(--color-primary); border-radius: var(--radius-md); padding: 12px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4 4 4-4"></path></svg></div>
        <div class="banner-text">
          <div class="banner-title" data-i18n="pwaInstallTitle">Install AgriProtect</div>
          <div class="banner-desc" data-i18n="pwaInstallDesc">Works offline. Access your farm data anywhere.</div>
        </div>
        <div class="banner-actions">
          <button class="btn btn-primary btn-sm" id="pwaInstallBtn" data-i18n="install">Install</button>
          <button class="btn btn-ghost btn-sm" id="pwaDismissBtn" data-i18n="later">Later</button>
        </div>
      </div>
    \`;
    document.body.appendChild(banner);
    Language.updatePageContent(Language.get());

    banner.querySelector('#pwaInstallBtn').addEventListener('click', () => this.install());
    banner.querySelector('#pwaDismissBtn').addEventListener('click', () => this.hidePrompt());
  },

  async install() {
    if (!this.deferredPrompt) return;
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      Toast.success('Installing...');
    }
    this.deferredPrompt = null;
    this.hidePrompt();
  },

  hidePrompt() {
    const banner = document.getElementById('pwaInstallBanner');
    if (banner) banner.remove();
  }
};`;
    appJsContent = appJsContent.replace('const Theme = {', pwaModule + '\n\nconst Theme = {');
}

if (!appJsContent.includes('const Backup = {')) {
    const featureModules = `
// ============================================
// PDF EXPORT
// ============================================
const PDFExport = {
  async generate({ title, subtitle, sections, filename, logoDataUrl }) {
    if (!window.jspdf) return false;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    const primary = [74, 103, 65];
    const textDark = [45, 45, 45];
    const textLight = [107, 107, 107];

    if (logoDataUrl) {
      doc.addImage(logoDataUrl, 'JPEG', margin, y, 20, 20);
    }
    doc.setFontSize(24);
    doc.setTextColor(...primary);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin + (logoDataUrl ? 25 : 0), y + 14);

    y += 22;
    doc.setDrawColor(...primary);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    if (subtitle) {
      doc.setFontSize(11);
      doc.setTextColor(...textLight);
      doc.setFont('helvetica', 'normal');
      doc.text(subtitle, margin, y);
      y += 10;
    }

    doc.setFontSize(9);
    doc.setTextColor(...textLight);
    doc.text(\`Generated: \${new Date().toLocaleString('en-IN')}\`, margin, y);
    doc.text(\`App: AgriProtect v1.0.0\`, pageWidth - margin - 40, y, { align: 'right' });
    y += 12;

    for (const section of sections) {
      if (section.type === 'table') {
        if (y > 250) { doc.addPage(); y = 20; }
        doc.setFontSize(13);
        doc.setTextColor(...primary);
        doc.setFont('helvetica', 'bold');
        doc.text(section.title, margin, y);
        y += 8;

        doc.autoTable({
          startY: y,
          head: [section.headers],
          body: section.rows,
          theme: 'striped',
          headStyles: { fillColor: primary, textColor: 255, fontStyle: 'bold', fontSize: 9 },
          bodyStyles: { fontSize: 9, textColor: textDark },
          alternateRowStyles: { fillColor: [245, 244, 240] },
          margin: { left: margin, right: margin },
          didDrawPage: (data) => { y = data.cursor.y + 6; }
        });
      } else if (section.type === 'keyValue') {
        if (y > 260) { doc.addPage(); y = 20; }
        doc.setFontSize(12);
        doc.setTextColor(...primary);
        doc.setFont('helvetica', 'bold');
        doc.text(section.title, margin, y);
        y += 8;

        doc.setFontSize(10);
        doc.setTextColor(...textDark);
        doc.setFont('helvetica', 'normal');
        for (const [key, value] of Object.entries(section.data)) {
          doc.text(\`\${key}:\`, margin, y);
          doc.text(String(value), margin + 60, y);
          y += 6;
        }
        y += 4;
      }
    }

    const finalPage = doc.internal.getNumberOfPages();
    for (let i = 1; i <= finalPage; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(...textLight);
        doc.text('AgriProtect — Demo estimates only. Confirm with local agricultural experts.', pageWidth / 2, 287, { align: 'center' });
        doc.text(\`Page \${i} of \${finalPage}\`, pageWidth - margin, 287, { align: 'right' });
    }
    doc.save(filename);
    return true;
  },
  async getLogoDataUrl() {
    if (this._logoDataUrl) return this._logoDataUrl;
    try {
      const response = await fetch('img/logo.jpeg');
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => { this._logoDataUrl = reader.result; resolve(reader.result); };
        reader.readAsDataURL(blob);
      });
    } catch { return null; }
  }
};

// ============================================
// SHARE INTEGRATION
// ============================================
const Share = {
  whatsapp(message, phoneNumber = '') {
    const encoded = encodeURIComponent(message);
    const url = phoneNumber
      ? \`https://wa.me/\${phoneNumber.replace(/\\D/g, '')}?text=\${encoded}\`
      : \`https://wa.me/?text=\${encoded}\`;
    window.open(url, '_blank', 'noopener,noreferrer');
  },
  async native(data) {
    if (navigator.share) {
      try { await navigator.share(data); return true; } catch (e) { if (e.name !== 'AbortError') console.warn('Share cancelled'); }
    }
    return false;
  }
};

// ============================================
// DATA BACKUP REMINDER
// ============================================
const Backup = {
  REMINDER_INTERVAL_DAYS: 7,
  STORAGE_KEY: 'lastBackupReminder',
  checkAndRemind() {
    const lastReminder = parseInt(Storage.get(this.STORAGE_KEY) || '0');
    const now = Date.now();
    if ((now - lastReminder) / (1000 * 60 * 60 * 24) >= this.REMINDER_INTERVAL_DAYS) {
      this.showReminder();
    }
  },
  showReminder() {
    const lang = Language.get();
    Toast.warning(
      lang === 'hi' ? 'अपने डेटा का बैकअप लें। सेटिंग्स में "निर्यात करें" का उपयोग करें।' : 'Back up your data. Use "Export" in Settings.',
      lang === 'hi' ? 'बैकअप रिमाइंडर' : 'Backup Reminder'
    );
    Storage.set(this.STORAGE_KEY, Date.now().toString());
  }
};

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
const Shortcuts = {
  shortcuts: new Map(),
  register(key, callback, { ctrl = false, alt = false, shift = false, preventDefault = true, description = '' } = {}) {
    const combo = [ctrl && 'ctrl', alt && 'alt', shift && 'shift', key.toLowerCase()].filter(Boolean).join('+');
    this.shortcuts.set(combo, { callback, preventDefault, description });
  },
  init() {
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) return;
      const combo = [e.ctrlKey && 'ctrl', e.altKey && 'alt', e.shiftKey && 'shift', e.key.toLowerCase()].filter(Boolean).join('+');
      const shortcut = this.shortcuts.get(combo);
      if (shortcut) {
        if (shortcut.preventDefault) e.preventDefault();
        shortcut.callback(e);
      }
    });
    this.register('?', () => this.showHelp(), { shift: true, description: 'Show shortcuts' });
  },
  showHelp() {
    const lang = Language.get();
    const items = Array.from(this.shortcuts.entries()).map(([combo, { description }]) =>
      \`<div class="flex" style="justify-content:space-between; margin-bottom: 8px;"><kbd class="shortcut-kbd">\${combo}</kbd><span>\${description}</span></div>\`
    ).join('');

    Toast.info(\`<div style="max-height: 200px; overflow-y: auto;">\${items}</div>\`, 'Keyboard Shortcuts');
  }
};`;
    appJsContent = appJsContent.replace('const Toast = {', featureModules + '\n\nconst Toast = {');
}

// Transform Profile for Multi-Farm
if (!appJsContent.includes('activeKey:')) {
    appJsContent = appJsContent.replace(/const Profile = \{[\s\S]*?update\(updates\) \{[\s\S]*?\}[\s\S]*?\};/, `const Profile = {
  storageKey: 'profiles',
  activeKey: 'activeProfileId',
  getAll() { return Storage.get(this.storageKey) || {}; },
  getActiveId() { return Storage.get(this.activeKey) || 'default'; },
  setActive(id) {
    const profiles = this.getAll();
    if (profiles[id]) { Storage.set(this.activeKey, id); return profiles[id]; }
    return null;
  },
  get() { return this.getAll()[this.getActiveId()] || this.getDefault(); },
  getActive() { return this.get(); },
  create(profileData) {
    const profiles = this.getAll();
    const id = Utils.generateId();
    const profile = { id, ...profileData, createdAt: new Date().toISOString() };
    profiles[id] = profile;
    Storage.set(this.storageKey, profiles);
    this.setActive(id);
    return profile;
  },
  update(updates) {
    const profiles = this.getAll();
    const id = this.getActiveId();
    if (!profiles[id]) return null;
    profiles[id] = { ...profiles[id], ...updates };
    Storage.set(this.storageKey, profiles);
    return profiles[id];
  },
  delete(id) {
    const profiles = this.getAll();
    if (Object.keys(profiles).length <= 1) return false;
    delete profiles[id];
    Storage.set(this.storageKey, profiles);
    this.setActive(Object.keys(profiles)[0]);
    return true;
  },
  getDefault() {
    return { id: 'default', name: 'Demo Farmer', phone: '9876543210', email: 'demo@agriii.com', state: 'Maharashtra', district: 'Pune', farmSize: 5, farmUnit: 'acres', primaryCrop: 'rice', preferredLanguage: 'en', soilType: 'alluvial', irrigationSource: 'canal' };
  },
  migrate() {
    const oldProfile = Storage.get('profileKey');
    if (oldProfile && !Storage.get(this.storageKey)) {
      Storage.set(this.storageKey, { default: { ...oldProfile, id: 'default' } });
      Storage.set(this.activeKey, 'default');
      Storage.remove('profileKey');
    }
  },
  init() {
    this.migrate();
    if (!Storage.get(this.activeKey)) this.setActive('default');
  }
};`);
}

// Add init calls in app.js
if (!appJsContent.includes('PWA.init();')) {
    appJsContent = appJsContent.replace('Profile.init();', `Profile.init();
  PWA.init();
  Backup.checkAndRemind();
  Shortcuts.init();
  Shortcuts.register('k', () => document.querySelector('#chatInput')?.focus(), { ctrl: true, description: 'Focus chat input' });
  Shortcuts.register('m', () => window.toggleVoiceAssistant?.(), { ctrl: true, description: 'Toggle voice assistant' });
  Shortcuts.register('d', () => Theme.toggle(), { ctrl: true, description: 'Toggle dark mode' });
  Shortcuts.register('l', () => Language.toggle(), { ctrl: true, description: 'Toggle language' });`);
}

// Global exports update
if (!appJsContent.includes('Share,')) {
    appJsContent = appJsContent.replace('Assistant\n};', `Assistant,
  PWA,
  PDFExport,
  Share,
  Backup,
  Shortcuts
};`);
}

// Translations update
if (!appJsContent.includes('pwaInstallTitle')) {
    appJsContent = appJsContent.replace(`translations = {
  en: {`, `translations = {
  en: {
    pwaInstallTitle: 'Install AgriProtect',
    pwaInstallDesc: 'Works offline. Access your farm data anywhere.',
    install: 'Install',
    later: 'Later',
    shareWhatsapp: 'Share on WhatsApp',
    exportPdf: 'Export PDF',
    costOptimizer: 'Cost Optimizer (What-If)',
    optimizerDesc: 'Adjust input costs to see impact on profit and break-even. Drag sliders or enter values.',
    optimizedProfit: 'Optimized Profit',
    profitChange: 'Change vs Current',
    optimizedBreakEven: 'Optimized Break-Even',
    applyOptimized: 'Apply to Planner',
    resetOptimized: 'Reset Sliders',
    manageFarms: 'Manage Farms',`);
    appJsContent = appJsContent.replace(`hi: {
    appName`, `hi: {
    pwaInstallTitle: 'एग्रीप्रोटेक्ट इंस्टॉल करें',
    pwaInstallDesc: 'ऑफलाइन काम करता है। कहीं भी अपने खेत के डेटा देखें।',
    install: 'इंस्टॉल करें',
    later: 'बाद में',
    shareWhatsapp: 'WhatsApp पर साझा करें',
    exportPdf: 'PDF निर्यात करें',
    costOptimizer: 'लागत अनुकूलक',
    optimizerDesc: 'सिमुलेटर का उपयोग करके लाभ और ब्रेक-ईवन पर प्रभाव देखें।',
    optimizedProfit: 'अनुकूलित लाभ',
    profitChange: 'वर्तमान से परिवर्तन',
    optimizedBreakEven: 'अनुकूलित ब्रेक-ईवन',
    applyOptimized: 'प्लानर पर लागू करें',
    resetOptimized: 'रीसेट करें',
    manageFarms: 'फार्म प्रबंधित करें',
    appName`);
}

fs.writeFileSync(appJsPath, appJsContent);
console.log('app.js successfully updated.');

// Copy logo to icons if missing
const imgDir = path.join(root, 'img');
const logoPath = path.join(imgDir, 'logo.jpeg');
if (fs.existsSync(logoPath)) {
    if (!fs.existsSync(path.join(imgDir, 'icon-192.png'))) fs.copyFileSync(logoPath, path.join(imgDir, 'icon-192.png'));
    if (!fs.existsSync(path.join(imgDir, 'icon-512.png'))) fs.copyFileSync(logoPath, path.join(imgDir, 'icon-512.png'));
}

// Write scheme page and timeline page as placeholders
const schemesHtml = path.join(root, 'govt-schemes.html');
if (!fs.existsSync(schemesHtml)) {
    fs.writeFileSync(schemesHtml, \`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Government Schemes</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div style="padding: 2rem;">
        <h1>Government Schemes (Demo)</h1>
        <p>PM-KISAN, KCC, Fasal Bima Yojana details will appear here.</p>
        <a href="dashboard.html" class="btn btn-primary">Back to Dashboard</a>
    </div>
</body>
</html>\`);
}

// Include Farm Switcher Initialization script in features.js
const featJsPath = path.join(root, 'js', 'features.js');
let featJsContent = fs.readFileSync(featJsPath, 'utf8');

if (!featJsContent.includes('initFarmSwitcher')) {
    const farmSwitcherInit = `
  function initFarmSwitcher() {
    const btn = document.getElementById('farmSwitcherBtn');
    const dropdown = document.getElementById('farmDropdown');
    const list = dropdown?.querySelector('.farm-list');

    if (!btn || !dropdown || !list) return;

    const profiles = A.Profile.getAll();
    const activeId = A.Profile.getActiveId();

    list.innerHTML = Object.entries(profiles).map(([id, p]) => \`
      <div class="farm-item \${id === activeId ? 'active' : ''}" data-farm-id="\${id}" role="option" aria-selected="\${id === activeId}">
        <div class="farm-icon"><i data-lucide="farm" style="width: 14px; height: 14px;"></i></div>
        <div class="farm-info">
          <div class="farm-name">\${text(p.name)}</div>
          <div class="farm-meta">\${p.farmSize} \${p.farmUnit} • \${p.primaryCrop}</div>
        </div>
        \${id === activeId ? '<i data-lucide="check" style="width: 16px; height: 16px; color: var(--color-primary);"></i>' : ''}
      </div>
    \`).join('');

    if (window.lucide) lucide.createIcons();

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', !dropdown.classList.contains('hidden'));
    });

    list.querySelectorAll('.farm-item').forEach(item => {
      item.addEventListener('click', () => {
        A.Profile.setActive(item.dataset.farmId);
        window.location.reload();
      });
    });

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.getElementById('currentFarmName').textContent = A.Profile.getActive().name;
  }`;
    featJsContent = featJsContent.replace('document.addEventListener(', farmSwitcherInit + '\n\n  document.addEventListener(');
    featJsContent = featJsContent.replace('initAssistantPage();', 'initAssistantPage(); initFarmSwitcher();');

    // Fix extra closing brace from a previous edit error in initComparison
    featJsContent = featJsContent.replace('    render();\n  }}\n\n  function initHarvest', '    render();\n  }\n\n  function initHarvest');

    fs.writeFileSync(featJsPath, featJsContent);
    console.log('features.js successfully updated.');
}
