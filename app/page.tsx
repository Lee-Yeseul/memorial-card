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
    <div className="min-h-screen bg-[#f8f9fa] selection:bg-black selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">訃</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">부고장 생성기</h1>
          </div>
          <p className="text-xs text-gray-400 hidden sm:block">
            삼가 고인의 명복을 빕니다.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Form */}
          <div className="w-full lg:w-[400px] lg:sticky lg:top-24">
            <FormPanel data={data} onChange={setData} />
          </div>

          {/* Right: Template Selection & Preview */}
          <div className="flex-1 w-full">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-5 bg-gray-200 rounded-full"></span>
                템플릿 선택
              </h2>
              <TemplateGrid 
                selectedId={selectedTemplate} 
                onSelect={setSelectedTemplate} 
              />
              
              <div className="border-t pt-8 mt-4">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-5 bg-gray-200 rounded-full"></span>
                  실시간 미리보기
                </h2>
                <PreviewPanel 
                  data={data} 
                  templateId={selectedTemplate} 
                />
              </div>
            </div>
            
            <footer className="mt-8 text-center text-gray-400 text-sm pb-12">
              © 2024 Memorial Card Generator. All rights reserved.
            </footer>
          </div>
        </div>
      </main>
    </div>
  )
}
