/* KGBV Mandu Ramgarh — Every Drop Counts | Vanilla JavaScript interactions */
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toast = $("#toast");
  let toastTimer;
  function notify(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }
  function refreshIcons() {
    if (window.lucide?.createIcons) window.lucide.createIcons();
  }
  refreshIcons();

  // Sticky header and accessible mobile navigation.
  const header = $(".site-header");
  const menuToggle = $("#menuToggle");
  const nav = $("#primaryNav");
  const closeMenu = () => {
    nav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  };
  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav?.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  });
  $$("#primaryNav a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
  const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Respect reduced-motion preference and reveal content as it enters view.
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));
  } else revealEls.forEach(el => el.classList.add("is-visible"));

  // Interactive water cycle.
  const cycleStages = {
    evaporation: ["01 · Evaporation", "The sun warms water in rivers, lakes and oceans. Some liquid water becomes vapour and rises into the atmosphere."],
    condensation: ["02 · Condensation", "As water vapour cools, it forms tiny droplets or ice crystals that gather into clouds."],
    precipitation: ["03 · Precipitation", "Water falls from clouds as rain, snow or other forms of precipitation, depending on atmospheric conditions."],
    infiltration: ["04 · Infiltration", "Some water soaks into the ground and may replenish soil moisture or groundwater, depending on local conditions."],
    runoff: ["05 · Runoff", "Water that flows over land can reach streams, rivers, lakes and the ocean. Healthy land helps reduce erosion and pollution."]
  };
  function activateCycle(stage) {
    const detail = $("#cycleDetail");
    const content = cycleStages[stage];
    if (!detail || !content) return;
    detail.innerHTML = `<b>${content[0]}</b><span>${content[1]}</span>`;
    $$(".cycle-point").forEach(point => {
      const active = point.dataset.stage === stage;
      point.classList.toggle("active", active);
      point.setAttribute("aria-pressed", String(active));
    });
  }
  $$(".cycle-point").forEach(point => {
    point.setAttribute("aria-pressed", String(point.classList.contains("active")));
    point.addEventListener("click", () => activateCycle(point.dataset.stage));
    point.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateCycle(point.dataset.stage);
      }
    });
  });

  // Conservation method tabs.
  const solutions = {
    home: {
      kicker: "01 — EVERYDAY PRACTICE", title: "Start where you are.",
      description: "Small, repeatable habits make water conservation part of daily life. Begin with the easiest changes and keep them consistent.",
      items: ["Turn taps off when water is not needed.", "Report leaks and repair them promptly.", "Use a bucket for suitable cleaning tasks.", "Reuse suitable leftover water for plants."],
      image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=1000&q=85",
      alt: "Water flowing from a tap into a basin"
    },
    rain: {
      kicker: "02 — CAPTURE THE RAIN", title: "Collect it. Use it wisely.",
      description: "A well-maintained rainwater system can store rain for suitable uses or direct it to a professionally designed recharge structure.",
      items: ["Keep roofs, gutters and screens clean.", "Use a suitable first-flush arrangement and filtration.", "Cover and maintain storage tanks.", "Separate untreated rainwater from drinking-water pipes."],
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=85",
      alt: "Water moving over a natural rocky surface"
    },
    farm: {
      kicker: "03 — SMARTER IRRIGATION", title: "Grow more thoughtfully.",
      description: "Water-efficient farming depends on crop, soil, climate and local resources. The right method is the one suited to the field.",
      items: ["Schedule irrigation based on crop needs.", "Consider drip or sprinkler systems where suitable.", "Use mulch to reduce soil moisture loss.", "Monitor soil moisture and avoid overwatering."],
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85",
      alt: "Green agricultural fields under an open sky"
    },
    school: {
      kicker: "04 — CAMPUS RESPONSIBILITY", title: "Make care a school habit.",
      description: "Students and staff can identify waste, report maintenance issues and build an everyday culture of water responsibility.",
      items: ["Create a simple leaking-tap reporting routine.", "Check tanks for overflow with an adult.", "Run water awareness and poster activities.", "Record actions and compare reliable meter readings."],
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85",
      alt: "Bright school classroom prepared for learning"
    }
  };
  const solutionPanel = $("#solutionPanel");
  function setSolution(key) {
    const data = solutions[key];
    if (!data || !solutionPanel) return;
    $$(".solution-tab").forEach(tab => {
      const active = tab.dataset.tab === key;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    solutionPanel.innerHTML = `
      <div class="solution-panel-copy">
        <span class="panel-kicker">${data.kicker}</span><h3>${data.title}</h3><p>${data.description}</p>
        <ul class="check-list">${data.items.map(item => `<li><i data-lucide="check-circle-2" aria-hidden="true"></i>${item}</li>`).join("")}</ul>
      </div>
      <div class="solution-panel-image"><img src="${data.image}" alt="${data.alt}" loading="lazy"><div class="image-stamp"><i data-lucide="droplet"></i><span>ONE GOOD HABIT<br>AT A TIME</span></div></div>`;
    refreshIcons();
  }
  $$(".solution-tab").forEach((tab, index, tabs) => {
    tab.addEventListener("click", () => setSolution(tab.dataset.tab));
    tab.addEventListener("keydown", event => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      tabs[next].focus();
      setSolution(tabs[next].dataset.tab);
    });
  });

  // Editable school action plan: client-side preview only, no server transmission.
  const actionForm = $("#actionForm");
  const planPreview = $("#planPreview");
  actionForm?.addEventListener("submit", event => {
    event.preventDefault();
    const value = id => $(`#${id}`).value.trim();
    const title = value("initiativeTitle") || "Untitled water conservation initiative";
    const rows = [
      ["Coordinator", value("initiativeOwner") || "Not specified"],
      ["Start date", value("initiativeStart") || "Not specified"],
      ["Target completion", value("initiativeEnd") || "Not specified"],
      ["Participation", value("initiativeStudents") || "Not specified"],
      ["Status", value("initiativeStatus")],
      ["Verified results / notes", value("initiativeResults") || "No results entered"]
    ];
    planPreview.innerHTML = `<h4>${escapeHTML(title)}</h4>${rows.map(([label, val]) => `<p><strong>${escapeHTML(label)}:</strong> ${escapeHTML(val)}</p>`).join("")}<p><strong>Reminder:</strong> Record only confirmed results; do not estimate unmeasured savings.</p>`;
    planPreview.hidden = false;
    planPreview.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
    notify("Action plan preview created on this device.");
  });
  actionForm?.addEventListener("reset", () => {
    if (planPreview) planPreview.hidden = true;
  });
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  }

  // Daily checklist and progress indicator (intentionally not persisted).
  const challengeBoxes = $$(".challenge-item input[type=checkbox]");
  function updateProgress() {
    const complete = challengeBoxes.filter(box => box.checked).length;
    const percent = challengeBoxes.length ? Math.round(complete / challengeBoxes.length * 100) : 0;
    $("#progressPercent").textContent = `${percent}%`;
    $("#progressRing").style.setProperty("--progress", `${percent * 3.6}deg`);
    $("#progressCaption").textContent = complete === 0 ? "Your water-saving journey starts here." :
      complete === challengeBoxes.length ? "Amazing — you've checked every commitment. Keep the habits going!" :
      `${complete} of ${challengeBoxes.length} commitments checked. Every action counts.`;
  }
  challengeBoxes.forEach(box => box.addEventListener("change", updateProgress));
  $("#resetChallenge")?.addEventListener("click", () => {
    challengeBoxes.forEach(box => { box.checked = false; });
    updateProgress();
    notify("Your checklist has been reset.");
  });
  updateProgress();

  // Pledge and print certificate. Name is not stored or transmitted.
  const pledgeForm = $("#pledgeForm");
  const certificateWrap = $("#certificateWrap");
  pledgeForm?.addEventListener("submit", event => {
    event.preventDefault();
    if (!$("#pledgeAgree").checked) {
      $("#pledgeAgree").focus();
      notify("Please confirm the pledge before continuing.");
      return;
    }
    const name = $("#pledgeName").value.trim();
    $("#certificateName").textContent = name || "A Water Conservation Champion";
    $("#certificateDate").textContent = new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date());
    certificateWrap.hidden = false;
    certificateWrap.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    refreshIcons();
    notify("Your pledge is complete. Your certificate is ready.");
  });
  $("#printCertificate")?.addEventListener("click", () => window.print());
  $("#resetPledge")?.addEventListener("click", () => {
    pledgeForm.reset();
    certificateWrap.hidden = true;
    $("#pledge").scrollIntoView({ behavior: "smooth", block: "start" });
    notify("You can make a new pledge whenever you're ready.");
  });

  // Quiz: one question at a time, immediate feedback, answer review and retake.
  const questions = [
    { q: "Which process turns liquid water into water vapour?", options: ["Condensation", "Evaporation", "Precipitation", "Infiltration"], answer: 1, explain: "Evaporation occurs when liquid water gains energy and becomes water vapour." },
    { q: "What is groundwater?", options: ["Water stored beneath Earth's surface", "Only water in oceans", "Rain falling from clouds", "Water inside plants only"], answer: 0, explain: "Groundwater is water beneath the land surface held in soil and rock spaces and aquifers." },
    { q: "What is the main purpose of rooftop rainwater harvesting?", options: ["Make every drop instantly drinkable", "Collect rain for suitable use or recharge", "Stop all rainfall runoff everywhere", "Replace all water treatment"], answer: 1, explain: "Rainwater can be collected for appropriate uses or recharge when the system is designed and maintained correctly." },
    { q: "Which action helps prevent water pollution?", options: ["Throwing plastic in a stream", "Pouring chemicals into drains", "Keeping waste out of water bodies", "Washing rubbish into a pond"], answer: 2, explain: "Proper waste disposal helps prevent contaminants from reaching rivers, ponds and groundwater." },
    { q: "What should you do when you notice a leaking school tap?", options: ["Ignore it", "Report it to a responsible adult", "Try to dismantle it alone", "Leave the tap running"], answer: 1, explain: "Report leaks promptly. Repairs should be handled by a responsible adult or qualified person." },
    { q: "Which method can deliver water directly near plant roots?", options: ["Drip irrigation", "Flooding every path", "Leaving a hose running", "Overwatering at midday"], answer: 0, explain: "Drip irrigation delivers water close to roots and can improve efficiency when properly designed and maintained." },
    { q: "Why is groundwater recharge important?", options: ["It guarantees unlimited water", "It can help replenish underground water stores", "It removes every contaminant", "It prevents all droughts"], answer: 1, explain: "Recharge can replenish groundwater, but the result depends on geology, water availability and quality." },
    { q: "Is untreated collected rainwater always safe to drink?", options: ["Yes, always", "Only when it looks clear", "No; suitable treatment and safety checks may be needed", "Yes, if stored in any open bucket"], answer: 2, explain: "Rainwater can collect contaminants. Drinking water must meet relevant safety standards." }
  ];
  let quizIndex = 0, quizScore = 0, quizAnswers = [], answered = false;
  const quizQuestion = $("#quizQuestion"), quizOptions = $("#quizOptions"), quizFeedback = $("#quizFeedback"), quizNext = $("#quizNext");
  function renderQuestion() {
    answered = false;
    const item = questions[quizIndex];
    $("#quizArea").hidden = false;
    $("#quizResult").hidden = true;
    $("#quizCounter").textContent = `QUESTION ${String(quizIndex + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
    $("#quizProgress").style.width = `${(quizIndex / questions.length) * 100}%`;
    quizQuestion.textContent = item.q;
    quizOptions.innerHTML = "";
    quizFeedback.textContent = "";
    quizFeedback.className = "quiz-feedback";
    quizNext.disabled = true;
    quizNext.innerHTML = quizIndex === questions.length - 1 ? 'View my result <i data-lucide="arrow-right"></i>' : 'Next question <i data-lucide="arrow-right"></i>';
    item.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.innerHTML = `<span>${String.fromCharCode(65 + index)}</span><b>${escapeHTML(option)}</b>`;
      button.addEventListener("click", () => answerQuestion(index));
      quizOptions.appendChild(button);
    });
    refreshIcons();
  }
  function answerQuestion(selected) {
    if (answered) return;
    answered = true;
    const item = questions[quizIndex];
    const correct = selected === item.answer;
    if (correct) quizScore++;
    quizAnswers.push({ selected, correct });
    $$(".quiz-option", quizOptions).forEach((button, index) => {
      button.disabled = true;
      if (index === item.answer) button.classList.add("correct");
      if (index === selected && !correct) button.classList.add("wrong");
    });
    quizFeedback.textContent = `${correct ? "Correct! " : "Not quite. "}${item.explain}`;
    quizFeedback.classList.add(correct ? "good" : "bad");
    quizNext.disabled = false;
  }
  function finishQuiz() {
    $("#quizArea").hidden = true;
    $("#quizResult").hidden = false;
    $("#quizProgress").style.width = "100%";
    $("#quizCounter").textContent = "QUIZ COMPLETE";
    const percent = Math.round(quizScore / questions.length * 100);
    $("#quizScoreTitle").textContent = percent >= 80 ? "Water wisdom unlocked!" : percent >= 50 ? "Good work — keep learning." : "A good start. Try again!";
    $("#quizScoreText").textContent = `You answered ${quizScore} out of ${questions.length} questions correctly (${percent}%). Understanding water is one step toward protecting it.`;
    $("#quizReview").innerHTML = questions.map((question, index) => {
      const answer = quizAnswers[index];
      return `<div class="review-row"><b>${index + 1}. ${escapeHTML(question.q)} ${answer?.correct ? "✓" : "—"}</b><span>Correct answer: ${escapeHTML(question.options[question.answer])}. ${escapeHTML(question.explain)}</span></div>`;
    }).join("");
  }
  quizNext?.addEventListener("click", () => {
    if (!answered) return;
    if (quizIndex < questions.length - 1) { quizIndex++; renderQuestion(); }
    else finishQuiz();
  });
  $("#quizRestart")?.addEventListener("click", () => {
    quizIndex = 0; quizScore = 0; quizAnswers = []; answered = false; renderQuestion();
  });
  renderQuestion();

  // Copy slogans using Clipboard API with a graceful fallback.
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed"; textarea.style.opacity = "0";
        document.body.appendChild(textarea); textarea.select();
        const ok = document.execCommand("copy"); textarea.remove();
        if (!ok) throw new Error("Copy unavailable");
      }
      $("#copyStatus").textContent = `Copied: “${text}”`;
      notify("Slogan copied to clipboard.");
    } catch {
      $("#copyStatus").textContent = `Select and copy this slogan: ${text}`;
      notify("Automatic copy isn't available. Slogan shown below the cards.");
    }
  }
  $$(".slogan-card").forEach(card => card.addEventListener("click", () => copyText(card.dataset.slogan)));

  // FAQ accordion: keep one answer open at a time for a tidy reading experience.
  $$(".faq-list details").forEach(detail => detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    $$(".faq-list details").forEach(other => { if (other !== detail) other.open = false; });
  }));

  // Footer year.
  $("#currentYear").textContent = new Date().getFullYear();
})();