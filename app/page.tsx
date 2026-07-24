"use client";

import { FormEvent, useEffect, useState } from "react";
import { track } from "@vercel/analytics";

const tickerItems = [
  "DAILY SIDEQUEST",
  "2 HOURS",
  "CREATE STORIES",
  "SEPTEMBER 2026",
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

const storyPhotos = [
  {
    src: "/images/sidequest-twins.jpg",
    alt: "Kingsday sidequest moment",
    label: "Kingsday",
    quest: "Get a stranger wearing a matching or similar orange outfit to pose with you and take a twin photo together.",
  },
  {
    src: "/images/sidequest-orange-drink.jpg",
    alt: "Sidequest participant drinking an orange drink",
    label: "Orange drink run",
    quest: "Drink as many orange drinks as you can and capture your best orange drink moments along the way.",
  },
  {
    src: "/images/sidequest-baby-lift.jpg",
    alt: "One friend lifting another like a baby",
    label: "Public lift",
    quest: "Get someone to lift you like a baby and capture the moment.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("Join the other 150+ people on the waitlist to get early access.");
  const [activePhoto, setActivePhoto] = useState(0);
  const [refParam, setRefParam] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralCount, setReferralCount] = useState(0);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [utmSource, setUtmSource] = useState<string | null>(null);
  const [utmCampaign, setUtmCampaign] = useState<string | null>(null);

  const referralLink =
    referralCode && typeof window !== "undefined"
      ? `${window.location.origin}/?ref=${referralCode}`
      : "";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Capture an incoming ?ref=CODE so we can credit the referrer on signup.
    const ref = params.get("ref");
    if (ref) setRefParam(ref.trim());
    // Capture TikTok campaign params so we can attribute signups to videos.
    setUtmSource(params.get("utm_source"));
    setUtmCampaign(params.get("utm_campaign"));
    // Native share is only available on some (mostly mobile) browsers.
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  useEffect(() => {
    const nav = document.getElementById("nav");
    if (!nav) return;

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

    revealEls.forEach((el) => observer.observe(el));

    window.addEventListener("scroll", toggleNav);
    toggleNav();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", toggleNav);
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

    // /api/signup inserts into the waitlist (generating a referral_code and
    // crediting any referrer), then sends the welcome email server-side.
    let row: { referral_code: string; referral_count: number; already_joined: boolean } | null =
      null;
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          ref: refParam,
          utm_source: utmSource,
          utm_campaign: utmCampaign,
        }),
      });
      if (res.ok) {
        row = await res.json();
      }
    } catch {
      row = null;
    }

    if (!row) {
      setStatus("error");
      setMessage("Something broke. Try again in a second.");
      return;
    }

    // Attribute the signup to the TikTok video that drove it.
    track("signup_completed", {
      utm_source: utmSource ?? "direct",
      utm_campaign: utmCampaign ?? "none",
      referred: refParam ? "yes" : "no",
    });

    setReferralCode(row.referral_code);
    setReferralCount(row.referral_count ?? 0);
    setStatus("success");
    setEmail("");
  }

  async function handleShare() {
    if (!referralLink) return;

    const shareData = {
      title: "2HL - Two Hours Left",
      text: "One sidequest a day. Two hours to do it. Grab early access to 2HL with me:",
      url: referralLink,
    };

    if (canNativeShare) {
      try {
        await navigator.share(shareData);
        track("referral_link_shared", { method: "web_share" });
      } catch {
        // User dismissed the native share sheet - nothing to do.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      track("referral_link_shared", { method: "clipboard" });
    } catch {
      // Clipboard blocked - leave the link visible for manual copy.
    }
  }

  return (
    <>
      <nav id="nav">
        <a href="#" className="nav-logo" aria-label="2HL home">
          <img src="/images/2hl-logo-wide.png" alt="2HL" />
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
        <section className="hero" id="waitlist" aria-label="2HL introduction">
          <div className="hero-content">
            <p className="hero-eyebrow">Early Access</p>
            <h1 className="hero-title">
              <span>One sidequest a day.</span>
              <span><em>Two hours</em> to do it.</span>
            </h1>
            <p className="hero-sub">
              Join the crew and get your first 3 sidequests right now. Launching September 2026.
            </p>
            {status === "success" ? (
              <div className="success-card" role="status">
                <h2 className="success-headline">You're in. First sidequest: recruit your crew.</h2>
                <p className="success-body">
                  Invite 3 friends and you all unlock early access. Sidequests are better with
                  witnesses.
                </p>
                <div className="referral-link-row">
                  <input
                    className="referral-link-input"
                    readOnly
                    value={referralLink}
                    aria-label="Your referral link"
                    onFocus={(event) => event.target.select()}
                  />
                  <button type="button" className="referral-share-btn" onClick={handleShare}>
                    {copied ? "Copied!" : canNativeShare ? "Share your link" : "Copy link"}
                  </button>
                </div>
                <div className="referral-counter" aria-live="polite">
                  <div className="referral-dots" aria-hidden="true">
                    {[0, 1, 2].map((index) => (
                      <span
                        key={index}
                        className={`referral-dot ${index < referralCount ? "filled" : ""}`}
                      />
                    ))}
                  </div>
                  <span className="referral-count-text">
                    {Math.min(referralCount, 3)}/3 friends joined
                  </span>
                </div>
              </div>
            ) : (
              <>
                <form className={`waitlist-form hero-form ${status === "error" ? "has-error" : ""}`} onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="waitlist-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === "error") {
                        setStatus("idle");
                        setMessage("Join the other 150+ people on the waitlist to get early access.");
                      }
                    }}
                    disabled={status === "loading"}
                  />
                  <button className="waitlist-btn" disabled={status === "loading"}>
                    {status === "loading" ? "Joining..." : "Get early access"}
                  </button>
                </form>
                <p className="waitlist-note">{message}</p>
              </>
            )}
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

        <section id="about" className="story-section">
          <div className="story-wrap reveal">
            <div className="section-label centered">The idea</div>
            <div className="story-intro">
              <h2 className="story-headline">
                Every night out is a <em>story</em> waiting to happen.
              </h2>
              <p className="story-body">
                A random plan. A bad idea. A "bro trust me" moment. One message in the group chat
                that somehow turns into a night, a trip, a mission - a sidequest you still talk
                about months later.
              </p>
            </div>
            <div className="photo-carousel" aria-label="Sidequest photo carousel">
              <button
                className="carousel-arrow"
                type="button"
                aria-label="Previous sidequest photo"
                onClick={() => setActivePhoto((activePhoto + storyPhotos.length - 1) % storyPhotos.length)}
              >
                &lt;
              </button>
              <div className="photo-stack">
                {storyPhotos.map((photo, index) => {
                  const offset = (index - activePhoto + storyPhotos.length) % storyPhotos.length;
                  const stackStyle = {
                    "--stack-x": `${offset * 34}px`,
                    "--stack-y": `${offset * -22}px`,
                    "--stack-rotate": `${offset * 3.5}deg`,
                    "--stack-scale": `${1 - offset * 0.035}`,
                  } as React.CSSProperties;
                  return (
                    <button
                      className={`stacked-photo ${offset === 0 ? "active" : "behind"}`}
                      type="button"
                      key={photo.src}
                      style={stackStyle}
                      onClick={() => setActivePhoto(index)}
                      aria-label={`Show photo: ${photo.label}`}
                    >
                      <img src={photo.src} alt={photo.alt} />
                    </button>
                  );
                })}
              </div>
              <button
                className="carousel-arrow"
                type="button"
                aria-label="Next sidequest photo"
                onClick={() => setActivePhoto((activePhoto + 1) % storyPhotos.length)}
              >
                &gt;
              </button>
              <div className="photo-caption">
                <span>{storyPhotos[activePhoto].label}</span>
                <p>{storyPhotos[activePhoto].quest}</p>
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
            <div className="manifesto-title-wrap">
              <h2 className="manifesto-quote">
                Not built for users. Built <em>with</em> them.
              </h2>
              <div className="manifesto-copy">
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
            <div className="manifesto-media">
              <div className="founders-art" aria-label="Line art illustration of the two founders">
                <img src="/images/founders-line-art.png" alt="Two founders standing by a pool table" />
              </div>
            </div>
          </div>
        </section>

        <div className="exclusive reveal">
          <div className="exclusive-inner">
            <div>
              <h2 className="exclusive-title">The waitlist goes first.</h2>
              <p className="exclusive-sub">
                We're launching September 2026. Waitlist members get first access - before the App
                Store, before the public launch. Just the people who were there from the start.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-mega" aria-label="2HL">
          <img src="/images/2hl-logo-wide.png" alt="2HL" />
        </div>
        <div className="footer-links">
          <a href="/privacy" className="footer-link">
            Privacy
          </a>
          <a href="/terms" className="footer-link">
            Terms
          </a>
          <a href="/legal" className="footer-link">
            Legal Notice
          </a>
          <a href="https://www.tiktok.com/@2hleft_" className="footer-link">
            TikTok
          </a>
          <a href="https://www.instagram.com/2hleft/" className="footer-link">
            Instagram
          </a>
          <a href="mailto:info@2hoursleft.com" className="footer-link">
            Contact
          </a>
        </div>
        <div className="footer-copy">(c) 2026 2HL - 2hoursleft.com</div>
      </footer>
    </>
  );
}
