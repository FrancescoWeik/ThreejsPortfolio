/**
 * DuckPopup — floating info card that slides in when a duck is clicked.
 *
 * Purely HTML/CSS; no Three.js dependency.
 * Call show(duck) / hide() from Pond.js.
 */
export default class DuckPopup {
    constructor() {
        this._injectStyles();
        this._createElement();
    }

    // ─── Public API ────────────────────────────────────────────────────────────

    show(duck) {
        this._name.textContent  = duck.duckTitle;
        this._desc.textContent  = duck.duckDescription;
        this._el.classList.add('dp-visible');
    }

    hide() {
        this._el.classList.remove('dp-visible');
    }

    // ─── Internals ─────────────────────────────────────────────────────────────

    _createElement() {
        this._el = document.createElement('div');
        this._el.id = 'duck-popup';
        this._el.innerHTML = `
            <div class="dp-header">
                <span class="dp-emoji">🦆</span>
                <div class="dp-water-line"></div>
            </div>
            <h2 class="dp-name" id="dp-name"></h2>
            <div class="dp-divider"></div>
            <p  class="dp-desc" id="dp-desc"></p>
            <p  class="dp-hint">click anywhere to dismiss</p>
        `;
        document.body.appendChild(this._el);

        this._name = document.getElementById('dp-name');
        this._desc = document.getElementById('dp-desc');
    }

    _injectStyles() {
        const s = document.createElement('style');
        s.textContent = `
/* ── Duck popup card ───────────────────────────────────────────── */
#duck-popup {
    /* start off-screen to the right */
    position   : fixed;
    right      : -320px;
    top        : 50%;
    transform  : translateY(-50%);

    width      : 260px;
    padding    : 28px 24px 20px;
    z-index    : 200;

    /* glass look */
    background        : linear-gradient(
                            145deg,
                            rgba(5, 15, 30, 0.82) 0%,
                            rgba(10, 28, 60, 0.82) 100%
                        );
    backdrop-filter         : blur(22px);
    -webkit-backdrop-filter : blur(22px);

    border        : 1px solid rgba(110, 190, 255, 0.18);
    border-radius : 22px;

    box-shadow :
        0 24px 64px rgba(0, 0, 0, 0.65),
        0 0 0 1px rgba(255, 255, 255, 0.04),
        inset 0 1px 0 rgba(255, 255, 255, 0.07);

    /* spring slide-in */
    transition : right 0.55s cubic-bezier(0.34, 1.45, 0.64, 1),
                 opacity 0.35s ease;
    opacity    : 0;

    pointer-events : none;
    user-select    : none;
    font-family    : 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
    color          : #e8f4ff;
}

#duck-popup.dp-visible {
    right   : 28px;
    opacity : 1;
}

/* ── Header row ─────────────────────────────────────────────────── */
.dp-header {
    display     : flex;
    align-items : center;
    gap         : 12px;
    margin-bottom : 14px;
}

.dp-emoji {
    font-size   : 32px;
    line-height : 1;
    filter      : drop-shadow(0 0 8px rgba(100,200,255,0.6));
    animation   : dp-bob 2.8s ease-in-out infinite;
}

@keyframes dp-bob {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-4px); }
}

/* Decorative ripple bar next to the emoji */
.dp-water-line {
    flex   : 1;
    height : 2px;
    border-radius : 2px;
    background : linear-gradient(
        to right,
        rgba(100, 190, 255, 0.55),
        rgba(100, 190, 255, 0.0)
    );
    position : relative;
    overflow : hidden;
}
.dp-water-line::after {
    content    : '';
    position   : absolute;
    inset      : 0;
    background : linear-gradient(
        to right,
        transparent 0%,
        rgba(180, 230, 255, 0.8) 50%,
        transparent 100%
    );
    animation  : dp-shimmer 2.2s linear infinite;
    width      : 60%;
}
@keyframes dp-shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(260%);  }
}

/* ── Name ───────────────────────────────────────────────────────── */
.dp-name {
    margin      : 0 0 10px;
    font-size   : 22px;
    font-weight : 700;
    letter-spacing : 0.3px;
    line-height : 1.2;

    background              : linear-gradient(135deg, #ffffff 0%, #8dd4ff 100%);
    -webkit-background-clip : text;
    -webkit-text-fill-color : transparent;
    background-clip         : text;
}

/* ── Divider ────────────────────────────────────────────────────── */
.dp-divider {
    height        : 1px;
    margin-bottom : 12px;
    background    : linear-gradient(
        to right,
        rgba(100, 180, 255, 0.45),
        transparent
    );
}

/* ── Description ────────────────────────────────────────────────── */
.dp-desc {
    margin      : 0;
    font-size   : 13.5px;
    line-height : 1.65;
    color       : rgba(200, 225, 255, 0.72);
}

/* ── Dismiss hint ───────────────────────────────────────────────── */
.dp-hint {
    margin      : 16px 0 0;
    font-size   : 10.5px;
    letter-spacing : 0.6px;
    text-transform : uppercase;
    color       : rgba(255, 255, 255, 0.22);
    text-align  : right;
}

/* ── Mobile: card slides up from bottom instead ─────────────────── */
@media (max-width: 768px) {
    #duck-popup {
        right     : auto;
        left      : 50%;
        bottom    : -220px;
        top       : auto;
        transform : translateX(-50%);
        width     : calc(100vw - 48px);
        max-width : 360px;
        transition: bottom 0.5s cubic-bezier(0.34, 1.45, 0.64, 1),
                    opacity 0.35s ease;
    }
    #duck-popup.dp-visible {
        right  : auto;
        bottom : 24px;
    }
}
        `;
        document.head.appendChild(s);
    }
}
