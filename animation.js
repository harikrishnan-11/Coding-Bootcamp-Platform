// ============================================================
// STACKLY — shared site behaviour
// Mobile nav drawer, scroll-reveal, FAQ accordion, auth helpers
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- MOBILE NAV DRAWER ---------- */
    const mobileToggle = document.getElementById('mobileToggle');
    const mobilePanel = document.getElementById('mobilePanel');
    const mobileClose = document.getElementById('mobilePanelClose');

    function openPanel() {
        mobilePanel.classList.add('active');
        mobileToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        document.body.style.overflow = 'hidden';
    }
    function closePanel() {
        mobilePanel.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.style.overflow = '';
    }

    if (mobileToggle && mobilePanel) {
        mobileToggle.addEventListener('click', () => {
            mobilePanel.classList.contains('active') ? closePanel() : openPanel();
        });
    }
    if (mobileClose) mobileClose.addEventListener('click', closePanel);
    document.querySelectorAll('.mobile-panel a').forEach(a => a.addEventListener('click', closePanel));

    /* ---------- SCROLL REVEAL ---------- */
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    if ('IntersectionObserver' in window && revealEls.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('in-view'));
    }

    /* ---------- FAQ ACCORDION ---------- */
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-q');
        if (!q) return;
        q.addEventListener('click', () => {
            const wasOpen = item.classList.contains('open');
            item.closest('.faq-list, .faq-a-list')?.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('open');
                const icon = i.querySelector('.faq-q i');
                if (icon) icon.className = 'fa-solid fa-circle-plus';
            });
            if (!wasOpen) {
                item.classList.add('open');
                const icon = item.querySelector('.faq-q i');
                if (icon) icon.className = 'fa-solid fa-circle-minus';
            }
        });
    });

    /* ---------- STAT COUNTER (About page) ---------- */
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window) {
        const countIO = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                const suffix = el.dataset.suffix || '';
                const duration = 1400;
                const start = performance.now();
                function tick(now) {
                    const p = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.round(eased * target).toLocaleString() + suffix;
                    if (p < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
                countIO.unobserve(el);
            });
        }, { threshold: 0.5 });
        counters.forEach(el => countIO.observe(el));
    }

    /* ---------- COURSE FILTER CHIPS (Courses page) ---------- */
    const filterChips = document.querySelectorAll('.filter-chip');
    const filterCards = document.querySelectorAll('[data-cat]');
    if (filterChips.length) {
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                const cat = chip.dataset.filter;
                filterCards.forEach(card => {
                    const show = cat === 'all' || card.dataset.cat === cat;
                    card.style.display = show ? '' : 'none';
                });
            });
        });
    }

    /* ---------- PASSWORD SHOW/HIDE (Login/Signup) ---------- */
    document.querySelectorAll('.toggle-pass').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            if (!input) return;
            const isPass = input.type === 'password';
            input.type = isPass ? 'text' : 'password';
            btn.className = isPass ? 'fa-solid fa-eye-slash toggle-pass' : 'fa-solid fa-eye toggle-pass';
        });
    });

    /* ---------- PASSWORD STRENGTH (Signup) ---------- */
    const signupPass = document.getElementById('signupPassword');
    const strengthBars = document.querySelectorAll('.pass-strength span');
    if (signupPass && strengthBars.length) {
        signupPass.addEventListener('input', () => {
            const val = signupPass.value;
            let score = 0;
            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;
            const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
            strengthBars.forEach((bar, i) => {
                bar.style.background = i < score ? colors[score - 1] : 'var(--border)';
            });
        });
    }

    /* ---------- FORM SUBMIT (prevent default, demo only) ---------- */
    document.querySelectorAll('form[data-demo-form]').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                const original = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Done';
                setTimeout(() => { btn.innerHTML = original; }, 1800);
            }
        });
    });

});