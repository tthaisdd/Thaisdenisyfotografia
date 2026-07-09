(() => {
  'use strict';

  const ADMIN_PASSWORD = 'Thais2026';
  const STORAGE_KEY = 'td-fotografia-site-v1';

  const defaultData = {
    brand: {
      name: 'Thais Denisy Fotografia',
      eyebrow: 'Fotografia com afeto, direção e elegância',
      heroTitle: 'Seu ensaio com uma experiência leve, moderna e memorável.',
      heroSubtitle: 'Transformo histórias em imagens que acolhem, emocionam e permanecem para sempre.',
      slogan: 'Momentos eternos, memórias vivas.',
      ctaText: 'Agendar meu ensaio',
      shortCall: 'Ensaios no estúdio e externos',
      whatsapp: '5516994137996',
      instagram: 'https://www.instagram.com/thaisdenisy10/'
    },
    stats: [
      { label: 'Experiência guiada', value: 'Direção de poses' },
      { label: 'Atendimento', value: 'Do primeiro contato à entrega' },
      { label: 'Estilo', value: 'Moderno, afetivo e elegante' },
      { label: 'Entrega', value: 'Galeria online personalizada' }
    ],
    about: {
      title: 'Prazer, eu sou a Thais.',
      text: 'Meu nome é Thais Denisy, tenho 23 anos e hoje atuo como registradora de momentos. Desde os meus 9 anos sonho em trabalhar com o que mais amo e, passando por altos e baixos, hoje realizo esse sonho através da fotografia. Para mim, fotografar é guardar momentos especiais além da memória. É eternizar com amor aquilo que merece permanecer vivo no coração.',
      photo: ''
    },
    services: [
      {
        title: 'Ensaio corporativo',
        price: 'Consulte valores',
        description: 'Fotos profissionais para perfil, currículo, LinkedIn, marca pessoal e posicionamento digital.',
        bullets: ['Direção de poses', 'Fotos em estúdio', 'Ideal para profissionais e empresas']
      },
      {
        title: 'Ensaio gestante',
        price: 'Consulte valores',
        description: 'Um registro sensível e elegante para eternizar a espera mais especial da família.',
        bullets: ['Direção delicada', 'Fotos individuais e em família', 'Experiência leve e acolhedora']
      },
      {
        title: 'Família e casal',
        price: 'Consulte valores',
        description: 'Para guardar conexões reais, abraços, olhares e lembranças que atravessam o tempo.',
        bullets: ['Ensaio afetivo', 'Momentos espontâneos', 'Pode ser em estúdio ou externo']
      },
      {
        title: 'Infantil',
        price: 'Consulte valores',
        description: 'Registros doces, naturais e cheios de personalidade para cada fase da infância.',
        bullets: ['Ambiente tranquilo', 'Fotos espontâneas', 'Acompanhamento com carinho']
      },
      {
        title: 'Debutante / 15 anos',
        price: 'Consulte valores',
        description: 'Uma experiência pensada para valorizar a personalidade, a beleza e a história da debutante.',
        bullets: ['Direção personalizada', 'Fotos modernas', 'Ideal para pré-evento ou festa']
      },
      {
        title: 'Eventos',
        price: 'Consulte valores',
        description: 'Cobertura para celebrações, aniversários, noivados, batizados e momentos especiais.',
        bullets: ['Registro completo', 'Detalhes e emoções', 'Entrega em galeria online']
      }
    ],
    portfolio: [
      { title: 'Gestante', category: 'Ensaio afetivo', image: '' },
      { title: 'Corporativo', category: 'Imagem profissional', image: '' },
      { title: 'Família', category: 'Memórias vivas', image: '' },
      { title: 'Casal', category: 'Conexão', image: '' },
      { title: 'Infantil', category: 'Doçura e espontaneidade', image: '' },
      { title: 'Debutante', category: 'Elegância moderna', image: '' }
    ],
    testimonials: [
      { name: 'Cliente especial', text: 'Amei cada detalhe da experiência. A Thais me deixou super à vontade e as fotos ficaram incríveis.', detail: 'Ensaio em estúdio' },
      { name: 'Família querida', text: 'Foi muito mais que tirar fotos. Foi viver um momento leve, emocionante e cheio de carinho.', detail: 'Ensaio família' },
      { name: 'Profissional atendida', text: 'As fotos transmitiram exatamente a imagem profissional que eu queria passar. Ficou perfeito.', detail: 'Ensaio corporativo' }
    ],
    faqs: [
      { question: 'Eu nunca fiz ensaio. Você me ajuda com poses?', answer: 'Sim. Durante todo o ensaio eu te direciono com calma, explico poses, mãos, olhar e movimento para que você se sinta segura e natural.' },
      { question: 'Como funciona o agendamento?', answer: 'Você preenche o formulário do site ou chama no WhatsApp. Depois conversamos sobre o estilo do ensaio, data, horário, valores e todos os detalhes.' },
      { question: 'Posso levar referências de fotos?', answer: 'Pode e deve! As referências ajudam a entender o estilo que você ama. A partir delas, eu adapto tudo para a sua essência.' },
      { question: 'As fotos são entregues online?', answer: 'Sim. A entrega pode ser feita por galeria online personalizada, deixando tudo mais prático e organizado.' }
    ]
  };

  let state = loadData();
  let isAdminOpen = false;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  document.addEventListener('DOMContentLoaded', () => {
    wireNavigation();
    wireLogin();
    wireBooking();
    renderSite();
    renderAdmin();
    openAdminFromHash();
  });

  window.addEventListener('hashchange', openAdminFromHash);

  function loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return clone(defaultData);
      return mergeDeep(clone(defaultData), JSON.parse(saved));
    } catch (error) {
      console.warn('Não foi possível carregar o conteúdo salvo.', error);
      return clone(defaultData);
    }
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderSite();
    showToast('Alterações salvas neste navegador.');
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function mergeDeep(target, source) {
    if (!source || typeof source !== 'object') return target;
    Object.keys(source).forEach((key) => {
      if (Array.isArray(source[key])) {
        target[key] = source[key];
      } else if (source[key] && typeof source[key] === 'object') {
        target[key] = mergeDeep(target[key] || {}, source[key]);
      } else {
        target[key] = source[key];
      }
    });
    return target;
  }

  function getByPath(path) {
    return path.split('.').reduce((acc, key) => (acc ? acc[key] : ''), state) ?? '';
  }

  function setByPath(path, value) {
    const parts = path.split('.');
    const last = parts.pop();
    const target = parts.reduce((acc, key) => {
      if (!acc[key]) acc[key] = {};
      return acc[key];
    }, state);
    target[last] = value;
  }

  function escapeHtml(value = '') {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function sanitizePhone(value = '') {
    return String(value).replace(/\D/g, '');
  }

  function whatsappBase() {
    return `https://wa.me/${sanitizePhone(state.brand.whatsapp || '5516994137996')}`;
  }

  function whatsappWithMessage(message) {
    return `${whatsappBase()}?text=${encodeURIComponent(message)}`;
  }

  function renderSite() {
    $$('[data-render]').forEach((node) => {
      const path = node.dataset.render;
      node.textContent = getByPath(path);
    });

    renderLinks();
    renderStats();
    renderAboutPhoto();
    renderServices();
    renderPortfolio();
    renderTestimonials();
    renderFaqs();
  }

  function renderLinks() {
    const defaultMessage = `Olá, Thais! Vim pelo seu site e gostaria de saber mais sobre um ensaio.\n\n“${state.brand.slogan}”`;
    const href = whatsappWithMessage(defaultMessage);
    ['floatingWhatsapp', 'footerWhatsapp', 'whatsappTextLink'].forEach((id) => {
      const node = document.getElementById(id);
      if (node) node.href = href;
    });
  }

  function renderStats() {
    const grid = $('#statsGrid');
    if (!grid) return;
    grid.innerHTML = state.stats.map((item) => `
      <article class="stat reveal">
        <strong>${escapeHtml(item.value)}</strong>
        <span>${escapeHtml(item.label)}</span>
      </article>
    `).join('');
  }

  function renderAboutPhoto() {
    const frame = $('#aboutPhotoFrame');
    if (!frame) return;
    frame.classList.toggle('has-photo', Boolean(state.about.photo));
    frame.style.backgroundImage = state.about.photo
      ? `linear-gradient(180deg, transparent 35%, rgba(31,21,17,.54)), url("${state.about.photo}")`
      : '';
  }

  function renderServices() {
    const grid = $('#servicesGrid');
    if (!grid) return;
    grid.innerHTML = state.services.map((service) => {
      const bullets = normalizeBullets(service.bullets).map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('');
      const msg = `Olá, Thais! Vim pelo seu site e gostaria de saber mais sobre: ${service.title}.`;
      return `
        <article class="service-card reveal">
          <h3>${escapeHtml(service.title)}</h3>
          <div class="price">${escapeHtml(service.price)}</div>
          <p>${escapeHtml(service.description)}</p>
          <ul>${bullets}</ul>
          <a class="mini-button" href="${whatsappWithMessage(msg)}" target="_blank" rel="noopener">Quero esse ensaio</a>
        </article>
      `;
    }).join('');
  }

  function renderPortfolio() {
    const grid = $('#portfolioGrid');
    if (!grid) return;
    grid.innerHTML = state.portfolio.map((item) => {
      const imageStyle = item.image ? ` style="background-image: linear-gradient(180deg, transparent 38%, rgba(31,21,17,.78)), url('${escapeAttribute(item.image)}')"` : '';
      return `
        <article class="portfolio-card reveal"${imageStyle}>
          <div class="portfolio-card-content">
            <span>${escapeHtml(item.category)}</span>
            <h3>${escapeHtml(item.title)}</h3>
          </div>
        </article>
      `;
    }).join('');
  }

  function escapeAttribute(value = '') {
    return String(value).replaceAll("'", '%27').replaceAll('"', '%22');
  }

  function renderTestimonials() {
    const grid = $('#feedbackGrid');
    if (!grid) return;
    grid.innerHTML = state.testimonials.map((item) => `
      <article class="feedback-card reveal">
        <div class="stars" aria-label="5 estrelas">★★★★★</div>
        <p>“${escapeHtml(item.text)}”</p>
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.detail)}</span>
      </article>
    `).join('');
  }

  function renderFaqs() {
    const list = $('#faqList');
    if (!list) return;
    list.innerHTML = state.faqs.map((item, index) => `
      <article class="faq-item ${index === 0 ? 'open' : ''}">
        <button class="faq-question" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
          <span>${escapeHtml(item.question)}</span>
          <span>+</span>
        </button>
        <div class="faq-answer">
          <p>${escapeHtml(item.answer)}</p>
        </div>
      </article>
    `).join('');

    $$('.faq-question', list).forEach((button) => {
      button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const isOpen = item.classList.toggle('open');
        button.setAttribute('aria-expanded', String(isOpen));
      });
    });
  }

  function normalizeBullets(value) {
    if (Array.isArray(value)) return value;
    return String(value || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }

  function wireNavigation() {
    const menuButton = $('#menuButton');
    const navLinks = $('#navLinks');
    if (menuButton && navLinks) {
      menuButton.addEventListener('click', () => {
        const isOpen = document.body.classList.toggle('menu-open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
      });

      $$('a, button', navLinks).forEach((item) => {
        item.addEventListener('click', () => {
          document.body.classList.remove('menu-open');
          menuButton.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  function wireLogin() {
    const adminOpenButtons = $$('[data-admin-open]');
    const closeAdmin = $('#closeAdmin');
    const loginModal = $('#loginModal');
    const loginForm = $('#loginForm');
    const passwordInput = $('#passwordInput');
    const loginError = $('#loginError');

    adminOpenButtons.forEach((button) => {
      button.addEventListener('click', () => loginModal?.showModal());
    });
    closeAdmin?.addEventListener('click', closeAdminPanel);

    loginForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (passwordInput.value === ADMIN_PASSWORD) {
        loginError.hidden = true;
        passwordInput.value = '';
        loginModal.close();
        openAdminPanel();
      } else {
        loginError.hidden = false;
      }
    });

    $('#saveContent')?.addEventListener('click', saveData);
    $('#resetContent')?.addEventListener('click', () => {
      const ok = confirm('Deseja restaurar o conteúdo de exemplo? Isso apaga as edições salvas neste navegador.');
      if (!ok) return;
      state = clone(defaultData);
      localStorage.removeItem(STORAGE_KEY);
      renderSite();
      renderAdmin();
      showToast('Conteúdo de exemplo restaurado.');
    });

    $('#exportContent')?.addEventListener('click', exportJson);
    $('#importContent')?.addEventListener('change', importJson);
  }

  function openAdminFromHash() {
    if (location.hash === '#painel' || location.hash === '#admin') {
      $('#loginModal')?.showModal();
    }
  }

  function openAdminPanel() {
    isAdminOpen = true;
    document.body.classList.add('panel-open');
    $('#adminPanel')?.classList.add('open');
    $('#adminPanel')?.setAttribute('aria-hidden', 'false');
    renderAdmin();
  }

  function closeAdminPanel() {
    isAdminOpen = false;
    document.body.classList.remove('panel-open');
    $('#adminPanel')?.classList.remove('open');
    $('#adminPanel')?.setAttribute('aria-hidden', 'true');
  }

  function wireBooking() {
    const form = $('#bookingForm');
    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const session = formData.get('session') || '';
      const date = formData.get('date') || '';
      const time = formData.get('time') || '';
      const message = formData.get('message') || '';

      const text = [
        `Olá, Thais! Vim pelo seu site e gostaria de agendar um ensaio.`,
        ``,
        `Nome: ${name}`,
        `Tipo de ensaio: ${session}`,
        date ? `Data desejada: ${formatDate(date)}` : '',
        time ? `Melhor horário: ${time}` : '',
        message ? `Mensagem: ${message}` : '',
        ``,
        `“${state.brand.slogan}”`
      ].filter(Boolean).join('\n');

      window.open(whatsappWithMessage(text), '_blank', 'noopener');
    });
  }

  function formatDate(value) {
    if (!value) return '';
    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
  }

  function renderAdmin() {
    const editor = $('#adminEditor');
    if (!editor) return;

    editor.innerHTML = `
      ${adminCard('Identidade do site', `
        <div class="admin-grid">
          ${field('Nome/marca', 'brand.name')}
          ${field('WhatsApp com DDD', 'brand.whatsapp')}
          ${field('Frase pequena acima do título', 'brand.eyebrow', 'span-2')}
          ${textareaField('Título principal', 'brand.heroTitle', 'span-2')}
          ${textareaField('Subtítulo principal', 'brand.heroSubtitle', 'span-2')}
          ${field('Slogan', 'brand.slogan', 'span-2')}
          ${field('Texto do botão principal', 'brand.ctaText')}
          ${field('Chamada do card visual', 'brand.shortCall')}
          ${field('Link do Instagram', 'brand.instagram', 'span-2')}
        </div>
      `)}

      ${adminCard('Sobre mim + foto da fotógrafa', `
        <p class="helper-text">Você pode colar o link de uma imagem ou escolher um arquivo. Para site no GitHub/Netlify, o ideal é subir a foto em uma pasta chamada <strong>imagens</strong> e usar o caminho, por exemplo: <strong>imagens/thais.jpg</strong>.</p>
        <div class="admin-grid">
          ${field('Título da seção', 'about.title', 'span-2')}
          ${textareaField('Texto sobre mim', 'about.text', 'span-2', 6)}
          ${field('Link/caminho da foto da fotógrafa', 'about.photo', 'span-2')}
          <label class="span-2">Escolher foto do computador
            <input type="file" accept="image/*" data-file-path="about.photo" />
          </label>
        </div>
      `)}

      ${adminStats()}
      ${adminServices()}
      ${adminPortfolio()}
      ${adminTestimonials()}
      ${adminFaqs()}
    `;

    wireAdminInputs();
    wireAdminLists();
    if (!isAdminOpen) return;
  }

  function adminCard(title, content) {
    return `
      <section class="admin-card">
        <h3>${escapeHtml(title)}</h3>
        ${content}
      </section>
    `;
  }

  function field(label, path, className = '') {
    return `
      <label class="${className}">${escapeHtml(label)}
        <input type="text" data-path="${path}" value="${escapeHtml(getByPath(path))}" />
      </label>
    `;
  }

  function textareaField(label, path, className = '', rows = 3) {
    return `
      <label class="${className}">${escapeHtml(label)}
        <textarea rows="${rows}" data-path="${path}">${escapeHtml(getByPath(path))}</textarea>
      </label>
    `;
  }

  function adminStats() {
    const items = state.stats.map((item, index) => `
      <div class="admin-list-item" data-list="stats" data-index="${index}">
        <div class="admin-list-top">
          <strong>Destaque ${index + 1}</strong>
          <button type="button" class="remove-item" data-remove="stats" data-index="${index}">Remover</button>
        </div>
        <div class="admin-grid">
          <label>Texto principal
            <input data-list-field="stats.${index}.value" value="${escapeHtml(item.value)}" />
          </label>
          <label>Texto menor
            <input data-list-field="stats.${index}.label" value="${escapeHtml(item.label)}" />
          </label>
        </div>
      </div>
    `).join('');

    return adminCard('Destaques rápidos', `
      <div class="admin-list">${items}</div>
      <button type="button" class="button ghost" data-add="stats">Adicionar destaque</button>
    `);
  }

  function adminServices() {
    const items = state.services.map((item, index) => `
      <div class="admin-list-item" data-list="services" data-index="${index}">
        <div class="admin-list-top">
          <strong>Plano/serviço ${index + 1}</strong>
          <button type="button" class="remove-item" data-remove="services" data-index="${index}">Remover</button>
        </div>
        <div class="admin-grid">
          <label>Título
            <input data-list-field="services.${index}.title" value="${escapeHtml(item.title)}" />
          </label>
          <label>Preço
            <input data-list-field="services.${index}.price" value="${escapeHtml(item.price)}" />
          </label>
          <label class="span-2">Descrição
            <textarea rows="3" data-list-field="services.${index}.description">${escapeHtml(item.description)}</textarea>
          </label>
          <label class="span-2">Itens inclusos, um por linha
            <textarea rows="4" data-list-field="services.${index}.bullets">${escapeHtml(normalizeBullets(item.bullets).join('\n'))}</textarea>
          </label>
        </div>
      </div>
    `).join('');

    return adminCard('Planos e serviços', `
      <div class="admin-list">${items}</div>
      <button type="button" class="button ghost" data-add="services">Adicionar serviço</button>
    `);
  }

  function adminPortfolio() {
    const items = state.portfolio.map((item, index) => `
      <div class="admin-list-item" data-list="portfolio" data-index="${index}">
        <div class="admin-list-top">
          <strong>Trabalho ${index + 1}</strong>
          <button type="button" class="remove-item" data-remove="portfolio" data-index="${index}">Remover</button>
        </div>
        <p class="helper-text">Use link/caminho da imagem, ex.: <strong>imagens/gestante.jpg</strong>. Também dá para escolher uma foto pequena do computador.</p>
        <div class="admin-grid">
          <label>Título
            <input data-list-field="portfolio.${index}.title" value="${escapeHtml(item.title)}" />
          </label>
          <label>Categoria
            <input data-list-field="portfolio.${index}.category" value="${escapeHtml(item.category)}" />
          </label>
          <label class="span-2">Link/caminho da imagem
            <input data-list-field="portfolio.${index}.image" value="${escapeHtml(item.image)}" />
          </label>
          <label class="span-2">Escolher imagem do computador
            <input type="file" accept="image/*" data-file-list="portfolio" data-file-index="${index}" data-file-key="image" />
          </label>
        </div>
      </div>
    `).join('');

    return adminCard('Melhores trabalhos / portfólio', `
      <div class="admin-list">${items}</div>
      <button type="button" class="button ghost" data-add="portfolio">Adicionar foto/trabalho</button>
    `);
  }

  function adminTestimonials() {
    const items = state.testimonials.map((item, index) => `
      <div class="admin-list-item" data-list="testimonials" data-index="${index}">
        <div class="admin-list-top">
          <strong>Feedback ${index + 1}</strong>
          <button type="button" class="remove-item" data-remove="testimonials" data-index="${index}">Remover</button>
        </div>
        <div class="admin-grid">
          <label>Nome da cliente
            <input data-list-field="testimonials.${index}.name" value="${escapeHtml(item.name)}" />
          </label>
          <label>Detalhe do ensaio
            <input data-list-field="testimonials.${index}.detail" value="${escapeHtml(item.detail)}" />
          </label>
          <label class="span-2">Texto do feedback
            <textarea rows="4" data-list-field="testimonials.${index}.text">${escapeHtml(item.text)}</textarea>
          </label>
        </div>
      </div>
    `).join('');

    return adminCard('Feedbacks', `
      <div class="admin-list">${items}</div>
      <button type="button" class="button ghost" data-add="testimonials">Adicionar feedback</button>
    `);
  }

  function adminFaqs() {
    const items = state.faqs.map((item, index) => `
      <div class="admin-list-item" data-list="faqs" data-index="${index}">
        <div class="admin-list-top">
          <strong>Dúvida ${index + 1}</strong>
          <button type="button" class="remove-item" data-remove="faqs" data-index="${index}">Remover</button>
        </div>
        <div class="admin-grid">
          <label class="span-2">Pergunta
            <input data-list-field="faqs.${index}.question" value="${escapeHtml(item.question)}" />
          </label>
          <label class="span-2">Resposta
            <textarea rows="4" data-list-field="faqs.${index}.answer">${escapeHtml(item.answer)}</textarea>
          </label>
        </div>
      </div>
    `).join('');

    return adminCard('Dúvidas comuns', `
      <div class="admin-list">${items}</div>
      <button type="button" class="button ghost" data-add="faqs">Adicionar dúvida</button>
    `);
  }

  function wireAdminInputs() {
    $$('[data-path]').forEach((input) => {
      input.addEventListener('input', () => {
        setByPath(input.dataset.path, input.value);
        renderSite();
      });
    });

    $$('[data-list-field]').forEach((input) => {
      input.addEventListener('input', () => {
        const path = input.dataset.listField;
        if (path.endsWith('.bullets')) {
          setListField(path, input.value.split('\n').map((line) => line.trim()).filter(Boolean));
        } else {
          setListField(path, input.value);
        }
        renderSite();
      });
    });

    $$('[data-file-path]').forEach((input) => {
      input.addEventListener('change', async () => {
        const file = input.files?.[0];
        if (!file) return;
        const dataUrl = await fileToDataUrl(file);
        setByPath(input.dataset.filePath, dataUrl);
        renderSite();
        renderAdmin();
      });
    });

    $$('[data-file-list]').forEach((input) => {
      input.addEventListener('change', async () => {
        const file = input.files?.[0];
        if (!file) return;
        const dataUrl = await fileToDataUrl(file);
        const list = input.dataset.fileList;
        const index = Number(input.dataset.fileIndex);
        const key = input.dataset.fileKey;
        state[list][index][key] = dataUrl;
        renderSite();
        renderAdmin();
      });
    });
  }

  function setListField(path, value) {
    const [listName, indexText, key] = path.split('.');
    const index = Number(indexText);
    if (!state[listName] || !state[listName][index]) return;
    state[listName][index][key] = value;
  }

  function wireAdminLists() {
    $$('[data-add]').forEach((button) => {
      button.addEventListener('click', () => {
        addItem(button.dataset.add);
        renderAdmin();
        renderSite();
      });
    });

    $$('[data-remove]').forEach((button) => {
      button.addEventListener('click', () => {
        const list = button.dataset.remove;
        const index = Number(button.dataset.index);
        state[list].splice(index, 1);
        renderAdmin();
        renderSite();
      });
    });
  }

  function addItem(listName) {
    const map = {
      stats: { label: 'Novo destaque', value: 'Texto principal' },
      services: { title: 'Novo serviço', price: 'Consulte valores', description: 'Descrição do serviço.', bullets: ['Item incluso', 'Outro diferencial'] },
      portfolio: { title: 'Novo trabalho', category: 'Categoria', image: '' },
      testimonials: { name: 'Nome da cliente', text: 'Escreva o feedback aqui.', detail: 'Tipo de ensaio' },
      faqs: { question: 'Nova pergunta?', answer: 'Escreva a resposta aqui.' }
    };
    state[listName].push(clone(map[listName]));
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'conteudo-site-thais-denisy.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  function importJson(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        state = mergeDeep(clone(defaultData), JSON.parse(reader.result));
        renderSite();
        renderAdmin();
        showToast('Conteúdo importado. Clique em salvar para manter.');
      } catch (error) {
        alert('Não consegui importar este arquivo. Verifique se é um JSON válido.');
      }
    };
    reader.readAsText(file);
  }

  function showToast(message) {
    let toast = $('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2600);
  }
})();
