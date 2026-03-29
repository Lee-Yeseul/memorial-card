'use client'
import { MemorialData, ChiefMourner } from '@/lib/types'
import { useState, useRef } from 'react'

const MESSAGE_TEMPLATES = [
  '삼가 고인의 명복을 빕니다.',
  '갑작스러운 비보에 슬픔을 금치 못하며 삼가 고인의 명복을 빕니다.',
  '평소 고인의 고결한 삶을 기억하며 명복을 빕니다.',
  '부디 좋은 곳에서 편히 쉬시기를 기원합니다.',
  '생전에 보여주신 사랑과 헌신을 잊지 않겠습니다.',
]

interface Props {
  data: MemorialData
  onChange: (data: MemorialData) => void
}

const inputBase = 'px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all placeholder:text-zinc-300'
const input = 'w-full ' + inputBase

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[12px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">{children}</label>
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest">{title}</p>
      {children}
    </div>
  )
}

export default function FormPanel({ data, onChange }: Props) {
  const [showMore, setShowMore] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (key: string, value: string | undefined) => onChange({ ...data, [key]: value })

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => onChange({ ...data, photo: reader.result as string })
    reader.readAsDataURL(file)
  }

  const addMourner = () =>
    onChange({ ...data, chiefMourners: [...(data.chiefMourners || []), { role: '', name: '' }] })

  const updateMourner = (i: number, field: keyof ChiefMourner, value: string) => {
    const updated = [...(data.chiefMourners || [])]
    updated[i] = { ...updated[i], [field]: value }
    onChange({ ...data, chiefMourners: updated })
  }

  const removeMourner = (i: number) =>
    onChange({ ...data, chiefMourners: data.chiefMourners?.filter((_, idx) => idx !== i) })

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 flex flex-col gap-5">
      {/* 기본 정보 */}
      <Section title="기본 정보">
        <div>
          <Label>고인 성함</Label>
          <input
            type="text"
            value={data.name}
            onChange={e => set('name', e.target.value)}
            placeholder="홍길동"
            className={input}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>별세 날짜</Label>
            <input
              type="date"
              value={data.deathDate}
              onChange={e => set('deathDate', e.target.value)}
              className={input}
            />
          </div>
          <div>
            <Label>별세 시각</Label>
            <input
              type="text"
              value={data.deathTime || ''}
              onChange={e => set('deathTime', e.target.value)}
              placeholder="오전 10시"
              className={input}
            />
          </div>
        </div>
        <div>
          <Label>향년 (출생연도)</Label>
          <input
            type="number"
            value={data.birthYear || ''}
            onChange={e => set('birthYear', e.target.value)}
            placeholder="1940"
            className={input}
          />
        </div>
      </Section>

      <div className="border-t border-zinc-100" />

      {/* 영정 사진 */}
      <Section title="영정 사진">
        {data.photo ? (
          <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
            <img
              src={data.photo}
              alt="영정"
              className="w-12 rounded-lg border border-zinc-200 object-cover"
              style={{ height: '60px' }}
            />
            <div className="flex flex-col gap-1">
              <p className="text-xs text-zinc-500">사진 업로드됨</p>
              <button
                onClick={() => onChange({ ...data, photo: undefined })}
                className="text-xs text-red-500 hover:underline text-left"
              >
                삭제
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full py-5 border-2 border-dashed border-zinc-200 rounded-xl text-sm text-zinc-400 hover:border-zinc-400 hover:text-zinc-600 transition-all"
          >
            + 사진 업로드 (선택)
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
      </Section>

      <div className="border-t border-zinc-100" />

      {/* 전하실 말씀 */}
      <Section title="전하실 말씀">
        <div className="flex flex-wrap gap-1.5">
          {MESSAGE_TEMPLATES.map((tmpl, i) => (
            <button
              key={i}
              onClick={() => set('message', tmpl)}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                data.message === tmpl
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:border-zinc-400'
              }`}
            >
              추천 {i + 1}
            </button>
          ))}
        </div>
        <textarea
          value={data.message || ''}
          onChange={e => set('message', e.target.value)}
          rows={3}
          placeholder="삼가 고인의 명복을 빕니다."
          className={input + ' resize-none'}
        />
      </Section>

      <div className="border-t border-zinc-100" />

      {/* 상주 */}
      <Section title="상주 정보">
        <div className="flex flex-col gap-2">
          {data.chiefMourners?.map((m, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                placeholder="관계 (장남)"
                value={m.role}
                onChange={e => updateMourner(i, 'role', e.target.value)}
                className={inputBase + ' w-2/5 min-w-0'}
              />
              <input
                placeholder="성함"
                value={m.name}
                onChange={e => updateMourner(i, 'name', e.target.value)}
                className={inputBase + ' flex-1 min-w-0'}
              />
              <button
                onClick={() => removeMourner(i)}
                className="text-zinc-300 hover:text-red-400 transition-colors shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
          <button
            onClick={addMourner}
            className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors text-left mt-0.5"
          >
            + 상주 추가
          </button>
        </div>
      </Section>

      {/* 토글: 빈소 · 계좌 · 연락처 */}
      <button
        onClick={() => setShowMore(!showMore)}
        className="flex items-center justify-between w-full border-t border-zinc-100 pt-4 text-sm font-medium text-zinc-500 hover:text-zinc-800 transition-colors"
      >
        <span>빈소 · 계좌 · 연락처</span>
        <svg
          className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showMore && (
        <div className="flex flex-col gap-3 -mt-1">
          <div>
            <Label>빈소명</Label>
            <input
              type="text"
              value={data.funeralHall || ''}
              onChange={e => set('funeralHall', e.target.value)}
              placeholder="OO병원 장례식장 1호실"
              className={input}
            />
          </div>
          <div>
            <Label>발인 일시</Label>
            <input
              type="text"
              value={data.departure || ''}
              onChange={e => set('departure', e.target.value)}
              placeholder="2026년 3월 29일 오전 9시"
              className={input}
            />
          </div>
          <div>
            <Label>장지</Label>
            <input
              type="text"
              value={data.burial || ''}
              onChange={e => set('burial', e.target.value)}
              placeholder="OO 추모공원"
              className={input}
            />
          </div>
          <div>
            <Label>조의금 계좌</Label>
            <input
              type="text"
              value={data.bankAccount || ''}
              onChange={e => set('bankAccount', e.target.value)}
              placeholder="신한은행 110-123-456789 (홍길동)"
              className={input}
            />
          </div>
          <div>
            <Label>연락처</Label>
            <input
              type="text"
              value={data.contact || ''}
              onChange={e => set('contact', e.target.value)}
              placeholder="010-1234-5678"
              className={input}
            />
          </div>
        </div>
      )}
    </div>
  )
}
