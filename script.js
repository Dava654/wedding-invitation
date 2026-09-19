// Local AJAX Handler Mock for RSVP and WordPress endpoints
(function () {
  function hookJQuery() {
    if (window.jQuery && window.jQuery.ajaxPrefilter) {
      window.jQuery.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (options.url && (options.url.indexOf('admin-ajax.php') !== -1 || options.url.indexOf('waktutemu') !== -1 || options.url.indexOf('/api/ajax') !== -1)) {
          options.url = '/api/ajax';
        }
      });
    } else {
      setTimeout(hookJQuery, 30);
    }
  }
  hookJQuery();
})();

// Failsafe: Pastikan semua elemen konten undangan langsung tampil dan tidak tersangkut invisible
(function () {
  function revealAllContent() {
    var invisibles = document.querySelectorAll('.elementor-invisible:not(#eltemplate-amplop)');
    for (var i = 0; i < invisibles.length; i++) {
      invisibles[i].classList.remove('elementor-invisible');
    }
    // Catatan: fx-elements TIDAK langsung diaktifkan di sini agar animasi scroll bekerja.
    // Animasi scroll akan diaktifkan via triggerFxAnimations() saat scroll terjadi.
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealAllContent);
  } else {
    revealAllContent();
  }
  window.addEventListener('load', revealAllContent);
})();

/**
 * Script Undangan Digital - Andri & Dina
 * Dipisahkan dari anjay.html
 */

/* ==========================================================================
   1. KONFIGURASI GLOBAL & RUNTIME VENDOR (WordPress / Elementor / Plugins)
   ========================================================================== */

// Konfigurasi Ajax / PowerPack
window.pp = {
  "ajax_url": "/api/ajax"
};

// Konfigurasi Audio WdsAudio
window.WdsAudio = {
  "source": "url",
  "audio_link": "sound.mp3",
  "audio_start": "",
  "audio_end": "",
  "autoplay": false
};

// Konfigurasi ElTemplate
window._eltemplateobject = {
  "ajaxurl": "/api/ajax",
  "home_url": "",
  "site_url": "",
  "site_title": "Undangan Digital Andri & Dina",
  "code_nonce": "7c9870798c",
  "member_area": "https://member.eltemplate.vip/",
  "nonce_key": "_eltemplate_nonce",
  "_eltemplate_nonce": "da137db384",
  "is_admin": "",
  "page": "eltemplate-license"
};

// Konfigurasi Page Scroll to ID
window.mPS2id_params = {
  "instances": {
    "mPS2id_instance_0": {
      "selector": "a[href*='#']:not([href='#'])",
      "autoSelectorMenuLinks": "true",
      "excludeSelector": "a[href^='#tab-'], a[href^='#tabs-'], a[data-toggle]:not([data-toggle='tooltip']), a[data-slide], a[data-vc-tabs], a[data-vc-accordion], a.screen-reader-text.skip-link",
      "scrollSpeed": 2500,
      "autoScrollSpeed": "true",
      "scrollEasing": "easeInOutCubic",
      "scrollingEasing": "easeInOutCubic",
      "forceScrollEasing": "false",
      "pageEndSmoothScroll": "true",
      "stopScrollOnUserAction": "false",
      "autoCorrectScroll": "false",
      "autoCorrectScrollExtend": "false",
      "layout": "vertical",
      "offset": 0,
      "dummyOffset": "false",
      "highlightSelector": "",
      "clickedClass": "mPS2id-clicked",
      "targetClass": "mPS2id-target",
      "highlightClass": "mPS2id-highlight",
      "forceSingleHighlight": "false",
      "keepHighlightUntilNext": "false",
      "highlightByNextTarget": "false",
      "appendHash": "false",
      "scrollToHash": "false",
      "scrollToHashForAll": "false",
      "scrollToHashDelay": 0,
      "scrollToHashUseElementData": "false",
      "scrollToHashRemoveUrlHash": "true",
      "disablePluginBelow": 0,
      "adminDisplayWidgetsId": "true",
      "adminTinyMCEbuttons": "true",
      "unbindUnrelatedClickEvents": "false",
      "unbindUnrelatedClickEventsSelector": "",
      "normalizeAnchorPointTargets": "false",
      "encodeLinks": "false"
    }
  },
  "total_instances": "1",
  "shortcode_class": "_ps2id"
};

// Konfigurasi RSVP & Komentar
window.WDS_RSVP = {
  "ajaxurl": "/api/ajax",
  "nonce": "7652429cf3",
  "jPagesNum": "5",
  "textCounterNum": "300",
  "thanksComment": "Terima kasih atas ucapan Anda!",
  "duplicateComment": "Anda mungkin membiarkan salah satu kolom kosong, atau menggandakan komentar.",
  "guestMax": "5",
  "textNavNext": "Next",
  "textNavPrev": "Previous"
};

// Konfigurasi Elementor Frontend
window.elementorFrontendConfig = {
  "environmentMode": { "edit": false, "wpPreview": false, "isScriptDebug": false },
  "i18n": {
    "shareOnFacebook": "Bagikan di Facebook",
    "shareOnX": "Share on X",
    "pinIt": "Buat Pin",
    "download": "Unduh",
    "downloadImage": "Unduh gambar",
    "fullscreen": "Layar Penuh",
    "zoom": "Perbesar",
    "share": "Bagikan",
    "playVideo": "Putar Video",
    "previous": "Sebelumnya",
    "next": "Selanjutnya",
    "close": "Tutup",
    "a11yCarouselPrevSlideMessage": "Slide sebelumnya",
    "a11yCarouselNextSlideMessage": "Slide selanjutnya",
    "a11yCarouselFirstSlideMessage": "This is the first slide",
    "a11yCarouselLastSlideMessage": "This is the last slide",
    "a11yCarouselPaginationBulletMessage": "Go to slide"
  },
  "is_rtl": false,
  "breakpoints": { "xs": 0, "sm": 480, "md": 768, "lg": 1025, "xl": 1440, "xxl": 1600 },
  "responsive": {
    "breakpoints": {
      "mobile": { "label": "Mobile Portrait", "value": 767, "default_value": 767, "direction": "max", "is_enabled": true },
      "mobile_extra": { "label": "Mobile Landscape", "value": 880, "default_value": 880, "direction": "max", "is_enabled": false },
      "tablet": { "label": "Tablet Portrait", "value": 1024, "default_value": 1024, "direction": "max", "is_enabled": true },
      "tablet_extra": { "label": "Tablet Landscape", "value": 1200, "default_value": 1200, "direction": "max", "is_enabled": false },
      "laptop": { "label": "Laptop", "value": 1366, "default_value": 1366, "direction": "max", "is_enabled": false },
      "widescreen": { "label": "Layar lebar", "value": 2400, "default_value": 2400, "direction": "min", "is_enabled": false }
    },
    "hasCustomBreakpoints": false
  },
  "version": "4.2.1",
  "is_static": false,
  "experimentalFeatures": {
    "additional_custom_breakpoints": true,
    "container": true,
    "e_panel_promotions": true,
    "theme_builder_v2": true,
    "hello-theme-header-footer": true,
    "nested-elements": true,
    "global_classes_should_enforce_capabilities": true,
    "e_variables": true,
    "e_opt_in_v4_page": true,
    "e_components": true,
    "e_interactions": true,
    "e_widget_creation": true,
    "import-export-customization": true,
    "e_pro_atomic_form": true,
    "e_pro_collection_loop": true,
    "e_pro_variables": true,
    "e_pro_interactions": true
  },
  "urls": {
    "assets": "https://waktutemu.id/wp-content/plugins/elementor/assets/",
    "ajaxurl": "/api/ajax",
    "uploadUrl": "https://waktutemu.id/wp-content/uploads"
  },
  "nonces": {
    "floatingButtonsClickTracking": "666430719b",
    "atomicFormsSendForm": "5f62554181"
  },
  "swiperClass": "swiper",
  "settings": { "page": [], "editorPreferences": [] },
  "kit": {
    "active_breakpoints": ["viewport_mobile", "viewport_tablet"],
    "global_image_lightbox": "yes",
    "lightbox_enable_counter": "yes",
    "lightbox_enable_fullscreen": "yes",
    "lightbox_enable_zoom": "yes",
    "lightbox_enable_share": "yes",
    "hello_header_logo_type": "logo",
    "hello_footer_logo_type": "logo"
  },
  "post": {
    "id": 67044,
    "title": "Andri%20%26%20Dina%2C%2002%20Oktober%202026",
    "excerpt": "",
    "featuredImage": "https://waktutemu.id/wp-content/uploads/jet-form-builder/ab72b2cdbc3510d81aad2e57ff1645b2/2026/08/cropped_image_1786431249329.jpeg"
  }
};

// Konfigurasi Elementor Pro Frontend
window.ElementorProFrontendConfig = {
  "ajaxurl": "/api/ajax",
  "nonce": "eb1a07bd59",
  "urls": {
    "assets": "https://waktutemu.id/wp-content/plugins/elementor-pro/assets/",
    "rest": "/api/rest/"
  },
  "settings": { "lazy_load_background_images": true },
  "popup": { "hasPopUps": false },
  "shareButtonsNetworks": {
    "facebook": { "title": "Facebook", "has_counter": true },
    "twitter": { "title": "Twitter" },
    "linkedin": { "title": "LinkedIn", "has_counter": true },
    "pinterest": { "title": "Pinterest", "has_counter": true },
    "reddit": { "title": "Reddit", "has_counter": true },
    "vk": { "title": "VK", "has_counter": true },
    "odnoklassniki": { "title": "OK", "has_counter": true },
    "tumblr": { "title": "Tumblr" },
    "digg": { "title": "Digg" },
    "skype": { "title": "Skype" },
    "stumbleupon": { "title": "StumbleUpon", "has_counter": true },
    "mix": { "title": "Mix" },
    "telegram": { "title": "Telegram" },
    "pocket": { "title": "Pocket", "has_counter": true },
    "xing": { "title": "XING", "has_counter": true },
    "whatsapp": { "title": "WhatsApp" },
    "email": { "title": "Email" },
    "print": { "title": "Print" },
    "x-twitter": { "title": "X" },
    "threads": { "title": "Threads" }
  },
  "facebook_sdk": { "lang": "id_ID", "app_id": "" },
  "lottie": {
    "defaultAnimationUrl": "mouse.json"
  }
};


// Reset scroll position & disable automatic browser hash scroll on load
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
if (window.location.hash) {
  try {
    history.replaceState(null, null, window.location.pathname + window.location.search);
  } catch (e) { }
}
window.scrollTo(0, 0);

function disableScrolling() {
  document.documentElement.classList.add('cover-locked');
  document.body.classList.add('cover-locked');
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function enableScrolling() {
  document.documentElement.classList.remove('cover-locked');
  document.body.classList.remove('cover-locked');
  document.documentElement.style.overflow = '';
  document.documentElement.style.height = '';
  document.documentElement.style.touchAction = '';
  document.body.style.overflow = '';
  document.body.style.overflowY = '';
  document.body.style.height = '';
  document.body.style.touchAction = '';
  window.onscroll = null;
  if (typeof triggerFxAnimations === 'function') {
    triggerFxAnimations();
  }
}

var isInvitationOpened = false;
var isAudioManuallyPaused = false;

function updateMusicButtonUI(isPlaying) {
  var btn = document.getElementById('wedding-music-floating');
  if (!btn) return;
  var iconPlaying = btn.querySelector('.icon-music-playing');
  var iconPaused = btn.querySelector('.icon-music-paused');
  if (isPlaying) {
    btn.classList.add('playing');
    btn.classList.remove('paused');
    if (iconPlaying) iconPlaying.style.display = 'block';
    if (iconPaused) iconPaused.style.display = 'none';
  } else {
    btn.classList.remove('playing');
    btn.classList.add('paused');
    if (iconPlaying) iconPlaying.style.display = 'none';
    if (iconPaused) iconPaused.style.display = 'block';
  }
}

function playAudio() {
  var song = document.getElementById("song");
  if (song && document.body.contains(song)) {
    var playPromise = song.play();
    if (playPromise !== undefined) {
      playPromise.then(function () {
        updateMusicButtonUI(true);
      }).catch(function (error) {
        console.log("Audio autoplay dicegah browser:", error);
        updateMusicButtonUI(false);
      });
    }
  }
}

function pauseAudio() {
  var song = document.getElementById("song");
  if (song) {
    song.pause();
    updateMusicButtonUI(false);
  }
}

function toggleAudio() {
  var song = document.getElementById("song");
  if (!song) return;
  if (song.paused) {
    isAudioManuallyPaused = false;
    playAudio();
  } else {
    isAudioManuallyPaused = true;
    pauseAudio();
  }
}


/* ==========================================================================
   3. INISIALISASI HALAMAN & EVENT LISTENER UTAMA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  // Dynamic Guest Name from URL (?to=... / ?u=... / ?guest=...)
  function applyGuestName() {
    try {
      var search = window.location.search;
      if (!search) return;
      var p = new URLSearchParams(search);
      var g = p.get('to') || p.get('u') || p.get('guest');
      if (search.indexOf('?to=') === 0) {
        var rawTo = search.substring(4);
        if (rawTo.indexOf('&') !== -1 && !search.includes('&comments=') && !search.includes('&post_id=')) {
          g = rawTo;
        }
      }
      if (!g) return;
      g = g.replace(/\+/g, ' ');
      try { g = decodeURIComponent(g); } catch (e) { }
      if (g.indexOf('%') !== -1) {
        try { g = decodeURIComponent(g); } catch (e) { }
      }
      g = g.trim();
      if (!g) return;

      document.title = "Andri & Dina - The Wedding (" + g + ")";
      var targets = document.querySelectorAll('#guest-name-target, .elementor-element-10981070 .elementor-heading-title, [data-guest-name]');
      targets.forEach(function (el) {
        el.textContent = g;
      });
      var rsvpInputs = document.querySelectorAll('#rsvpName, input[name="saic_author"], input[placeholder="Nama Anda"], #saic-comment-author');
      rsvpInputs.forEach(function (input) {
        if (!input.value) input.value = g;
      });
    } catch (e) { }
  }
  applyGuestName();
  window.addEventListener('load', applyGuestName);

  // 1. Set locale i18n jika tersedia
  if (window.wp && window.wp.i18n) {
    window.wp.i18n.setLocaleData({ 'text direction\u0004ltr': ['ltr'] });
  }

  // 2. Pembersihan Loader APX
  var loader = document.getElementById('apxPageLoader');
  if (loader) {
    loader.remove();
  }
  setTimeout(function () {
    document.body.classList.remove('apx-lock');
  }, 100);

  // 3. Tombol Buka Undangan (btnOpens & Motion Section)
  var isEditorActive = document.body.classList.contains('elementor-editor-active');
  var delaySection = 0;
  var kolomPertama = document.querySelector('.kolomPertama');
  var videoCover = document.querySelector('.motionSection .elementor-background-video-container video');
  var motionItemsAnimated = false;

  function triggerMotionAnimations() {
    if (motionItemsAnimated) return;
    motionItemsAnimated = true;

    var items = [
      { sel: '.elementor-element-motion-monogram', animClass: 'anim-in-zoom', delay: 0 },
      { sel: '.elementor-element-78860cb6', animClass: 'anim-in-zoom', delay: 180 },
      { sel: '.elementor-element-4be25d58', animClass: 'anim-in-zoom', delay: 360 },
      { sel: '.elementor-element-f146e6f', animClass: 'anim-in-zoom', delay: 540 },
      { sel: '.elementor-element-3dc9c368', animClass: 'anim-in-up', delay: 720 }
    ];

    items.forEach(function (it) {
      setTimeout(function () {
        var el = document.querySelector('.motionSection ' + it.sel);
        if (el) {
          el.classList.remove('motion-item-hidden');
          el.classList.add(it.animClass);
        }
      }, it.delay);
    });
  }

  function bindMotionVideo() {
    var vid = document.querySelector('.motionSection .elementor-background-video-container video');
    if (vid) {
      vid.removeAttribute('autoplay');
      vid.addEventListener('timeupdate', function () {
        if (vid.currentTime >= 12.5) {
          triggerMotionAnimations();
        }
      });
      vid.addEventListener('ended', triggerMotionAnimations);
    }
  }
  bindMotionVideo();

  if (kolomPertama) {
    kolomPertama.style.display = 'none';
    delaySection = parseInt(kolomPertama.dataset.delayTime, 10) || 0;
  }

  if (!isEditorActive) {
    disableScrolling();
  }

  function handleOpenInvitation(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    isInvitationOpened = true;
    fxAnimationsEnabled = true;
    enableScrolling();
    playAudio();

    var musicBtn = document.getElementById('wedding-music-floating');
    if (musicBtn) {
      musicBtn.style.display = 'flex';
    }

    var openTarget = document.getElementById('open');
    if (openTarget) {
      openTarget.scrollIntoView({ behavior: 'smooth' });
    }

    // Timer pasti: animasi teks & logo muncul tepat saat video animasi 13 detik selesai
    setTimeout(triggerMotionAnimations, 13000);

    // Aktifkan animasi scroll setelah konten muncul
    setTimeout(triggerFxAnimations, 500);

    setTimeout(function () {
      var vid = document.querySelector('.motionSection .elementor-background-video-container video');
      if (vid) {
        vid.addEventListener('timeupdate', function () {
          if (vid.currentTime >= 12.5) {
            triggerMotionAnimations();
          }
        });
        vid.addEventListener('ended', triggerMotionAnimations);
        try {
          var p = vid.play();
          if (p && typeof p.then === 'function') {
            p.catch(function () { });
          }
        } catch (err) { }
      }
    }, 500);

    setTimeout(function () {
      var kp = document.querySelector('.kolomPertama');
      if (kp) kp.style.display = 'block';
    }, delaySection);
  }

  var openButtons = document.querySelectorAll('#btnOpens, .btn-open-act, .wds-button-cover a, .wds-button-cover, a[href="#open"]');
  openButtons.forEach(function (btn) {
    btn.onclick = handleOpenInvitation;
  });

  // 4. Tombol Buka Cover Alternatif (eltemplate-btnCover)
  var tombolCover = document.getElementById("eltemplate-btnCover");
  if (tombolCover) {
    tombolCover.onclick = function (e) {
      if (e) e.preventDefault();
      tombolCover.style.visibility = "hidden";
      isInvitationOpened = true;
      fxAnimationsEnabled = true;
      enableScrolling();
      playAudio();
      var musicBtn = document.getElementById('wedding-music-floating');
      if (musicBtn) {
        musicBtn.style.display = 'flex';
      }
      setTimeout(function () {
        var vid = document.querySelector('.motionSection .elementor-background-video-container video');
        if (vid) {
          vid.play().catch(function () { });
        }
        setTimeout(triggerMotionAnimations, 13500);
        triggerFxAnimations();
      }, 800);
      if (window.jQuery) {
        jQuery('#eltemplate-btnCover').parents('#eltemplate-cover').fadeOut(500);
      }
    };
  }

  // Init floating music button & listeners
  var musicBtn = document.getElementById('wedding-music-floating');
  if (musicBtn) {
    musicBtn.onclick = function (e) {
      e.stopPropagation();
      toggleAudio();
    };
  }

  var songEl = document.getElementById('song');
  if (songEl) {
    songEl.addEventListener('play', function () { updateMusicButtonUI(true); });
    songEl.addEventListener('pause', function () { updateMusicButtonUI(false); });
    songEl.addEventListener('ended', function () { updateMusicButtonUI(false); });
  }

  // 5. Kontrol Audio saat tab browser aktif/tidak aktif
  document.addEventListener("visibilitychange", function () {
    var song = document.getElementById('song');
    if (!song) return;
    if (document.visibilityState === "visible") {
      if (isInvitationOpened && !isAudioManuallyPaused) {
        playAudio();
      }
    } else {
      song.pause();
    }
  });

  // 5b. Lightbox Galeri Foto Modern
  document.querySelectorAll('[data-lightbox="gallery"], .elementor-gallery-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var img = this.querySelector('img');
      var href = this.getAttribute('href') || (img ? img.src : '');
      if (!href) return;
      if (window.Swal) {
        Swal.fire({
          imageUrl: href,
          imageAlt: 'Foto Galeri Andri & Dina',
          showConfirmButton: false,
          showCloseButton: true,
          background: 'rgba(20, 15, 10, 0.95)',
          backdrop: 'rgba(0, 0, 0, 0.85)',
          padding: '12px',
          customClass: {
            popup: 'gallery-lightbox-modal'
          }
        });
      }
    });
  });

  // 6. Konfirmasi Hadiah WhatsApp (.wa-box)
  document.querySelectorAll(".wa-box").forEach(function (box) {
    var btn = box.querySelector(".btn-wa");
    if (!btn) return;
    var nomor = (btn.dataset.wa || '').trim().replace(/\D/g, '');
    if (!nomor) {
      box.style.display = "none";
      return;
    }

    var nominalInput = box.querySelector(".nominal");
    if (nominalInput) {
      nominalInput.addEventListener("input", function () {
        var angka = this.value.replace(/\D/g, "");
        this.value = angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      });
    }

    btn.addEventListener("click", function () {
      var nama = (box.querySelector(".nama") ? box.querySelector(".nama").value : '').trim();
      var rekening = (box.querySelector(".rekening") ? box.querySelector(".rekening").value : '').trim();
      var nominal = (box.querySelector(".nominal") ? box.querySelector(".nominal").value : '').trim();

      if (!nama || !rekening || !nominal) {
        alert("Silakan lengkapi semua data.");
        return;
      }

      var pesan = "Hai, saya " + nama + " ingin konfirmasi pemberian hadiah melalui rekening " + rekening + " dengan jumlah transfer Rp " + nominal + ". Silahkan bisa dicek ya. Terimakasih.";
      window.open(
        "https://api.whatsapp.com/send?phone=" + nomor + "&text=" + encodeURIComponent(pesan),
        "_blank"
      );
    });
  });

  // 7. Toggle Amplop Digital (btnAmplop & eltemplate-amplop)
  var btnAmplop = document.getElementById("btnAmplop");
  var btnHide = document.getElementById("btn-hide");
  var amplop = document.getElementById("amplop");

  if (btnAmplop && btnHide && amplop) {
    btnHide.style.display = "none";
    amplop.style.display = "none";

    btnAmplop.onclick = function () {
      btnHide.style.display = "block";
      btnAmplop.style.display = "none";
      amplop.style.display = "block";
    };

    btnHide.onclick = function () {
      btnHide.style.display = "none";
      btnAmplop.style.display = "block";
      amplop.style.display = "none";
    };
  }

  var elbtnAmplop = document.getElementById("eltemplate-btnAmplop");
  var elamplop = document.getElementById("eltemplate-amplop");
  if (elbtnAmplop && elamplop) {
    elbtnAmplop.onclick = function () {
      elamplop.style.display = (elamplop.style.display === "block") ? "none" : "block";
    };
  }

  // 8. Auto Scroll Widget Controller
  initAutoScrollWidget();

  // 9. Deteksi Forced Dark Mode (Samsung Internet)
  checkSamsungDarkMode();
});


/* ==========================================================================
   4. EFEK ANIMASI SCROLL (FX-RISE)
   ========================================================================== */

// Flag apakah undangan sudah dibuka (untuk mencegah animasi scroll muncul sebelum undangan dibuka)
var fxAnimationsEnabled = false;

function triggerFxAnimations() {
  if (!fxAnimationsEnabled) return;
  var targets = document.querySelectorAll(
    ".fx-rise-left, .fx-rise-right, .fx-rise-down-left, .fx-rise-down-right, " +
    ".fx-rise-down, .fx-rise, .fx-slide-left, .fx-slide-right, " +
    ".fx-scale-in, .fx-scale-out, .fx-rotate-in, .fx-rotate-in-right"
  );
  var triggerBottom = window.innerHeight + 60;

  targets.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom && rect.bottom > 0) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", triggerFxAnimations, { passive: true });
window.addEventListener("resize", triggerFxAnimations, { passive: true });


/* ==========================================================================
   5. LAZYLOAD BACKGROUND IMAGES (Elementor)
   ========================================================================== */

(function () {
  var lazyloadRunObserver = function () {
    var lazyloadBackgrounds = document.querySelectorAll(".e-con.e-parent:not(.e-lazyloaded)");
    if (!('IntersectionObserver' in window)) {
      lazyloadBackgrounds.forEach(function (el) { el.classList.add('e-lazyloaded'); });
      return;
    }

    var lazyloadBackgroundObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          if (target) {
            target.classList.add('e-lazyloaded');
          }
          lazyloadBackgroundObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px 200px 0px' });

    lazyloadBackgrounds.forEach(function (el) {
      lazyloadBackgroundObserver.observe(el);
    });
  };

  ['DOMContentLoaded', 'elementor/lazyload/observe'].forEach(function (evt) {
    document.addEventListener(evt, lazyloadRunObserver);
  });
})();


/* ==========================================================================
   6. AUTO SCROLL FLOATING WIDGET (ASW)
   ========================================================================== */

function initAutoScrollWidget() {
  var wdsAudioExist = document.querySelector('.elementor-widget-wds_audio');
  var aswMaster = document.getElementById('asw-master-wrap');
  var isEditor = document.body.classList.contains('elementor-editor-active') || document.body.classList.contains('elementor-editor-preview');

  if (!wdsAudioExist || isEditor) {
    if (aswMaster) aswMaster.remove();
    return;
  }

  if (!aswMaster) return;

  aswMaster.style.display = 'flex';
  var metaDataEl = document.getElementById('asw-meta-data');
  var delayRaw = metaDataEl ? metaDataEl.getAttribute('data-delay') : null;
  var AUTO_DELAY = parseInt(delayRaw, 10);

  var SPEED_INIT = 2, MIN = 1, MAX = 10, BASE = 0.036;
  var speed = SPEED_INIT;
  var indTimer = null;
  var playing = false;
  var rafId = null;
  var lastTime = null;
  var exactScrollY = 0;
  var panelOpen = false;
  var idleTimer = null;

  var ringFill = document.getElementById('asw-ring-fill');
  var R = 17.5, CIRC = 2 * Math.PI * R;
  if (ringFill) {
    ringFill.style.strokeDasharray = CIRC;
    ringFill.style.strokeDashoffset = CIRC;
  }

  var btnPlay = document.getElementById('asw-btn-play');
  var btnTop = document.getElementById('asw-btn-top');
  var btnPlus = document.getElementById('asw-btn-plus');
  var btnMinus = document.getElementById('asw-btn-minus');
  var btnTrigger = document.getElementById('asw-btn-trigger');
  var panel = document.getElementById('asw-panel');
  var sTrack = document.getElementById('asw-slider-track');
  var sFill = document.getElementById('asw-slider-fill');
  var sThumb = document.getElementById('asw-slider-thumb');
  var sBadge = document.getElementById('asw-speed-badge');
  var indicator = document.getElementById('asw-indicator');

  function updateRing() {
    if (!ringFill) return;
    var max = document.body.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    ringFill.style.strokeDashoffset = CIRC * (1 - pct);
  }
  window.addEventListener('scroll', updateRing, { passive: true });
  updateRing();

  function showPause() {
    var icoPause = document.getElementById('asw-ico-pause');
    var icoPlay = document.getElementById('asw-ico-play');
    if (icoPause) icoPause.style.display = 'block';
    if (icoPlay) icoPlay.style.display = 'none';
  }

  function showPlay() {
    var icoPause = document.getElementById('asw-ico-pause');
    var icoPlay = document.getElementById('asw-ico-play');
    if (icoPause) icoPause.style.display = 'none';
    if (icoPlay) icoPlay.style.display = 'block';
  }

  function openPanel() {
    panelOpen = true;
    if (panel) panel.classList.add('open');
    restartIdleTimer();
  }

  function closePanel() {
    panelOpen = false;
    if (panel) panel.classList.remove('open');
  }

  function togglePanel() {
    panelOpen ? closePanel() : openPanel();
  }

  function restartIdleTimer() {
    clearTimeout(idleTimer);
    if (!panelOpen) return;
    idleTimer = setTimeout(closePanel, 3000);
  }

  function startScroll() {
    if (playing) return;
    playing = true;
    exactScrollY = window.scrollY;
    lastTime = null;
    showPause();
    showIndicator();
    rafId = requestAnimationFrame(loop);
  }

  function stopScroll() {
    if (!playing) return;
    playing = false;
    cancelAnimationFrame(rafId);
    lastTime = null;
    showPlay();
    hideIndicator();
  }

  function loop(ts) {
    if (!playing) return;
    if (lastTime === null) {
      lastTime = ts;
      rafId = requestAnimationFrame(loop);
      return;
    }
    var dt = ts - lastTime;
    lastTime = ts;
    if (dt > 50) dt = 16.66;
    exactScrollY += BASE * speed * dt;
    window.scrollTo(0, exactScrollY);
    rafId = requestAnimationFrame(loop);
  }

  function showIndicator() {
    if (!indicator) return;
    clearTimeout(indTimer);
    indicator.classList.remove('hide');
    indicator.classList.add('show');
    indTimer = setTimeout(function () { hideIndicator(); }, 5000);
  }

  function hideIndicator() {
    if (!indicator) return;
    clearTimeout(indTimer);
    indicator.classList.remove('show');
    indicator.classList.add('hide');
    setTimeout(function () { indicator.classList.remove('hide'); }, 500);
  }

  function updateUI() {
    if (!sThumb || !sTrack || !sFill || !sBadge) return;
    var pct = (speed - MIN) / (MAX - MIN);
    var th = sThumb.clientHeight, h = sTrack.clientHeight;
    sThumb.style.bottom = (pct * (h - th)) + 'px';
    sFill.style.height = (pct * h) + 'px';
    sBadge.textContent = speed + 'x';
  }

  if (btnTrigger) {
    btnTrigger.addEventListener('click', function () {
      togglePanel();
      if (panelOpen && !playing) startScroll();
      restartIdleTimer();
    });
  }

  if (btnPlay) {
    btnPlay.addEventListener('click', function () {
      playing ? stopScroll() : startScroll();
      restartIdleTimer();
    });
  }

  if (btnTop) {
    btnTop.addEventListener('click', function () {
      stopScroll();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      restartIdleTimer();
    });
  }

  if (btnPlus) {
    btnPlus.addEventListener('click', function () {
      if (speed < MAX) { speed++; updateUI(); }
      restartIdleTimer();
    });
  }

  if (btnMinus) {
    btnMinus.addEventListener('click', function () {
      if (speed > MIN) { speed--; updateUI(); }
      restartIdleTimer();
    });
  }

  var dragging = false;
  if (sThumb && sTrack) {
    sThumb.addEventListener('pointerdown', function (e) {
      dragging = true;
      sThumb.setPointerCapture(e.pointerId);
      e.stopPropagation();
      restartIdleTimer();
    });
    sThumb.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var rect = sTrack.getBoundingClientRect(), th = sThumb.clientHeight;
      var btm = Math.max(0, Math.min(rect.height - th, rect.bottom - e.clientY - th / 2));
      speed = Math.round(MIN + (btm / (rect.height - th)) * (MAX - MIN));
      updateUI();
      restartIdleTimer();
    });
    sThumb.addEventListener('pointerup', function () {
      dragging = false;
      restartIdleTimer();
    });
  }

  updateUI();

  window.addEventListener('wheel', function () {
    restartIdleTimer();
    stopScroll();
  }, { passive: true });

  var isTouch = false, touchY = 0;
  window.addEventListener('touchstart', function (e) {
    if (aswMaster.contains(e.target)) return;
    isTouch = true;
    touchY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    if (!isTouch) return;
    if (Math.abs(e.touches[0].clientY - touchY) > 8) {
      restartIdleTimer();
      stopScroll();
    }
  }, { passive: true });

  window.addEventListener('touchend', function () {
    isTouch = false;
  }, { passive: true });

  var btnOpens = document.getElementById('btnOpens') || document.querySelector('.wds-button-cover');
  if (btnOpens) {
    btnOpens.addEventListener('click', function () {
      setTimeout(function () {
        aswMaster.classList.add('show-widget');
      }, 1000);

      if (!isNaN(AUTO_DELAY) && AUTO_DELAY > 0) {
        setTimeout(function () {
          openPanel();
          startScroll();
        }, AUTO_DELAY);
      }
    });
  } else {
    aswMaster.classList.add('show-widget');
  }
}


/* ==========================================================================
   7. DETEKSI FORCED DARK MODE (SAMSUNG BROWSER)
   ========================================================================== */

function checkSamsungDarkMode() {
  if (!navigator.userAgent.match(/Samsung/i) || !window.matchMedia) return;

  var isDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();

  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+';

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    var pixel = ctx.getImageData(0, 0, 1, 1).data;
    var forcedDark = (pixel[0] & pixel[1] & pixel[2]) < 255 && !isDarkScheme;

    if (forcedDark && typeof Swal !== 'undefined') {
      Swal.fire({
        title: 'Mode Gelap Terdeteksi!',
        icon: 'info',
        confirmButtonText: 'Mengerti',
        html: '<span style="font-family: Poppins, sans-serif; font-size: 13px; color: #343a40;">' +
          'Anda membuka dengan <strong>Samsung Internet</strong> dan tampaknya <strong>forced dark mode</strong> aktif.<br>' +
          'Untuk pengalaman terbaik, aktifkan mode terang (light mode) di pengaturan browser Anda.' +
          '</span>',
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' }
      });
    }
  };
}




/* ==========================================================================
   WEDDING GIFT & CLIPBOARD COPY CONTROLLER
   ========================================================================== */
(function () {
  'use strict';

  function initWeddingGift() {
    // 1. Amplop / Gift Toggle Button
    var btnAmplop = document.getElementById('eltemplate-btnAmplop') || document.querySelector('#eltemplate-btnAmplop a, [id*="btnAmplop"]');
    var amplopContent = document.getElementById('eltemplate-amplop');

    if (btnAmplop && amplopContent) {
      btnAmplop.style.cursor = 'pointer';
      btnAmplop.addEventListener('click', function (e) {
        e.preventDefault();
        var isHidden = amplopContent.classList.contains('elementor-invisible') || amplopContent.style.display === 'none' || window.getComputedStyle(amplopContent).display === 'none';

        if (isHidden) {
          amplopContent.classList.remove('elementor-invisible');
          amplopContent.style.display = 'block';
          amplopContent.style.opacity = '0';
          amplopContent.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          amplopContent.style.transform = 'translateY(15px)';
          setTimeout(function () {
            amplopContent.style.opacity = '1';
            amplopContent.style.transform = 'translateY(0)';
          }, 20);
        } else {
          amplopContent.style.opacity = '0';
          amplopContent.style.transform = 'translateY(15px)';
          setTimeout(function () {
            amplopContent.style.display = 'none';
            amplopContent.classList.add('elementor-invisible');
          }, 350);
        }
      });
    }

    // 2. Copy to Clipboard Button
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.wt-copy-button, button[data-message]');
      if (!btn) return;
      e.preventDefault();

      var copyText = btn.getAttribute('data-clipboard-text');
      if (!copyText) {
        var wrapper = btn.closest('.elementor-button-wrapper, .wt-copy');
        if (wrapper) {
          var span = wrapper.querySelector('.copy-content, .spancontent');
          if (span) {
            copyText = span.innerText.trim();
          }
        }
      }

      if (!copyText) return;

      // Copy text to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText).then(function () {
          showCopySuccess(btn);
        }).catch(function () {
          fallbackCopy(copyText, btn);
        });
      } else {
        fallbackCopy(copyText, btn);
      }
    });

    function fallbackCopy(text, btn) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showCopySuccess(btn);
      } catch (e) { }
    }

    function showCopySuccess(btn) {
      var textSpan = btn.querySelector('.elementor-button-text');
      var iconSpan = btn.querySelector('i');
      var origText = textSpan ? textSpan.innerHTML : '';
      var origIconClass = iconSpan ? iconSpan.className : '';

      if (textSpan) textSpan.textContent = 'Berhasil Disalin!';
      if (iconSpan) iconSpan.className = 'fas fa-check';
      btn.style.transition = 'all 0.25s ease';
      btn.style.backgroundColor = '#10b981';
      btn.style.color = '#ffffff';

      setTimeout(function () {
        if (textSpan) textSpan.innerHTML = origText;
        if (iconSpan) iconSpan.className = origIconClass;
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 2000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWeddingGift);
  } else {
    initWeddingGift();
  }
})();

/* ==========================================================================
   MODERN RSVP & COMMUNITY WISHES CONTROLLER
   ========================================================================== */
(function () {
  'use strict';

  // Wishes list is loaded dynamically from wishes.json
  var allWishes = [];

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getInitials(name) {
    if (!name) return 'W';
    var clean = name.replace(/^(Bang|Mas|Mbak|Bpk|Ibu|Bapak|Keluarga)\s+/i, '');
    var parts = clean.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  function getAttendanceBadge(attendance, guestCount) {
    var att = (attendance || '').toLowerCase();
    if (att.indexOf('hadir') !== -1 && att.indexOf('tidak') === -1) {
      var countText = (guestCount && guestCount > 1) ? ' (' + guestCount + ')' : '';
      return '<span class="wish-tag hadir"><i class="fa fa-check"></i> Hadir' + countText + '</span>';
    } else if (att.indexOf('tidak') !== -1 || att.indexOf('berhalangan') !== -1) {
      return '<span class="wish-tag tidak-hadir"><i class="fa fa-times"></i> Berhalangan</span>';
    } else {
      return '<span class="wish-tag ragu"><i class="fa fa-question"></i> Ragu</span>';
    }
  }

  function updateCounters(wishes) {
    var totalEl = document.getElementById('wishesTotalCount');
    var presentEl = document.getElementById('wishesPresentCount');
    var absentEl = document.getElementById('wishesAbsentCount');

    var total = wishes.length;
    var present = 0;
    var absent = 0;

    wishes.forEach(function (w) {
      var att = (w.attendance || '').toLowerCase();
      if (att.indexOf('hadir') !== -1 && att.indexOf('tidak') === -1) {
        present++;
      } else {
        absent++;
      }
    });

    if (totalEl) totalEl.textContent = total;
    if (presentEl) presentEl.textContent = present;
    if (absentEl) absentEl.textContent = absent;
  }

  function formatWishTime(dateInput, id) {
    var d = null;
    if (dateInput) {
      d = new Date(dateInput);
    }
    if ((!d || isNaN(d.getTime())) && id) {
      var numId = Number(id);
      if (!isNaN(numId) && numId > 1000000000000) {
        d = new Date(numId);
      }
    }
    if (!d || isNaN(d.getTime())) {
      return 'Baru saja';
    }

    var now = new Date();
    var diffMs = now.getTime() - d.getTime();
    if (diffMs < 0) diffMs = 0;

    var diffSec = Math.floor(diffMs / 1000);
    var diffMin = Math.floor(diffSec / 60);
    var diffHour = Math.floor(diffMin / 60);
    var diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
      return 'Baru saja';
    } else if (diffMin < 60) {
      return diffMin + ' menit lalu';
    } else if (diffHour < 24) {
      return diffHour + ' jam lalu';
    } else if (diffDay === 1) {
      var h1 = String(d.getHours()).padStart(2, '0');
      var m1 = String(d.getMinutes()).padStart(2, '0');
      return 'Kemarin, ' + h1 + ':' + m1;
    } else if (diffDay < 7) {
      return diffDay + ' hari lalu';
    } else {
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      var day = d.getDate();
      var month = months[d.getMonth()];
      var year = d.getFullYear();
      var h2 = String(d.getHours()).padStart(2, '0');
      var m2 = String(d.getMinutes()).padStart(2, '0');
      return day + ' ' + month + ' ' + year + ', ' + h2 + ':' + m2;
    }
  }

  function formatFullDateTime(dateInput, id) {
    var d = null;
    if (dateInput) {
      d = new Date(dateInput);
    }
    if ((!d || isNaN(d.getTime())) && id) {
      var numId = Number(id);
      if (!isNaN(numId) && numId > 1000000000000) {
        d = new Date(numId);
      }
    }
    if (!d || isNaN(d.getTime())) return '';
    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var h = String(d.getHours()).padStart(2, '0');
    var m = String(d.getMinutes()).padStart(2, '0');
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' pukul ' + h + ':' + m;
  }

  function renderWishes(wishes) {
    var container = document.getElementById('wishesFeedContainer');
    if (!container) return;

    if (!wishes || wishes.length === 0) {
      container.innerHTML = '<div class="wishes-empty" style="text-align: center; padding: 25px 15px; color: #8c7f6e; font-size: 13.5px; font-family: poppins, sans-serif;">Belum ada ucapan. Jadilah yang pertama mengirimkan doa restu!</div>';
      return;
    }

    var html = '';
    wishes.forEach(function (w) {
      var initials = getInitials(w.name);
      var badge = getAttendanceBadge(w.attendance, w.guest_count);
      var timeDisplay = formatWishTime(w.date, w.id);
      var fullTime = formatFullDateTime(w.date, w.id);

      html += '<div class="modern-wish-card">';
      html += '  <div class="wish-avatar">' + escapeHtml(initials) + '</div>';
      html += '  <div class="wish-content">';
      html += '    <div class="wish-top-row">';
      html += '      <div class="wish-author">' + escapeHtml(w.name) + '</div>';
      html += '      <div class="wish-badges-group">';
      html += badge;
      html += '        <span class="wish-time" title="' + escapeHtml(fullTime) + '">' + escapeHtml(timeDisplay) + '</span>';
      html += '      </div>';
      html += '    </div>';
      html += '    <p class="wish-message">' + escapeHtml(w.message) + '</p>';
      html += '  </div>';
      html += '</div>';
    });

    container.innerHTML = html;
  }

  function loadWishes() {
    // Clear any outdated localStorage wishes cache so wishes.json is the single source of truth
    try {
      localStorage.removeItem('wedding_andri_dina_wishes');
    } catch (e) { }

    fetch('/api/wishes?t=' + Date.now())
      .then(function (res) {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(function (data) {
        allWishes = Array.isArray(data) ? data : [];
        updateCounters(allWishes);
        renderWishes(allWishes);
      })
      .catch(function () {
        fetch('wishes.json?t=' + Date.now())
          .then(function (res) { return res.json(); })
          .then(function (data) {
            allWishes = Array.isArray(data) ? data : [];
            updateCounters(allWishes);
            renderWishes(allWishes);
          })
          .catch(function () {
            allWishes = [];
            updateCounters(allWishes);
            renderWishes(allWishes);
          });
      });
  }

  function initForm() {
    var form = document.getElementById('modernRsvpForm');
    var attendancePills = document.querySelectorAll('.attendance-pill');
    var attendanceInput = document.getElementById('rsvpAttendance');
    var guestCountWrapper = document.getElementById('rsvpGuestCountWrapper');
    var guestCountSelect = document.getElementById('rsvpGuestCount');
    var nameInput = document.getElementById('rsvpName');
    var messageInput = document.getElementById('rsvpMessage');
    var submitBtn = document.getElementById('btnSubmitRsvp');
    var alertBox = document.getElementById('rsvpFormAlert');

    if (!form) return;

    // Load saved name from storage if empty, or prefill from ?to=
    try {
      var savedName = localStorage.getItem('wedding_rsvp_author_name');
      if (savedName && nameInput && !nameInput.value) {
        nameInput.value = savedName;
      } else if (nameInput && !nameInput.value) {
        var p = new URLSearchParams(window.location.search);
        var g = p.get('to') || p.get('u') || p.get('guest');
        if (g) {
          g = g.replace(/\+/g, ' ');
          try {
            g = decodeURIComponent(g);
            if (/%[0-9a-fA-F]{2}/.test(g)) {
              g = decodeURIComponent(g);
            }
          } catch (e) { }
          if (g.trim()) nameInput.value = g.trim();
        }
      }
    } catch (e) { }

    // Attendance Pill Clicking
    attendancePills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        attendancePills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        var val = pill.getAttribute('data-value');
        if (attendanceInput) attendanceInput.value = val;

        if (val === 'Hadir') {
          if (guestCountWrapper) guestCountWrapper.style.display = 'flex';
        } else {
          if (guestCountWrapper) guestCountWrapper.style.display = 'none';
        }
      });
    });

    // Handle Submission
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = (nameInput ? nameInput.value : '').trim();
      var attendance = (attendanceInput ? attendanceInput.value : 'Hadir');
      var guestCount = (guestCountSelect && attendance === 'Hadir') ? parseInt(guestCountSelect.value, 10) : 0;
      var message = (messageInput ? messageInput.value : '').trim();

      if (!name) {
        showAlert('Silakan masukkan nama Anda.', 'error');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!message || message.length < 2) {
        showAlert('Silakan tulis doa atau ucapan restu Anda.', 'error');
        if (messageInput) messageInput.focus();
        return;
      }

      // Save name for convenience
      try {
        localStorage.setItem('wedding_rsvp_author_name', name);
      } catch (e) { }

      // UI Loading state
      setSubmitting(true);
      showAlert('', '');

      var newWish = {
        id: Date.now(),
        name: name,
        attendance: attendance,
        guest_count: guestCount,
        message: message,
        time: 'Baru saja',
        date: new Date().toISOString(),
        isLocal: true
      };

      // Send to server
      fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWish)
      })
        .then(function (res) { return res.json(); })
        .then(function (resData) {
          finishSubmission(newWish);
        })
        .catch(function (err) {
          // Fallback offline: still save locally!
          finishSubmission(newWish);
        });
    });

    function finishSubmission(newWish) {
      // Add to beginning of wish list
      allWishes.unshift(newWish);
      updateCounters(allWishes);
      renderWishes(allWishes);

      // Reset message input only (keep name)
      if (messageInput) messageInput.value = '';

      setSubmitting(false);
      showAlert('✨ Terima kasih! Doa restu dan konfirmasi kehadiran Anda telah berhasil dikirim.', 'success');

      // Scroll smoothly to the wishes feed
      var wishesBoard = document.querySelector('.modern-wishes-board');
      if (wishesBoard) {
        setTimeout(function () {
          wishesBoard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    }

    function setSubmitting(isSubmitting) {
      if (!submitBtn) return;
      var btnText = submitBtn.querySelector('.btn-text');
      var btnLoader = submitBtn.querySelector('.btn-loader');
      if (isSubmitting) {
        submitBtn.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'inline-flex';
      } else {
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline-flex';
        if (btnLoader) btnLoader.style.display = 'none';
      }
    }

    function showAlert(msg, type) {
      if (!alertBox) return;
      if (!msg) {
        alertBox.style.display = 'none';
        alertBox.className = 'modern-form-alert';
        alertBox.textContent = '';
      } else {
        alertBox.style.display = 'block';
        alertBox.className = 'modern-form-alert ' + type;
        alertBox.textContent = msg;
      }
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initForm();
      loadWishes();
    });
  } else {
    initForm();
    loadWishes();
  }
})();

// Guardian for Countdown Slideshow (Section 36596cb5)
(function () {
  function fixSlideImages() {
    var slides = document.querySelectorAll('.elementor-element-36596cb5 .elementor-background-slideshow__slide__image');
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].style.backgroundPosition !== 'center top') {
        slides[i].style.setProperty('background-position', 'center top', 'important');
      }
      if (slides[i].style.backgroundSize !== 'cover') {
        slides[i].style.setProperty('background-size', 'cover', 'important');
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixSlideImages);
  } else {
    fixSlideImages();
  }
  window.addEventListener('load', fixSlideImages);

  var target = document.querySelector('.elementor-element-36596cb5');
  if (target && window.MutationObserver) {
    var observer = new MutationObserver(function () {
      fixSlideImages();
    });
    observer.observe(target, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
  } else {
    setInterval(fixSlideImages, 1500);
  }
})();

