'use client'
import { MemorialData } from '@/lib/types'
import { getTemplateComponent } from './templates'
import { downloadAsPng, shareToKakao } from '@/lib/export'
import { useState } from 'react'

interface Props {
  data: MemorialData
  templateId: string
}

export default function PreviewPanel({ data, templateId }: Props) {
  const [isExporting, setIsExporting] = useState(false)
  const Template = getTemplateComponent(templateId)

  const handleDownload = async () => {
    setIsExporting(true)
    try {
      await downloadAsPng('memorial-card-preview', `부고_${data.name || '알림'}.png`)
    } finally {
      setIsExporting(false)
    }
  }

  const handleShare = async () => {
    await shareToKakao('memorial-card-preview')
  }

  return (
    <div className="flex flex-col items-center">
      <div className="sticky top-6 w-full flex flex-col items-center">
        {/* Actual Preview Area to capture */}
        <div className="shadow-2xl rounded-sm overflow-hidden transform origin-top scale-75 md:scale-90 lg:scale-100 mb-8 bg-white">
          <div id="memorial-card-preview">
            <Template data={data} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center w-full max-w-md pb-12">
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 min-w-[140px] h-12 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            PNG 저장
          </button>
          <button
            onClick={handleShare}
            className="flex-1 min-w-[140px] h-12 bg-[#FEE500] text-[#191919] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#FDD835] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2C6.47,2,2,5.58,2,10s4.47,8,10,8c.4,0,.8,0,1.19-.08,2.39,2.4,4.28,2.83,5.93,2.94a.5.5,0,0,0,.54-.77c-.5-.73-1.15-2-1.22-3.41,2.02-1.74,3.24-4,3.24-6.49,0-4.42-4.47-8-10-8Z" />
            </svg>
            카카오톡 공유
          </button>
        </div>
      </div>
    </div>
  )
}
