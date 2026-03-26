'use client'
import { MemorialData } from '@/lib/types'

export default function T08_Traditional({ data }: { data: MemorialData }) {
  const age = data.birthYear ? new Date(data.deathDate).getFullYear() - parseInt(data.birthYear) + 1 : null
  const formatDate = (d: string) => { const [y,m,day] = d.split('-'); return `${y}년 ${m}월 ${day}일` }

  return (
    <div style={{ width: '600px', minHeight: '800px', backgroundColor: '#f5f0e8', fontFamily: '"Noto Serif KR", serif', padding: '40px', color: '#332211', position: 'relative' }}>
      {/* Traditional Frame */}
      <div style={{ position: 'absolute', top: '15px', left: '15px', right: '15px', bottom: '15px', border: '2px solid #a8947b', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '22px', left: '22px', right: '22px', bottom: '22px', border: '1px solid #d4c4b0', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, backgroundColor: '#fcfaf7', border: '1px solid #e0d5c5', minHeight: '718px', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', letterSpacing: '10px', color: '#665544', marginBottom: '12px' }}>謹 弔</div>
        <div style={{ fontSize: '36px', fontWeight: '700', letterSpacing: '18px', color: '#332211', marginBottom: '32px' }}>訃 告</div>

        {data.photo && (
          <div style={{ border: '3px double #d4c4b0', padding: '6px', backgroundColor: '#fff', marginBottom: '32px' }}>
            <img src={data.photo} alt="고인 사진" style={{ width: '120px', height: '150px', objectFit: 'cover' }} />
          </div>
        )}

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '6px' }}>{data.name} 님</div>
          {age && <div style={{ fontSize: '15px', color: '#665544' }}>향년 {age}세</div>}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '32px', fontSize: '16px', lineHeight: '1.8' }}>
          <div style={{ fontWeight: '500' }}>{formatDate(data.deathDate)}{data.deathTime ? ` ${data.deathTime}` : ''}</div>
          <div style={{ fontSize: '15px', marginTop: '4px' }}>어른께서 별세하셨기에 삼가 알려드립니다.</div>
        </div>

        {data.message && (
          <div style={{ textAlign: 'center', fontSize: '14px', color: '#554433', margin: '16px 0', padding: '16px', borderTop: '1px solid #e0d5c5', borderBottom: '1px solid #e0d5c5', width: '100%' }}>
            {data.message}
          </div>
        )}

        <div style={{ width: '100%', flex: 1 }}>
          {data.chiefMourners && data.chiefMourners.length > 0 && (
            <div style={{ margin: '16px 0', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#8a7662', marginBottom: '8px', letterSpacing: '4px' }}>상 주</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', fontSize: '15px' }}>
                {data.chiefMourners.map((m, i) => <span key={i}><strong style={{ color: '#1a1a1a' }}>{m.name}</strong> <span style={{ fontSize: '13px', color: '#665544' }}>{m.role}</span></span>)}
              </div>
            </div>
          )}

          {(data.funeralHall || data.departure || data.burial) && (
            <div style={{ margin: '24px 0', textAlign: 'center', fontSize: '15px' }}>
              <div style={{ fontSize: '12px', color: '#8a7662', marginBottom: '8px', letterSpacing: '4px' }}>빈 소</div>
              {data.funeralHall && <div style={{ fontWeight: '600', color: '#332211' }}>{data.funeralHall}</div>}
              {data.departure && <div style={{ marginTop: '4px', fontSize: '14px', color: '#665544' }}>발인 : {data.departure}</div>}
              {data.burial && <div style={{ marginTop: '2px', fontSize: '14px', color: '#665544' }}>장지 : {data.burial}</div>}
            </div>
          )}
        </div>

        {data.bankAccount && <div style={{ fontSize: '13px', color: '#8a7662', margin: '8px 0' }}>마음 전하실 곳: {data.bankAccount}</div>}
        
        <div style={{ marginTop: '40px', fontSize: '12px', color: '#9a8672' }}>
          {data.noticeDate ? formatDate(data.noticeDate) : formatDate(new Date().toISOString().split('T')[0])}
        </div>
      </div>
    </div>
  )
}
