'use client'
import { useRef, useState, useLayoutEffect } from 'react'
import { TEMPLATES } from './templates'
import { MemorialData } from '@/lib/types'

const SAMPLE: MemorialData = {
  name: '홍길동',
  deathDate: '2026-03-20',
  deathTime: '오전 10시',
  birthYear: '1945',
  message: '삼가 고인의 명복을 빕니다.',
  funeralHall: 'OO병원 장례식장',
  departure: '2026년 3월 22일',
  chiefMourners: [{ role: '장남', name: '홍대한' }],
}

interface Props {
  selectedId: string
  onSelect: (id: string) => void
}

export default function TemplateGrid({ selectedId, onSelect }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [cellW, setCellW] = useState(70)

  useLayoutEffect(() => {
    const update = () => {
      if (!gridRef.current) return
      const totalW = gridRef.current.clientWidth
      const gap = 8 * 4 // 4 gaps × 8px
      setCellW(Math.floor((totalW - gap) / 5))
    }
    update()
    const ro = new ResizeObserver(update)
    if (gridRef.current) ro.observe(gridRef.current)
    return () => ro.disconnect()
  }, [])

  const scale = cellW / 600
  const cellH = Math.floor(800 * scale)

  return (
    <div ref={gridRef} className="grid grid-cols-5 gap-2">
      {TEMPLATES.map((t) => {
        const Component = t.component
        const isSelected = selectedId === t.id
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            title={t.name}
            className={`relative overflow-hidden rounded-lg transition-all focus:outline-none ${
              isSelected
                ? 'ring-2 ring-zinc-800 ring-offset-2 shadow-md'
                : 'ring-1 ring-zinc-200 hover:ring-zinc-400 hover:shadow-sm'
            }`}
            style={{ width: cellW, height: cellH }}
          >
            <div
              style={{
                width: 600,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              <Component data={SAMPLE} />
            </div>
            {isSelected && (
              <div className="absolute top-1 right-1 w-4 h-4 bg-zinc-900 rounded-full flex items-center justify-center shadow">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
