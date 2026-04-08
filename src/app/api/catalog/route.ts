import { NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO  = process.env.GITHUB_REPO
const FILE_PATH    = 'neozap-data.json'

export async function GET() {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
        next: { revalidate: 60 }, // refresh every 60 seconds
      }
    )

    if (!res.ok) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const file = await res.json()
    const decoded = Buffer.from(file.content, 'base64').toString('utf-8')
    const data = JSON.parse(decoded)
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
