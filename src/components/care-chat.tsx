"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useDragControls, type PanInfo } from "framer-motion";
import { ArrowUp, ArrowUpRight, CalendarDays, MapPin, MessageCircle, Phone, TriangleAlert, X } from "lucide-react";

import { MARK_FACE_PATH, MARK_FLOWER_PATH, MARK_VIEWBOX } from "@/components/home/woman-mark-paths";
import {
  WELCOME,
  emergencyHelp,
  respond,
  type ActionIcon,
  type BotReply,
  type ChatContext,
  type ChatDoctor,
  type ChatPackage,
} from "@/lib/care-chat/brain";
import { useStillAfterMount } from "@/lib/use-lite-motion";
import styles from "./care-chat.module.css";

/*
 * MyStree Assistant (24 Nov 2026; color.md "MyStree Assistant").
 *
 * Replaces the four-link help card with a chat that answers patients'
 * everyday questions (booking, timings, address, fees, which doctor, video
 * visits, packages, payment, common FAQs) from verified data, and recognises
 * emergencies first (lib/care-chat/brain.ts). No AI model, no server calls:
 * what the visitor types never leaves the browser.
 *
 * UX:
 * - Launcher: a 56px burgundy circle with the MyStree mark. With a mouse, it
 *   widens into an "Ask MyStree" pill on hover (the label slides in, the mark
 *   tilts, the button lifts). On touch it simply presses in.
 * - Desktop: a 384px panel springs out of the launcher (origin bottom right);
 *   the launcher turns into a close button. Non-modal: the page stays usable.
 * - Phones: a bottom sheet over a dimmed page, dragged down by its handle or
 *   header to close; the page behind does not scroll.
 * - Always-visible "Emergency" button in the header; emergency wording in any
 *   message answers with 112 / hospital / Tele-MANAS before anything else.
 * - Replies arrive after a short typing indicator (none with reduced motion).
 * - The conversation survives page changes (the layout keeps this mounted).
 */

type Message = { id: number; from: "user"; text: string } | { id: number; from: "bot"; reply: BotReply };

const GREETING_KEY = "mystree-care-chat-greeted";
const GREETING_DELAY_MS = 5000;
const GREETING_LIFETIME_MS = 10000;
const IDLE_MS = 1200;
const PHONE_QUERY = "(max-width: 639px)";

function storage(get: true): string | null;
function storage(get: false): void;
function storage(get: boolean) {
  try {
    if (get) return window.sessionStorage.getItem(GREETING_KEY);
    window.sessionStorage.setItem(GREETING_KEY, "1");
  } catch {
    // private mode or blocked storage: the greeting may show again; harmless
  }
  return null;
}

/** How far the reader must scroll before the launcher appears. */
function revealPoint() {
  const hero = document.getElementById("home");
  if (hero) return Math.max(160, hero.offsetTop + hero.offsetHeight - window.innerHeight * 0.6);
  return 160;
}

function track(event: string, params?: Record<string, string>) {
  window.gtag?.("event", event, params);
}

function Mark({ className }: { className?: string }) {
  return (
    <svg className={className ?? styles.mark} viewBox={MARK_VIEWBOX} aria-hidden="true" focusable="false">
      <path d={MARK_FACE_PATH} fill="currentColor" fillRule="evenodd" />
      <path d={MARK_FLOWER_PATH} className={styles.markFlower} fillRule="evenodd" />
    </svg>
  );
}

const ICONS: Record<ActionIcon, typeof Phone> = {
  call: Phone,
  whatsapp: MessageCircle,
  book: CalendarDays,
  map: MapPin,
  link: ArrowUpRight,
  alert: TriangleAlert,
};

/** Links that leave the Next.js app (other sites, phone, the booking redirect). */
function isExternal(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href) || href === "/book";
}

/* ------------------------------------------------------------- bubbles */

function BotBubble({
  reply,
  latest,
  onChip,
  onNavigate,
}: {
  reply: BotReply;
  latest: boolean;
  onChip: (chip: string) => void;
  onNavigate: () => void;
}) {
  const urgent = reply.tone === "emergency";
  return (
    <div className={styles.botRow}>
      <span className={styles.botAvatar} aria-hidden="true">
        <Mark className={styles.avatarMark} />
      </span>
      <div className={styles.botStack}>
        <div className={`${styles.bubble} ${styles.bot} ${urgent ? styles.urgent : ""}`}>
          {urgent ? (
            <p className={styles.urgentLabel}>
              <TriangleAlert size={14} strokeWidth={2} aria-hidden="true" /> Urgent help
            </p>
          ) : null}
          {reply.text.map((line) => (
            <p key={line}>{line}</p>
          ))}

          {reply.list?.length ? (
            <ul className={styles.list}>
              {reply.list.map((item) => (
                <li key={item.title + item.meta} className={styles.listItem}>
                  <span className={styles.listText}>
                    <span className={styles.listTitle}>{item.title}</span>
                    <span className={styles.listMeta}>{item.meta}</span>
                  </span>
                  {isExternal(item.href) ? (
                    <a
                      className={styles.listCta}
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      onClick={() => track("care_chat_action", { label: item.cta })}
                    >
                      {item.cta}
                    </a>
                  ) : (
                    <Link className={styles.listCta} href={item.href} onClick={onNavigate}>
                      {item.cta}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {reply.actions?.length ? (
          <div className={styles.actions}>
            {reply.actions.map((action) => {
              const Icon = ICONS[action.icon];
              const className = `${styles.action} ${action.tone === "primary" ? styles.actionPrimary : ""} ${
                action.tone === "danger" ? styles.actionDanger : ""
              }`;
              const content = (
                <>
                  <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                  {action.label}
                </>
              );
              return isExternal(action.href) ? (
                <a
                  key={action.label}
                  className={className}
                  href={action.href}
                  {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => track("care_chat_action", { label: action.label })}
                >
                  {content}
                </a>
              ) : (
                <Link key={action.label} className={className} href={action.href} onClick={onNavigate}>
                  {content}
                </Link>
              );
            })}
          </div>
        ) : null}

        {latest && reply.chips?.length ? (
          <div className={styles.chips} role="group" aria-label="Suggested questions">
            {reply.chips.map((chip, i) => (
              <motion.button
                key={chip}
                type="button"
                className={styles.chip}
                onClick={() => onChip(chip)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.05 + i * 0.035 }}
              >
                {chip}
              </motion.button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className={styles.botRow} aria-hidden="true">
      <span className={styles.botAvatar}>
        <Mark className={styles.avatarMark} />
      </span>
      <div className={`${styles.bubble} ${styles.bot} ${styles.typing}`}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- main */

export function CareChat({ doctors, packages }: { doctors: ChatDoctor[]; packages: ChatPackage[] }) {
  const still = useStillAfterMount();
  const ctx: ChatContext = useMemo(() => ({ doctors, packages }), [doctors, packages]);

  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState(false);
  const [greeting, setGreeting] = useState<"pending" | "showing" | "done">("pending");
  const [scrolling, setScrolling] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");

  const launcher = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const shownFor = useRef(0);
  const nextId = useRef(1);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const drag = useDragControls();

  // Phone layout (bottom sheet) vs desktop panel.
  useEffect(() => {
    const mq = window.matchMedia(PHONE_QUERY);
    const update = () => setPhone(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Launcher visibility and the "reader is scrolling" state: ref-guarded so
  // React never re-renders repeatedly during scroll; reveal point measured on load/resize only.
  useEffect(() => {
    let idle: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    let point = revealPoint();
    let isVisible = false;
    let isScrolling = false;

    const update = () => {
      frame = 0;
      const nextVisible = window.scrollY > point;
      if (nextVisible !== isVisible) {
        isVisible = nextVisible;
        setVisible(nextVisible);
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
      if (!isScrolling) {
        isScrolling = true;
        setScrolling(true);
      }
      clearTimeout(idle);
      idle = setTimeout(() => {
        isScrolling = false;
        setScrolling(false);
      }, IDLE_MS);
    };
    const onResize = () => {
      point = revealPoint();
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(frame);
      clearTimeout(idle);
    };
  }, []);

  // The greeting: once per visit, after a quiet moment, never while scrolling.
  useEffect(() => {
    if (greeting !== "pending" || !visible || open) return;
    if (storage(true)) {
      setGreeting("done");
      return;
    }
    const timer = setTimeout(() => {
      setGreeting("showing");
      storage(false);
    }, GREETING_DELAY_MS);
    return () => clearTimeout(timer);
  }, [greeting, visible, open]);

  useEffect(() => {
    if (greeting !== "showing" || scrolling || open) return;
    const started = Date.now();
    const timer = setTimeout(() => setGreeting("done"), Math.max(0, GREETING_LIFETIME_MS - shownFor.current));
    return () => {
      shownFor.current += Date.now() - started;
      clearTimeout(timer);
    };
  }, [greeting, scrolling, open]);

  const pushBot = useCallback((reply: BotReply) => {
    setMessages((list) => [...list, { id: nextId.current++, from: "bot", reply }]);
  }, []);

  const openChat = useCallback(() => {
    setOpen(true);
    setGreeting("done");
    track("care_chat_open");
    setMessages((list) => {
      if (list.length) return list;
      return [{ id: nextId.current++, from: "bot", reply: WELCOME }];
    });
  }, []);

  const closeChat = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) window.requestAnimationFrame(() => launcher.current?.focus());
  }, []);

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;
      setMessages((list) => [...list, { id: nextId.current++, from: "user", text }]);
      setDraft("");
      const reply = respond(text, ctx);
      // Only the matched topic is reported, never what the visitor typed.
      track("care_chat_reply", { intent: reply.intent });
      clearTimeout(replyTimer.current);
      // Emergencies answer at once; everything else after a short, readable pause.
      if (still || reply.tone === "emergency") {
        setTyping(false);
        pushBot(reply);
        return;
      }
      setTyping(true);
      replyTimer.current = setTimeout(() => {
        setTyping(false);
        pushBot(reply);
      }, Math.min(1100, 520 + text.length * 6));
    },
    [ctx, pushBot, still],
  );

  const showEmergency = useCallback(() => {
    clearTimeout(replyTimer.current);
    setTyping(false);
    track("care_chat_reply", { intent: "emergency_button" });
    pushBot(emergencyHelp());
  }, [pushBot]);

  useEffect(() => () => clearTimeout(replyTimer.current), []);

  // Keep the newest message in view.
  useEffect(() => {
    const el = log.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: still ? "auto" : "smooth" });
  }, [messages, typing, still]);

  // Focus: the input on desktop; the panel itself on phones (no keyboard pop-up).
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => (phone ? panel.current?.focus() : input.current?.focus()), 60);
    return () => window.clearTimeout(t);
  }, [open, phone]);

  // Escape closes; on phones Tab stays inside the sheet and the page is locked.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeChat();
        return;
      }
      if (event.key === "Tab" && phone && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input");
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    let restore = "";
    if (phone) {
      restore = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      if (phone) document.documentElement.style.overflow = restore;
    };
  }, [open, phone, closeChat]);

  const onSheetDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 110 || info.velocity.y > 600) closeChat(false);
  };

  const lastBotId = [...messages].reverse().find((m) => m.from === "bot")?.id;
  const showBubble = visible && greeting === "showing" && !scrolling && !open;
  const spring = still ? { duration: 0.18 } : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.9 };
  const launcherShown = (visible || open) && !(open && phone);

  const panelMotion = phone
    ? {
        initial: still ? { opacity: 0 } : { y: "100%" },
        animate: still ? { opacity: 1 } : { y: 0 },
        exit: still ? { opacity: 0 } : { y: "100%" },
        transition: still ? { duration: 0.18 } : { type: "spring" as const, stiffness: 360, damping: 38 },
      }
    : {
        initial: still ? { opacity: 0 } : { opacity: 0, scale: 0.88, y: 18 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: still ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 12, transition: { duration: 0.18 } },
        transition: spring,
      };

  return (
    <>
      <AnimatePresence>
        {open && phone ? (
          <motion.div
            key="backdrop"
            className={styles.backdrop}
            onClick={() => closeChat(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: still ? 0.15 : 0.25 }}
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            ref={panel}
            id="care-chat-panel"
            role="dialog"
            aria-modal={phone || undefined}
            aria-labelledby="care-chat-title"
            tabIndex={-1}
            className={`${styles.panel} ${phone ? styles.sheet : ""}`}
            {...panelMotion}
            {...(phone && !still
              ? {
                  drag: "y" as const,
                  dragListener: false,
                  dragControls: drag,
                  dragConstraints: { top: 0, bottom: 0 },
                  dragElastic: { top: 0, bottom: 0.7 },
                  onDragEnd: onSheetDragEnd,
                }
              : {})}
          >
            <div
              className={styles.head}
              onPointerDown={(e) => {
                if (phone && !(e.target as HTMLElement).closest("button")) drag.start(e);
              }}
            >
              {phone ? <span className={styles.handle} aria-hidden="true" /> : null}
              <span className={styles.headAvatar} aria-hidden="true">
                <Mark />
              </span>
              <div className={styles.headText}>
                <p id="care-chat-title" className={styles.title}>
                  MyStree Assistant
                </p>
                <p className={styles.subtitle}>
                  <span className={styles.live} aria-hidden="true" />
                  Instant answers
                </p>
              </div>
              <button type="button" className={styles.sos} onClick={showEmergency}>
                <TriangleAlert size={14} strokeWidth={2.1} aria-hidden="true" />
                Emergency
              </button>
              <button type="button" className={styles.close} onClick={() => closeChat()} aria-label="Close chat">
                <X size={18} strokeWidth={1.9} aria-hidden="true" />
              </button>
            </div>

            <div ref={log} className={styles.log} role="log" aria-live="polite" aria-relevant="additions">
              {messages.map((message) =>
                message.from === "user" ? (
                  <motion.div
                    key={message.id}
                    className={styles.userRow}
                    initial={still ? false : { opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className={`${styles.bubble} ${styles.user}`}>{message.text}</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={message.id}
                    initial={still ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <BotBubble
                      reply={message.reply}
                      latest={message.id === lastBotId && !typing}
                      onChip={send}
                      onNavigate={() => closeChat(false)}
                    />
                  </motion.div>
                ),
              )}
              {typing ? <Typing /> : null}
            </div>

            <form
              className={styles.composer}
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
            >
              <label htmlFor="care-chat-input" className={styles.srOnly}>
                Type your question
              </label>
              <input
                ref={input}
                id="care-chat-input"
                className={styles.input}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about timings, fees, doctors…"
                autoComplete="off"
                enterKeyHint="send"
                maxLength={300}
              />
              <button type="submit" className={styles.send} disabled={!draft.trim()} aria-label="Send">
                <ArrowUp size={18} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </form>
            <p className={styles.disclaimer}>
              Automated answers, not medical advice. Nothing you type is sent to the clinic.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className={`${styles.dock} ${launcherShown ? styles.dockVisible : ""}`}>
        <AnimatePresence>
          {showBubble ? (
            <motion.div
              key="greeting"
              className={styles.greeting}
              initial={still ? { opacity: 0 } : { opacity: 0, x: 16, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={still ? { opacity: 0 } : { opacity: 0, x: 12, scale: 0.94 }}
              transition={spring}
            >
              <button type="button" className={styles.dismiss} onClick={() => setGreeting("done")} aria-label="Dismiss message">
                <X size={16} strokeWidth={1.9} aria-hidden="true" />
              </button>
              <button type="button" className={styles.bubbleCta} onClick={openChat}>
                Hi, have a question? Ask me.
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* The wrapper scales in and out; the button keeps its own CSS
            transform for the hover lift and the press. */}
        <motion.div
          className={`${styles.launcherWrap} ${visible && !open && greeting !== "done" ? styles.pulse : ""}`}
          initial={false}
          animate={launcherShown ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
          transition={spring}
        >
        <button
          ref={launcher}
          type="button"
          className={`${styles.launcher} ${open ? styles.launcherOpen : ""}`}
          aria-label={open ? "Close chat" : "Ask MyStree: questions, booking and help"}
          aria-expanded={open}
          aria-controls="care-chat-panel"
          onClick={() => (open ? closeChat() : openChat())}
          tabIndex={launcherShown ? 0 : -1}
        >
          <span className={styles.launcherLabel} aria-hidden="true">
            Ask MyStree
          </span>
          <span className={styles.launcherIcon}>
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  className={styles.iconSwap}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: still ? 0 : 0.18 }}
                >
                  <X size={22} strokeWidth={1.8} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="mark"
                  className={`${styles.iconSwap} ${styles.markWrap}`}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: still ? 0 : 0.18 }}
                >
                  <Mark />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </button>
        </motion.div>
      </div>
    </>
  );
}
