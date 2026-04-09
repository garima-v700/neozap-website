import { NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO  = process.env.GITHUB_REPO
const FILE_PATH    = 'neozap-data.json'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS })
}

export async function GET() {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'Missing env vars' }, { status: 500, headers: CORS })
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'File not found' }, { status: 404, headers: CORS })
    }

    const file = await res.json()

    // Strip newlines GitHub adds to base64 content
    const cleanBase64 = file.content.replace(/\n/g, '')
    const decoded = Buffer.from(cleanBase64, 'base64').toString('utf-8')
    const data = JSON.parse(decoded)

    return NextResponse.json(data, {
      headers: { ...CORS, 'Cache-Control': 'no-store, max-age=0' }
    })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500, headers: CORS })
  }
}
