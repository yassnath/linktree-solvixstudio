(function () {
      var body = document.body;
      var starsBox = document.getElementById("stars");
      var langButtons = document.querySelectorAll(".lang-btn");
      var pageTitle = document.querySelector("title");
      var pageDescription = document.querySelector('meta[name="description"]');
      var langStorageKey = "solvix-lang";
      var dictionary = {
        in: {
          html_lang: "id",
          title: "Solvix Studio | Tautan",
          description: "Pusat tautan resmi Solvix Studio.",
          profile_aria: "Profil Solvix Studio",
          links_aria: "Tautan sosial media Solvix Studio",
          tagline: "Solvix Studio membangun identitas kreatif untuk produk digital, dengan fokus pada UI yang fungsional dan pengalaman pengguna yang elegan.",
          website_label: "Website",
          website_desc: "Lihat layanan digital lengkap kami",
          instagram_label: "Instagram",
          instagram_desc: "@solvix.studio | update project & insight digital",
          whatsapp_label: "WhatsApp",
          whatsapp_desc: "0822-2165-7340 | konsultasi jasa digital"
        },
        en: {
          html_lang: "en",
          title: "Solvix Studio | Links",
          description: "Official link hub for Solvix Studio.",
          profile_aria: "Solvix Studio profile",
          links_aria: "Solvix Studio social media links",
          tagline: "Solvix Studio builds creative identities for digital products, focusing on purposeful UI and elegant user experiences.",
          website_label: "Website",
          website_desc: "Explore our full digital services",
          instagram_label: "Instagram",
          instagram_desc: "@solvix.studio | projects and digital insights",
          whatsapp_label: "WhatsApp",
          whatsapp_desc: "0822-2165-7340 | digital service consultation"
        }
      };

      function shouldUseSafeRender() {
        var ua = navigator.userAgent || "";
        var inAppBrowser = /Instagram|FBAN|FBAV/i.test(ua);
        var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        var forceSafe = false;
        try {
          forceSafe = new URLSearchParams(window.location.search).get("safe") === "1";
        } catch (error) {
          forceSafe = false;
        }
        return inAppBrowser || reducedMotion || forceSafe;
      }

      var safeRender = shouldUseSafeRender();
      if (safeRender) {
        body.classList.add("safe-render");
      }

      var count = window.matchMedia("(min-width: 768px)").matches ? 36 : 24;
      if (safeRender) {
        count = Math.max(12, Math.floor(count * 0.6));
      }

      for (var i = 0; i < count; i += 1) {
        var star = document.createElement("span");
        star.className = "star";
        var starDuration = safeRender ? 4.4 + Math.random() * 4.8 : 2.8 + Math.random() * 3.8;
        var starOpacity = safeRender ? 0.2 + Math.random() * 0.48 : 0.25 + Math.random() * 0.75;
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDuration = starDuration.toFixed(2) + "s";
        star.style.animationDelay = (-Math.random() * 5).toFixed(2) + "s";
        star.style.opacity = starOpacity.toFixed(2);
        starsBox.appendChild(star);
      }

      function setLanguage(nextLang, persist) {
        var lang = nextLang === "en" ? "en" : "in";
        var textSet = dictionary[lang];
        body.setAttribute("data-lang", lang);
        document.documentElement.lang = textSet.html_lang;
        for (var k = 0; k < langButtons.length; k += 1) {
          var button = langButtons[k];
          var isActive = button.getAttribute("data-lang") === lang;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-pressed", isActive ? "true" : "false");
        }

        var textNodes = document.querySelectorAll("[data-i18n]");
        for (var n = 0; n < textNodes.length; n += 1) {
          var textNode = textNodes[n];
          var key = textNode.getAttribute("data-i18n");
          if (textSet[key]) {
            textNode.textContent = textSet[key];
          }
        }

        var ariaNodes = document.querySelectorAll("[data-i18n-aria-label]");
        for (var a = 0; a < ariaNodes.length; a += 1) {
          var ariaNode = ariaNodes[a];
          var ariaKey = ariaNode.getAttribute("data-i18n-aria-label");
          if (textSet[ariaKey]) {
            ariaNode.setAttribute("aria-label", textSet[ariaKey]);
          }
        }

        if (pageTitle) {
          pageTitle.textContent = textSet.title;
        }
        if (pageDescription) {
          pageDescription.setAttribute("content", textSet.description);
        }

        if (persist) {
          try {
            localStorage.setItem(langStorageKey, lang);
          } catch (error) {
            // Ignore storage errors in restricted contexts.
          }
        }
      }

      for (var m = 0; m < langButtons.length; m += 1) {
        langButtons[m].addEventListener("click", function () {
          setLanguage(this.getAttribute("data-lang"), true);
        });
      }

      var initialLang = body.getAttribute("data-lang") || "in";
      try {
        var storedLang = localStorage.getItem(langStorageKey);
        if (storedLang === "in" || storedLang === "en") {
          initialLang = storedLang;
        }
      } catch (error) {
        // Ignore storage errors in restricted contexts.
      }

      setLanguage(initialLang, false);
      document.getElementById("year").textContent = new Date().getFullYear();
    })();
