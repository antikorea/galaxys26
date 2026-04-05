document.addEventListener('DOMContentLoaded', () => {
    // 1. Form Submission (Premium Handler)
    const form = document.getElementById('applicationForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            if (!data.name || !data.phone_prefix || !data.phone_middle || !data.phone_last) {
                alert('정보를 정확히 입력해주세요.');
                return;
            }

            const submitBtn = form.querySelector('.btn-full');
            submitBtn.disabled = true;
            submitBtn.innerText = '신청 접수 중...';
            
            // Save lead to localStorage for Admin Dashboard
            let leads = [];
            try {
                leads = JSON.parse(localStorage.getItem('galaxy_leads') || '[]');
                if (!Array.isArray(leads)) {
                    leads = [];
                }
            } catch (e) {
                console.warn('Existing leads corrupted, resetting...', e);
                leads = [];
            }

            try {
                const newLead = {
                    id: Date.now(),
                    timestamp: new Date().toLocaleString('ko-KR'),
                    ...data
                };
                leads.push(newLead);
                localStorage.setItem('galaxy_leads', JSON.stringify(leads));
                console.log('Lead Persisted locally (Root Origin):', newLead);
            } catch (e) {
                console.error('Local storage save failure:', e);
            }
            
            // Success Message
            setTimeout(() => {
                alert('최저가 상담 신청이 성공적으로 접수되었습니다. 전문 상담사가 가장 유리한 혜택으로 곧 안내드릴 예정입니다.');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = '신청하기';
            }, 1000);
        });
    }

    // 2. Entrance Animations (Premium Reveal)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Targets for reveal
    const revealTargets = document.querySelectorAll('.showroom-item, .b-block, .form-card, .main-title, .hero-img');
    revealTargets.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // Style for reveal
    const revealStyle = document.createElement('style');
    revealStyle.innerText = `
        .is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(revealStyle);

    // 3. Floating Button Logic (Removed per user request)

    // 4. Modal handling
    const viewPrivacy = document.getElementById('viewPrivacy');
    const privacyModal = document.getElementById('privacyModal');
    const closeBtn = document.querySelector('.close-modal');

    if (viewPrivacy && privacyModal) {
        viewPrivacy.addEventListener('click', (e) => {
            e.preventDefault();
            privacyModal.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            privacyModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target == privacyModal) {
                privacyModal.style.display = 'none';
            }
        });
    }

    // 5. Phone Autofocus
    const phoneMiddle = document.querySelector('input[name="phone_middle"]');
    const phoneLast = document.querySelector('input[name="phone_last"]');

    if (phoneMiddle && phoneLast) {
        phoneMiddle.addEventListener('input', () => {
            if (phoneMiddle.value.length >= 4) phoneLast.focus();
        });
    }

    // 6. Interactive Showroom Selection
    const showroomItems = document.querySelectorAll('.showroom-item');
    showroomItems.forEach(item => {
        item.addEventListener('click', () => {
            const model = item.getAttribute('data-model');
            
            // Remove previous selection
            showroomItems.forEach(i => i.classList.remove('is-selected'));
            
            // Add current selection
            item.classList.add('is-selected');

            // Sync with Form
            const formRadio = document.querySelector(`input[name="model"][value="${model}"]`);
            if (formRadio) {
                formRadio.checked = true;
                
                // Optional: Gentle visual hint that form was updated
                const formSection = document.getElementById('leads-form');
                formSection.style.boxShadow = '0 0 20px rgba(0, 85, 255, 0.2)';
                setTimeout(() => formSection.style.boxShadow = 'none', 1000);
            }
        });
    });
});
