'use client'
import { useState } from 'react'
import { MemorialData } from '@/lib/types'
import FormPanel from '@/components/FormPanel'
import TemplateGrid from '@/components/TemplateGrid'
import PreviewPanel from '@/components/PreviewPanel'

export default function Home() {
  const [data, setData] = useState<MemorialData>({
    name: '',
    deathDate: new Date().toISOString().split('T')[0],
    chiefMourners: [{ role: '상주', name: '' }],
    funeralHall: '',
    departure: '',
    burial: '',
  })
  const [selectedTemplate, setSelectedTemplate] = useState('T03')

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-50 backdrop-blur">
        <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white text-[13px] font-bold">訃</span>
            </div>
            <span className="font-bold text-zinc-900 text-[15px] tracking-tight">부고장 생성기</span>
          </div>
          <span className="text-xs text-zinc-400 hidden sm:block">삼가 고인의 명복을 빕니다</span>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-6">
        <div className="flex flex-col xl:flex-row gap-6 items-start">
          {/* Left: Form + Template picker */}
          <div className="w-full xl:w-[440px] shrink-0 flex flex-col gap-4">
            <FormPanel data={data} onChange={setData} />
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
              <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest mb-4">
                템플릿 선택
              </p>
              <TemplateGrid selectedId={selectedTemplate} onSelect={setSelectedTemplate} />
            </div>
          </div>

          {/* Right: Preview (sticky) */}
          <div className="flex-1 min-w-0 w-full xl:sticky xl:top-20">
            <PreviewPanel data={data} templateId={selectedTemplate} />
          </div>
        </div>
      </main>

      <footer className="text-center text-[11px] text-zinc-400 py-10">
        © 2026 부고장 생성기 · 삼가 고인의 명복을 빕니다
      </footer>
    </div>
  )
}
