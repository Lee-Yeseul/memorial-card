'use client'
import { MemorialData } from '@/lib/types'

function ChrysanthemumSVG() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="6" fill="#333"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
        <ellipse key={i} cx="30" cy="30" rx="3" ry="12"
          transform={`rotate(${angle} 30 30) translate(0 -18)`}
          fill="#555" opacity="0.8"/>
      ))}
    </svg>
  )
}

export default function T01_WhiteSimple({ data }: { data: MemorialData }) {
  const age = data.birthYear ? new Date(data.deathDate).getFullYear() - parseInt(data.birthYear) + 1 : null
  const formatDate = (d: string) => {
    const [y,m,day] = d.split('-')
    return `${y}년 ${m}월 ${day}일`
  }

  return (
    <div style={{ width: '600px', minHeight: '800px', backgroundColor: '#fff', fontFamily: '"Noto Serif KR", serif', padding: '48px', color: '#1a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '16px' }}><ChrysanthemumSVG /></div>
      <div style={{ fontSize: '14px', letterSpacing: '8px', color: '#666', marginBottom: '8px' }}>訃 告</div>
      <div style={{ width: '100px', height: '1px', backgroundColor: '#999', marginBottom: '32px' }} />

      {data.photo && (
        <img src={data.photo} alt="고인 사진" style={{ width: '120px', height: '150px', objectFit: 'cover', border: '1px solid #ddd', marginBottom: '24px' }} />
      )}

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{data.name}</div>
        {age && <div style={{ fontSize: '14px', color: '#666' }}>향년 {age}세</div>}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '24px', fontSize: '15px' }}>
        <div>{formatDate(data.deathDate)}{data.deathTime ? ` ${data.deathTime}` : ''}</div>
        <div style={{ color: '#666', marginTop: '4px' }}>별세하셨기에 삼가 알려드립니다.</div>
      </div>

      {data.message && (
        <div style={{ textAlign: 'center', color: '#555', fontSize: '14px', margin: '16px 0', padding: '16px', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', width: '100%' }}>
          {data.message}
        </div>
      )}

      {data.chiefMourners && data.chiefMourners.length > 0 && (
        <div style={{ margin: '16px 0', width: '100%' }}>
          <div style={{ fontSize: '13px', color: '#666', textAlign: 'center', marginBottom: '8px' }}>상 주</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
            {data.chiefMourners.map((m, i) => (
              <span key={i} style={{ fontSize: '14px' }}>{m.role} {m.name}{m.spouse ? ` (${m.spouse})` : ''}</span>
            ))}
          </div>
        </div>
      )}

      {(data.funeralHall || data.departure || data.burial) && (
        <div style={{ margin: '16px 0', width: '100%', fontSize: '14px' }}>
          <div style={{ fontSize: '13px', color: '#666', textAlign: 'center', marginBottom: '8px' }}>빈 소</div>
          {data.funeralHall && <div style={{ textAlign: 'center' }}>{data.funeralHall}</div>}
          {data.departure && <div style={{ textAlign: 'center', color: '#555' }}>발인 {data.departure}</div>}
          {data.burial && <div style={{ textAlign: 'center', color: '#555' }}>장지 {data.burial}</div>}
        </div>
      )}

      {data.bankAccount && (
        <div style={{ margin: '12px 0', fontSize: '13px', color: '#666', textAlign: 'center' }}>
          조의금 계좌: {data.bankAccount}
        </div>
      )}

      {data.contact && (
        <div style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>연락처: {data.contact}</div>
      )}

      <div style={{ marginTop: '32px', fontSize: '12px', color: '#aaa' }}>
        {data.noticeDate || new Date().toISOString().split('T')[0].replace(/-/g, '년 ').replace('-', '월 ') + '일'}
      </div>
    </div>
  )
}
