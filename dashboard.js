(function () {
    var sidebar = document.querySelector('.dash-sidebar');
    var overlay = document.querySelector('.sidebar-overlay');
    var menuBtn = document.querySelector('.mobile-menu-btn');
    var closeBtn = document.querySelector('.sidebar-close');

    function openSidebar() {
        if (!sidebar) return;
        sidebar.classList.add('open');
        overlay && overlay.classList.add('show');
    }

    function closeSidebar() {
        if (!sidebar) return;
        sidebar.classList.remove('open');
        overlay && overlay.classList.remove('show');
    }

    menuBtn && menuBtn.addEventListener('click', openSidebar);
    closeBtn && closeBtn.addEventListener('click', closeSidebar);
    overlay && overlay.addEventListener('click', closeSidebar);

    var navLinks = document.querySelectorAll('.dash-nav a[data-tab]');
    var panels = document.querySelectorAll('[data-tab-panel]');
    var pageTitle = document.querySelector('[data-tab-title]');
    var pageDesc = document.querySelector('[data-tab-desc]');

    var TAB_META = {
        dashboard: { title: 'Welcome back', desc: "Here's what's happening today." },
        courses: { title: 'Courses', desc: 'Manage everything learners can enroll in.' },
        students: { title: 'Students', desc: 'Track enrollment and learner activity.' },
        instructors: { title: 'Instructors', desc: 'See who is teaching on Stackly.' },
        settings: { title: 'Settings', desc: 'Manage your account and preferences.' },
        mycourses: { title: 'My Courses', desc: 'Everything you are currently learning.' },
        progress: { title: 'Progress', desc: 'Your learning activity over time.' },
        certificates: { title: 'Certificates', desc: 'Credentials you have earned so far.' },
        messages: { title: 'Messages', desc: 'Conversations with instructors and support.' }
    };

    function activateTab(tab) {
        navLinks.forEach(function (a) { a.classList.toggle('active', a.dataset.tab === tab); });
        panels.forEach(function (p) { p.classList.toggle('active', p.dataset.tabPanel === tab); });

        var meta = TAB_META[tab];
        if (meta) {
            if (pageTitle) {
                var userName = pageTitle.dataset.userName;
                pageTitle.textContent = (tab === 'dashboard' && userName) ? ('Welcome back, ' + userName) : meta.title;
            }
            if (pageDesc) pageDesc.textContent = meta.desc;
        }

        if (typeof window.onTabActivate === 'function') {
            window.onTabActivate(tab);
        }

        closeSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            activateTab(link.dataset.tab);
        });
    });

    var initial = document.querySelector('.dash-nav a[data-tab].active');
    if (initial) {
        window.addEventListener('DOMContentLoaded', function () {
            if (typeof window.onTabActivate === 'function') {
                window.onTabActivate(initial.dataset.tab);
            }
        });
    }
})();