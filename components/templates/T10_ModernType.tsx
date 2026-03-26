'use client'
import { MemorialData } from '@/lib/types'

export default function T10_ModernType({ data }: { data: MemorialData }) {
  const age = data.birthYear ? new Date(data.deathDate).getFullYear() - parseInt(data.birthYear) + 1 : null
  const formatDate = (d: string) => { const [y,m,day] = d.split('-'); return `${y}년 ${m}월 ${day}일` }

  return (
    <div style={{ width: '600px', minHeight: '800px', backgroundColor: '#fff', fontFamily: '"Noto Serif KR", serif', color: '#000', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '-40px', top: '40px', fontSize: '200px', fontWeight: '900', color: '#f0f0f0', zIndex: 0, pointerEvents: 'none', lineHeight: 1 }}>訃</div>
      
      <div style={{ position: 'relative', zIndex: 1, padding: '60px' }}>
        <div style={{ borderLeft: '10px solid #000', paddingLeft: '24px', marginBottom: '60px' }}>
          <div style={{ fontSize: '16px', letterSpacing: '4px', marginBottom: '8px' }}>MEMORIAL NOTICE</div>
          <div style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '12px' }}>訃 告</div>
        </div>

        <div style={{ marginBottom: '60px' }}>
          <div style={{ fontSize: '64px', fontWeight: '900', marginBottom: '8px' }}>{data.name}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            {age && <div style={{ fontSize: '24px', fontWeight: '500', color: '#666' }}> 향년 {age}세</div>}
            <div style={{ fontSize: '20px' }}>{formatDate(data.deathDate)} {data.deathTime || ''} 별세</div>
          </div>
        </div>

        {data.message && (
          <div style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '60px', color: '#222', borderBottom: '1px solid #000', paddingBottom: '32px' }}>
            {data.message}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '24px 40px', fontSize: '16px' }}>
          <div style={{ fontWeight: '800', borderBottom: '2px solid #000' }}>상주</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {data.chiefMourners?.map((m, i) => <span key={i}>{m.role} {m.name}</span>)}
          </div>

          <div style={{ fontWeight: '800', borderBottom: '2px solid #000' }}>빈소</div>
          <div>{data.funeralHall}</div>

          <div style={{ fontWeight: '800', borderBottom: '2px solid #000' }}>발인</div>
          <div>{data.departure}</div>

          {data.burial && (
            <>
              <div style={{ fontWeight: '800', borderBottom: '2px solid #000' }}>장지</div>
              <div>{data.burial}</div>
            </>
          )}

          {data.bankAccount && (
            <>
              <div style={{ fontWeight: '800', borderBottom: '2px solid #000' }}>계좌</div>
              <div style={{ color: '#666' }}>{data.bankAccount}</div>
            </>
          )}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '60px', fontSize: '14px', color: '#aaa', textAlign: 'right' }}>
          {data.noticeDate ? formatDate(data.noticeDate) : formatDate(new Date().toISOString().split('T')[0])}
        </div>
      </div>
    </div>
  )
}
