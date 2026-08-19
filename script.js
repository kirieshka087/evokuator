const root = document.documentElement;
const body = document.body;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const menuBackdrop = document.querySelector('[data-menu-backdrop]');

function setMenu(open) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  mobileMenu.setAttribute('aria-hidden', String(!open));
  mobileMenu.inert = !open;
  body.classList.toggle('menu-open', open);
}

if (mobileMenu) mobileMenu.inert = true;

menuButton?.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

mobileMenu?.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});

menuBackdrop?.addEventListener('click', () => setMenu(false));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header, .mobile-menu')) setMenu(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1100) setMenu(false);
});

function runPreloader() {
  const preloader = document.querySelector('[data-preloader]');
  const value = document.querySelector('[data-preloader-value]');
  const track = document.querySelector('[data-preloader-track]');

  if (!preloader || !value || !track) {
    body.classList.remove('is-loading');
    return Promise.resolve();
  }

  const duration = prefersReducedMotion ? 100 : 2650;

  return new Promise((resolve) => {
    const startedAt = performance.now();

    const finish = () => {
      const done = () => {
        preloader.classList.add('is-complete');
        preloader.setAttribute('aria-hidden', 'true');
        body.classList.remove('is-loading');
        resolve();
      };

      if (window.gsap && !prefersReducedMotion) {
        window.gsap.to(preloader, {
          yPercent: -100,
          duration: 0.35,
          ease: 'power3.inOut',
          onComplete: done
        });
      } else {
        done();
      }
    };

    const update = (now) => {
      const elapsed = Math.min(1, (now - startedAt) / duration);
      const eased = 0.5 - Math.cos(Math.PI * elapsed) / 2;
      const percent = Math.round(eased * 100);
      value.textContent = `${percent}%`;
      track.style.transform = `scaleX(${eased})`;

      if (elapsed < 1) requestAnimationFrame(update);
      else finish();
    };

    requestAnimationFrame(update);
  });
}

const serviceContent = {
  passenger: {
    index: '01 / Легковые автомобили',
    title: 'Легковые автомобили',
    image: 'assets/service-passenger-v2.webp',
    lead: 'Подадим сдвижную платформу, аккуратно затянем автомобиль лебёдкой и закрепим его за штатные точки.',
    steps: ['Уточняем адрес, марку и состояние колёс', 'Подбираем платформу под клиренс автомобиля', 'Погружаем, фиксируем и доставляем по адресу'],
    price: 'Учитываем адрес подачи, точку доставки и условия погрузки. Итог согласуем до выезда.'
  },
  suv: {
    index: '02 / Внедорожники',
    title: 'Внедорожники',
    image: 'assets/service-suv-v2.webp',
    lead: 'Для кроссоверов и внедорожников направим усиленную платформу с подходящей грузоподъёмностью.',
    steps: ['Уточняем массу и габариты автомобиля', 'Проверяем возможность безопасного подъезда', 'Фиксируем внедорожник и везём по маршруту'],
    price: 'Расчёт зависит от массы, габаритов, расстояния и состояния ходовой части.'
  },
  accident: {
    index: '03 / После ДТП',
    title: 'После ДТП',
    image: 'assets/service-accident-v2.webp',
    lead: 'Работаем с повреждёнными автомобилями, заблокированными колёсами и затруднённой погрузкой.',
    steps: ['По телефону оцениваем повреждения', 'Подбираем платформу и дополнительное оборудование', 'Безопасно погружаем и доставляем в сервис или на стоянку'],
    price: 'На расчёт влияют повреждения, положение автомобиля, доступ к нему и маршрут.'
  },
  breakdown: {
    index: '04 / Неисправные авто',
    title: 'Неисправные авто',
    image: 'assets/service-breakdown-v2.webp',
    lead: 'Заберём автомобиль с обочины, из двора или с открытой парковки, если он не заводится или не может продолжать движение.',
    steps: ['Уточняем симптомы и местоположение', 'Проверяем доступ и высоту автомобиля', 'Погружаем и отвозим в выбранную точку'],
    price: 'Стоимость зависит от маршрута, доступности автомобиля и необходимости дополнительной оснастки.'
  },
  region: {
    index: '05 / Межгород',
    title: 'Перевозка по области',
    image: 'assets/service-region-v2.webp',
    lead: 'Перевезём автомобиль между городами и по Свердловской области с согласованным маршрутом.',
    steps: ['Фиксируем точки отправления и назначения', 'Подбираем технику под автомобиль', 'Согласуем маршрут и выполняем перевозку'],
    price: 'Основные факторы — общий километраж, тип автомобиля и условия погрузки.'
  },
  crane: {
    index: '06 / Манипулятор',
    title: 'Манипулятор',
    image: 'assets/service-crane-v2.webp',
    lead: 'Кран-манипулятор поднимет автомобиль из кювета, тесного места или при полностью заблокированной ходовой части.',
    steps: ['Оцениваем положение автомобиля по фото или описанию', 'Проверяем место для установки опор и работы стрелы', 'Поднимаем автомобиль стропами и фиксируем на платформе'],
    price: 'Расчёт зависит от вылета стрелы, сложности доступа, массы автомобиля и расстояния.'
  }
};

const serviceModal = document.querySelector('[data-service-modal]');
const modalImage = document.querySelector('[data-modal-image]');
const modalIndex = document.querySelector('[data-modal-index]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalLead = document.querySelector('[data-modal-lead]');
const modalSteps = document.querySelector('[data-modal-steps]');
const modalPrice = document.querySelector('[data-modal-price]');
let modalTrigger = null;

function closeServiceModal() {
  if (!serviceModal?.open) return;
  serviceModal.close();
}

function openServiceModal(trigger) {
  const content = serviceContent[trigger.dataset.service];
  if (!serviceModal || !content) return;

  modalTrigger = trigger;
  modalImage.src = content.image;
  modalImage.alt = content.title;
  modalIndex.textContent = content.index;
  modalTitle.textContent = content.title;
  modalLead.textContent = content.lead;
  modalPrice.textContent = content.price;
  modalSteps.replaceChildren(...content.steps.map((step) => {
    const item = document.createElement('li');
    item.textContent = step;
    return item;
  }));

  serviceModal.showModal();
  body.classList.add('modal-open');
}

document.querySelectorAll('[data-service]').forEach((trigger) => {
  trigger.addEventListener('click', () => openServiceModal(trigger));
  trigger.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openServiceModal(trigger);
  });
});

document.querySelector('[data-modal-close]')?.addEventListener('click', closeServiceModal);
document.querySelector('[data-modal-contact]')?.addEventListener('click', closeServiceModal);
document.querySelector('[data-modal-price-link]')?.addEventListener('click', closeServiceModal);
serviceModal?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeServiceModal();
});
serviceModal?.addEventListener('click', (event) => {
  if (event.target === serviceModal) closeServiceModal();
});
serviceModal?.addEventListener('close', () => {
  body.classList.remove('modal-open');
  modalTrigger?.focus();
});

function initMotion() {
  if (!window.gsap || !window.ScrollTrigger) {
    root.classList.add('no-gsap');
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ duration: 0.8, ease: 'power3.out' });

  const media = gsap.matchMedia();

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTimeline
      .from('.site-header', { y: -28, autoAlpha: 0, duration: 0.75 })
      .from('.eyebrow', { y: 18, autoAlpha: 0, duration: 0.55 }, '-=0.3')
      .from('.hero h1 span', { yPercent: 70, autoAlpha: 0, stagger: 0.09, duration: 0.9 }, '-=0.2')
      .from('.hero__lead, .hero__actions', { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.7 }, '-=0.5')
      .from('.hero__facts article', { y: 18, autoAlpha: 0, stagger: 0.07, duration: 0.6 }, '-=0.45');

    gsap.fromTo('.fleet-card',
      { clipPath: 'inset(0 0 22% 0)', y: 42 },
      {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        stagger: 0.08,
        scrollTrigger: { trigger: '.fleet__grid', start: 'top 82%', end: 'top 42%', scrub: 0.55 }
      }
    );

    gsap.from('.advantages article', {
      y: 52,
      autoAlpha: 0,
      stagger: 0.06,
      scrollTrigger: { trigger: '.advantages__grid', start: 'top 78%', toggleActions: 'play none none reverse' }
    });

    gsap.from('.map-placeholder', {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.15,
      scrollTrigger: { trigger: '.map-placeholder', start: 'top 80%', toggleActions: 'play none none reverse' }
    });

    gsap.from('.reviews__grid article', {
      y: 36,
      autoAlpha: 0,
      stagger: 0.1,
      scrollTrigger: { trigger: '.reviews__grid', start: 'top 82%', toggleActions: 'play none none reverse' }
    });
  });

  media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    const track = document.querySelector('[data-services-track]');
    if (track) {
      gsap.to(track, {
        x: () => -Math.max(0, track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          id: 'services-horizontal',
          trigger: '.services',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.45,
          invalidateOnRefresh: true
        }
      });
    }

    gsap.utils.toArray('[data-price-row]').forEach((row) => {
      gsap.fromTo(row,
        { autoAlpha: 0.18, y: 44 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top 84%',
            end: 'top 48%',
            scrub: 0.45
          }
        }
      );
    });

    const process = document.querySelector('.process');
    const steps = gsap.utils.toArray('.process-step');
    const number = document.querySelector('.process__number');
    const routeDot = document.querySelector('.route-line span');
    let activeIndex = 0;
    let transition;
    let wheelLocked = false;

    gsap.set(steps.slice(1), { autoAlpha: 0, y: 48 });
    gsap.set(steps[0], { autoAlpha: 1, y: 0 });

    function showStep(nextIndex) {
      if (nextIndex === activeIndex || nextIndex < 0 || nextIndex >= steps.length) return;
      transition?.kill();
      const previous = steps[activeIndex];
      const next = steps[nextIndex];
      const direction = nextIndex > activeIndex ? 1 : -1;

      gsap.set(next, { autoAlpha: 0, y: 44 * direction });
      previous.classList.remove('is-active');
      next.classList.add('is-active');
      gsap.set(steps.filter((step) => step !== previous && step !== next), { autoAlpha: 0, y: 0 });

      transition = gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(previous, { autoAlpha: 0, y: -34 * direction, duration: 0.22 }, 0)
        .to(number, { autoAlpha: 0, y: -34 * direction, duration: 0.22 }, 0)
        .call(() => { number.textContent = String(nextIndex + 1).padStart(2, '0'); }, null, 0.22)
        .set(number, { y: 44 * direction }, 0.22)
        .to(next, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.22)
        .to(number, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.22);

      activeIndex = nextIndex;
    }

    let processTrigger;
    if (process && steps.length) {
      processTrigger = ScrollTrigger.create({
        id: 'process-steps',
        trigger: process,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const nextIndex = Math.round(self.progress * (steps.length - 1));
          showStep(nextIndex);
          gsap.set(routeDot, { top: `${self.progress * 100}%` });
        }
      });
    }

    const handleProcessWheel = (event) => {
      if (!process || Math.abs(event.deltaY) < 8) return;
      const rect = process.getBoundingClientRect();
      const isPinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!isPinned) return;

      if (wheelLocked) {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = activeIndex + direction;
      if (nextIndex < 0 || nextIndex >= steps.length) return;

      event.preventDefault();
      wheelLocked = true;
      showStep(nextIndex);

      const sectionTop = window.scrollY + rect.top;
      const scrollRange = Math.max(0, process.offsetHeight - window.innerHeight);
      const target = sectionTop + (nextIndex / (steps.length - 1)) * scrollRange;
      window.scrollTo({ top: target, behavior: 'smooth' });
      window.setTimeout(() => { wheelLocked = false; }, 560);
    };

    window.addEventListener('wheel', handleProcessWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleProcessWheel);
      processTrigger?.kill();
    };
  });

  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  if (document.readyState === 'complete') refresh();
  else window.addEventListener('load', refresh, { once: true });
}

runPreloader().then(initMotion);
