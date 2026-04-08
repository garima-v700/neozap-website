import { ASSETS } from '@/lib/data'

export default function RewardsSection() {
  return (
    <section style={{ position: 'relative', width: '100%', height: 693, overflow: 'hidden' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ASSETS.rewardsBg} alt="Most Rewarding Payment Card"
        style={{ position: 'absolute', width: '100%', height: '122.94%', top: '-16.74%', left: 0, objectFit: 'cover' }} />
    </section>
  )
}
