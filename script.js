// SCRIPTS - XÂY DỰNG BA PHƯỚC

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. HEADER SCROLL EFFECT
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. MOBILE MENU TOGGLE
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Simple toggle styling for mobile
      if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#090d16';
        navLinks.style.padding = '20px 24px';
        navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        navLinks.style.gap = '20px';
      } else {
        navLinks.style.display = '';
      }
    });
  }

  // Close mobile menu when a link is clicked
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navLinks.style.display = '';
      }
    });
  });

  // 3. DARK/LIGHT MODE TOGGLE
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const darkIcon = themeToggle.querySelector('.mode-icon-dark');
    const lightIcon = themeToggle.querySelector('.mode-icon-light');

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      if (darkIcon) darkIcon.style.display = 'none';
      if (lightIcon) lightIcon.style.display = 'inline-block';
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      if (isDark) {
        if (darkIcon) darkIcon.style.display = 'none';
        if (lightIcon) lightIcon.style.display = 'inline-block';
      } else {
        if (darkIcon) darkIcon.style.display = 'inline-block';
        if (lightIcon) lightIcon.style.display = 'none';
      }
    });
  }

  // 4. FAQ ACCORDION LOGIC
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
      });

      // Toggle current FAQ
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. PORTFOLIO FILTER & LIGHTBOX
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-cat');
      projectCards.forEach(card => {
        if (cat === 'tat-ca' || card.getAttribute('data-cat') === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.project-img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
    
    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

  // 6. TESTIMONIALS & REVIEWS SYSTEM (LOCALSTORAGE)
  const defaultReviews = [
    {
      name: "Anh Tuấn (Phường Ba Ngòi)",
      rating: 5,
      content: "Tôi rất hài lòng khi giao trọn gói ngôi nhà phố cho bác Phước thi công. Thợ làm việc rất kỹ lưỡng từ khâu đổ móng đến xây tô hoàn thiện. Đúng tiến độ cam kết và không phát sinh chi phí nào ngoài hợp đồng.",
      date: "12/04/2026"
    },
    {
      name: "Chị Hà (Phường Cam Lộc)",
      rating: 5,
      content: "Bác thầu Ba Phước rất tận tâm. Gia đình tôi xây nhà cấp 4 gác lửng, bác tư vấn phong thủy rất chuẩn hướng và cách bài trí phòng ốc. Đội thợ địa phương lịch sự, dọn dẹp sạch sẽ sau mỗi ngày làm việc.",
      date: "05/01/2026"
    },
    {
      name: "Anh Bình (Phường Cam Thuận)",
      rating: 5,
      content: "Nhà xây xong ai đi qua cũng khen đẹp và kiên cố. Cảm ơn thầu Ba Phước đã trực tiếp giám sát sát sao công trình mỗi ngày. Giá cả báo rất rõ ràng và chuẩn vật tư.",
      date: "28/11/2025"
    }
  ];

  function loadReviews() {
    const listContainer = document.getElementById('reviews-list');
    if (!listContainer) return;

    let savedReviews = [];
    try {
      savedReviews = JSON.parse(localStorage.getItem('ba_phuoc_reviews')) || [];
    } catch (e) {
      savedReviews = [];
    }

    // Combine default and saved reviews
    const allReviews = [...savedReviews, ...defaultReviews];
    listContainer.innerHTML = '';

    allReviews.forEach(rev => {
      const card = document.createElement('div');
      card.className = 'review-card';
      
      let starsHTML = '';
      for (let i = 1; i <= 5; i++) {
        starsHTML += i <= rev.rating ? '★' : '☆';
      }

      card.innerHTML = `
        <div class="review-header">
          <span class="reviewer-name">${escapeHTML(rev.name)}</span>
          <span class="review-stars">${starsHTML}</span>
        </div>
        <p class="review-content">"${escapeHTML(rev.content)}"</p>
        <span class="review-date">${rev.date}</span>
      `;
      listContainer.appendChild(card);
    });
  }

  // Submit Review Form
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('rev-name');
      const contentInput = document.getElementById('rev-content');
      const ratingChecked = document.querySelector('input[name="rating"]:checked');

      if (!nameInput || !contentInput || !nameInput.value.trim() || !contentInput.value.trim()) {
        alert('Vui lòng điền tên và nội dung đánh giá của bạn.');
        return;
      }

      const rating = ratingChecked ? parseInt(ratingChecked.value) : 5;
      const today = new Date();
      const dateString = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

      const newReview = {
        name: nameInput.value.trim(),
        rating: rating,
        content: contentInput.value.trim(),
        date: dateString
      };

      // Save to LocalStorage
      let savedReviews = [];
      try {
        savedReviews = JSON.parse(localStorage.getItem('ba_phuoc_reviews')) || [];
      } catch (err) {
        savedReviews = [];
      }
      
      savedReviews.unshift(newReview); // Put new review at the top
      localStorage.setItem('ba_phuoc_reviews', JSON.stringify(savedReviews));

      // Reset form
      reviewForm.reset();
      
      // Reload reviews
      loadReviews();

      // Show Success Toast
      showToastAlert('Cảm ơn bác/anh/chị đã gửi đánh giá quý báu!');
    });
  }

  // Pre-load reviews on start
  loadReviews();

  // 7. CONTACT FORM SUBMISSION (EMAIL REDIRECTION)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const serviceSelect = document.getElementById('contact-service');
      const service = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : '';
      const desc = document.getElementById('contact-message').value.trim();

      // Construct mailto link
      const emailRecipient = "xaydungbaphuoc@gmail.com";
      const subject = encodeURIComponent(`Yêu cầu tư vấn xây dựng - ${name}`);
      const body = encodeURIComponent(
        `Kính gửi Nhà thầu Ba Phước,\n\n` +
        `Tôi gửi yêu cầu tư vấn xây dựng từ Website với thông tin sau:\n` +
        `- Họ và tên: ${name}\n` +
        `- Số điện thoại (Zalo): ${phone}\n` +
        `- Dịch vụ quan tâm: ${service}\n` +
        `- Nội dung chi tiết:\n${desc}\n\n` +
        `Rất mong nhận được phản hồi từ anh/chị.`
      );

      // Open email client with prefilled info
      window.open(`mailto:${emailRecipient}?subject=${subject}&body=${body}`, '_self');

      // Show success toast with Zalo option
      showToastAlert(`Đang mở ứng dụng email để gửi đến xaydungbaphuoc@gmail.com! Hoặc nhắn Zalo 090.720.5588 để phản hồi nhanh nhất.`);
      
      contactForm.reset();
    });
  }

  // Toast alert system helper
  function showToastAlert(msg) {
    const toast = document.getElementById('toast-alert');
    if (toast) {
      toast.innerText = msg;
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 5000);
    }
  }

  // HTML escaping helper
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
});
