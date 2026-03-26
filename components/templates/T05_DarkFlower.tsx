'use client'
import { MemorialData } from '@/lib/types'

function FlowerLineArt() {
  return (
    <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20C20 10 30 10 40 20C50 30 60 30 70 20C80 10 90 10 100 20" stroke="#666" strokeWidth="1" strokeDasharray="2 2"/>
      <circle cx="50" cy="20" r="12" stroke="#888" strokeWidth="1"/>
      <circle cx="50" cy="20" r="4" fill="#666"/>
      {[0,45,90,135,180,225,270,315].map(a => (
        <line key={a} x1="50" y1="20" x2={50 + 10 * Math.cos(a * Math.PI / 180)} y2={20 + 10 * Math.sin(a * Math.PI / 180)} stroke="#888" strokeWidth="1" />
      ))}
    </svg>
  )
}

export default function T05_DarkFlower({ data }: { data: MemorialData }) {
  const age = data.birthYear ? new Date(data.deathDate).getFullYear() - parseInt(data.birthYear) + 1 : null
  const formatDate = (d: string) => { const [y,m,day] = d.split('-'); return `${y}년 ${m}월 ${day}일` }

  return (
    <div style={{ width: '600px', minHeight: '800px', backgroundColor: '#3a3632', fontFamily: '"Noto Serif KR", serif', padding: '56px', color: '#e0d8d0', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #4a4642' }}>
      <FlowerLineArt />
      <div style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '14px', margin: '24px 0', color: '#fff' }}>訃 告</div>

      {data.photo && (
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          <div style={{ position: 'absolute', top: '-8px', left: '-8px', right: '-8px', bottom: '-8px', border: '1px solid #5a5652' }} />
          <img src={data.photo} alt="고인 사진" style={{ width: '120px', height: '150px', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{data.name}</div>
        {age && <div style={{ fontSize: '15px', color: '#b0a8a0' }}>향년 {age}세</div>}
        <div style={{ marginTop: '20px', fontSize: '16px' }}>{formatDate(data.deathDate)}{data.deathTime ? ` ${data.deathTime}` : ''}</div>
        <div style={{ fontSize: '14px', color: '#b0a8a0', marginTop: '4px' }}>별세하셨기에 삼가 알려드립니다.</div>
      </div>

      {data.message && (
        <div style={{ textAlign: 'center', color: '#c0b8b0', fontSize: '14px', margin: '20px 0', padding: '24px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '4px', width: '100%' }}>
          &ldquo;{data.message}&rdquo;
        </div>
      )}

      <div style={{ flex: 1, width: '100%' }}>
        {data.chiefMourners && data.chiefMourners.length > 0 && (
          <div style={{ margin: '16px 0', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#8a8682', marginBottom: '8px', letterSpacing: '4px' }}>상 주</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', fontSize: '15px' }}>
              {data.chiefMourners.map((m, i) => <span key={i}>{m.role} {m.name}</span>)}
            </div>
          </div>
        )}

        {(data.funeralHall || data.departure || data.burial) && (
          <div style={{ margin: '24px 0', textAlign: 'center', fontSize: '15px' }}>
            <div style={{ fontSize: '12px', color: '#8a8682', marginBottom: '8px', letterSpacing: '4px' }}>빈 소</div>
            {data.funeralHall && <div style={{ marginBottom: '4px' }}>{data.funeralHall}</div>}
            {data.departure && <div style={{ color: '#b0a8a0' }}>발인 {data.departure}</div>}
            {data.burial && <div style={{ color: '#b0a8a0' }}>장지 {data.burial}</div>}
          </div>
        )}
      </div>

      <div style={{ marginTop: '40px', fontSize: '12px', color: '#7a7672' }}>
        {data.noticeDate ? formatDate(data.noticeDate) : formatDate(new Date().toISOString().split('T')[0])}
      </div>
    </div>
  )
}
