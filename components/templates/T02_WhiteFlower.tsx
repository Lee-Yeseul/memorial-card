'use client'
import { MemorialData } from '@/lib/types'

function FlowerSVG({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      <circle cx="40" cy="40" r="8" fill="#444"/>
      {[0,45,90,135,180,225,270,315].map((a, i) => (
        <ellipse key={i} cx="40" cy="40" rx="4" ry="16"
          transform={`rotate(${a} 40 40) translate(0 -22)`}
          fill="#666" opacity="0.75"/>
      ))}
      {[22,67,112,157,202,247,292,337].map((a, i) => (
        <ellipse key={i} cx="40" cy="40" rx="3" ry="10"
          transform={`rotate(${a} 40 40) translate(0 -18)`}
          fill="#888" opacity="0.5"/>
      ))}
    </svg>
  )
}

export default function T02_WhiteFlower({ data }: { data: MemorialData }) {
  const age = data.birthYear ? new Date(data.deathDate).getFullYear() - parseInt(data.birthYear) + 1 : null
  const formatDate = (d: string) => { const [y,m,day] = d.split('-'); return `${y}년 ${m}월 ${day}일` }

  return (
    <div style={{ width: '600px', minHeight: '800px', backgroundColor: '#fff', fontFamily: '"Noto Serif KR", serif', padding: '32px 48px', color: '#1a1a1a', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <FlowerSVG /><FlowerSVG flip />
      </div>

      <div style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: '16px', marginBottom: '24px' }}>
        <div style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '12px' }}>訃 告</div>
      </div>

      {data.photo && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={data.photo} alt="고인 사진" style={{ width: '120px', height: '150px', objectFit: 'cover', border: '1px solid #ccc' }} />
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '26px', fontWeight: '700', marginBottom: '6px' }}>{data.name} 님</div>
        {age && <div style={{ fontSize: '15px', color: '#555' }}>향년 {age}세</div>}
        <div style={{ marginTop: '12px', fontSize: '15px' }}>
          {formatDate(data.deathDate)}{data.deathTime ? ` ${data.deathTime}` : ''}
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>별세하셨기에 삼가 알려드립니다.</div>
      </div>

      {data.message && <div style={{ textAlign: 'center', color: '#555', fontSize: '14px', padding: '12px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', margin: '16px 0' }}>{data.message}</div>}

      {data.chiefMourners && data.chiefMourners.length > 0 && (
        <div style={{ margin: '16px 0', textAlign: 'center', fontSize: '14px' }}>
          <div style={{ color: '#888', marginBottom: '6px', fontSize: '13px' }}>상 주</div>
          {data.chiefMourners.map((m, i) => <span key={i} style={{ marginRight: '12px' }}>{m.role} {m.name}</span>)}
        </div>
      )}

      {(data.funeralHall || data.departure || data.burial) && (
        <div style={{ margin: '16px 0', textAlign: 'center', fontSize: '14px' }}>
          <div style={{ color: '#888', marginBottom: '6px', fontSize: '13px' }}>빈 소</div>
          {data.funeralHall && <div>{data.funeralHall}</div>}
          {data.departure && <div style={{ color: '#555' }}>발인 {data.departure}</div>}
          {data.burial && <div style={{ color: '#555' }}>장지 {data.burial}</div>}
        </div>
      )}

      {data.bankAccount && <div style={{ textAlign: 'center', fontSize: '13px', color: '#777', margin: '8px 0' }}>조의금 계좌: {data.bankAccount}</div>}
      {data.contact && <div style={{ textAlign: 'center', fontSize: '13px', color: '#777' }}>연락처: {data.contact}</div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
        <FlowerSVG /><FlowerSVG flip />
      </div>
    </div>
  )
}
