import projects from '../projects.js'

export default class ProjectCard {
    /**
     * @param {Function} onClose  called when the user closes the carousel
     */
    constructor(onClose) {
        this._onClose = onClose || (() => {})
        this._current = 0
        this._total   = projects.length
        this._el      = null
        this._card    = null
        this._track   = null

        this._build()
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Build
    // ─────────────────────────────────────────────────────────────────────────
    _build() {
        this._injectStyles()

        const el = document.createElement('div')
        el.id = 'project-carousel'
        el.innerHTML = `
            <div class="pc-backdrop"></div>
            <div class="pc-shell">

                <button class="pc-close" aria-label="Chiudi">✕</button>

                <div class="pc-header">
                    <span class="pc-label">Progetti</span>
                    <span class="pc-counter" id="pc-counter">1 / ${this._total}</span>
                </div>

                <div class="pc-stage">
                    <button class="pc-arrow pc-arrow--l" id="pc-prev" aria-label="Precedente">‹</button>

                    <div class="pc-card" id="pc-card">
                        <div class="pc-card__img-wrap">
                            <img class="pc-card__img" id="pc-img" src="" alt="">
                        </div>
                        <div class="pc-card__body">
                            <h2 class="pc-card__title" id="pc-title"></h2>
                            <p  class="pc-card__desc"  id="pc-desc"></p>
                            <a  class="pc-card__link"  id="pc-link" href="#" target="_blank">
                                Scopri il progetto <span class="pc-arrow-icon">→</span>
                            </a>
                        </div>
                    </div>

                    <button class="pc-arrow pc-arrow--r" id="pc-next" aria-label="Successivo">›</button>
                </div>

                <div class="pc-dots" id="pc-dots"></div>

            </div>
        `
        document.body.appendChild(el)
        this._el   = el
        this._card = el.querySelector('#pc-card')

        // Dots
        this._buildDots()

        // Events
        el.querySelector('#pc-prev').addEventListener('click', () => this._go(-1))
        el.querySelector('#pc-next').addEventListener('click', () => this._go(+1))
        el.querySelector('.pc-close').addEventListener('click', () => this._onClose())
        el.querySelector('.pc-backdrop').addEventListener('click', () => this._onClose())

        // Keyboard
        this._keyHandler = (e) => {
            if (!this._el.classList.contains('visible')) return
            if (e.key === 'ArrowLeft')  this._go(-1)
            if (e.key === 'ArrowRight') this._go(+1)
            if (e.key === 'Escape')     this._onClose()
        }
        window.addEventListener('keydown', this._keyHandler)

        // Touch swipe
        let touchStartX = 0
        this._card.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX }, { passive: true })
        this._card.addEventListener('touchend',   e => {
            const dx = e.changedTouches[0].clientX - touchStartX
            if (Math.abs(dx) > 40) this._go(dx < 0 ? 1 : -1)
        })
    }

    _buildDots() {
        const container = this._el.querySelector('#pc-dots')
        container.innerHTML = ''
        for (let i = 0; i < this._total; i++) {
            const dot = document.createElement('button')
            dot.className = 'pc-dot' + (i === this._current ? ' active' : '')
            dot.setAttribute('aria-label', `Progetto ${i + 1}`)
            dot.addEventListener('click', () => this._goTo(i, i > this._current ? 'next' : 'prev'))
            container.appendChild(dot)
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Navigation
    // ─────────────────────────────────────────────────────────────────────────
    _go(delta) {
        const next = (this._current + delta + this._total) % this._total
        this._goTo(next, delta > 0 ? 'next' : 'prev')
    }

    _goTo(idx, direction = 'next') {
        if (idx === this._current) return
        const card     = this._card
        const exitCls  = direction === 'next' ? 'exit-left'  : 'exit-right'
        const enterCls = direction === 'next' ? 'enter-right' : 'enter-left'

        card.classList.add(exitCls)

        setTimeout(() => {
            this._current = idx
            this._fill()
            card.classList.remove(exitCls)
            card.classList.add(enterCls)

            // Force reflow so the browser registers the enter state before removing it
            void card.offsetWidth
            card.classList.remove(enterCls)
        }, 240)
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Content
    // ─────────────────────────────────────────────────────────────────────────
    _fill() {
        const p = projects[this._current]
        this._el.querySelector('#pc-img').src       = p.path  || ''
        this._el.querySelector('#pc-title').textContent = p.title || p.name
        this._el.querySelector('#pc-desc').textContent  = p.description || ''
        const link = this._el.querySelector('#pc-link')
        link.href = p.link || '#'
        link.style.opacity = p.link ? '1' : '0.35'
        link.style.pointerEvents = p.link ? 'auto' : 'none'

        this._el.querySelector('#pc-counter').textContent = `${this._current + 1} / ${this._total}`

        // Update dots
        this._el.querySelectorAll('.pc-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this._current)
        })
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Show / Hide
    // ─────────────────────────────────────────────────────────────────────────
    show() {
        this._current = 0
        this._buildDots()
        this._fill()
        this._el.classList.add('visible')
    }

    hide() {
        this._el.classList.remove('visible')
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Styles
    // ─────────────────────────────────────────────────────────────────────────
    _injectStyles() {
        if (document.getElementById('pc-style')) return
        const s = document.createElement('style')
        s.id = 'pc-style'
        s.textContent = `
            /* ── Overlay ─────────────────────────────────────────────── */
            #project-carousel {
                position: fixed;
                inset: 0;
                z-index: 300;
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.35s ease;
            }
            #project-carousel.visible {
                opacity: 1;
                pointer-events: auto;
            }

            /* backdrop */
            #project-carousel .pc-backdrop {
                position: absolute;
                inset: 0;
                background: rgba(3, 10, 24, 0.65);
                backdrop-filter: blur(6px);
                -webkit-backdrop-filter: blur(6px);
            }

            /* ── Shell ───────────────────────────────────────────────── */
            #project-carousel .pc-shell {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.1rem;
                transform: scale(0.9);
                transition: transform 0.35s cubic-bezier(.4,0,.2,1);
            }
            #project-carousel.visible .pc-shell {
                transform: scale(1);
            }

            /* close */
            #project-carousel .pc-close {
                position: absolute;
                top: -0.5rem;
                right: -0.5rem;
                width: 32px; height: 32px;
                border-radius: 50%;
                border: 1px solid rgba(80,160,255,0.3);
                background: rgba(6,18,38,0.9);
                color: rgba(160,210,255,0.7);
                font-size: 0.85rem;
                cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                transition: background 0.2s, color 0.2s;
                z-index: 1;
            }
            #project-carousel .pc-close:hover {
                background: rgba(80,160,255,0.2);
                color: #fff;
            }

            /* header */
            #project-carousel .pc-header {
                display: flex;
                align-items: baseline;
                gap: 0.75rem;
                align-self: flex-start;
                padding-left: 0.25rem;
            }
            #project-carousel .pc-label {
                font-family: system-ui, sans-serif;
                font-size: 0.68rem;
                font-weight: 700;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                color: rgba(120,190,255,0.55);
            }
            #project-carousel .pc-counter {
                font-family: system-ui, sans-serif;
                font-size: 0.68rem;
                color: rgba(120,190,255,0.35);
                letter-spacing: 0.04em;
            }

            /* ── Stage (arrows + card) ───────────────────────────────── */
            #project-carousel .pc-stage {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            /* arrows */
            #project-carousel .pc-arrow {
                width: 42px; height: 42px;
                border-radius: 50%;
                border: 1px solid rgba(80,160,255,0.25);
                background: rgba(6,18,38,0.75);
                color: #60b8ff;
                font-size: 1.5rem;
                line-height: 1;
                cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                transition: background 0.2s, border-color 0.2s, transform 0.15s;
                flex-shrink: 0;
            }
            #project-carousel .pc-arrow:hover {
                background: rgba(80,160,255,0.18);
                border-color: rgba(80,160,255,0.55);
                transform: scale(1.08);
            }
            #project-carousel .pc-arrow:active { transform: scale(0.95); }

            /* ── Card ────────────────────────────────────────────────── */
            #project-carousel .pc-card {
                width: 300px;
                background: rgba(6, 18, 40, 0.90);
                border: 1px solid rgba(80,160,255,0.22);
                border-radius: 22px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0,0,70,0.65),
                            inset 0 1px 0 rgba(120,200,255,0.07);
                font-family: system-ui, sans-serif;
                color: #e8f4ff;
                transition: transform 0.24s cubic-bezier(.4,0,.2,1),
                            opacity  0.24s cubic-bezier(.4,0,.2,1);
            }
            /* slide animations */
            #project-carousel .pc-card.exit-left  { transform: translateX(-48px); opacity: 0; }
            #project-carousel .pc-card.exit-right { transform: translateX( 48px); opacity: 0; }
            #project-carousel .pc-card.enter-right { transform: translateX( 48px); opacity: 0; transition: none; }
            #project-carousel .pc-card.enter-left  { transform: translateX(-48px); opacity: 0; transition: none; }

            /* image */
            #project-carousel .pc-card__img-wrap {
                width: 100%; height: 175px;
                overflow: hidden;
                background: rgba(10, 25, 55, 0.8);
                border-bottom: 1px solid rgba(80,160,255,0.12);
            }
            #project-carousel .pc-card__img {
                width: 100%; height: 100%;
                object-fit: contain;
                display: block;
                padding: 1rem;
                box-sizing: border-box;
            }

            /* body */
            #project-carousel .pc-card__body {
                padding: 1.3rem 1.5rem 1.5rem;
            }
            #project-carousel .pc-card__title {
                font-size: 1.05rem;
                font-weight: 700;
                color: #ff8c55;
                margin: 0 0 0.55rem;
                line-height: 1.3;
                letter-spacing: 0.01em;
            }
            #project-carousel .pc-card__desc {
                font-size: 0.84rem;
                color: rgba(210,235,255,0.78);
                line-height: 1.6;
                margin: 0 0 1.2rem;
                min-height: 3.2rem;
            }
            #project-carousel .pc-card__link {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                font-size: 0.8rem;
                font-weight: 600;
                color: #60b8ff;
                text-decoration: none;
                border: 1px solid rgba(80,160,255,0.35);
                border-radius: 10px;
                padding: 0.38rem 0.9rem;
                transition: background 0.2s, color 0.2s, border-color 0.2s;
            }
            #project-carousel .pc-card__link:hover {
                background: rgba(80,160,255,0.15);
                color: #a8d8ff;
                border-color: rgba(80,160,255,0.6);
            }
            #project-carousel .pc-arrow-icon {
                transition: transform 0.2s;
            }
            #project-carousel .pc-card__link:hover .pc-arrow-icon {
                transform: translateX(3px);
            }

            /* ── Dots ────────────────────────────────────────────────── */
            #project-carousel .pc-dots {
                display: flex;
                gap: 0.5rem;
            }
            #project-carousel .pc-dot {
                width: 7px; height: 7px;
                border-radius: 50%;
                border: none;
                background: rgba(80,160,255,0.25);
                cursor: pointer;
                padding: 0;
                transition: background 0.25s, transform 0.25s;
            }
            #project-carousel .pc-dot.active {
                background: #ff8c55;
                transform: scale(1.35);
            }
            #project-carousel .pc-dot:hover:not(.active) {
                background: rgba(80,160,255,0.5);
            }
        `
        document.head.appendChild(s)
    }
}
