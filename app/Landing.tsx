"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FOUNDING_GOAL } from "./lib/founding";
import "./landing.css";

// Rotating "tonight" quests. First stays fixed, the rest shuffle per visit.
const Q = [
  "Run down a hill with a shopping cart.",
  "Learn to juggle.",
  "Learn a bird call.",
  "Go dolly drifting.",
  "Learn a card trick.",
  "Build a treehouse.",
  "Do group karaoke.",
  "Build a slip 'n slide.",
  "Rage bait the room.",
  "Learn to spin a pen.",
  "Learn to moonwalk.",
  "Go pottery painting.",
  "Solve a Rubik's cube.",
  "Learn a new language.",
  "Learn basic yoyo tricks.",
  "Go to a senior bingo night.",
  "Learn to spin a basketball.",
  "Learn to riffle shuffle cards.",
  "Do a sorority girl photoshoot.",
  "Do a conspiracy debate night.",
  "Learn to snap with every finger.",
  "Organise a football tournament.",
  "Learn 5 football freestyle tricks.",
  "Make a PPT about your love life.",
  "Learn to identify 10 constellations.",
  "Learn to beatbox one decent beat.",
  "Learn 100 words of a new language.",
  "Tell your life story with Google Maps.",
  "Create a postcard for your future self.",
  "Learn the bottle flip behind your back.",
  "Go roller skating dressed like it's 1987.",
];

export default function Landing({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [done, setDone] = useState(false);
  const [lockedNum, setLockedNum] = useState<number | null>(null);
  const [fineText, setFineText] = useState("");
  const submitting = useRef(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    const input = e.currentTarget.querySelector("input") as HTMLInputElement | null;
    if (!input) return;
    const email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
      input.focus();
      setFineText("That email does not look right. Check it and try again.");
      return;
    }
    setFineText("");
    submitting.current = true;
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = res.ok ? await res.json() : null;
      if (!data) {
        setFineText("Something went wrong. Try again in a second.");
        submitting.current = false;
        return;
      }
      // A duplicate email shows the same success state; only a brand-new unique
      // signup bumps the number (never above the goal).
      let shown = count;
      if (!data.already_joined) {
        shown = Math.min(FOUNDING_GOAL, count + 1);
        setCount(shown);
      }
      setLockedNum(shown);
      setDone(true);
    } catch {
      setFineText("Something went wrong. Try again in a second.");
      submitting.current = false;
    }
  }

  // Countdown to the launch moment.
  useEffect(() => {
    const LAUNCH = new Date("2026-12-05T00:00:00+01:00");
    const CD = document.getElementById("cd");
    if (!CD) return;
    const UNITS: [string, string][] = [["Days", "d"], ["Hours", "h"], ["Minutes", "m"], ["Seconds", "s"]];
    CD.innerHTML = UNITS.map(
      ([, k], i) =>
        (i ? '<span class="cd-sep">:</span>' : "") +
        `<div class="cd-u" id="u-${k}"><span class="num" id="cd-${k}">00</span></div>`,
    ).join("");
    const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");
    function tick() {
      let t = Math.floor((LAUNCH.getTime() - Date.now()) / 1000);
      if (t < 0) t = 0;
      const v: Record<string, number> = { d: Math.floor(t / 86400), h: Math.floor(t / 3600) % 24, m: Math.floor(t / 60) % 60, s: t % 60 };
      for (const k in v) {
        const el = document.getElementById("cd-" + k);
        if (!el) continue;
        const s = pad(v[k]);
        if (el.textContent !== s) {
          el.textContent = s;
          const u = document.getElementById("u-" + k);
          if (u) {
            u.classList.remove("roll");
            void u.offsetWidth;
            u.classList.add("roll");
          }
        }
      }
    }
    tick();
    const iv = setInterval(tick, 1000);
    return () => {
      clearInterval(iv);
      CD.innerHTML = "";
    };
  }, []);

  // Rotating quest typewriter.
  useEffect(() => {
    const lq = document.getElementById("lq");
    if (!lq) return;
    const q = Q.slice();
    for (let i = q.length - 1; i > 1; i--) {
      const j = 1 + Math.floor(Math.random() * i);
      [q[i], q[j]] = [q[j], q[i]];
    }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let qi = 0;
    let stopped = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    function type(t: string, doneCb: () => void) {
      lq!.textContent = "";
      const c = document.createElement("span");
      c.className = "cur";
      lq!.appendChild(c);
      let i = 0;
      const iv = setInterval(() => {
        if (stopped) {
          clearInterval(iv);
          return;
        }
        c.before(t[i++]);
        if (i >= t.length) {
          clearInterval(iv);
          const to = setTimeout(() => {
            c.remove();
            doneCb();
          }, 2800);
          timers.add(to);
        }
      }, 34);
      timers.add(iv as unknown as ReturnType<typeof setTimeout>);
    }
    function loop() {
      type(q[qi++ % q.length], () => {
        const to = setTimeout(loop, 450);
        timers.add(to);
      });
    }
    if (reduced) lq.textContent = q[0];
    else loop();
    return () => {
      stopped = true;
      timers.forEach((t) => {
        clearInterval(t as unknown as number);
        clearTimeout(t);
      });
    };
  }, []);

  // Width fitter for the .fit headlines.
  useEffect(() => {
    const MOBILE = () => window.matchMedia("(max-width:700px)").matches;
    function fitLines() {
      document.querySelectorAll<HTMLElement>(".fit").forEach((el) => {
        if (MOBILE() && !el.dataset.always) {
          el.style.fontSize = "";
          const t = el.dataset.applyTo ? (el.closest(el.dataset.applyTo) as HTMLElement | null) : el;
          if (t) t.style.fontSize = "";
          return;
        }
        const wrap = el.closest(".wrap") as HTMLElement | null;
        if (!wrap) return;
        const cs = getComputedStyle(wrap);
        const avail = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        el.style.fontSize = "100px";
        const w = el.scrollWidth;
        if (w <= 0) return;
        const fs = ((99.5 * avail) / w).toFixed(2) + "px";
        const target = (el.dataset.applyTo ? (el.closest(el.dataset.applyTo) as HTMLElement | null) : el) as HTMLElement;
        target.style.fontSize = fs;
        if (target !== el) el.style.fontSize = "";
      });
    }
    fitLines();
    let cancelled = false;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => !cancelled && fitLines());
    window.addEventListener("resize", fitLines);
    window.addEventListener("load", fitLines);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", fitLines);
      window.removeEventListener("load", fitLines);
    };
  }, []);

  // Shirt carousel (autoplay + tap + swipe).
  useEffect(() => {
    const deck = document.getElementById("deck");
    if (!deck) return;
    const cards = [...deck.querySelectorAll(".card")];
    const POS = ["pos-c", "pos-r", "pos-l"];
    let cur = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function render() {
      cards.forEach((c, i) => {
        const rel = (i - cur + cards.length) % cards.length;
        c.classList.remove("pos-c", "pos-r", "pos-l");
        c.classList.add(POS[rel]);
        c.setAttribute("aria-hidden", rel === 0 ? "false" : "true");
      });
    }
    const go = (i: number) => {
      cur = (i + cards.length) % cards.length;
      render();
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const clickHandlers = cards.map((c, i) => {
      const h = () => {
        stop();
        go(i);
      };
      c.addEventListener("click", h);
      return [c, h] as const;
    });
    let x0: number | null = null;
    const ts = (e: Event) => {
      x0 = (e as TouchEvent).touches[0].clientX;
    };
    const te = (e: Event) => {
      if (x0 === null) return;
      const dx = (e as TouchEvent).changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) {
        stop();
        go(cur + (dx < 0 ? 1 : -1));
      }
      x0 = null;
    };
    deck.addEventListener("touchstart", ts, { passive: true });
    deck.addEventListener("touchend", te);
    render();
    if (!reduced) timer = setInterval(() => go(cur + 1), 3600);
    return () => {
      stop();
      clickHandlers.forEach(([c, h]) => c.removeEventListener("click", h));
      deck.removeEventListener("touchstart", ts);
      deck.removeEventListener("touchend", te);
    };
  }, []);

  // Scroll reveal (greyscale to colour + fade up).
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Anchor CTAs focus the email field after the smooth scroll settles.
  useEffect(() => {
    const links = [...document.querySelectorAll('a[href="#get"]')];
    const h = () => setTimeout(() => document.getElementById("e1")?.focus(), 620);
    links.forEach((a) => a.addEventListener("click", h));
    return () => links.forEach((a) => a.removeEventListener("click", h));
  }, []);

  return (
    <div className="lp" id="top">
      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <p className="kick">
            Dec 05, <span id="c1">{count.toLocaleString("en-US")}</span>/1000 in.
          </p>
          <h1>
            <span className="fit" data-always="1">
              There is<br className="m-br" /> no replay.
            </span>
          </h1>

          <p className="hero-sub a">
            Be early or cry later. You don&apos;t get another version of this year.
            <br />
            Life is live. Start today, get your first sidequest.
          </p>

          <form className={`cap${done ? " done" : ""}`} id="get" noValidate onSubmit={onSubmit}>
            <div className="cap-row">
              <div className="field">
                <label className="sr" htmlFor="e1">
                  Your email
                </label>
                <input id="e1" type="email" inputMode="email" autoComplete="email" placeholder="you@email.com" required />
              </div>
              <button className="btn" type="submit">
                Get in, start your first sidequest
              </button>
            </div>
            <div className="ok" role="status">
              <span className="n" data-num="">
                {lockedNum !== null ? `#${lockedNum}` : "#000"}
              </span>
              <p>
                <b>Number locked.</b>Check your inbox.
              </p>
            </div>
            <p className="fine" aria-live="polite">
              {fineText || null}
            </p>
          </form>

          <div className="cd" id="cd" aria-label="Time until 2HL opens" />
        </div>
      </header>

      {/* TONIGHT */}
      <section className="tonight">
        <div className="wrap">
          <span className="q" id="lq" />
        </div>
      </section>

      {/* THE OFFER */}
      <section className="inv">
        <div className="wrap">
          <div className="inv-head rv">
            <h2>The Day Ones.</h2>
            <p>We never forget our Day Ones.</p>
          </div>

          <div className="callouts rv">
            <div className="col l">
              <div className="cal m-only">
                <p>In the app two weeks before everyone else.</p>
              </div>
              <div className="cal">
                <p>A permanent Day One number on your profile.</p>
              </div>
            </div>

            <div className="shot">
              <img src="/landing/img1.jpg" alt="A 2HL profile showing the permanent Day One number 420" loading="lazy" decoding="async" />
            </div>

            <div className="col r">
              <div className="cal">
                <p>
                  Day One rank. Anything we ever charge for,<br className="m-br" /> you get free for life.
                </p>
              </div>
            </div>
          </div>

          <div className="foot-offer rv">
            <p>In the app two weeks before everyone else.</p>
            <a className="btn" href="#get">
              Get in, start your first sidequest
            </a>
          </div>
        </div>
      </section>

      {/* THE DROP */}
      <section className="drop">
        <div className="wrap">
          <div className="drop-head rv">
            <h2>You can&apos;t buy this.</h2>
            <p>Ten exist. Ten Day Ones get one. None are for sale.</p>
          </div>
          <div className="deck rv" id="deck" aria-roledescription="carousel" aria-label="Day One shirts">
            <figure className="card pos-c">
              <img src="/landing/img2.jpg" alt="2HL post by timznr: design better shirts than a fashion brand. White tee held up, back print reads THERE IS NO REPLAY." loading="lazy" decoding="async" />
            </figure>
            <figure className="card pos-r">
              <img src="/landing/img3.jpg" alt="2HL post by timznr: design better shirts than a fashion brand. Red tee, back print reads TOO MUCH CERTAINTY IS A LITTLE UNATTRACTIVE." loading="lazy" decoding="async" />
            </figure>
            <figure className="card pos-l">
              <img src="/landing/img4.jpg" alt="2HL post by timznr: design better shirts than a fashion brand. White tee, back print reads show me your fy page and I tell you who you are." loading="lazy" decoding="async" />
            </figure>
          </div>
          <div className="drop-cta rv">
            <p>You want one? Be early.</p>
            <a className="btn" href="#get">
              Get in, start your first sidequest
            </a>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="stmt">
        <div className="wrap rv">
          <h2>
            We watched everybody else&apos;s life.
            <br />
            Now it&apos;s our time.
          </h2>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="sec">
        <div className="wrap">
          <div className="step rv">
            <div>
              <h3>Pick your sidequest.</h3>
              <p className="sub">One drops every day. Already out and something better is happening? Write your own.</p>
            </div>
            <div className="shot">
              <img src="/landing/img5.jpg" alt="2HL home screen prompting you to pick your sidequest" loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="step rv">
            <div>
              <h3>Post up to 3 photos.</h3>
              <p className="sub">Shoot it, write the line, send it. Then you hand a friend their sidequest for tomorrow.</p>
            </div>
            <div className="shot">
              <img src="/landing/img6.jpg" alt="2HL Tell Your Story screen for posting your photos" loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="step rv">
            <div>
              <h3>Unlock the feed to see what your friends did.</h3>
              <p className="sub">Nothing until you post. Then everyone&apos;s night at once.</p>
            </div>
            <div className="shot">
              <img src="/landing/img7.jpg" alt="2HL feed showing a friend's post" loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="step rv">
            <div>
              <h3>It all gets saved.</h3>
              <p className="sub">Every quest you finish stays on your profile. A diary you never had to write.</p>
            </div>
            <div className="shot">
              <img src="/landing/img8.jpg" alt="2HL profile with streak, quests and saved memories" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* CLOSER */}
      <section className="closer">
        <div className="wrap rv">
          <a href="#get" className="end" aria-label="Back to the top">
            <span className="end-a fit" data-always="1">
              NO REPLAY
            </span>
          </a>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <p>© 2026 2HL</p>
          <nav>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/legal">Legal</a>
            <a href="mailto:info@2hoursleft.com">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
