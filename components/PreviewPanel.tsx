'use client'
import { MemorialData } from '@/lib/types'
import { getTemplateComponent } from './templates'
import { downloadAsPng, shareCard } from '@/lib/export'
import { useState, useRef, useEffect } from 'react'

interface Props {
  data: MemorialData
  templateId: string
}

export default function PreviewPanel({ data, templateId }: Props) {
  const [status, setStatus] = useState<'idle' | 'downloading' | 'sharing'>('idle')
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const Template = getTemplateComponent(templateId)

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const available = containerRef.current.clientWidth - 48 // padding
      setScale(Math.min(1, available / 600))
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const handleDownload = async () => {
    setStatus('downloading')
    await downloadAsPng('memorial-card-preview', `부고_${data.name || '알림'}.png`)
    setStatus('idle')
  }

  const handleShare = async () => {
    setStatus('sharing')
    await shareCard('memorial-card-preview', data.name)
    setStatus('idle')
  }

  const handleCopyText = () => {
    const lines = [
      '【 부 고 】',
      '',
      data.name ? `고  인: ${data.name}` : '',
      data.deathDate
        ? `별  세: ${data.deathDate.replace(/-/g, '.')}${data.deathTime ? ' ' + data.deathTime : ''}`
        : '',
      data.funeralHall ? `빈  소: ${data.funeralHall}` : '',
      data.departure ? `발  인: ${data.departure}` : '',
      data.burial ? `장  지: ${data.burial}` : '',
      data.bankAccount ? `조의금: ${data.bankAccount}` : '',
      data.contact ? `연락처: ${data.contact}` : '',
      data.chiefMourners?.length
        ? `상  주: ${data.chiefMourners.map(m => `${m.role} ${m.name}`).join(', ')}`
        : '',
      data.message ? `\n${data.message}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    navigator.clipboard.writeText(lines).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const previewW = 600 * scale
  const previewH = 800 * scale

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6" ref={containerRef}>
      <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest mb-5">실시간 미리보기</p>

      {/* Card preview */}
      <div
        className="mx-auto mb-6 overflow-hidden rounded shadow-lg"
        style={{ width: previewW, height: previewH }}
      >
        <div
          style={{
            width: 600,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
        >
          <div id="memorial-card-preview">
            <Template data={data} />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={handleDownload}
          disabled={status === 'downloading'}
          className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700 transition-colors disabled:opacity-40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span className="text-xs font-semibold leading-none">
            {status === 'downloading' ? '저장 중…' : 'PNG 저장'}
          </span>
        </button>

        <button
          onClick={handleShare}
          disabled={status === 'sharing'}
          className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl bg-[#FEE500] text-[#191919] hover:bg-[#FDD000] transition-colors disabled:opacity-40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2C6.47,2,2,5.58,2,10s4.47,8,10,8c.4,0,.8,0,1.19-.08,2.39,2.4,4.28,2.83,5.93,2.94a.5.5,0,0,0,.54-.77c-.5-.73-1.15-2-1.22-3.41,2.02-1.74,3.24-4,3.24-6.49,0-4.42-4.47-8-10-8Z" />
          </svg>
          <span className="text-xs font-semibold leading-none">
            {status === 'sharing' ? '공유 중…' : '카카오 공유'}
          </span>
        </button>

        <button
          onClick={handleCopyText}
          className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
        >
          {copied ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-xs font-semibold leading-none text-green-600">복사됨!</span>
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span className="text-xs font-semibold leading-none">텍스트 복사</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
