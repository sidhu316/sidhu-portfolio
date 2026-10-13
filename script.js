"use strict";

/* ========================================
   PROJECT DATA
   ======================================== */

const projects = [
  {
    id: "town-environment",
    title: "Town Environment",
    category: "cinematic",
    label: "UNREAL ENGINE CINEMATIC",
    subtitle: "Environment Showcase · Cinematic",
    description: "A cinematic town environment created in Unreal Engine.",
    tools: "Unreal Engine · Environment Art · Cinematics · Lighting",
    image: "images/town-thumbnail.png",
    youtubeId: "q2H0KYPBR64"
  },
  {
    id: "cinematic-project-2",
    title: "Cinematic Project 02",
    category: "cinematic",
    label: "UNREAL ENGINE CINEMATIC",
    subtitle: "Cinematic Showcase",
    description: "A cinematic project created in Unreal Engine.",
    tools: "Unreal Engine · Cinematics · Lighting",
    image: "images/mahadev_thumbnail.png",
    youtubeId: "0V6r39Jq9xo"
  },
  {
    id: "cinematic-project-3",
    title: "Environment",
    category: "cinematic",
    label: "UNREAL ENGINE CINEMATIC",
    subtitle: "Environment Showcase · Cinematic",
    description:
      "An Unreal Engine environment cinematic focused on atmosphere, composition and lighting.",
    tools: "Unreal Engine · Environment Art · Cinematics · Lighting",
    image: "images/evn_thumbnail.png",
    youtubeId: "wCoZcVSt3jg"
  },
  {
    id: "youtube-short-1",
    title: "Futuristic Riders",
    category: "shorts",
    label: "YOUTUBE SHORT",
    subtitle: "Short Cinematic Showcase",
    description: "A short-form cinematic showcase created in Unreal Engine.",
    tools: "Unreal Engine · Cinematics · Lighting",
    image: "images/bike_thumbnail.png",
    landscapeImage: "images/bike_vedio_thumbnail.png",
    youtubeId: "jTb2GXcbUrg"
  },
  {
    id: "youtube-short-2",
    title: "Neon Vibes Cyberpunk Girl",
    category: ["lighting", "shorts"],
    label: "LIGHTING · YOUTUBE SHORT",
    subtitle: "Short Cinematic Showcase",
    description:
      "A short-form Unreal Engine cinematic showcasing cyberpunk visuals and lighting.",
    tools: "Unreal Engine · Cinematics · Lighting",
    image: "images/aqua_short.png",
    landscapeImage: "images/aqua_thumbnail.png",
    youtubeId: "nBG1YfAOBpw"
  },
  {
    id: "youtube-short-3",
    title: "Unreal Engine Short 03",
    category: ["lighting", "shorts", "cinematic"],
    label: "YOUTUBE SHORT",
    subtitle: "Short Cinematic Showcase",
    description: "A short-form cinematic created in Unreal Engine.",
    tools: "Unreal Engine · Cinematics · Lighting",
    image: "images/christmass_short.png",
    landscapeImage: "images/christmas.png",
    youtubeId: "47Dmyx3ECis"
  },
  {
    id: "youtube-short-4",
    title: "Enchanted Garden Dancing Under the Purple Lights",
    category: ["lighting", "shorts"],
    label: "YOUTUBE SHORT",
    subtitle: "Short Cinematic Showcase",
    description:
      "A new short-form video featured in my 3D artist portfolio.",
    tools: "Unreal Engine · Cinematics · Lighting",
    image: "images/thumak.png",
    landscapeImage: "images/thumak_thumnails.png",
    youtubeId: "AQcmXgqtNO4"
  },

  {
    id: "cinematic-home",
    title: "Home Cinematic",
    category: "cinematic",
    label: "UNREAL ENGINE CINEMATIC",
    subtitle: "Cinematic Showcase",
    description: "A cinematic Unreal Engine environment showcase.",
    tools: "Unreal Engine · Cinematics · Lighting · Environment Art",
    image: "https://img.youtube.com/vi/H5YnlMjuLoM/hqdefault.jpg",
    youtubeId: "H5YnlMjuLoM"
  },
];

/* ========================================
   ELEMENT REFERENCES
   ======================================== */

const projectGrid = document.getElementById("projectGrid");
const filterButtons = document.querySelectorAll(".filter-button, .filter-btn");

const projectDialog = document.getElementById("projectDialog");
const dialogClose = document.getElementById("dialogClose");
const dialogImage = document.getElementById("dialogImage");
const dialogYouTube = document.getElementById("dialogYouTube");

const dialogCategory = document.getElementById("dialogCategory");
const dialogTitle = document.getElementById("dialogTitle");
const dialogDescription = document.getElementById("dialogDescription");
const dialogTools = document.getElementById("dialogTools");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

/* ========================================
   PROJECT HELPERS
   ======================================== */

function getProjectCategories(project) {
  return Array.isArray(project.category)
    ? project.category
    : [project.category];
}

function getThumbnail(project, filter = "all") {
  if (filter === "shorts") {
    return project.image;
  }

  return project.landscapeImage || project.image;
}

/* ========================================
   PROJECT GALLERY
   ======================================== */

function renderProjects(filter = "all") {
  if (!projectGrid) return;

  document.body.classList.toggle(
    "shorts-filter-active",
    filter === "shorts"
  );

  projectGrid.replaceChildren();

  const filteredProjects = projects.filter(project => {
    if (filter === "all") return true;
    return getProjectCategories(project).includes(filter);
  });

  filteredProjects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.category = getProjectCategories(project).join(" ");
    card.style.animationDelay = `${Math.min(index * 70, 350)}ms`;

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "project-open";
    openButton.setAttribute("aria-label", `View ${project.title}`);

    const thumbnail = document.createElement("div");
    thumbnail.className = "project-thumbnail";

    const image = document.createElement("img");
    image.src = getThumbnail(project, filter);
    image.alt = `${project.title} thumbnail`;
    image.loading = index < 2 ? "eager" : "lazy";
    image.decoding = "async";

    image.addEventListener(
      "error",
      () => {
        if (project.youtubeId) {
          image.src =
            `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;
        }
      },
      { once: true }
    );

    const typeLabel = document.createElement("span");
    typeLabel.className = "project-type";
    typeLabel.textContent = project.label;

    const overlay = document.createElement("span");
    overlay.className = "project-overlay";

    const viewIcon = document.createElement("span");
    viewIcon.className = "view-project";
    viewIcon.textContent = "↗";

    overlay.appendChild(viewIcon);
    thumbnail.append(image, typeLabel, overlay);

    if (project.youtubeId) {
      const playIndicator = document.createElement("span");
      playIndicator.className = "play-indicator";
      playIndicator.textContent = "▶";
      playIndicator.setAttribute("aria-hidden", "true");
      thumbnail.appendChild(playIndicator);
    }

    const info = document.createElement("div");
    info.className = "project-info";

    const textWrap = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = project.title;

    const subtitle = document.createElement("p");
    subtitle.textContent = project.subtitle;

    textWrap.append(title, subtitle);

    const arrow = document.createElement("span");
    arrow.className = "project-arrow";
    arrow.textContent = "↗";
    arrow.setAttribute("aria-hidden", "true");

    info.append(textWrap, arrow);
    openButton.append(thumbnail, info);

    openButton.addEventListener("click", () => {
      openProject(project);
    });

    card.appendChild(openButton);
    projectGrid.appendChild(card);
  });
}

/* ========================================
   CATEGORY FILTERS
   ======================================== */

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    renderProjects(button.dataset.filter || "all");
  });
});

/* ========================================
   VIDEO MODAL
   ======================================== */

function stopProjectMedia() {
  if (dialogYouTube) {
    dialogYouTube.src = "about:blank";
    dialogYouTube.hidden = true;
    dialogYouTube.classList.remove("short-video");
  }

  if (dialogImage) {
    dialogImage.removeAttribute("src");
    dialogImage.alt = "";
    dialogImage.hidden = true;
  }
}

function openProject(project) {
  if (!projectDialog) return;

  stopProjectMedia();

  if (dialogCategory) {
    dialogCategory.textContent = project.label;
  }

  if (dialogTitle) {
    dialogTitle.textContent = project.title;
  }

  if (dialogDescription) {
    dialogDescription.textContent = project.description;
  }

  if (dialogTools) {
    dialogTools.textContent = project.tools;
  }

  if (project.youtubeId && dialogYouTube) {
    dialogYouTube.title = `${project.title} video`;

    const isShort = getProjectCategories(project).includes("shorts");
    dialogYouTube.classList.toggle("short-video", isShort);

    const videoParams = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      playsinline: "1",
      controls: "1",
      enablejsapi: "1",
      vq: "hd2160"
    });

    dialogYouTube.src =
      `https://www.youtube.com/embed/${encodeURIComponent(project.youtubeId)}?${videoParams.toString()}`;

    dialogYouTube.hidden = false;
  } else if (dialogImage) {
    dialogImage.src = project.image;
    dialogImage.alt = project.title;
    dialogImage.hidden = false;
  }

  if (!projectDialog.open) {
    projectDialog.showModal();
  }

  document.body.classList.add("modal-open");
}

function closeProject() {
  if (projectDialog?.open) {
    projectDialog.close();
  }

  stopProjectMedia();
  document.body.classList.remove("modal-open");
}

if (dialogClose) {
  dialogClose.addEventListener("click", closeProject);
}

if (projectDialog) {
  projectDialog.addEventListener("click", event => {
    if (event.target === projectDialog) {
      closeProject();
    }
  });

  projectDialog.addEventListener("close", () => {
    stopProjectMedia();
    document.body.classList.remove("modal-open");
  });
}

/* ========================================
   MOBILE NAVIGATION
   ======================================== */

function closeNavigation() {
  if (!navLinks || !menuToggle) return;

  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeNavigation();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      closeNavigation();
    }
  });
}

/* ========================================
   ACTIVE NAVIGATION
   ======================================== */

const pageSections = document.querySelectorAll("main section[id]");
const pageNavLinks = document.querySelectorAll(".nav-links .nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        pageNavLinks.forEach(link => {
          const isActive =
            link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0
    }
  );

  pageSections.forEach(section => {
    sectionObserver.observe(section);
  });
}

/* ========================================
   FOOTER YEAR
   ======================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ========================================
   LOADING SCREEN
   ======================================== */

function hideSiteLoader() {
  const loader = document.getElementById("siteLoader");

  if (loader) {
    loader.classList.add("is-hidden");
  }
}

window.addEventListener("load", hideSiteLoader);
window.setTimeout(hideSiteLoader, 1800);

/* ========================================
   HERO BACKGROUND SLIDESHOW
   ======================================== */

(function initHeroSlideshow() {
  const background = document.querySelector(".hero-background");

  if (!background) {
    console.error(
      "Slideshow error: .hero-background was not found in index.html."
    );
    return;
  }

  const images = [
    "images/background%201.png",
    "images/background%202.png",
    "images/background%203.png",
    "images/background%204.png",
    "images/background%205.png",
    "images/background%206.png"
  ];

  background.querySelectorAll(".hero-slide").forEach(slide => {
    slide.remove();
  });

  if (getComputedStyle(background).position === "static") {
    background.style.position = "absolute";
    background.style.inset = "0";
  }

  background.style.overflow = "hidden";
  background.style.backgroundImage = "none";

  const slides = images.map((src, index) => {
    const slide = document.createElement("div");

    slide.className = "hero-slide";

    Object.assign(slide.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      backgroundImage: `url("${src}")`,
      backgroundPosition: "center 48%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      opacity: index === 0 ? "1" : "0",
      transition: "opacity 1.4s ease-in-out",
      pointerEvents: "none"
    });

    slide.setAttribute("aria-hidden", "true");
    background.appendChild(slide);

    const testImage = new Image();

    testImage.onload = () => {
      console.log("Slideshow image loaded:", src);
    };

    testImage.onerror = () => {
      console.error(
        "Slideshow image failed to load:",
        src,
        "- Check the filename and images folder."
      );
    };

    testImage.src = src;

    return slide;
  });

  let currentIndex = 0;

  window.setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;

    slides[nextIndex].style.opacity = "1";
    slides[currentIndex].style.opacity = "0";

    currentIndex = nextIndex;
  }, 4000);

  console.log("Hero background slideshow initialized.");
})();

/* ========================================
   INITIALIZE
   ======================================== */

renderProjects("all");