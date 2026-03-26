'use client'
import { MemorialData, ChiefMourner } from '@/lib/types'
import { useState } from 'react'

const MESSAGE_TEMPLATES = [
  "삼가 고인의 명복을 빕니다.",
  "그동안 베풀어 주신 은혜에 깊이 감사드립니다.",
  "갑작스러운 비보에 슬픔을 금치 못하며 삼가 고인의 명복을 빕니다.",
  "평소 고인의 고결한 삶을 기억하며 명복을 빕니다.",
  "부디 좋은 곳에서 편히 쉬시기를 기원합니다.",
  "생전에 보여주신 사랑과 헌신을 잊지 않겠습니다.",
]

interface Props {
  data: MemorialData
  onChange: (data: MemorialData) => void
}

export default function FormPanel({ data, onChange }: Props) {
  const [showOptional, setShowOptional] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange({ ...data, photo: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const addMourner = () => {
    const newMourners = [...(data.chiefMourners || []), { role: '', name: '' }]
    onChange({ ...data, chiefMourners: newMourners })
  }

  const updateMourner = (index: number, field: keyof ChiefMourner, value: string) => {
    const newMourners = [...(data.chiefMourners || [])]
    newMourners[index] = { ...newMourners[index], [field]: value }
    onChange({ ...data, chiefMourners: newMourners })
  }

  const removeMourner = (index: number) => {
    const newMourners = data.chiefMourners?.filter((_, i) => i !== index)
    onChange({ ...data, chiefMourners: newMourners })
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto max-h-[calc(100vh-120px)]">
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-6 bg-black rounded-full"></span>
          필수 정보
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">고인 성함</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="홍길동"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">별세 날짜</label>
              <input
                type="date"
                name="deathDate"
                value={data.deathDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">별세 시각</label>
              <input
                type="text"
                name="deathTime"
                value={data.deathTime || ''}
                onChange={handleChange}
                placeholder="오전 10시 30분"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={() => setShowOptional(!showOptional)}
          className="flex items-center justify-between w-full text-left font-bold text-gray-800 py-2 border-b"
        >
          <span>추가 정보 (선택)</span>
          <span>{showOptional ? '▲' : '▼'}</span>
        </button>
        
        {showOptional && (
          <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">향년 (출생년도)</label>
              <input
                type="number"
                name="birthYear"
                value={data.birthYear || ''}
                onChange={handleChange}
                placeholder="1940"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">영정 사진</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              {data.photo && (
                <button 
                  onClick={() => onChange({ ...data, photo: undefined })}
                  className="mt-2 text-xs text-red-500 underline"
                >
                  사진 삭제
                </button>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">전하실 말씀</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {MESSAGE_TEMPLATES.map((tmpl, i) => (
                  <button
                    key={i}
                    onClick={() => onChange({ ...data, message: tmpl })}
                    className="text-[10px] px-2 py-1 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    추천 {i + 1}
                  </button>
                ))}
              </div>
              <textarea
                name="message"
                value={data.message || ''}
                onChange={handleChange}
                rows={3}
                placeholder="삼가 고인의 명복을 빕니다."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">상주 정보</label>
              <div className="space-y-2">
                {data.chiefMourners?.map((m, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <input
                      placeholder="관계 (예: 장남)"
                      value={m.role}
                      onChange={(e) => updateMourner(i, 'role', e.target.value)}
                      className="w-1/3 px-3 py-1.5 border rounded-lg text-sm"
                    />
                    <input
                      placeholder="성함"
                      value={m.name}
                      onChange={(e) => updateMourner(i, 'name', e.target.value)}
                      className="w-1/3 px-3 py-1.5 border rounded-lg text-sm"
                    />
                    <button 
                      onClick={() => removeMourner(i)}
                      className="px-2 py-1.5 text-gray-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={addMourner}
                  className="text-sm text-blue-600 hover:underline"
                >
                  + 상주 추가
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">빈소명</label>
              <input
                type="text"
                name="funeralHall"
                value={data.funeralHall || ''}
                onChange={handleChange}
                placeholder="OO병원 장례식장 1호실"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">발인 시각</label>
              <input
                type="text"
                name="departure"
                value={data.departure || ''}
                onChange={handleChange}
                placeholder="2024년 1월 15일 오전 9시"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">장지</label>
              <input
                type="text"
                name="burial"
                value={data.burial || ''}
                onChange={handleChange}
                placeholder="OO 추모공원"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">조의금 계좌</label>
              <input
                type="text"
                name="bankAccount"
                value={data.bankAccount || ''}
                onChange={handleChange}
                placeholder="신한은행 110-123-456789 (예금주)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
              <input
                type="text"
                name="contact"
                value={data.contact || ''}
                onChange={handleChange}
                placeholder="010-1234-5678"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
