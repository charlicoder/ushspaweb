'use client';

import React, { use, useEffect, useState, useRef } from 'react';

/* ── Logo component ── */
function Logo({ size = 40 }: { size?: number }) {
  return (
    <img
      src="/images/app-logo.jpg"
      alt="USH Spa"
      style={{ width: size, height: size, borderRadius: size * 0.22, objectFit: 'cover', display: 'block' }}
    />
  );
}

/* ─────────────────────────────── Types ─────────────────────────────── */

interface ServiceType { id: string; name: string; }
interface ServiceData {
  name: string; image: string; currency: string;
  base_price: string; service_types: ServiceType[]; duration_minutes: number;
}
interface BranchData { name: string; branch_id: string; }
interface ServiceArrangementData {
  image: string; price: string; currency: string;
  arrangement_name: string; arrangement_type: string;
}
interface Addon {
  id: string; name: string; price: string; currency: string;
  description: string; duration_minutes: number;
}
interface SenderData { name: string; phone_number: string; }
interface RecipientData {
  id: string; name: string; email: string;
  avatar: string | null; phone_number: string;
}
interface GiftVoucher {
  id: string;
  gift_category: 'service' | 'digital' | 'physical' | string;
  service_data?: ServiceData;
  branch_data?: BranchData;
  service_arrangement_data?: ServiceArrangementData;
  addons?: Addon[];
  extra_time?: number;
  price_for_extra_time?: string;
  expire_date: string;
  status: string;
  sender_data: SenderData;
  recipient_phone: string;
  recipient_data: RecipientData;
  total_duration?: number;
  total_amount: string;
  currency: string;
  gift_message?: string;
  gift_template?: string;
  secret_code?: string;
  public_token: string;
  redeemed_at: string | null;
  redeemed_by: string | null;
  created_at: string;
}

/* ─────────────────────────────── Helpers ────────────────────────────── */

function fmtDate(d: string) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch { return d; }
}

function fmtDuration(min: number) {
  if (!min) return '—';
  const h = Math.floor(min / 60), m = min % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

function isExpired(dateStr: string) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

/* ─────────────────────────────── CSS ───────────────────────────────── */

const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Lustria&family=Alex+Brush&family=Roboto:wght@300;400;500;600;700&display=swap');

  /* Mobile shell */
  .gift-outer{
    min-height:100vh;
    background: linear-gradient(135deg,#e8d5d0 0%,#f5eeeb 50%,#e8d5d0 100%);
    display:flex;
    align-items:flex-start;
    justify-content:center;
    padding: 0;
  }
  .gift-shell{
    width:100%;
    max-width:430px;
    min-height:100vh;
    background:#fdf8f6;
    box-shadow:0 0 60px rgba(0,0,0,0.18);
    position:relative;
    overflow:hidden;
  }

  *{box-sizing:border-box;margin:0;padding:0;}

  @keyframes petalFall{
    0%{transform:translateY(-40px) rotate(0deg) scale(0.8);opacity:0}
    10%{opacity:0.9}
    90%{opacity:0.6}
    100%{transform:translateY(110vh) rotate(420deg) scale(1.1);opacity:0}
  }
  @keyframes shimmerSlide{
    0%{transform:translateX(-100%)}
    100%{transform:translateX(250%)}
  }
  @keyframes glow{
    0%,100%{box-shadow:0 0 20px rgba(239,166,151,0.4)}
    50%{box-shadow:0 0 40px rgba(239,166,151,0.7)}
  }
  @keyframes fadeUp{
    from{opacity:0;transform:translateY(24px)}
    to{opacity:1;transform:translateY(0)}
  }
  @keyframes scaleIn{
    from{opacity:0;transform:scale(0.92)}
    to{opacity:1;transform:scale(1)}
  }
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes shake{
    0%,100%{transform:translateX(0)}
    20%,60%{transform:translateX(-6px)}
    40%,80%{transform:translateX(6px)}
  }
  @keyframes ringPulse{
    0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.7}
    50%{transform:translate(-50%,-50%) scale(1.08);opacity:0.3}
  }
  @keyframes bounceIn{
    0%{opacity:0;transform:scale(0.3)}
    50%{transform:scale(1.1)}
    70%{transform:scale(0.95)}
    100%{opacity:1;transform:scale(1)}
  }
  @keyframes float{
    0%,100%{transform:translateY(0)}
    50%{transform:translateY(-8px)}
  }
  @keyframes revealSlide{
    from{opacity:0;transform:translateY(40px)}
    to{opacity:1;transform:translateY(0)}
  }

  .petal{
    position:fixed;border-radius:50% 0 50% 0;pointer-events:none;
    animation:petalFall linear infinite;
  }
  .shimmer-bar{
    position:absolute;inset:0;
    background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%);
    animation:shimmerSlide 2.8s ease-in-out infinite;
  }
  .stat-card{
    background:#fff;border-radius:18px;padding:18px 12px;text-align:center;
    border:1px solid rgba(239,166,151,0.22);
    box-shadow:0 4px 18px rgba(0,0,0,0.05);
    animation:fadeUp 0.5s ease both;
  }
  .detail-card{
    background:#fff;border-radius:20px;overflow:hidden;
    border:1px solid rgba(239,166,151,0.2);
    box-shadow:0 6px 24px rgba(0,0,0,0.06);
    animation:fadeUp 0.5s ease both;
  }
  .tag{
    display:inline-flex;align-items:center;gap:5px;
    border-radius:20px;padding:4px 12px;
    font-size:0.75rem;font-weight:600;letter-spacing:0.6px;
  }
  .app-btn{
    display:flex;align-items:center;gap:12px;
    background:rgba(255,255,255,0.12);
    border:1.5px solid rgba(255,255,255,0.3);
    border-radius:16px;padding:14px 20px;
    color:#fff;cursor:pointer;flex:1;min-width:140px;
    transition:all 250ms;text-decoration:none;
  }
  .app-btn:hover{background:rgba(255,255,255,0.22);transform:translateY(-2px);}
`;

/* ─────────────────────────────── Floating Petals ───────────────────── */

function FloatingPetals() {
  const petals = Array.from({ length: 16 }, (_, i) => ({
    size: 7 + (i % 5) * 5,
    left: `${(i * 19 + 3) % 100}%`,
    delay: `${(i * 0.55) % 9}s`,
    dur: `${8 + (i % 6) * 1.5}s`,
    opacity: 0.08 + (i % 4) * 0.04,
  }));
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {petals.map((p, i) => (
        <div key={i} className="petal" style={{
          width: p.size, height: p.size,
          background: `rgba(239,166,151,${p.opacity})`,
          left: p.left, top: -40,
          animationDuration: p.dur,
          animationDelay: p.delay,
        }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────── Secret Code Modal ─────────────────── */

function SecretModal({ onSubmit, loading, error }: {
  onSubmit: (code: string) => void; loading: boolean; error: string;
}) {
  const [code, setCode] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { setTimeout(() => ref.current?.focus(), 350); }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(253,240,238,0.97) 0%, rgba(253,248,246,0.97) 100%)',
      backdropFilter: 'blur(10px)',
    }}>
      {/* Decorative rings */}
      {[500, 370, 240].map((s, i) => (
        <div key={s} style={{
          position: 'absolute', width: s, height: s, borderRadius: '50%',
          border: `1.5px solid rgba(239,166,151,${0.12 + i * 0.07})`,
          top: '50%', left: '50%',
          animation: `ringPulse ${3 + i}s ease-in-out ${i * 0.8}s infinite`,
        }} />
      ))}

      <div style={{
        position: 'relative', zIndex: 1,
        background: '#fff', borderRadius: 28,
        padding: '52px 44px 44px',
        maxWidth: 420, width: '92%',
        boxShadow: '0 40px 100px rgba(183,96,90,0.18), 0 8px 24px rgba(0,0,0,0.06)',
        border: '1px solid rgba(239,166,151,0.25)',
        animation: 'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        textAlign: 'center',
      }}>
        {/* Gift icon */}
        <div style={{
          width: 88, height: 88, borderRadius: '50%',
          background: 'linear-gradient(135deg, #efa697 0%, #b7605a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          boxShadow: '0 8px 28px rgba(183,96,90,0.4)',
          animation: 'float 3s ease-in-out infinite',
          fontSize: 40,
        }}>🎁</div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
          <Logo size={44} />
          <div style={{ fontFamily: "'Alex Brush', cursive", fontSize: '2rem', color: '#b7605a', lineHeight: 1 }}>USH Spa</div>
        </div>
        <p style={{ fontFamily: "'Alex Brush', cursive", fontSize: '1.6rem', color: '#b7605a', lineHeight: 1, marginBottom: 8 }}>
          You have a gift!
        </p>
        <h2 style={{ fontFamily: "'Lustria', serif", fontSize: '1.3rem', color: '#283034', marginBottom: 10 }}>
          Enter Your Secret Code
        </h2>
        <p style={{ color: '#7a868c', fontSize: '0.9rem', marginBottom: 28, lineHeight: 1.7 }}>
          Your secret code was shared with your gift.<br />Enter it below to unwrap your luxury experience.
        </p>

        <input
          id="gift-secret-code"
          ref={ref}
          type="text"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === 'Enter' && code.trim() && onSubmit(code.trim())}
          placeholder="Enter code…"
          maxLength={20}
          style={{
            width: '100%', padding: '17px 20px',
            borderRadius: 14, fontSize: '1.6rem',
            letterSpacing: '0.35em', textAlign: 'center',
            fontFamily: "'Lustria', serif", color: '#283034',
            border: error ? '2px solid #e57373' : '2px solid rgba(239,166,151,0.5)',
            background: '#fdf8f6', outline: 'none',
            transition: 'border 250ms, box-shadow 250ms',
            boxShadow: error ? '0 0 0 4px rgba(229,115,115,0.12)' : 'none',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#efa697'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(239,166,151,0.18)'; }}
          onBlur={e => { if (!error) { e.currentTarget.style.borderColor = 'rgba(239,166,151,0.5)'; e.currentTarget.style.boxShadow = 'none'; } }}
        />

        {error && (
          <p style={{ color: '#c62828', fontSize: '0.84rem', marginTop: 10, animation: 'shake 0.4s ease' }}>
            ⚠ {error}
          </p>
        )}

        <button
          id="gift-submit-code"
          disabled={loading || !code.trim()}
          onClick={() => code.trim() && onSubmit(code.trim())}
          style={{
            width: '100%', marginTop: 18, padding: '16px',
            borderRadius: 14, border: 'none',
            background: loading || !code.trim()
              ? '#ddd'
              : 'linear-gradient(135deg, #efa697 0%, #b7605a 100%)',
            color: '#fff', fontSize: '0.95rem', fontWeight: 600,
            letterSpacing: '1.2px', textTransform: 'uppercase',
            cursor: loading || !code.trim() ? 'not-allowed' : 'pointer',
            boxShadow: loading || !code.trim() ? 'none' : '0 8px 24px rgba(183,96,90,0.35)',
            transition: 'all 300ms', fontFamily: "'Roboto', sans-serif",
          }}
          onMouseEnter={e => { if (!loading && code.trim()) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(183,96,90,0.45)'; } }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = loading || !code.trim() ? 'none' : '0 8px 24px rgba(183,96,90,0.35)'; }}
        >
          {loading
            ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                Unwrapping your gift…
              </span>
            : '✨ Unwrap My Gift'}
        </button>

        <p style={{ marginTop: 18, color: '#c4a8a4', fontSize: '0.78rem' }}>🔒 Secured &amp; encrypted</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────── Status Badge ───────────────────────── */

function StatusBadge({ status, expired }: { status: string; expired: boolean }) {
  const s = (status || '').toLowerCase();
  let bg = 'rgba(22,163,74,0.12)', color = '#16a34a', label = 'Active', icon = '●';
  if (expired) { bg = 'rgba(234,88,12,0.12)'; color = '#ea580c'; label = 'Expired'; icon = '⚠'; }
  else if (s === 'redeemed') { bg = 'rgba(99,102,241,0.12)'; color = '#6366f1'; label = 'Redeemed'; icon = '✓'; }
  else if (s === 'cancelled' || s === 'inactive') { bg = 'rgba(220,38,38,0.12)'; color = '#dc2626'; label = 'Cancelled'; icon = '✕'; }
  return (
    <span style={{ background: bg, color, borderRadius: 20, padding: '5px 14px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: 1 }}>
      {icon} {label.toUpperCase()}
    </span>
  );
}

/* ─────────────────────────────── Expired Banner ────────────────────── */

function ExpiredBanner({ date }: { date: string }) {
  return (
    <div style={{
      margin: '0 0 0 0', padding: '16px 24px',
      background: 'linear-gradient(90deg, #ff6b35 0%, #f7c59f 100%)',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: '0 4px 16px rgba(255,107,53,0.35)',
    }}>
      <span style={{ fontSize: 24 }}>⚠️</span>
      <div>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', fontFamily: "'Lustria', serif" }}>
          This Gift Voucher Has Expired
        </div>
        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', marginTop: 2 }}>
          Expired on {fmtDate(date)} — Please contact USH Spa for assistance
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── App Download CTA ──────────────────── */

function AppCTA() {
  return (
    <div style={{
      margin: '0 20px 28px',
      background: 'linear-gradient(135deg, #283034 0%, #3d4c54 60%, #283034 100%)',
      borderRadius: 24, padding: '30px 24px',
      boxShadow: '0 12px 40px rgba(40,48,52,0.35)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="shimmer-bar" />
      {/* Decorative circles */}
      <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'rgba(239,166,151,0.08)', top: -60, right: -40 }} />
      <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'rgba(239,166,151,0.06)', bottom: -30, left: -20 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #efa697 0%, #b7605a 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, boxShadow: '0 6px 20px rgba(239,166,151,0.4)',
          }}>🌸</div>
          <div>
            <div style={{ fontFamily: "'Lustria', serif", color: '#fff', fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.2 }}>
              Book Your Experience
            </div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginTop: 3 }}>
              Download the USH Spa app to redeem
            </div>
          </div>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: 22 }}>
          Log in with your account and book your appointment directly from the app. Your gift voucher will be applied automatically at checkout.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a id="gift-app-store-link" href="https://apps.apple.com/app/ush-spa" target="_blank" rel="noopener noreferrer" className="app-btn">
            <span style={{ fontSize: 28 }}>🍎</span>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', letterSpacing: 0.8 }}>DOWNLOAD ON THE</div>
              <div style={{ fontFamily: "'Lustria', serif", fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>App Store</div>
            </div>
          </a>
          <a id="gift-play-store-link" href="https://play.google.com/store/apps/details?id=com.ushspa" target="_blank" rel="noopener noreferrer" className="app-btn">
            <span style={{ fontSize: 28 }}>▶</span>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', letterSpacing: 0.8 }}>GET IT ON</div>
              <div style={{ fontFamily: "'Lustria', serif", fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Google Play</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── Service Gift Page ─────────────────── */

function ServiceGiftDisplay({ v }: { v: GiftVoucher }) {
  const expired = isExpired(v.expire_date);
  const heroImg = v.service_arrangement_data?.image || v.service_data?.image || '';
  const serviceImg = v.service_data?.image || '';
  const sd = v.service_data;
  const ar = v.service_arrangement_data;
  const br = v.branch_data;
  const [tab, setTab] = useState<'details' | 'addons' | 'info'>('details');
  const [revealed, setRevealed] = useState(false);

  useEffect(() => { setTimeout(() => setRevealed(true), 100); }, []);

  return (
    <div style={{ background: 'linear-gradient(160deg, #fdf0ee 0%, #fdf8f6 50%, #f9f4f2 100%)', overflowX: 'hidden', minHeight: '100vh' }}>
      <FloatingPetals />

      {/* ── Top Bar ── */}
      <div style={{ position: 'relative', zIndex: 10,
        background: 'linear-gradient(90deg, #b7605a 0%, #efa697 100%)',
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(183,96,90,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={38} />
          <div style={{ fontFamily: "'Alex Brush', cursive", fontSize: '1.8rem', color: '#fff', letterSpacing: 1, lineHeight: 1 }}>USH Spa</div>
        </div>
        <StatusBadge status={v.status} expired={expired} />
      </div>

      {/* ── Expired Banner ── */}
      {expired && <ExpiredBanner date={v.expire_date} />}

      {/* ── Hero Section ── */}
      <div style={{
        position: 'relative', height: 'clamp(280px, 52vw, 420px)', overflow: 'hidden',
        opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'scale(1.04)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}>
        {heroImg && (
          <img src={heroImg} alt="Experience" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(28,14,12,0.72) 100%)',
        }} />

        {/* Gift badge */}
        <div style={{
          position: 'absolute', top: 20, right: 20,
          background: 'linear-gradient(135deg, #efa697 0%, #b7605a 100%)',
          borderRadius: 50, padding: '9px 18px',
          color: '#fff', fontFamily: "'Lustria', serif",
          fontSize: '0.8rem', fontWeight: 700, letterSpacing: 1,
          boxShadow: '0 4px 20px rgba(183,96,90,0.55)',
          border: '2px solid rgba(255,255,255,0.25)',
          animation: 'glow 2.5s ease-in-out infinite',
        }}>
          🎁 GIFT VOUCHER
        </div>

        {/* Hero text */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 24px 30px' }}>
          <p style={{ fontFamily: "'Alex Brush', cursive", fontSize: '1.6rem', color: 'rgba(255,255,255,0.85)', margin: '0 0 4px' }}>
            {v.gift_template || 'Luxury Experience'}
          </p>
          <h1 style={{
            fontFamily: "'Lustria', serif",
            fontSize: 'clamp(1.4rem, 5vw, 2.2rem)',
            color: '#fff', fontWeight: 700, lineHeight: 1.2, margin: '0 0 10px',
            textShadow: '0 2px 12px rgba(0,0,0,0.35)',
          }}>
            {v.service_data?.name || 'Spa Service'}
          </h1>
          {v.service_data?.service_types?.length ? (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {v.service_data.service_types.map(st => (
                <span key={st.id} style={{
                  background: 'rgba(239,166,151,0.85)', borderRadius: 20,
                  padding: '4px 13px', color: '#fff', fontSize: '0.76rem', fontWeight: 600,
                }}>{st.name}</span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* ── From / To Gift Card ── */}
      <div style={{
        margin: '-32px 18px 0',
        background: '#fff', borderRadius: 24,
        padding: '26px 22px 22px',
        boxShadow: '0 16px 48px rgba(183,96,90,0.14), 0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid rgba(239,166,151,0.2)',
        position: 'relative', zIndex: 5,
        animation: 'revealSlide 0.7s 0.2s ease both',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 110 }}>
            <div style={{ fontSize: '0.68rem', color: '#b7948e', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5 }}>From</div>
            <div style={{ fontFamily: "'Lustria', serif", fontSize: '1.05rem', color: '#283034', fontWeight: 700 }}>{v.sender_data?.name}</div>
            <div style={{ fontSize: '0.78rem', color: '#b7948e', marginTop: 3 }}>{v.sender_data?.phone_number}</div>
          </div>

          <div style={{
            width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #f5d5cf 0%, #efa697 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, boxShadow: '0 4px 14px rgba(239,166,151,0.45)',
            animation: 'float 3s ease-in-out infinite',
          }}>💝</div>

          <div style={{ flex: 1, minWidth: 110, textAlign: 'right' }}>
            <div style={{ fontSize: '0.68rem', color: '#b7948e', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5 }}>To</div>
            <div style={{ fontFamily: "'Lustria', serif", fontSize: '1.05rem', color: '#283034', fontWeight: 700 }}>{v.recipient_data?.name}</div>
            <div style={{ fontSize: '0.78rem', color: '#b7948e', marginTop: 3 }}>{v.recipient_phone}</div>
          </div>
        </div>

        {/* Gift message */}
        {v.gift_message && (
          <div style={{
            marginTop: 20, padding: '16px 18px',
            background: 'linear-gradient(135deg, #fdf0ee 0%, #fdf8f6 100%)',
            borderRadius: 14, borderLeft: '3.5px solid #efa697',
          }}>
            <div style={{ fontSize: '0.68rem', color: '#b7948e', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 7 }}>✉ Gift Message</div>
            <p style={{ fontFamily: "'Lustria', serif", fontSize: '1.05rem', color: '#283034', fontStyle: 'italic', lineHeight: 1.65, margin: 0 }}>
              &ldquo;{v.gift_message}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* ── Quick Stats Row ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12, margin: '20px 18px 0',
      }}>
        {[
          { icon: '⏱', label: 'Duration', value: fmtDuration(v.total_duration || 0) },
          { icon: '💳', label: 'Value', value: `${v.total_amount} ${v.currency}` },
          { icon: '📅', label: 'Expires', value: fmtDate(v.expire_date).replace(/,.*/, '') },
        ].map((s, i) => (
          <div key={s.label} className="stat-card" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
            <div style={{ fontSize: 22, marginBottom: 7 }}>{s.icon}</div>
            <div style={{ fontSize: '0.66rem', color: '#b7948e', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 5, fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontFamily: "'Lustria', serif", fontSize: '0.85rem', color: '#283034', fontWeight: 700, lineHeight: 1.3 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div style={{
        display: 'flex', gap: 0, margin: '20px 18px 0',
        background: '#fff', borderRadius: 16, padding: 4,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        border: '1px solid rgba(239,166,151,0.15)',
      }}>
        {(['details', 'addons', 'info'] as const).map(t => {
          const labels: Record<string, string> = { details: '🛎 Details', addons: '✨ Add-ons', info: '📋 Info' };
          const active = tab === t;
          return (
            <button key={t} id={`gift-tab-${t}`} onClick={() => setTab(t)} style={{
              flex: 1, padding: '11px 6px', borderRadius: 12, border: 'none',
              background: active ? 'linear-gradient(135deg, #efa697 0%, #b7605a 100%)' : 'transparent',
              color: active ? '#fff' : '#7a868c',
              fontWeight: active ? 600 : 400, fontSize: '0.82rem',
              cursor: 'pointer', transition: 'all 250ms',
              fontFamily: "'Roboto', sans-serif",
              boxShadow: active ? '0 4px 14px rgba(183,96,90,0.3)' : 'none',
            }}>
              {labels[t]}
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ── */}
      <div style={{ margin: '16px 18px 24px', animation: 'fadeUp 0.4s ease' }}>

        {/* DETAILS */}
        {tab === 'details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Service */}
              {sd && (
                <div className="detail-card">
                  <div style={{
                    padding: '13px 18px', borderBottom: '1px solid #fdf0ee',
                    background: 'linear-gradient(90deg, #fdf0ee 0%, #fff 100%)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{ fontSize: 18 }}>🧖</span>
                    <span style={{ fontFamily: "'Lustria', serif", fontWeight: 700, color: '#283034', fontSize: '0.92rem' }}>Service</span>
                  </div>
                  <div style={{ display: 'flex', gap: 14, padding: '16px 18px', alignItems: 'flex-start' }}>
                    {serviceImg && (
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img src={serviceImg} alt={sd.name} style={{ width: 80, height: 80, borderRadius: 14, objectFit: 'cover', display: 'block' }} />
                        <div style={{
                          position: 'absolute', inset: 0, borderRadius: 14,
                          background: 'linear-gradient(to bottom, transparent 50%, rgba(183,96,90,0.35) 100%)',
                        }} />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Lustria', serif", fontWeight: 700, color: '#283034', fontSize: '1rem', marginBottom: 5, lineHeight: 1.3 }}>{sd.name}</div>
                      {sd.service_types?.length > 0 && (
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                          {sd.service_types.map(st => (
                            <span key={st.id} className="tag" style={{ background: 'rgba(239,166,151,0.15)', color: '#b7605a', border: '1px solid rgba(239,166,151,0.3)' }}>{st.name}</span>
                          ))}
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: '0.8rem', color: '#7a868c' }}>⏱ {fmtDuration(sd.duration_minutes)}</span>
                        <span style={{ fontWeight: 700, color: '#b7605a', fontSize: '0.92rem' }}>{sd.base_price} {sd.currency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Suite / Arrangement */}
              {ar && (
                <div className="detail-card">
                  <div style={{
                    padding: '13px 18px', borderBottom: '1px solid #fdf0ee',
                    background: 'linear-gradient(90deg, #fdf0ee 0%, #fff 100%)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{ fontSize: 18 }}>🛋</span>
                    <span style={{ fontFamily: "'Lustria', serif", fontWeight: 700, color: '#283034', fontSize: '0.92rem' }}>Suite &amp; Arrangement</span>
                  </div>
                  <div style={{ display: 'flex', gap: 14, padding: '16px 18px', alignItems: 'flex-start' }}>
                    {ar.image && (
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img src={ar.image} alt={ar.arrangement_name} style={{ width: 80, height: 80, borderRadius: 14, objectFit: 'cover', display: 'block' }} />
                        <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: 'linear-gradient(to bottom, transparent 50%, rgba(183,96,90,0.35) 100%)' }} />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Lustria', serif", fontWeight: 700, color: '#283034', fontSize: '1rem', marginBottom: 7 }}>{ar.arrangement_name}</div>
                      <div style={{ marginBottom: 8 }}>
                        <span className="tag" style={{ background: 'linear-gradient(90deg, #efa697, #b7605a)', color: '#fff' }}>
                          {ar.arrangement_type.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontWeight: 700, color: '#b7605a', fontSize: '0.92rem' }}>{ar.price} {ar.currency}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Branch */}
              {br && (
                <div style={{
                  background: '#fff', borderRadius: 20, padding: '16px 18px',
                  border: '1px solid rgba(239,166,151,0.2)',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.05)',
                  display: 'flex', alignItems: 'center', gap: 14, animation: 'fadeUp 0.5s 0.3s ease both',
                }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 14, flexShrink: 0,
                    background: 'linear-gradient(135deg, #f5d5cf 0%, #efa697 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  }}>📍</div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: '#b7948e', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Branch Location</div>
                    <div style={{ fontFamily: "'Lustria', serif", fontWeight: 700, color: '#283034', fontSize: '1rem' }}>{br.name}</div>
                  </div>
                </div>
              )}

              {/* Extra Time */}
              {!!v.extra_time && (
                <div style={{
                  background: 'linear-gradient(135deg, #fdf0ee 0%, #fff 100%)',
                  borderRadius: 20, padding: '16px 18px',
                  border: '1.5px solid rgba(239,166,151,0.35)',
                  display: 'flex', alignItems: 'center', gap: 14,
                  animation: 'fadeUp 0.5s 0.4s ease both',
                }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 14, flexShrink: 0,
                    background: 'linear-gradient(135deg, #efa697 0%, #b7605a 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  }}>⏰</div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: '#b7948e', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Bonus Extra Time</div>
                    <div style={{ fontFamily: "'Lustria', serif", fontWeight: 700, color: '#283034', fontSize: '1rem' }}>
                      +{fmtDuration(v.extra_time)}
                      {v.price_for_extra_time && <span style={{ color: '#b7605a', marginLeft: 10, fontSize: '0.85rem' }}>{v.price_for_extra_time} {v.currency}</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* ADD-ONS */}
        {tab === 'addons' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {v.addons && v.addons.length > 0 ? v.addons.map((a, i) => (
              <div key={a.id} className="detail-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div style={{ padding: '18px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 14, flexShrink: 0,
                    background: 'linear-gradient(135deg, #f5d5cf 0%, #efa697 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  }}>✨</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Lustria', serif", fontWeight: 700, color: '#283034', fontSize: '1rem', marginBottom: 5 }}>{a.name}</div>
                    <div style={{ color: '#7a868c', fontSize: '0.83rem', lineHeight: 1.55, marginBottom: 10 }}>{a.description}</div>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#b7605a', fontSize: '0.92rem' }}>{a.price} {a.currency}</span>
                      <span style={{ color: '#b7948e', fontSize: '0.78rem' }}>⏱ {fmtDuration(a.duration_minutes)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '44px 20px', background: '#fff', borderRadius: 20, border: '1px solid rgba(239,166,151,0.15)' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
                <p style={{ color: '#b7948e', fontFamily: "'Lustria', serif" }}>No add-ons included in this gift</p>
              </div>
            )}
          </div>
        )}

        {/* INFO */}
        {tab === 'info' && (
          <div className="detail-card">
            {[
              { label: 'Template', value: v.gift_template },
              { label: 'Status', value: v.status?.charAt(0).toUpperCase() + v.status?.slice(1), highlight: true },
              { label: 'Category', value: v.gift_category?.charAt(0).toUpperCase() + v.gift_category?.slice(1) },
              { label: 'Total Duration', value: fmtDuration(v.total_duration || 0) },
              { label: 'Total Value', value: `${v.total_amount} ${v.currency}` },
              { label: 'Valid Until', value: fmtDate(v.expire_date) },
              { label: 'Redeemed', value: v.redeemed_at ? fmtDate(v.redeemed_at) : 'Not yet redeemed' },
              { label: 'Gift Issued', value: fmtDate(v.created_at) },
            ].map((r, i, arr) => (
              <div key={r.label} style={{
                padding: '15px 18px',
                borderBottom: i < arr.length - 1 ? '1px solid #fdf0ee' : 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
              }}>
                <span style={{ fontSize: '0.83rem', color: '#7a868c' }}>{r.label}</span>
                <span style={{
                  fontFamily: "'Lustria', serif", fontSize: '0.88rem', fontWeight: 700, textAlign: 'right',
                  color: r.highlight
                    ? (v.status === 'active' ? '#16a34a' : v.status === 'redeemed' ? '#6366f1' : '#dc2626')
                    : '#283034',
                }}>
                  {r.value || '—'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Total Value Banner ── */}
      <div style={{
        margin: '0 18px 24px',
        background: 'linear-gradient(135deg, #b7605a 0%, #efa697 100%)',
        borderRadius: 24, padding: '26px 24px',
        boxShadow: '0 10px 36px rgba(183,96,90,0.38)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="shimmer-bar" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 6 }}>Total Gift Value</div>
          <div style={{ fontFamily: "'Lustria', serif", fontSize: '2.2rem', color: '#fff', fontWeight: 700, lineHeight: 1 }}>
            {v.total_amount} <span style={{ fontSize: '1.1rem' }}>{v.currency}</span>
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'right' }}>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 6 }}>Total Time</div>
          <div style={{ fontFamily: "'Lustria', serif", fontSize: '1.5rem', color: '#fff', fontWeight: 700, lineHeight: 1 }}>{fmtDuration(v.total_duration || 0)}</div>
        </div>
      </div>

      {/* ── App Download CTA ── */}
      <AppCTA />

      {/* ── Footer ── */}
      <div style={{ textAlign: 'center', paddingBottom: 48, color: '#b7948e', fontSize: '0.8rem', padding: '0 20px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10 }}>
          <Logo size={36} />
          <div style={{ fontFamily: "'Alex Brush', cursive", fontSize: '1.8rem', color: '#efa697', lineHeight: 1 }}>USH Spa</div>
        </div>
        <p style={{ lineHeight: 1.7 }}>
          Present this voucher at our branch to redeem your experience.<br />
          <span style={{ color: '#d4c5c2', fontSize: '0.74rem' }}>
            {expired ? '⚠ This voucher has expired' : `Valid until ${fmtDate(v.expire_date)}`}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────── Page ──────────────────────────────── */

export default function GiftPage({ params }: { params: Promise<{ public_token: string }> }) {
  const { public_token } = use(params);
  const [phase, setPhase] = useState<'modal' | 'success'>('modal');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [voucher, setVoucher] = useState<GiftVoucher | null>(null);

  async function handleSubmit(secret_code: string) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `/booknpay/api/v1/vouchers/public/${encodeURIComponent(public_token)}/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ secret_code }),
        }
      );

      let data: Record<string, unknown> = {};
      try { data = await res.json(); } catch { /* empty */ }

      if (!res.ok) {
        const msg =
          (data?.detail as string) ||
          (data?.message as string) ||
          (data?.error as string) ||
          (res.status === 404 ? 'Gift not found. Please check the link.' :
           res.status === 400 ? 'Invalid secret code. Please try again.' :
           res.status === 403 ? 'Access denied. Please check your secret code.' :
           'Something went wrong. Please try again.');
        setError(msg);
        return;
      }

      /* API may return the voucher directly or wrapped e.g. { data: voucher } */
      const voucherData = (data?.data ?? data?.result ?? data?.voucher ?? data) as GiftVoucher;
      setVoucher(voucherData);
      setPhase('success');
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{KEYFRAMES}</style>

      <div className="gift-outer">
        <div className="gift-shell">
          {phase === 'modal' ? (
            <>
              <FloatingPetals />
              <SecretModal onSubmit={handleSubmit} loading={loading} error={error} />
            </>
          ) : voucher ? (
            <ServiceGiftDisplay v={voucher} />
          ) : null}
        </div>
      </div>
    </>
  );
}
