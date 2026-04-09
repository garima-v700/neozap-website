import { NextResponse } from 'next/server'

const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO  = process.env.GITHUB_REPO

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS })
}

export async function GET() {
  if (!GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'Missing env vars' }, { status: 500, headers: CORS })
  }

  try {
    // Read raw file directly — no base64, no encoding issues
    const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/neozap-data.json?t=${Date.now()}`

    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
      return NextResponse.json({ error: 'File not found' }, { status: 404, headers: CORS })
    }

    const text = await res.text()
    const data = JSON.parse(text)

    return NextResponse.json(data, {
      headers: { ...CORS, 'Cache-Control': 'no-store, max-age=0' }
    })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500, headers: CORS })
  }
}
