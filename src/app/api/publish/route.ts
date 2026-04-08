import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO  = process.env.GITHUB_REPO
const FILE_PATH    = 'neozap-data.json'

export async function POST(req: NextRequest) {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'Missing GitHub env vars' }, { status: 500 })
  }

  try {
    const data = await req.json()

    // 1 — Get current file SHA (needed for update)
    const fileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    }

    let sha: string | undefined
    const getRes = await fetch(fileUrl, { headers })
    if (getRes.ok) {
      const existing = await getRes.json()
      sha = existing.sha
    }

    // 2 — Encode content as base64
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64')

    // 3 — Push to GitHub
    const putRes = await fetch(fileUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `Admin publish — ${new Date().toISOString()}`,
        content,
        ...(sha ? { sha } : {}),
      }),
    })

    if (!putRes.ok) {
      const err = await putRes.json()
      return NextResponse.json({ error: err }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
