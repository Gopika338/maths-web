/**
 * OPTIMIZATION TECHNIQUES (JMA2501) - REGULATION 2023
 * Core Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      mobileToggle.classList.toggle('is-active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking outside
    document.addEventListener('click', (event) => {
      if (!mobileToggle.contains(event.target) && !mainNav.contains(event.target) && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Interactive Search System
  const searchInput = document.getElementById('siteSearchInput');
  const searchResultsDropdown = document.getElementById('searchResultsDropdown');

  if (searchInput && searchResultsDropdown) {
    const searchData = [
      {
        title: "Unit I: Linear Programming",
        category: "Unit",
        url: "units.html#unit1",
        keywords: ["unit i", "unit 1", "linear programming", "simplex", "big-m", "duality", "graphical method", "lpp"]
      },
      {
        title: "Unit II: Transportation and Assignment",
        category: "Unit",
        url: "units.html#unit2",
        keywords: ["unit ii", "unit 2", "transportation", "assignment", "hungarian", "modi", "vam", "north west corner", "least cost"]
      },
      {
        title: "Unit III: Non-Linear Programming",
        category: "Unit",
        url: "units.html#unit3",
        keywords: ["unit iii", "unit 3", "non-linear programming", "nonlinear", "lagrangian", "kuhn-tucker", "kkt", "hessian"]
      },
      {
        title: "Unit IV: Dynamic Programming & Game Theory",
        category: "Unit",
        url: "units.html#unit4",
        keywords: ["unit iv", "unit 4", "dynamic programming", "game theory", "bellman", "saddle point", "dominance", "capital budgeting"]
      },
      {
        title: "Unit V: Queueing Models",
        category: "Unit",
        url: "units.html#unit5",
        keywords: ["unit v", "unit 5", "queueing models", "queuing", "waiting lines", "m/m/1", "little's equations", "fifo"]
      },
      {
        title: "Unit I Notes (PDF)",
        category: "Notes",
        url: "notes.html#unit1",
        keywords: ["notes", "unit 1 notes", "linear programming notes", "pdf"]
      },
      {
        title: "Unit II Notes (PDF)",
        category: "Notes",
        url: "notes.html#unit2",
        keywords: ["notes", "unit 2 notes", "transportation notes", "pdf"]
      },
      {
        title: "Unit III Notes (PDF)",
        category: "Notes",
        url: "notes.html#unit3",
        keywords: ["notes", "unit 3 notes", "non-linear notes", "pdf"]
      },
      {
        title: "Unit IV Notes (PDF)",
        category: "Notes",
        url: "notes.html#unit4",
        keywords: ["notes", "unit 4 notes", "dynamic programming notes", "game theory notes", "pdf"]
      },
      {
        title: "Unit V Notes (PDF)",
        category: "Notes",
        url: "notes.html#unit5",
        keywords: ["notes", "unit 5 notes", "queueing notes", "pdf"]
      },
      {
        title: "Unit I Question Bank (PDF)",
        category: "Question Bank",
        url: "question-bank.html#unit1",
        keywords: ["question bank", "qb", "unit 1 question bank", "linear programming qb", "unit 1 qb"]
      },
      {
        title: "Unit II Question Bank (PDF)",
        category: "Question Bank",
        url: "question-bank.html#unit2",
        keywords: ["question bank", "qb", "unit 2 question bank", "transportation qb", "unit 2 qb"]
      },
      {
        title: "Unit III Question Bank (PDF)",
        category: "Question Bank",
        url: "question-bank.html#unit3",
        keywords: ["question bank", "qb", "unit 3 question bank", "non-linear qb", "unit 3 qb"]
      },
      {
        title: "Unit IV Question Bank (PDF)",
        category: "Question Bank",
        url: "question-bank.html#unit4",
        keywords: ["question bank", "qb", "unit 4 question bank", "game theory qb", "dynamic programming qb"]
      },
      {
        title: "Unit V Question Bank (PDF)",
        category: "Question Bank",
        url: "question-bank.html#unit5",
        keywords: ["question bank", "qb", "unit 5 question bank", "queueing qb", "unit 5 qb"]
      },
      {
        title: "All Lecture Notes",
        category: "Notes",
        url: "notes.html",
        keywords: ["notes", "all notes", "lecture notes", "download notes"]
      },
      {
        title: "All Question Banks",
        category: "Question Bank",
        url: "question-bank.html",
        keywords: ["question bank", "qb", "all question banks", "download qb"]
      },
      {
        title: "All the Best (Exam Preparation & Tips)",
        category: "All the Best",
        url: "all-the-best.html",
        keywords: ["all the best", "exam preparation", "motivation", "study smart", "goals", "tips"]
      }
    ];

    const performSearch = (query) => {
      const q = query.trim().toLowerCase();
      if (!q) {
        searchResultsDropdown.innerHTML = '';
        searchResultsDropdown.style.display = 'none';
        return;
      }

      const matches = searchData.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const categoryMatch = item.category.toLowerCase().includes(q);
        const keywordMatch = item.keywords.some(k => k.includes(q) || q.includes(k));
        return titleMatch || categoryMatch || keywordMatch;
      });

      if (matches.length === 0) {
        searchResultsDropdown.innerHTML = `
          <div style="padding: 16px 20px; color: #64748B; font-size: 0.95rem; text-align: center;">
            No direct matches found for "<strong>${escapeHtml(query)}</strong>". Try searching for <em>Unit I</em>, <em>Notes</em>, or <em>Question Bank</em>.
          </div>
        `;
        searchResultsDropdown.style.display = 'block';
        return;
      }

      searchResultsDropdown.innerHTML = matches.map(item => `
        <a href="${item.url}" class="search-result-item" style="text-decoration:none; display:flex;">
          <span class="result-title">${item.title}</span>
          <span class="result-type">${item.category}</span>
        </a>
      `).join('');
      searchResultsDropdown.style.display = 'block';
    };

    const escapeHtml = (text) => {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    };

    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });

    searchInput.addEventListener('focus', (e) => {
      if (e.target.value.trim()) {
        performSearch(e.target.value);
      }
    });

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResultsDropdown.contains(e.target)) {
        searchResultsDropdown.style.display = 'none';
      }
    });

    // Handle Enter key
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const firstResult = searchResultsDropdown.querySelector('.search-result-item');
        if (firstResult) {
          window.location.href = firstResult.getAttribute('href');
        }
      }
    });
  }
});
