import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ public_token: string }> }
) {
  try {
    const { public_token } = await params;
    const baseUrl = (
      process.env.BASE_TRACE_API_URL ||
      process.env.NEXT_PUBLIC_BASE_TRACE_API_URL ||
      'http://127.0.0.1:8000'
    ).replace(/\/+$/, '');

    const targetUrl = `${baseUrl}/booknpay/api/v1/track/${encodeURIComponent(public_token)}/`;

    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Error fetching order status from upstream:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            error instanceof Error ? error.message : 'Failed to reach upstream server',
        },
      },
      { status: 502 }
    );
  }
}
