'use client'
import { MemorialData } from '@/lib/types'

export default function T06_DarkElegant({ data }: { data: MemorialData }) {
  const age = data.birthYear ? new Date(data.deathDate).getFullYear() - parseInt(data.birthYear) + 1 : null
  const formatDate = (d: string) => { const [y,m,day] = d.split('-'); return `${y}년 ${m}월 ${day}일` }

  return (
    <div style={{ width: '600px', minHeight: '800px', backgroundColor: '#1e1e1e', fontFamily: '"Noto Serif KR", serif', padding: '20px', color: '#c9a96e' }}>
      <div style={{ border: '1px solid #c9a96e', minHeight: '760px', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', letterSpacing: '8px', marginBottom: '8px' }}>訃 告</div>
        <div style={{ width: '120px', height: '1px', backgroundColor: '#c9a96e', marginBottom: '40px' }} />

        {data.photo && (
          <div style={{ padding: '4px', border: '1px solid #c9a96e', marginBottom: '32px' }}>
            <img src={data.photo} alt="고인 사진" style={{ width: '120px', height: '150px', objectFit: 'cover' }} />
          </div>
        )}

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>{data.name} 님</div>
          {age && <div style={{ fontSize: '16px', opacity: 0.8 }}>향년 {age}세</div>}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '40px', fontSize: '17px', color: '#f5f5f5' }}>
          <div>{formatDate(data.deathDate)}{data.deathTime ? ` ${data.deathTime}` : ''}</div>
          <div style={{ fontSize: '15px', color: '#c9a96e', marginTop: '8px' }}>별세하셨기에 삼가 알려드립니다.</div>
        </div>

        {data.message && (
          <div style={{ textAlign: 'center', fontSize: '14px', color: '#f5f5f5', margin: '24px 0', padding: '20px 0', borderTop: '0.5px solid rgba(201, 169, 110, 0.3)', borderBottom: '0.5px solid rgba(201, 169, 110, 0.3)', width: '100%', lineHeight: '1.8' }}>
            {data.message}
          </div>
        )}

        <div style={{ width: '100%', flex: 1 }}>
          {data.chiefMourners && data.chiefMourners.length > 0 && (
            <div style={{ margin: '16px 0', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '8px', letterSpacing: '4px' }}>상 주</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', fontSize: '16px', color: '#fff' }}>
                {data.chiefMourners.map((m, i) => <span key={i}>{m.role} {m.name}</span>)}
              </div>
            </div>
          )}

          {(data.funeralHall || data.departure || data.burial) && (
            <div style={{ margin: '32px 0', textAlign: 'center', fontSize: '16px', color: '#fff' }}>
              <div style={{ fontSize: '12px', color: '#c9a96e', opacity: 0.6, marginBottom: '8px', letterSpacing: '4px' }}>빈 소</div>
              {data.funeralHall && <div style={{ marginBottom: '6px' }}>{data.funeralHall}</div>}
              <div style={{ fontSize: '15px', color: '#c9a96e', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {data.departure && <div>발인 | {data.departure}</div>}
                {data.burial && <div>장지 | {data.burial}</div>}
              </div>
            </div>
          )}
        </div>

        {data.bankAccount && <div style={{ fontSize: '13px', opacity: 0.7, marginBottom: '8px' }}>조의금 계좌: {data.bankAccount}</div>}
        
        <div style={{ marginTop: 'auto', fontSize: '12px', opacity: 0.5 }}>
          {data.noticeDate ? formatDate(data.noticeDate) : formatDate(new Date().toISOString().split('T')[0])}
        </div>
      </div>
    </div>
  )
}
