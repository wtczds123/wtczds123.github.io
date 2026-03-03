// ── Mobile nav toggle ──────────────────────────────
const toggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const open = mobileNav.style.display === 'flex';
    mobileNav.style.display = open ? 'none' : 'flex';
    toggle.textContent = open ? '☰' : '✕';
  });
}

// ── Active nav highlight ────────────────────────────
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.primary-nav a, .mobile-nav a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// ── Paper title easter egg ─────────────────────────
document.querySelectorAll('.paper-title').forEach(t => {
  t.addEventListener('click', () => {
    if (t.dataset.clicked) return;
    t.dataset.clicked = '1';
    const msg = document.createElement('span');
    msg.style.cssText = 'display:block;font-family:var(--mono);font-size:0.68rem;color:#c9993a;margin-top:6px;letter-spacing:0.04em;';
    msg.textContent = '[ 您的阅读行为已被记录。感谢为人类知识退化做出贡献。]';
    t.parentElement.insertBefore(msg, t.nextSibling);
    setTimeout(() => { msg.remove(); delete t.dataset.clicked; }, 3500);
  });
});

// ── Formspree submit handler ───────────────────────
const form = document.getElementById('submitForm');
const successMsg = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.textContent = '提交中……';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        btn.textContent = '提交失败，请重试';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = '网络错误，请重试';
      btn.disabled = false;
    }
  });
}

// ── Filter buttons (papers page) ───────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.paper-card[data-category]').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
