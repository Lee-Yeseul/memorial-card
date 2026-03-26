'use client'
import { MemorialData } from '@/lib/types'

function RibbonCorner({ position }: { position: 'tl'|'tr'|'bl'|'br' }) {
  const transforms: Record<string, string> = {
    tl: 'rotate(0)',
    tr: 'rotate(90) translate(0 -80)',
    bl: 'rotate(-90) translate(-80 0)',
    br: 'rotate(180) translate(-80 -80)',
  }
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', ...{ tl:{top:0,left:0}, tr:{top:0,right:0}, bl:{bottom:0,left:0}, br:{bottom:0,right:0} }[position] as React.CSSProperties }}>
      <g transform={transforms[position]}>
        <path d="M0 0 L40 0 L0 40 Z" fill="#111"/>
        <path d="M5 0 L40 0 L0 35 L0 5 Z" fill="#222" opacity="0.5"/>
      </g>
    </svg>
  )
}

export default function T03_WhiteRibbon({ data }: { data: MemorialData }) {
  const age = data.birthYear ? new Date(data.deathDate).getFullYear() - parseInt(data.birthYear) + 1 : null
  const formatDate = (d: string) => { const [y,m,day] = d.split('-'); return `${y}년 ${m}월 ${day}일` }

  return (
    <div style={{ width: '600px', minHeight: '800px', backgroundColor: '#fff', fontFamily: '"Noto Serif KR", serif', padding: '60px 56px', color: '#111', position: 'relative', border: '1px solid #ddd' }}>
      <RibbonCorner position="tl"/>
      <RibbonCorner position="tr"/>
      <RibbonCorner position="bl"/>
      <RibbonCorner position="br"/>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '13px', letterSpacing: '6px', color: '#555', marginBottom: '8px' }}>삼가 알려드립니다</div>
        <div style={{ fontSize: '36px', fontWeight: '700', letterSpacing: '16px', marginBottom: '8px' }}>訃 告</div>
        <div style={{ width: '80px', height: '2px', backgroundColor: '#111', margin: '0 auto' }} />
      </div>

      {data.photo && (
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src={data.photo} alt="고인 사진" style={{ width: '110px', height: '140px', objectFit: 'cover', border: '2px solid #333' }} />
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ fontSize: '30px', fontWeight: '700', marginBottom: '4px' }}>{data.name}</div>
        {age && <div style={{ fontSize: '15px', color: '#444' }}>향년 {age}세</div>}
        <div style={{ marginTop: '16px', fontSize: '16px', fontWeight: '500' }}>
          {formatDate(data.deathDate)}{data.deathTime ? ` ${data.deathTime}` : ''}
        </div>
        <div style={{ fontSize: '14px', color: '#555', marginTop: '6px' }}>별세하셨기에 삼가 알려드립니다.</div>
      </div>

      {data.message && (
        <div style={{ textAlign: 'center', fontSize: '14px', color: '#555', fontStyle: 'italic', margin: '20px 0', padding: '14px', border: '1px solid #ddd' }}>
          &ldquo;{data.message}&rdquo;
        </div>
      )}

      {data.chiefMourners && data.chiefMourners.length > 0 && (
        <div style={{ margin: '20px 0', padding: '12px 0', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
          <div style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginBottom: '8px', letterSpacing: '4px' }}>상　주</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', fontSize: '14px' }}>
            {data.chiefMourners.map((m, i) => (
              <div key={i}><span style={{ color: '#777' }}>{m.role}</span> <strong>{m.name}</strong>{m.spouse ? <span style={{ color: '#777' }}> 외 가족 일동</span> : ''}</div>
            ))}
          </div>
        </div>
      )}

      {(data.funeralHall || data.departure || data.burial) && (
        <div style={{ margin: '16px 0', fontSize: '14px' }}>
          <div style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginBottom: '8px', letterSpacing: '4px' }}>빈　소</div>
          <div style={{ textAlign: 'center' }}>
            {data.funeralHall && <div style={{ fontWeight: '500' }}>{data.funeralHall}</div>}
            {data.departure && <div style={{ color: '#555', marginTop: '4px' }}>발인 | {data.departure}</div>}
            {data.burial && <div style={{ color: '#555', marginTop: '2px' }}>장지 | {data.burial}</div>}
          </div>
        </div>
      )}

      {data.bankAccount && (
        <div style={{ textAlign: 'center', fontSize: '13px', color: '#777', margin: '12px 0', padding: '8px', backgroundColor: '#f9f9f9' }}>
          조의금 계좌: {data.bankAccount}
        </div>
      )}
      {data.contact && <div style={{ textAlign: 'center', fontSize: '13px', color: '#777', marginTop: '8px' }}>연락처: {data.contact}</div>}

      <div style={{ textAlign: 'center', fontSize: '12px', color: '#aaa', marginTop: '32px' }}>
        {data.noticeDate ? formatDate(data.noticeDate) : formatDate(new Date().toISOString().split('T')[0])}
      </div>
    </div>
  )
}
