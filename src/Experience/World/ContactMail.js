import * as THREE from 'three'
import contactConfig from '../contactConfig.js'

//The "contact" screen, drawn ENTIRELY onto the ContactPlane texture so it feels part of the model
//(no DOM popup). The form is interactive: the card raycasts a click onto the plane and forwards the
//hit UV here; we map it to a field/button. Because a canvas texture can't receive keystrokes, each
//field is backed by an off-screen, invisible <input>/<textarea> that actually captures typing (and
//pops the mobile keyboard); on every keystroke we copy its value onto the canvas and redraw.
export default class ContactMail{
    constructor(options = {}){
        this.plane = options.plane || null;          //ContactPlane (THREE node) — the form surface
        this.onBack = options.onBack || (() => {});  //called by the on-plane "back" button
        this.toAddress = contactConfig.email;        //mail destination (from the shared config)
        this.instagram = contactConfig.instagram;    //Instagram profile URL

        //Form model (the inputs hold the real text; these mirror it for drawing). No "From" field:
        //Send opens the visitor's own mail app via mailto, so the sender is already their account.
        this.fieldOrder = ['subject', 'body'];
        this.fields = {
            subject: { label: 'Subject', placeholder: "What's it about?",         value: '', multiline: false },
            body:    { label: 'Message', placeholder: 'Write your message here...', value: '', multiline: true }
        };
        this.active = null;       //focused field key (or null)
        this.caretOn = true;      //caret blink state
        this._rects = {};         //hit rectangles (canvas coords), filled by redraw()

        this.W = 2048;
        this.H = 1024;

        this.setCanvas();
        this.setInputs();
        this.redraw();

        if(this.plane) this.plane.visible = false;
    }

    setCanvas(){
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.W;
        this.canvas.height = this.H;
        this.ctx = this.canvas.getContext('2d');

        this.texture = new THREE.CanvasTexture(this.canvas);
        //The 180° model spin already presents this plane upright to the camera, so no extra flip is
        //needed (identity transform). The click mapping below derives from these exact values, so
        //display and hit-testing stay consistent whatever they are.
        this.texture.flipY = false;
        this.texture.encoding = THREE.sRGBEncoding;

        this.material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true, side: THREE.DoubleSide });
        if(this.plane) this.plane.traverse((child) => { if(child.isMesh) child.material = this.material; });
    }

    setInputs(){
        //Invisible, off-screen fields that actually capture keystrokes. We never show them; the
        //canvas is the visible UI. Focusing one (on a plane click) pops the keyboard and routes typing.
        this.inputs = {};
        for(const key of this.fieldOrder){
            const el = document.createElement(this.fields[key].multiline ? 'textarea' : 'input');
            if(!this.fields[key].multiline) el.type = 'text';
            el.setAttribute('autocomplete', 'off');
            el.setAttribute('autocapitalize', 'off');
            el.setAttribute('spellcheck', 'false');
            el.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;border:0;padding:0;pointer-events:none;z-index:-1;';
            el.addEventListener('input', () => { this.fields[key].value = el.value; this.redraw(); });
            el.addEventListener('blur', () => { if(this.active === key){ this.active = null; this.stopCaret(); this.redraw(); } });
            document.body.appendChild(el);
            this.inputs[key] = el;
        }
    }

    //--- drawing -------------------------------------------------------------------------------
    redraw(){
        const ctx = this.ctx, W = this.W, H = this.H;
        const blue = '#2756e6';
        const blueSoft = '#9fb6f7';
        ctx.clearRect(0, 0, W, H);

        //Panel: translucent navy (no frame)
        const m = Math.round(H * 0.05);
        const r = Math.round(H * 0.07);
        const grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, 'rgba(18, 22, 38, 0.94)');
        grad.addColorStop(1, 'rgba(20, 30, 70, 0.94)');
        this.roundRect(m, m, W - m * 2, H - m * 2, r);
        ctx.fillStyle = grad; ctx.fill();

        //Title + subtitle
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 72px sans-serif';
        ctx.fillText('Get in touch', 140, 150);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '400 34px sans-serif';
        ctx.fillText('An idea, a collaboration or just a hello ✉', 142, 200);

        //Fields (Subject + Message)
        const fx = 140, fw = W - 280;
        const boxes = {
            subject: { x: fx, y: 285, w: fw, h: 90 },
            body:    { x: fx, y: 455, w: fw, h: 205 }
        };
        for(const key of this.fieldOrder){
            this._rects[key] = boxes[key];
            this.drawField(key, boxes[key], blue, blueSoft);
        }

        //Send button (centered, blue pill)
        const send = { x: W / 2 - 280, y: 695, w: 560, h: 110 };
        this._rects.send = send;
        const g2 = ctx.createLinearGradient(send.x, 0, send.x + send.w, 0);
        g2.addColorStop(0, '#4a76f9'); g2.addColorStop(1, '#2756e6');
        this.roundRect(send.x, send.y, send.w, send.h, send.h / 2);
        ctx.fillStyle = g2; ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 44px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Send ✦', send.x + send.w / 2, send.y + send.h / 2 + 2);

        //Contacts strip (clickable): email + Instagram
        const gap = 40;
        const chipW = (fw - gap) / 2;
        const chipY = 850, chipH = 95;
        this._rects.email = { x: fx, y: chipY, w: chipW, h: chipH };
        this._rects.instagram = { x: fx + chipW + gap, y: chipY, w: chipW, h: chipH };
        this.drawChip(this._rects.email, 'email', this.toAddress, blue);
        this.drawChip(this._rects.instagram, 'instagram', 'Instagram', blue);

        this.texture.needsUpdate = true;
    }

    drawField(key, box, blue, blueSoft){
        const ctx = this.ctx;
        const field = this.fields[key];
        const focused = this.active === key;

        //Label
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = blueSoft;
        ctx.font = '700 30px sans-serif';
        ctx.fillText(field.label.toUpperCase(), box.x + 6, box.y - 18);

        //Box
        this.roundRect(box.x, box.y, box.w, box.h, 18);
        ctx.fillStyle = focused ? 'rgba(107, 142, 251, 0.14)' : 'rgba(255, 255, 255, 0.07)';
        ctx.fill();
        ctx.lineWidth = focused ? 4 : 2;
        ctx.strokeStyle = focused ? '#6b8efb' : 'rgba(255, 255, 255, 0.18)';
        ctx.stroke();

        //Text (or placeholder)
        const padX = box.x + 26;
        const fontSize = 42;
        ctx.font = `400 ${fontSize}px sans-serif`;
        ctx.textBaseline = 'top';
        const hasValue = field.value.length > 0;
        ctx.fillStyle = hasValue ? '#ffffff' : 'rgba(255, 255, 255, 0.38)';

        if(field.multiline){
            const lines = this.wrapText(hasValue ? field.value : field.placeholder, box.w - 52);
            const lineH = fontSize * 1.3;
            const maxLines = Math.floor((box.h - 28) / lineH);
            const shown = lines.slice(-maxLines); //keep the latest lines visible while typing
            let ty = box.y + 18;
            for(const line of shown){ ctx.fillText(line, padX, ty); ty += lineH; }
            if(focused && this.caretOn){
                const last = shown.length ? shown[shown.length - 1] : '';
                const cxp = padX + (hasValue ? ctx.measureText(last).width : 0);
                const cyp = box.y + 18 + Math.max(0, shown.length - 1) * lineH;
                this.drawCaret(cxp, cyp, fontSize, blue);
            }
        } else {
            const text = hasValue ? field.value : field.placeholder;
            const ty = box.y + (box.h - fontSize) / 2;
            ctx.fillText(text, padX, ty);
            if(focused && this.caretOn){
                const cxp = padX + (hasValue ? ctx.measureText(field.value).width : 0);
                this.drawCaret(cxp, ty, fontSize, blue);
            }
        }
    }

    drawCaret(x, y, size, color){
        const ctx = this.ctx;
        ctx.fillStyle = color;
        ctx.fillRect(x + 2, y - 2, 3, size + 4);
    }

    drawChip(rect, type, text, blue){
        const ctx = this.ctx;
        this.roundRect(rect.x, rect.y, rect.w, rect.h, rect.h / 2);
        ctx.fillStyle = 'rgba(107, 142, 251, 0.12)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(107, 142, 251, 0.5)';
        ctx.stroke();

        const cy = rect.y + rect.h / 2;
        this.drawChipIcon(type, rect.x + 44, cy, 42, blue);

        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.font = '500 38px sans-serif';
        ctx.fillText(text, rect.x + 108, cy + 2);
    }

    drawChipIcon(type, cx, cy, s, color){
        const ctx = this.ctx;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = Math.max(3, s * 0.09);
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        if(type === 'email'){
            const w = s * 1.2, h = s * 0.82;
            const x = cx - w / 2, y = cy - h / 2;
            ctx.strokeRect(x, y, w, h);
            ctx.beginPath();
            ctx.moveTo(x, y + h * 0.18);
            ctx.lineTo(cx, y + h * 0.62);
            ctx.lineTo(x + w, y + h * 0.18);
            ctx.stroke();
        } else {
            const a = s, x = cx - a / 2, y = cy - a / 2;
            this.roundRect(x, y, a, a, a * 0.28); ctx.stroke();          //body
            ctx.beginPath(); ctx.arc(cx, cy, a * 0.26, 0, Math.PI * 2); ctx.stroke(); //lens
            ctx.beginPath(); ctx.arc(x + a * 0.78, y + a * 0.22, a * 0.06, 0, Math.PI * 2); ctx.fill(); //dot
        }
    }

    wrapText(text, maxWidth){
        const ctx = this.ctx;
        const out = [];
        for(const paragraph of text.split('\n')){
            const words = paragraph.split(' ');
            let current = '';
            for(const word of words){
                const test = current ? current + ' ' + word : word;
                if(ctx.measureText(test).width > maxWidth && current){ out.push(current); current = word; }
                else current = test;
            }
            out.push(current);
        }
        return out;
    }

    roundRect(x, y, w, h, rad){
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(x + rad, y);
        ctx.arcTo(x + w, y, x + w, y + h, rad);
        ctx.arcTo(x + w, y + h, x, y + h, rad);
        ctx.arcTo(x, y + h, x, y, rad);
        ctx.arcTo(x, y, x + w, y, rad);
        ctx.closePath();
    }

    //--- interaction ---------------------------------------------------------------------------
    //Called by the card with the raycast hit UV on the plane (or null if the click missed it).
    handleHit(uv){
        if(!uv){ this.blur(); return; }
        //Map geometry UV -> canvas pixel using the SAME texture transform used for display
        const t = this.texture;
        const sx = uv.x * t.repeat.x + t.offset.x;
        const sy = uv.y * t.repeat.y + t.offset.y;
        const cx = sx * this.W;
        const cy = (t.flipY ? (1 - sy) : sy) * this.H;

        if(this.inside(cx, cy, this._rects.send)){ this.send(); return; }
        if(this.inside(cx, cy, this._rects.email)){ this.openEmail(); return; }
        if(this.inside(cx, cy, this._rects.instagram)){ this.openInstagram(); return; }
        for(const key of this.fieldOrder){
            if(this.inside(cx, cy, this._rects[key])){ this.focusField(key); return; }
        }
        this.blur();
    }

    openEmail(){
        window.location.href = `mailto:${this.toAddress}`;
    }

    openInstagram(){
        if(this.instagram) window.open(this.instagram, '_blank', 'noopener');
    }

    inside(x, y, r){
        return r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
    }

    focusField(key){
        this.active = key;
        this.startCaret();
        const el = this.inputs[key];
        el.focus();
        //Put the caret at the end of any existing text
        const len = el.value.length;
        try { el.setSelectionRange(len, len); } catch(e) {}
        this.redraw();
    }

    blur(){
        if(this.active){ this.inputs[this.active].blur(); }
        this.active = null;
        this.stopCaret();
        this.redraw();
    }

    startCaret(){
        this.stopCaret();
        this.caretOn = true;
        this._caretTimer = setInterval(() => { this.caretOn = !this.caretOn; this.redraw(); }, 530);
    }

    stopCaret(){
        if(this._caretTimer){ clearInterval(this._caretTimer); this._caretTimer = null; }
        this.caretOn = true;
    }

    send(){
        const subject = this.fields.subject.value.trim();
        const body = this.fields.body.value.trim();
        if(!subject || !body){
            //Flag the first empty field
            const missing = this.fieldOrder.find((k) => !this.fields[k].value.trim());
            if(missing) this.focusField(missing);
            return;
        }
        //Opens the visitor's own mail app with everything pre-filled (no backend, no keys)
        const mail = `mailto:${this.toAddress}`
            + `?subject=${encodeURIComponent(subject)}`
            + `&body=${encodeURIComponent(body)}`;
        window.location.href = mail;
    }

    //--- visibility ----------------------------------------------------------------------------
    show(){
        if(this.plane) this.plane.visible = true;
    }

    hide(){
        this.blur();
        if(this.plane) this.plane.visible = false;
    }
}
