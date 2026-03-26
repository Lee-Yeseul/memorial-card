'use client'
import { TEMPLATES } from './templates'

interface Props {
  selectedId: string
  onSelect: (id: string) => void
}

export default function TemplateGrid({ selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`relative group overflow-hidden rounded-lg border-2 transition-all aspect-[3/4] ${
            selectedId === t.id ? 'border-black ring-2 ring-black ring-offset-2' : 'border-gray-200 hover:border-gray-400'
          }`}
          style={{ backgroundColor: t.bgColor }}
        >
          <div className="absolute inset-0 flex items-center justify-center p-2 text-center pointer-events-none">
            <span className={`text-[10px] font-bold ${
              t.bgColor === '#ffffff' || t.bgColor === '#faf9f6' || t.bgColor === '#fcfcfc' || t.bgColor === '#f5f0e8' 
              ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.name}
            </span>
          </div>
          {selectedId === t.id && (
            <div className="absolute top-1 right-1 bg-black text-white rounded-full p-0.5 z-10">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
