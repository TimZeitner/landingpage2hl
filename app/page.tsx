"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "./supabase";

const tickerItems = [
  "DAILY SIDEQUEST",
  "2 HOURS",
  "CREATE STORIES",
  "AMSTERDAM 2026",
  "LIMITED ACCESS",
  "WORTH TELLING",
];

const questTypes = [
  {
    title: "FRIDAY NIGHT",
    body: "Bar hops, strangers, spontaneous detours - sidequests built for when the night has no plan.",
  },
  {
    title: "THE BOYS",
    body: "Group missions, competitions, chaos. Designed for when everyone's together and nobody knows what to do.",
  },
  {
    title: "WILD CARD",
    body: "No theme. No rules. Just the ones that came from a bad idea and turned into the best story.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("Amsterdam launch - July 2026");

  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const nav = document.getElementById("nav");
    if (!cursor || !nav) return;

    const moveCursor = (event: MouseEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    const toggleNav = () => {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08 },
    );

    const revealEls = document.querySelectorAll(".reveal");
    const interactiveEls = document.querySelectorAll("a, button, input");

    revealEls.forEach((el) => observer.observe(el));
    const growCursor = () => cursor.classList.add("big");
    const shrinkCursor = () => cursor.classList.remove("big");

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", growCursor);
      el.addEventListener("mouseleave", shrinkCursor);
    });

    document.addEventListener("mousemove", moveCursor);
    window.addEventListener("scroll", toggleNav);
    toggleNav();

    return () => {
      observer.disconnect();
      document.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", toggleNav);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", growCursor);
        el.removeEventListener("mouseleave", shrinkCursor);
      });
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setStatus("error");
      setMessage("Drop a real email first.");
      return;
    }

    setStatus("loading");
    setMessage("Saving your spot...");

    const { error } = await supabase.from("waitlist").insert({ email: cleanEmail });

    if (error) {
      setStatus("error");
      setMessage("Something broke. Try again in a second.");
      return;
    }

    setStatus("success");
    setEmail("");
    setMessage("See you in Amsterdam.");
  }

  return (
    <>
      <div className="cursor" id="cursor" />

      <nav id="nav">
        <a href="#" className="nav-logo">
          2HL
        </a>
        <div className="nav-right">
          <a href="#how" className="nav-link">
            How it works
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#waitlist" className="nav-cta">
            Join waitlist
          </a>
        </div>
      </nav>

      <main>
        <section className="hero" aria-label="2HL introduction">
          <div className="hero-content">
            <p className="hero-eyebrow">Amsterdam / July 2026 / Limited Access</p>
            <h1 className="hero-title">
              Create <em>stories</em> worth telling.
            </h1>
          </div>
          <div className="hero-bottom">
            <p className="hero-sub">
              A daily sidequest. Two hours to complete it. The life you always said you'd live -
              starting now.
            </p>
            <div className="hero-cta-wrap">
              <a href="#waitlist" className="btn-primary">
                Get early access
              </a>
              <span className="hero-note">Launching Amsterdam - Summer 2026</span>
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-inner">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span className="ticker-group" key={`${item}-${index}`}>
                <span className="ticker-item">{item}</span>
                <span className="ticker-sep">/</span>
              </span>
            ))}
          </div>
        </div>

        <section id="about">
          <div className="story-wrap reveal">
            <div className="section-label">The idea</div>
            <div className="story-grid">
              <div className="story-left">
                <h2 className="story-headline">
                  Every night out is a <em>story</em> waiting to happen.
                </h2>
                <p className="story-body">
                  A random plan. A bad idea. A "bro trust me" moment. One message in the group chat
                  that somehow turns into a night, a trip, a mission - a sidequest you still talk
                  about months later.
                  <br />
                  <br />
                  That's what we want more of. We just give it a shape.
                </p>
              </div>
              <div className="story-right">
                <div className="photo-block">
                  <img src="/images/photo1.jpeg" alt="Kingsday sidequest moment" />
                  <span className="photo-label">Kingsday / Amsterdam / Sidequest energy</span>
                </div>
                <div className="photo-block">
                  <img src="/images/photo2.jpeg" alt="Friends out during Kingsday" />
                  <span className="photo-label">No plan / good story / worth telling</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="how-section">
          <div className="how-wrap reveal">
            <div className="section-label">How it works</div>
            <div className="how-grid">
              <article className="how-card">
                <div className="how-num">01</div>
                <h3 className="how-title">Get your sidequest</h3>
                <p className="how-body">
                  Once a day you get a notification. Pick between wild or basic. The mission is set.
                </p>
              </article>
              <article className="how-card featured">
                <div className="how-num">02</div>
                <h3 className="how-title">You have 2 hours.</h3>
                <p className="how-body">
                  The clock starts the moment you open the app. No plan, no excuses. Go.
                </p>
              </article>
              <article className="how-card">
                <div className="how-num">03</div>
                <h3 className="how-title">Unlock your friends</h3>
                <p className="how-body">
                  Upload your photo, then see what your crew did. You only get access after you've
                  done yours.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section>
          <div className="how-wrap reveal">
            <div className="section-label">The Quest Book</div>
            <div className="qb-grid">
              <div className="qb-left">
                <div>
                  <h2 className="qb-title">
                    Not just your daily sidequest.
                    <br />A sidequest for every occasion.
                  </h2>
                  <p className="qb-body">
                    Friday night and no plan? Got you. Weekend with the boys and nothing to do? Got
                    you. The Quest Book is a curated collection of sidequests for every situation -
                    grouped by mood, occasion, and how deep you want to go.
                  </p>
                </div>
                <a href="#waitlist" className="text-link">
                  Unlock the Quest Book -&gt;
                </a>
              </div>
              <div className="qb-list">
                {questTypes.map((quest) => (
                  <article className="qb-item" key={quest.title}>
                    <h3>{quest.title}</h3>
                    <p>{quest.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="manifesto reveal">
          <div className="manifesto-inner">
            <div>
              <h2 className="manifesto-quote">
                Not built for users. Built <em>with</em> them.
              </h2>
            </div>
            <div>
              <p className="manifesto-body">
                We're two brothers building the app we wish existed. Something for us, our friends,
                and everyone who doesn't want to scroll through other people's lives - but go out
                and create their own.
              </p>
              <p className="manifesto-body">
                You submit sidequest ideas, vote on what sounds fun, and help decide what this
                becomes.
              </p>
              <a href="#waitlist" className="manifesto-link">
                Join the waitlist -&gt;
              </a>
            </div>
          </div>
        </section>

        <div className="exclusive reveal">
          <div className="exclusive-inner">
            <div>
              <h2 className="exclusive-title">Amsterdam goes first.</h2>
              <p className="exclusive-sub">
                We're launching with a limited group in Amsterdam this summer. Waitlist members get
                first access - no App Store, no public launch. Just the people who were there from
                the start.
              </p>
            </div>
            <a href="#waitlist" className="btn-primary nowrap">
              Secure your spot
            </a>
          </div>
        </div>

        <section className="waitlist-section" id="waitlist">
          <div className="waitlist-wrap reveal">
            <div className="section-label centered">Limited access</div>
            <h2 className="waitlist-title">Be first in.</h2>
            <p className="waitlist-sub">
              Drop your email. We'll reach out when Amsterdam goes live. No spam - just your first
              sidequest.
            </p>
            <form className={`waitlist-form ${status === "error" ? "has-error" : ""}`} onSubmit={handleSubmit}>
              <input
                type="email"
                className="waitlist-input"
                placeholder={status === "success" ? "See you in Amsterdam." : "your@email.com"}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setMessage("Amsterdam launch - July 2026");
                  }
                }}
                disabled={status === "loading" || status === "success"}
              />
              <button className="waitlist-btn" disabled={status === "loading" || status === "success"}>
                {status === "loading" ? "Joining..." : status === "success" ? "You're in" : "Join ->"}
              </button>
            </form>
            <p className="waitlist-note">{message}</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-logo">2HL</div>
        <div className="footer-links">
          <a href="https://tiktok.com/@2hleft" className="footer-link">
            TikTok
          </a>
          <a href="https://instagram.com/2hleft" className="footer-link">
            Instagram
          </a>
          <a href="mailto:hello@2hoursleft.com" className="footer-link">
            Contact
          </a>
        </div>
        <div className="footer-copy">(c) 2026 2HL - 2hoursleft.com</div>
      </footer>
    </>
  );
}
