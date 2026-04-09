import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO  = process.env.GITHUB_REPO
const FILE_PATH    = 'neozap-data.json'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS })
}

export async function POST(req: NextRequest) {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json(
      { error: 'Missing GitHub env vars' },
      { status: 500, headers: CORS }
    )
  }

  try {
    const data = await req.json()

    // ── Strip base64 image data before saving to GitHub ──────────────
    // Base64 images make the file huge — store only URLs, not data URIs
    const cleaned = {
      ...data,
      cards: (data.cards || []).map((card: Record<string, unknown>) => ({
        ...card,
        // If imgCol is a base64 data URI, replace with empty string
        imgCol:  isDataURI(card.imgCol)  ? '' : card.imgCol,
        imgChip: isDataURI(card.imgChip) ? '' : card.imgChip,
        imgBack: isDataURI(card.imgBack) ? '' : card.imgBack,
        // Also strip base64 from color previews if any
        colors: ((card.colors as Record<string, unknown>[]) || []).map((c: Record<string, unknown>) => ({
          hex:  c.hex,
          name: c.name,
        })),
      })),
    }

    const fileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    }

    // Get existing file SHA if it exists
    let sha: string | undefined
    const getRes = await fetch(fileUrl, { headers })
    if (getRes.ok) {
      const existing = await getRes.json()
      sha = existing.sha
    }

    // Encode content as base64
    const jsonString = JSON.stringify(cleaned, null, 2)
    const content = Buffer.from(jsonString).toString('base64')

    // Check size — GitHub API limit is 100MB but practically keep under 5MB
    const sizeMB = Buffer.byteLength(jsonString) / (1024 * 1024)
    if (sizeMB > 5) {
      return NextResponse.json(
        { error: `Data too large (${sizeMB.toFixed(1)}MB). Remove base64 images from admin panel.` },
        { status: 413, headers: CORS }
      )
    }

    // Push to GitHub
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
      return NextResponse.json({ error: err }, { status: 500, headers: CORS })
    }

    return NextResponse.json({
      success: true,
      cards: cleaned.cards.length,
      sizeMB: sizeMB.toFixed(2),
    }, { headers: CORS })

  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500, headers: CORS })
  }
}

function isDataURI(val: unknown): boolean {
  return typeof val === 'string' && val.startsWith('data:')
}
