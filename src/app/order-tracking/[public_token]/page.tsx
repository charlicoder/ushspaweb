'use client';

import React, { use, useEffect, useState } from 'react';

/* ─────────────────────────── Types ─────────────────────────── */

interface OrderItem {
  id?: string;
  name?: string;
  product_name?: string;
  product_name_ar?: string;
  product_image_url?: string;
  quantity: number;
  unit_price?: string | number;
  price?: string | number;
  line_total?: string | number;
  currency?: string;
}

interface StatusHistoryItem {
  from_status?: string;
  from_status_label?: string;
  to_status?: string;
  to_status_label?: string;
  note?: string;
  created_at?: string;
}

interface OrderData {
  id?: string | number;
  order_number?: string;
  status?: string;
  delivery_status?: string;
  delivery_status_label?: string;
  payment_status?: string;
  customer_name?: string;
  customer_email?: string;
  service?: string;
  service_name?: string;
  date?: string;
  scheduled_date?: string;
  appointment_date?: string;
  created_at?: string;
  time?: string;
  scheduled_time?: string;
  appointment_time?: string;
  therapist?: string;
  location?: string;
  notes?: string;
  total?: string | number;
  amount?: string | number;
  currency?: string;
  items?: OrderItem[];
  status_history?: StatusHistoryItem[];
  [key: string]: unknown;
}

/* ─────────────────────────── Helpers ───────────────────────── */

function statusConfig(status: string | undefined, label?: string) {
  const s = (status ?? '').toLowerCase();
  if (
    s.includes('delivered') ||
    s.includes('received') ||
    s.includes('completed')
  ) {
    return {
      label: label || 'Delivered',
      color: '#16a34a',
      bg: '#dcfce7',
      borderColor: '#86efac',
      icon: '✓',
    };
  }
  if (
    s.includes('transit') ||
    s.includes('shipped') ||
    s.includes('on the way') ||
    s.includes('out_for_delivery')
  ) {
    return {
      label: label || 'In Transit',
      color: '#d97706',
      bg: '#fef3c7',
      borderColor: '#fcd34d',
      icon: '🚚',
    };
  }
  if (
    s.includes('processing') ||
    s.includes('preparing') ||
    s.includes('confirmed')
  ) {
    return {
      label: label || 'Processing',
      color: '#2563eb',
      bg: '#dbeafe',
      borderColor: '#93c5fd',
      icon: '⏳',
    };
  }
  if (s.includes('ordered') || s.includes('pending') || s.includes('placed')) {
    return {
      label: label || 'Ordered',
      color: '#7c3aed',
      bg: '#ede9fe',
      borderColor: '#c4b5fd',
      icon: '📋',
    };
  }
  if (s.includes('cancelled') || s.includes('canceled')) {
    return {
      label: label || 'Cancelled',
      color: '#dc2626',
      bg: '#fee2e2',
      borderColor: '#fca5a5',
      icon: '✕',
    };
  }
  return {
    label: label || status || 'Active',
    color: '#4b5563',
    bg: '#f3f4f6',
    borderColor: '#d1d5db',
    icon: '📦',
  };
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

/* ─────────────────────────── Main Page ─────────────────────── */

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ public_token: string }>;
}) {
  const { public_token } = use(params);

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* Modal state */
  const [modalOpen, setModalOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* ── Fetch order (Using same-origin proxy to eliminate CORS) ── */
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        // Relative URL routes to Next.js API proxy, resolving all browser CORS restrictions
        const res = await fetch(
          `/api/track/${encodeURIComponent(public_token)}`
        );
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          const errMsg =
            data?.error?.message ||
            data?.detail ||
            data?.message ||
            `Error ${res.status}: Failed to load order`;
          throw new Error(errMsg);
        }

        setOrder(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to retrieve order details.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [public_token]);

  /* ── Submit received ── */
  const handleReceivedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      // Relative URL routes to Next.js API proxy, resolving all browser CORS restrictions
      const res = await fetch(
        `/api/track/${encodeURIComponent(public_token)}/received`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tracking_code: trackingCode.trim() }),
        }
      );

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Parse validation errors from backend format:
        // {"success":false,"error":{"code":"VALIDATION_ERROR","message":"...","detail":[{"msg":"..."}]}}
        let errorMsg = 'Failed to submit tracking code.';
        if (body?.error?.detail && Array.isArray(body.error.detail) && body.error.detail[0]?.msg) {
          errorMsg = body.error.detail[0].msg;
        } else if (body?.error?.message) {
          errorMsg = body.error.message;
        } else if (body?.detail) {
          errorMsg = typeof body.detail === 'string' ? body.detail : JSON.stringify(body.detail);
        } else if (body?.message) {
          errorMsg = body.message;
        }
        throw new Error(errorMsg);
      }

      setSubmitSuccess(true);
      // Update local delivery status to received
      setOrder((prev) =>
        prev
          ? {
              ...prev,
              delivery_status: 'received',
              delivery_status_label: 'Received',
            }
          : null
      );
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Derive display fields ─── */
  const rawStatus = order?.delivery_status ?? order?.status;
  const statusLabel = order?.delivery_status_label;
  const cfg = statusConfig(rawStatus, statusLabel);

  const displayName = order?.customer_name ?? (order?.['name'] as string | undefined);
  const displayEmail = order?.customer_email ?? (order?.['email'] as string | undefined);
  const displayService =
    order?.service_name ??
    order?.service ??
    (order?.items && order.items.length === 1
      ? order.items[0].product_name || order.items[0].name
      : undefined);

  const displayDate =
    formatDate(order?.scheduled_date ?? order?.appointment_date ?? order?.created_at ?? order?.date);
  const displayTime = order?.scheduled_time ?? order?.appointment_time ?? order?.time;
  const displayTherapist = order?.therapist;
  const displayLocation = order?.location;
  const displayNotes = order?.notes;
  const orderRef = order?.order_number ?? order?.id;

  // Calculate order total if items exist
  let computedTotal = order?.total ?? order?.amount;
  let currency = order?.currency || 'KWD';
  if (computedTotal === undefined && order?.items && order.items.length > 0) {
    const sum = order.items.reduce((acc, it) => {
      const fallbackPrice = Number(it.unit_price || it.price || 0) * it.quantity;
      const line = parseFloat(String(it.line_total ?? fallbackPrice ?? 0));
      return acc + (isNaN(line) ? 0 : line);
    }, 0);
    if (sum > 0) {
      computedTotal = sum.toFixed(3);
    }
    if (order.items[0]?.currency) {
      currency = order.items[0].currency;
    }
  }

  const isDelivered =
    (rawStatus ?? '').toLowerCase().includes('delivered') ||
    (rawStatus ?? '').toLowerCase().includes('received');

  /* ────────────────────────── Render ────────────────────────── */
  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#daccc1',
          fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          color: '#283034',
        }}
      >
        {/* ── Header Bar ── */}
        <header
          style={{
            background: '#fff',
            borderBottom: '1px solid #c8b9ad',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a
              href="/"
              title="USH Spa Home"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <img
                src="/images/company-logo.png"
                alt="USH Spa Logo"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  display: 'block',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}
              />
            </a>
            <div>
              <div
                style={{
                  fontFamily: "'Lustria', serif",
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: '#283034',
                  letterSpacing: '0.5px',
                  lineHeight: 1.2,
                }}
              >
                USH Spa
              </div>
              <div style={{ fontSize: '0.75rem', color: '#7a868c', letterSpacing: '0.3px', marginTop: '2px' }}>
                Order &amp; Delivery Tracking
              </div>
            </div>
          </div>
          {orderRef && (
            <span
              style={{
                fontSize: '0.8rem',
                color: '#6b5749',
                fontWeight: 600,
                letterSpacing: '0.5px',
                background: '#ebdcd0',
                border: '1px solid #d8c6b7',
                padding: '6px 14px',
                borderRadius: '999px',
              }}
            >
              {String(orderRef)}
            </span>
          )}
        </header>

        {/* ── Content Container ── */}
        <main style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 20px 80px' }}>
          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '52px',
                  height: '52px',
                  border: '3px solid #f5d5cf',
                  borderTop: '3px solid #efa697',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  marginBottom: '20px',
                }}
              />
              <p style={{ color: '#7a868c', fontSize: '1rem', fontWeight: 500 }}>
                Retrieving order status…
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '48px 32px',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                border: '1px solid #fce7e7',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📦</div>
              <h2
                style={{
                  fontFamily: "'Lustria', serif",
                  fontSize: '1.4rem',
                  marginBottom: '10px',
                  color: '#283034',
                }}
              >
                Order Tracking Notice
              </h2>
              <p style={{ color: '#7a868c', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto' }}>
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: '24px',
                  padding: '10px 26px',
                  background: '#efa697',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Order Details */}
          {!loading && !error && order && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* ── Status Hero Card ── */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: '24px',
                  padding: '36px 32px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  border: `1px solid ${cfg.borderColor}`,
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    right: '-60px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: cfg.bg,
                    opacity: 0.6,
                  }}
                />

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    background: cfg.bg,
                    border: `2px solid ${cfg.borderColor}`,
                    fontSize: '2rem',
                    marginBottom: '16px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {cfg.icon}
                </div>

                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '6px 20px',
                      borderRadius: '999px',
                      background: cfg.bg,
                      color: cfg.color,
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                      border: `1px solid ${cfg.borderColor}`,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    Delivery Status: {cfg.label}
                  </span>
                </div>

                <h1
                  style={{
                    fontFamily: "'Lustria', serif",
                    fontSize: '1.65rem',
                    fontWeight: 700,
                    color: '#283034',
                    marginBottom: '8px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {displayService ?? (orderRef ? `Order #${orderRef}` : 'Order Summary')}
                </h1>

                {displayName && (
                  <p
                    style={{
                      color: '#7a868c',
                      fontSize: '0.92rem',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    Customer:{' '}
                    <strong style={{ color: '#283034' }}>{displayName}</strong>
                  </p>
                )}

                {order.payment_status && (
                  <div style={{ marginTop: '10px', position: 'relative', zIndex: 1 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: '6px',
                        background: '#f0fdf4',
                        color: '#16a34a',
                        border: '1px solid #bbf7d0',
                        textTransform: 'uppercase',
                      }}
                    >
                      Payment: {order.payment_status}
                    </span>
                  </div>
                )}
              </div>

              {/* ── Progress Tracker ── */}
              <DeliveryProgress status={rawStatus} />

              {/* ── Items List ── */}
              {order.items && order.items.length > 0 && (
                <div
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '28px 28px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Lustria', serif",
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#283034',
                      marginBottom: '18px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #f5d5cf',
                    }}
                  >
                    Order Items ({order.items.length})
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {order.items.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          paddingBottom:
                            idx < (order.items?.length ?? 0) - 1 ? '16px' : '0',
                          borderBottom:
                            idx < (order.items?.length ?? 0) - 1
                              ? '1px dashed #f5d5cf'
                              : 'none',
                        }}
                      >
                        {item.product_image_url && (
                          <div
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              flexShrink: 0,
                              background: '#f8fafc',
                              border: '1px solid #f1f5f9',
                            }}
                          >
                            <img
                              src={item.product_image_url}
                              alt={item.product_name || item.name || 'Product'}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </div>
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: '0.95rem',
                              fontWeight: 600,
                              color: '#283034',
                              marginBottom: '4px',
                            }}
                          >
                            {item.product_name || item.name || 'Item'}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#7a868c' }}>
                            Quantity: {item.quantity}
                            {item.unit_price && (
                              <span> &bull; {item.unit_price} {item.currency || currency} each</span>
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: '#efa697',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.line_total || item.price || item.unit_price}{' '}
                          {item.currency || currency}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Order Details Card ── */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '28px 28px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Lustria', serif",
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#283034',
                    marginBottom: '20px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #f5d5cf',
                  }}
                >
                  Order Summary
                </h2>

                <dl
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px 24px',
                    margin: 0,
                  }}
                >
                  {displayDate && <DetailRow label="Date Placed" value={displayDate} />}
                  {displayTime && <DetailRow label="Time" value={displayTime} />}
                  {displayTherapist && <DetailRow label="Therapist" value={displayTherapist} />}
                  {displayLocation && <DetailRow label="Location" value={displayLocation} />}
                  {displayEmail && <DetailRow label="Customer Email" value={displayEmail} span />}
                  {computedTotal !== undefined && (
                    <DetailRow
                      label="Total Amount"
                      value={`${computedTotal} ${currency}`}
                      highlight
                    />
                  )}
                </dl>

                {displayNotes && (
                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f5d5cf' }}>
                    <dt
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: '#b7948e',
                        letterSpacing: '0.8px',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                      }}
                    >
                      Notes
                    </dt>
                    <dd style={{ fontSize: '0.88rem', color: '#4a5568', lineHeight: 1.6, margin: 0 }}>
                      {displayNotes}
                    </dd>
                  </div>
                )}
              </div>

              {/* ── Emphasized Received Action Button ── */}
              <div
                style={{
                  textAlign: 'center',
                  padding: '16px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {isDelivered ? (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px 32px',
                      background: '#dcfce7',
                      color: '#16a34a',
                      borderRadius: '999px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      border: '1px solid #bbf7d0',
                    }}
                  >
                    <span>✓</span> Order Marked as Received
                  </div>
                ) : (
                  <>
                    <button
                      id="mark-received-btn"
                      onClick={() => {
                        setModalOpen(true);
                        setSubmitSuccess(false);
                        setSubmitError(null);
                        setTrackingCode('');
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '16px 44px',
                        background: 'linear-gradient(135deg, #efa697, #d4857a)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '999px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        boxShadow: '0 6px 24px rgba(239,166,151,0.5)',
                        transition: 'all 250ms ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          'translateY(-2px)';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          '0 10px 30px rgba(239,166,151,0.6)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          'translateY(0)';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          '0 6px 24px rgba(239,166,151,0.5)';
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>✓</span>
                      Received Order
                    </button>
                    <p style={{ marginTop: '12px', fontSize: '0.82rem', color: '#b7948e' }}>
                      Click to enter your tracking code and confirm package receipt
                    </p>
                  </>
                )}
              </div>

            </div>
          )}
        </main>
      </div>

      {/* ── Popup Modal for Received Confirmation ── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setModalOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(40,48,52,0.6)',
              backdropFilter: 'blur(6px)',
            }}
          />

          {/* Modal Card */}
          <div
            style={{
              position: 'relative',
              background: '#fff',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '460px',
              padding: '38px 36px 36px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
              animation: 'modalIn 0.25s ease',
            }}
          >
            {/* Close button */}
            <button
              id="close-modal-btn"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: '#fdf0ee',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#b7605a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: '#dcfce7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    margin: '0 auto 20px',
                    color: '#16a34a',
                  }}
                >
                  ✓
                </div>
                <h3
                  id="modal-title"
                  style={{
                    fontFamily: "'Lustria', serif",
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: '#283034',
                    marginBottom: '10px',
                  }}
                >
                  Delivery Confirmed!
                </h3>
                <p style={{ color: '#7a868c', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Thank you! Your package has been marked as received.
                </p>
                <button
                  id="close-success-btn"
                  onClick={() => setModalOpen(false)}
                  style={{
                    marginTop: '26px',
                    padding: '12px 36px',
                    background: 'linear-gradient(135deg, #efa697, #d4857a)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '999px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(239,166,151,0.4)',
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    marginBottom: '18px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
                  }}
                >
                  <img
                    src="/images/company-logo.png"
                    alt="USH Spa Logo"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>

                <h3
                  id="modal-title"
                  style={{
                    fontFamily: "'Lustria', serif",
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: '#283034',
                    marginBottom: '8px',
                  }}
                >
                  Confirm Delivery
                </h3>
                <p style={{ color: '#7a868c', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  Please enter your tracking code below to verify and confirm receipt of your order.
                </p>

                <form onSubmit={handleReceivedSubmit} noValidate>
                  <label
                    htmlFor="tracking-code-input"
                    style={{
                      display: 'block',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: '#b7948e',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    Tracking Code
                  </label>
                  <input
                    id="tracking-code-input"
                    type="text"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder="e.g. TRK123456"
                    required
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: submitError ? '1.5px solid #f87171' : '1.5px solid #f5d5cf',
                      fontSize: '0.98rem',
                      color: '#283034',
                      outline: 'none',
                      background: '#fdf8f6',
                      boxSizing: 'border-box',
                      transition: 'border-color 200ms',
                      marginBottom: submitError ? '10px' : '24px',
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = '#efa697';
                    }}
                    onBlur={(e) => {
                      if (!submitError) {
                        (e.target as HTMLInputElement).style.borderColor = '#f5d5cf';
                      }
                    }}
                  />

                  {submitError && (
                    <div
                      style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        fontSize: '0.82rem',
                        marginBottom: '18px',
                        lineHeight: 1.5,
                      }}
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    id="submit-tracking-btn"
                    type="submit"
                    disabled={submitting || !trackingCode.trim()}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background:
                        submitting || !trackingCode.trim()
                          ? '#f5d5cf'
                          : 'linear-gradient(135deg, #efa697, #d4857a)',
                      color: submitting || !trackingCode.trim() ? '#b7948e' : '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      cursor: submitting || !trackingCode.trim() ? 'not-allowed' : 'pointer',
                      transition: 'all 200ms',
                      boxShadow:
                        submitting || !trackingCode.trim()
                          ? 'none'
                          : '0 4px 14px rgba(239,166,151,0.4)',
                    }}
                  >
                    {submitting ? 'Submitting…' : 'Submit & Confirm'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────── Sub-components ─────────────────── */

function DetailRow({
  label,
  value,
  span,
  highlight,
}: {
  label: string;
  value: string;
  span?: boolean;
  highlight?: boolean;
}) {
  return (
    <div style={{ gridColumn: span ? '1 / -1' : undefined }}>
      <dt
        style={{
          fontSize: '0.72rem',
          fontWeight: 600,
          color: '#b7948e',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          marginBottom: '4px',
        }}
      >
        {label}
      </dt>
      <dd
        style={{
          fontSize: '0.94rem',
          color: highlight ? '#efa697' : '#283034',
          fontWeight: highlight ? 700 : 400,
          wordBreak: 'break-word',
          margin: 0,
        }}
      >
        {value}
      </dd>
    </div>
  );
}

const STEPS = [
  { key: 'ordered', label: 'Ordered', icon: '📋' },
  { key: 'processing', label: 'Processing', icon: '⏳' },
  { key: 'transit', label: 'In Transit', icon: '🚚' },
  { key: 'delivered', label: 'Delivered', icon: '✓' },
];

function DeliveryProgress({ status }: { status: string | undefined }) {
  const s = (status ?? '').toLowerCase();

  let activeStep = 0;
  if (s.includes('processing') || s.includes('confirmed') || s.includes('preparing')) {
    activeStep = 1;
  } else if (
    s.includes('transit') ||
    s.includes('shipped') ||
    s.includes('out_for_delivery')
  ) {
    activeStep = 2;
  } else if (
    s.includes('delivered') ||
    s.includes('received') ||
    s.includes('completed')
  ) {
    activeStep = 3;
  }

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '28px 28px 24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      }}
    >
      <h2
        style={{
          fontFamily: "'Lustria', serif",
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#283034',
          marginBottom: '28px',
          letterSpacing: '0.3px',
        }}
      >
        Delivery Progress
      </h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Base connector line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '20px',
            left: '12%',
            width: '76%',
            height: '2px',
            background: '#f5d5cf',
          }}
        />
        {/* Active connector */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '20px',
            left: '12%',
            width: `${(activeStep / (STEPS.length - 1)) * 76}%`,
            height: '2px',
            background: 'linear-gradient(90deg, #efa697, #d4857a)',
            transition: 'width 500ms ease',
          }}
        />

        {STEPS.map((step, idx) => {
          const done = idx <= activeStep;
          const current = idx === activeStep;
          return (
            <div
              key={step.key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                position: 'relative',
                flex: 1,
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: done
                    ? current
                      ? 'linear-gradient(135deg, #efa697, #d4857a)'
                      : '#fdf0ee'
                    : '#f9fafb',
                  border: done
                    ? current
                      ? '2px solid #d4857a'
                      : '2px solid #efa697'
                    : '2px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  color: done ? (current ? '#fff' : '#efa697') : '#9ca3af',
                  boxShadow: current ? '0 4px 12px rgba(239,166,151,0.45)' : 'none',
                  transition: 'all 300ms ease',
                  zIndex: 1,
                }}
              >
                {step.icon}
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: current ? 700 : 500,
                  color: done ? (current ? '#d4857a' : '#efa697') : '#9ca3af',
                  letterSpacing: '0.3px',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
