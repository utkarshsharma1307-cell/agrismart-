/* Agriii local farming tools */
(function () {
  const A = window.Agriii;
  if (!A) return;

  const storage = A.Storage;
  const currency = A.Utils.formatCurrency;
  const number = value => {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  const id = () => A.Utils.generateId();

  const cropData = {
    rice: { name: 'Rice', hindi: 'धान', days: 120, yield: 32, price: 2400, water: 1250, npk: [80, 40, 40] },
    wheat: { name: 'Wheat', hindi: 'गेहूं', days: 115, yield: 25, price: 2280, water: 450, npk: [60, 30, 20] },
    cotton: { name: 'Cotton', hindi: 'कपास', days: 165, yield: 9, price: 7100, water: 700, npk: [50, 25, 25] },
    sugarcane: { name: 'Sugarcane', hindi: 'गन्ना', days: 300, yield: 350, price: 325, water: 2200, npk: [120, 60, 60] },
    maize: { name: 'Maize', hindi: 'मक्का', days: 100, yield: 25, price: 1800, water: 500, npk: [60, 30, 20] },
    pulses: { name: 'Pulses', hindi: 'दालें', days: 100, yield: 12, price: 5000, water: 350, npk: [20, 40, 20] },
    vegetables: { name: 'Vegetables', hindi: 'सब्जियां', days: 70, yield: 200, price: 1500, water: 600, npk: [80, 50, 50] },
    fruits: { name: 'Fruits', hindi: 'फल', days: 365, yield: 50, price: 4000, water: 800, npk: [60, 40, 60] },
    oilseeds: { name: 'Oilseeds', hindi: 'तिलहन', days: 110, yield: 15, price: 4500, water: 400, npk: [50, 30, 20] }
  };

  function save(key, value) { storage.set(key, value); }
  function get(key, fallback) { return storage.get(key) || fallback; }
  function text(value) { return esc(value); }
  function toLocalISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function todayISO() { return toLocalISO(new Date()); }
  function dateLabel(value) {
    if (!value) return '—';
    const date = new Date(value + 'T00:00:00');
    if (isNaN(date)) return '—';
    try {
      const lang = A.Language?.get() || 'en';
      return date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  }
  function addDays(dateValue, days) {
    if (!dateValue) return todayISO();
    const date = new Date(dateValue + 'T00:00:00');
    if (isNaN(date)) return todayISO();
    date.setDate(date.getDate() + Number(days || 0));
    return toLocalISO(date);
}
  function notify(message, title) { A.Toast.success(message, title); }

  function initExpenses() {
    const form = document.querySelector('#expenseForm');
    if (!form) return;
    let records = get('expenses', [
      { id: id(), date: todayISO(), category: 'Seeds', amount: 7000, note: 'Rice season seed stock' },
      { id: id(), date: todayISO(), category: 'Labour', amount: 26000, note: 'Field preparation' }
    ]);
    const body = document.querySelector('#expenseRows');
    const total = document.querySelector('#expenseTotal');
    const render = () => {
      total.textContent = currency(records.reduce((sum, item) => sum + number(item.amount), 0));
      body.innerHTML = records.length ? records.map(item => `<tr><td>${dateLabel(item.date)}</td><td>${text(item.category)}</td><td>${text(item.note || '—')}</td><td class="planner-cost-amount">${currency(item.amount)}</td><td><button class="btn btn-ghost btn-sm" type="button" data-delete-expense="${item.id}" aria-label="Delete expense"><i data-lucide="trash-2"></i></button></td></tr>`).join('') : '<tr><td colspan="5" class="text-muted">No expenses recorded yet.</td></tr>';
      body.querySelectorAll('[data-delete-expense]').forEach(button => button.addEventListener('click', () => { records = records.filter(item => item.id !== button.dataset.deleteExpense); save('expenses', records); render(); notify('Expense removed', 'Expense Tracker'); }));
      if (window.lucide) lucide.createIcons();
    };
    form.addEventListener('submit', event => { event.preventDefault(); const data = new FormData(form); const amount = number(data.get('amount')); if (!data.get('category') || amount <= 0) return A.Toast.warning('Choose a category and enter an amount greater than zero.', 'Expense Tracker'); records.unshift({ id: id(), date: data.get('date') || todayISO(), category: data.get('category'), amount, note: data.get('note') || '' }); save('expenses', records); form.reset(); form.querySelector('[name="date"]').value = todayISO(); render(); notify('Expense saved locally', 'Expense Tracker'); });
    document.querySelector('#clearExpenses')?.addEventListener('click', () => { if (!confirm('Clear all saved expenses?')) return; records = []; save('expenses', records); render(); notify('Expense list cleared', 'Expense Tracker'); });
    form.querySelector('[name="date"]').value = todayISO(); render();
  }

  function initTasks() {
    const form = document.querySelector('#taskForm');
    if (!form) return;
    let tasks = get('tasks', [
      { id: id(), title: 'Irrigate rice field A', due: todayISO(), category: 'Irrigation', done: false },
      { id: id(), title: 'Inspect pest traps', due: addDays(todayISO(), 2), category: 'Crop care', done: false }
    ]);
    const body = document.querySelector('#taskRows');
    const render = () => {
      body.innerHTML = tasks.length ? tasks.map(item => `<tr class="${item.done ? 'task-done' : ''}"><td><label class="form-check"><input type="checkbox" data-task-toggle="${item.id}" ${item.done ? 'checked' : ''}><span>${text(item.title)}</span></label></td><td>${dateLabel(item.due)}</td><td>${text(item.category)}</td><td><button class="btn btn-ghost btn-sm" type="button" data-delete-task="${item.id}" aria-label="Delete task"><i data-lucide="trash-2"></i></button></td></tr>`).join('') : '<tr><td colspan="4" class="text-muted">No tasks yet.</td></tr>';
      body.querySelectorAll('[data-task-toggle]').forEach(input => input.addEventListener('change', () => { const task = tasks.find(item => item.id === input.dataset.taskToggle); if (task) task.done = input.checked; save('tasks', tasks); render(); }));
      body.querySelectorAll('[data-delete-task]').forEach(button => button.addEventListener('click', () => { tasks = tasks.filter(item => item.id !== button.dataset.deleteTask); save('tasks', tasks); render(); }));
      if (window.lucide) lucide.createIcons();
    };
    form.addEventListener('submit', event => { event.preventDefault(); const data = new FormData(form); if (!data.get('title') || !data.get('due')) return A.Toast.warning('Add a title and due date.', 'Task Reminders'); tasks.unshift({ id: id(), title: data.get('title'), due: data.get('due'), category: data.get('category') || 'General', done: false }); save('tasks', tasks); form.reset(); form.querySelector('[name="due"]').value = todayISO(); render(); notify('Task added locally', 'Task Reminders'); });
    form.querySelector('[name="due"]').value = todayISO(); render();
  }

  function initComparison() {
    const form = document.querySelector('#comparisonForm');
    if (!form) return;
    const render = () => {
      const data = new FormData(form);
      const areaRaw = number(data.get('area'));
      const area = Math.max(areaRaw, 0);
      const unit = data.get('unit') || 'acres';
      const selected = [data.get('cropA'), data.get('cropB'), data.get('cropC')].filter(Boolean);
      const areaAcres = unit === 'hectares' ? area * 2.47105 : area;
      const container = document.querySelector('#comparisonCards');
      if (areaRaw <= 0) {
        container.innerHTML = '<p class="text-muted text-center" style="padding: var(--space-xl);">Enter an area greater than zero to compare demo estimates.</p>';
        return;
      }
      if (!selected.length) {
        container.innerHTML = '<p class="text-muted text-center" style="padding: var(--space-xl);">Select crops to compare</p>';
        return;
      }
      const areaLabel = `${area.toLocaleString('en-IN', { maximumFractionDigits: 2 })} ${unit}`;
      const conversionNote = unit === 'hectares' ? ` (${areaAcres.toFixed(2)} acres used for per-acre demo yields)` : '';
      container.innerHTML = selected.map(key => {
        const crop = cropData[key] || { name: key, yield: 20, price: 2000 };
        const yieldTotal = areaAcres * crop.yield;
        const revenue = yieldTotal * crop.price;
        const cost = revenue * 0.55;
        return `<article class="card tool-card"><div><span class="badge badge-primary">${text(crop.name)}</span><h3 style="margin-top: var(--space-sm);">${currency(revenue - cost)}</h3><p class="text-muted text-sm">Demo net profit estimate for ${areaLabel}${conversionNote}</p></div><div class="planner-summary"><div class="planner-summary-row"><span>Expected harvest</span><strong>${yieldTotal.toFixed(1)} quintal</strong></div><div class="planner-summary-row"><span>Gross revenue</span><strong>${currency(revenue)}</strong></div><div class="planner-summary-row"><span>Demo price</span><strong>${currency(crop.price)} / quintal</strong></div></div></article>`;
      }).join('');
    };
    form.addEventListener('input', render);
    form.addEventListener('change', render);
    render();
  }}

  function initHarvest() {
    const form = document.querySelector('#harvestForm');
    if (!form) return;
    const render = () => { const data = new FormData(form); const crop = cropData[data.get('crop')] || cropData.rice; const area = number(data.get('area')); const sowing = data.get('sowingDate'); const duration = number(data.get('duration')) || crop.days; const harvest = sowing ? addDays(sowing, duration) : ''; document.querySelector('#harvestDate').textContent = dateLabel(harvest); document.querySelector('#harvestProduction').textContent = (area * crop.yield).toFixed(1) + ' quintal'; document.querySelector('#harvestSummary').textContent = `${crop.name} • ${area || 0} acres • ${duration} days`; document.querySelector('#harvestProgress').style.width = sowing ? '35%' : '0%'; save('harvestPlan', { crop: data.get('crop'), area, sowingDate: sowing, duration }); };
    form.addEventListener('input', render); const saved = get('harvestPlan', { crop: 'rice', area: 5, sowingDate: todayISO(), duration: cropData.rice.days }); Object.keys(saved).forEach(key => { const input = form.elements[key]; if (input) input.value = saved[key]; }); render();
  }

  function initIrrigation() {
    const form = document.querySelector('#irrigationForm');
    if (!form) return;
    const render = () => { const data = new FormData(form); const crop = cropData[data.get('crop')] || cropData.rice; const area = number(data.get('area')); const soilFactor = Number(data.get('soilFactor') || 1); const weatherFactor = Number(data.get('weatherFactor') || 1); const total = area * crop.water * soilFactor * weatherFactor; document.querySelector('#waterTotal').textContent = Math.round(total).toLocaleString('en-IN') + ' litres'; document.querySelector('#waterPerDay').textContent = Math.round(total / 7).toLocaleString('en-IN') + ' litres / day'; document.querySelector('#waterNote').textContent = `Assumes a 7-day cycle for ${crop.name}. Adjust after checking soil moisture and rainfall.`; save('irrigationPlan', Object.fromEntries(data.entries())); };
    form.addEventListener('input', render); const saved = get('irrigationPlan', { crop: 'rice', area: 5, soilFactor: '1', weatherFactor: '0.8' }); Object.keys(saved).forEach(key => { if (form.elements[key]) form.elements[key].value = saved[key]; }); render();
  }

  function initFertilizer() {
    const form = document.querySelector('#fertilizerForm');
    if (!form) return;
    const render = () => { const data = new FormData(form); const crop = cropData[data.get('crop')] || cropData.rice; const area = number(data.get('area')); const factor = Number(data.get('soilFactor') || 1); const values = crop.npk.map(value => Math.round(value * area * factor)); document.querySelector('#nitrogenTotal').textContent = values[0] + ' kg'; document.querySelector('#phosphorusTotal').textContent = values[1] + ' kg'; document.querySelector('#potassiumTotal').textContent = values[2] + ' kg'; document.querySelector('#fertilizerNote').textContent = `Demo recommendation for ${crop.name}. Confirm rates with a local soil test and agricultural expert.`; save('fertilizerPlan', Object.fromEntries(data.entries())); };
    form.addEventListener('input', render); const saved = get('fertilizerPlan', { crop: 'rice', area: 5, soilFactor: '1' }); Object.keys(saved).forEach(key => { if (form.elements[key]) form.elements[key].value = saved[key]; }); render();
  }

  function initAssistantPage() {
    const form = document.querySelector('#chatForm');
    if (!form) {
      // Fallback to old form ID for compatibility
      initAssistantPageLegacy();
      return;
    }

    const messagesContainer = document.querySelector('#chatMessages');
    const languageSelect = document.querySelector('#assistantLanguage');
    const input = document.querySelector('#chatInput');
    const typingIndicator = document.querySelector('#typingIndicator');
    const clearBtn = document.querySelector('#clearChat');
    const voiceInputBtn = document.querySelector('#voiceInputBtn');
    const speakResponseBtn = document.querySelector('#speakResponseBtn');
    const voiceStatusBar = document.querySelector('#voiceStatusBar');
    const voiceStatusText = document.querySelector('#voiceStatusText');
    const voiceIndicator = document.querySelector('#voiceIndicator');

    let currentLang = languageSelect?.value || A.Language.get();
    let lastBotResponse = '';

    // Helper to escape HTML
    const escHtml = text => {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    };

    // Format timestamp
    const formatTime = isoString => {
      try {
        return new Date(isoString).toLocaleTimeString(currentLang === 'hi' ? 'hi-IN' : 'en-IN', { hour: '2-digit', minute: '2-digit' });
      } catch {
        return '';
      }
    };

    // Render a single message
    const renderMessage = msg => {
      const isBot = msg.role === 'assistant';
      const time = msg.createdAt ? formatTime(msg.createdAt) : '';

      const article = document.createElement('div');
      article.className = `message message-${isBot ? 'bot' : 'user'}`;
      article.innerHTML = `
        ${isBot ? '<div class="message-avatar"><i data-lucide="bot"></i></div>' : ''}
        <div class="message-content">
          <div class="message-text">${escHtml(msg.text)}</div>
          ${time ? `<div class="message-time">${time}</div>` : ''}
        </div>
      `;
      messagesContainer.appendChild(article);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      if (window.lucide) lucide.createIcons();
    };

    // Load and render history
    const loadHistory = () => {
      const history = A.Assistant.getHistory();
      // Clear existing messages except welcome
      const welcome = messagesContainer.querySelector('.message-bot');
      messagesContainer.innerHTML = '';
      if (welcome && history.length === 0) {
        messagesContainer.appendChild(welcome);
      }
      history.forEach(msg => renderMessage(msg));
    };

    // Show typing indicator
    const showTyping = () => {
      if (typingIndicator) {
        typingIndicator.style.display = 'block';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    };

    // Hide typing indicator
    const hideTyping = () => {
      if (typingIndicator) {
        typingIndicator.style.display = 'none';
      }
    };

    // Send a message
    const sendMessage = async text => {
      if (!text?.trim()) return;

      // Add user message
      A.Assistant.appendMessage('user', text.trim(), currentLang);
      renderMessage({ role: 'user', text: text.trim(), createdAt: new Date().toISOString() });
      input.value = '';

      // Show typing and get response
      showTyping();
      const response = await A.Assistant.getResponseAsync(text.trim(), currentLang);
      hideTyping();

      // Add bot response
      A.Assistant.appendMessage('assistant', response, currentLang);
      renderMessage({ role: 'assistant', text: response, createdAt: new Date().toISOString() });
      lastBotResponse = response;
    };

    // Form submit
    form.addEventListener('submit', async event => {
      event.preventDefault();
      await sendMessage(input.value);
    });

    // Enter to send, Shift+Enter for newline
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form.dispatchEvent(new Event('submit'));
      }
    });

    // Auto-grow textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 150) + 'px';
    });

    // Clear chat
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (!confirm(currentLang === 'hi' ? 'चैट साफ़ करें?' : 'Clear chat history?')) return;
        A.Assistant.clearHistory();
        loadHistory();
        // Show welcome message
        const welcome = document.querySelector('#welcomeMessage');
        if (welcome) {
          welcome.textContent = A.Assistant.getResponse('', currentLang);
        }
        A.Toast.success(currentLang === 'hi' ? 'चैट साफ़ हो गई' : 'Chat cleared');
      });
    }

    // Language change
    if (languageSelect) {
      languageSelect.addEventListener('change', () => {
        currentLang = languageSelect.value;
        A.Language.set(currentLang);
        // Update welcome message
        const welcome = document.querySelector('#welcomeMessage');
        if (welcome) {
          welcome.textContent = A.Assistant.getResponse('', currentLang);
        }
      });
    }

    // Quick prompts
    document.querySelectorAll('.quick-prompt').forEach(btn => {
      btn.addEventListener('click', async () => {
        const prompt = btn.dataset.prompt;
        if (prompt) await sendMessage(prompt);
      });
    });

    // Voice input
    if (voiceInputBtn) {
      voiceInputBtn.addEventListener('click', () => {
        if (voiceStatusBar) voiceStatusBar.style.display = 'flex';
        if (voiceStatusText) voiceStatusText.textContent = currentLang === 'hi' ? 'सुन रहा हूँ…' : 'Listening...';
        if (voiceIndicator) voiceIndicator.className = 'voice-status-indicator listening';

        A.Assistant.startVoice(
          // onInterim
          transcript => {
            if (voiceStatusText) voiceStatusText.textContent = transcript;
          },
          // onFinal
          async transcript => {
            if (voiceStatusBar) voiceStatusBar.style.display = 'none';
            input.value = transcript;
            await sendMessage(transcript);
          },
          // onError
          error => {
            if (voiceStatusBar) voiceStatusBar.style.display = 'none';
            A.Toast.error(error.message);
          },
          currentLang
        );
      });
    }

    // Speak response
    if (speakResponseBtn) {
      speakResponseBtn.addEventListener('click', () => {
        if (lastBotResponse) {
          A.Assistant.speak(lastBotResponse, currentLang);
        }
      });
    }

    // Cancel voice
    const cancelVoiceBtn = document.querySelector('#cancelVoiceBtn');
    if (cancelVoiceBtn) {
      cancelVoiceBtn.addEventListener('click', () => {
        A.Assistant.stopVoice();
        if (voiceStatusBar) voiceStatusBar.style.display = 'none';
      });
    }

    // Voice overlay controls
    const voiceOverlay = document.querySelector('#voiceOverlay');
    const overlayMicBtn = document.querySelector('#overlayMicBtn');
    const overlayCloseBtn = document.querySelector('#overlayCloseBtn');
    const overlayTitle = document.querySelector('#overlayTitle');
    const overlaySubtitle = document.querySelector('#overlaySubtitle');
    const transcriptText = document.querySelector('#transcriptText');
    const voiceTranscript = document.querySelector('#voiceTranscript');

    if (overlayMicBtn) {
      overlayMicBtn.addEventListener('click', () => {
        if (overlayTitle) overlayTitle.textContent = currentLang === 'hi' ? 'सुन रहा हूँ' : 'Listening...';
        if (overlaySubtitle) overlaySubtitle.textContent = currentLang === 'hi' ? 'अपना सवाल बोलें' : 'Speak your question';
        if (voiceTranscript) voiceTranscript.style.display = 'none';

        A.Assistant.startVoice(
          transcript => {
            if (transcriptText) transcriptText.textContent = transcript;
            if (voiceTranscript) voiceTranscript.style.display = 'block';
          },
          async transcript => {
            // Process as command first
            const command = A.Assistant.processVoiceCommand(transcript, currentLang);

            if (command.action === 'navigate') {
              if (overlayTitle) overlayTitle.textContent = command.message;
              A.Assistant.speak(command.message, currentLang);
              setTimeout(() => { window.location.href = command.page; }, 1200);
            } else if (command.action === 'theme' || command.action === 'language') {
              if (overlayTitle) overlayTitle.textContent = command.message;
              A.Assistant.speak(command.message, currentLang);
              setTimeout(() => { if (voiceOverlay) voiceOverlay.style.display = 'none'; }, 1000);
            } else if (command.action === 'refresh') {
              if (overlayTitle) overlayTitle.textContent = command.message;
              window.location.reload();
            } else if (command.action === 'help') {
              if (overlayTitle) overlayTitle.textContent = command.message;
              A.Assistant.speak(command.message, currentLang);
            } else {
              // Not a command, treat as chat
              if (voiceOverlay) voiceOverlay.style.display = 'none';
              await sendMessage(transcript);
            }
          },
          error => {
            if (overlayTitle) overlayTitle.textContent = error.message;
            if (overlaySubtitle) overlaySubtitle.textContent = currentLang === 'hi' ? 'दोबारा कोशिश करें' : 'Try again';
          },
          currentLang
        );
      });
    }

    if (overlayCloseBtn) {
      overlayCloseBtn.addEventListener('click', () => {
        A.Assistant.stopVoice();
        if (voiceOverlay) voiceOverlay.style.display = 'none';
      });
    }

    // Voice widget toggle in header
    const voiceWidgetToggle = document.querySelector('#voiceWidgetToggle');
    if (voiceWidgetToggle && voiceOverlay) {
      voiceWidgetToggle.addEventListener('click', () => {
        voiceOverlay.style.display = 'flex';
        if (window.lucide) lucide.createIcons();
      });
    }

    // Language change listener for UI updates
    A.Language.onLanguageChange((prev, current) => {
      currentLang = current;
      if (languageSelect) languageSelect.value = current;
      loadHistory();
    });

    // Initial load
    loadHistory();
    if (languageSelect) languageSelect.value = currentLang;
  }

  // Legacy assistant page support
  function initAssistantPageLegacy() {
    const form = document.querySelector('#assistantForm');
    if (!form) return;

    const messages = document.querySelector('#assistantMessages');
    const language = document.querySelector('#assistantLanguage');
    const input = document.querySelector('#assistantInput');
    const voiceStatus = document.querySelector('#voiceStatus');

    const add = (message, kind, persist = true) => {
      const article = document.createElement('article');
      article.className = `assistant-message assistant-message-${kind}`;
      article.textContent = message;
      messages.appendChild(article);
      if (persist) {
        A.Assistant.appendMessage(kind === 'bot' ? 'assistant' : 'user', message, language?.value || 'en');
      }
      messages.scrollTop = messages.scrollHeight;
    };

    // Load existing history
    const history = A.Assistant.getHistory();
    history.forEach(item => add(item.text, item.role === 'assistant' ? 'bot' : 'user', false));

    if (!history.length) {
      add(A.Assistant.getResponse('', language?.value || 'en'), 'bot', false);
    }

    const ask = question => {
      if (!question.trim()) return;
      add(question, 'user');
      const answer = A.Assistant.getResponse(question, language?.value || 'en');
      add(answer, 'bot');
      A.Assistant.speak(answer, language?.value || 'en');
      input.value = '';
    };

    form.addEventListener('submit', event => { event.preventDefault(); ask(input.value); });

    if (language) {
      language.addEventListener('change', () => {
        A.Language.set(language.value);
        if (voiceStatus) voiceStatus.textContent = language.value === 'hi' ? 'हिंदी आवाज़ चुनी गई' : 'English voice selected';
      });
    }

    document.querySelectorAll('[data-quick-prompt]').forEach(button => {
      button.addEventListener('click', () => ask(button.dataset.quickPrompt));
    });

    const clearBtn = document.querySelector('#clearAssistant');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (!confirm('Clear assistant history?')) return;
        A.Assistant.clearHistory();
        messages.innerHTML = '';
        add(A.Assistant.getResponse('', language?.value || 'en'), 'bot', false);
      });
    }

    const micBtn = document.querySelector('#assistantMic');
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (voiceStatus) voiceStatus.textContent = language?.value === 'hi' ? 'सुन रहा हूँ…' : 'Listening…';
        A.Assistant.startVoice(
          ask,
          msg => { if (voiceStatus) voiceStatus.textContent = msg; },
          language?.value || 'en'
        );
      });
    }

    if (language) language.value = A.Language.get();
  }

  document.addEventListener('DOMContentLoaded', () => { initExpenses(); initTasks(); initComparison(); initHarvest(); initIrrigation(); initFertilizer(); initAssistantPage(); });
  window.AgriiiFeatures = { cropData };
}());
