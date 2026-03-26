'use client'
import { MemorialData } from '@/lib/types'

export default function T04_DarkSimple({ data }: { data: MemorialData }) {
  const age = data.birthYear ? new Date(data.deathDate).getFullYear() - parseInt(data.birthYear) + 1 : null
  const formatDate = (d: string) => { const [y,m,day] = d.split('-'); return `${y}년 ${m}월 ${day}일` }

  return (
    <div style={{ width: '600px', minHeight:'800px', backgroundColor: '#2a2a2a', fontFamily: '"Noto Serif KR", serif', padding: '64px 48px', color: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: '14px', letterSpacing: '10px', color: '#999', marginBottom: '8px' }}>訃 告</div>
      <div style={{ width: '60px', height: '1px', backgroundColor: '#555', marginBottom: '48px' }} />

      {data.photo && (
        <img src={data.photo} alt="고인 사진" style={{ width: '130px', height: '160px', objectFit: 'cover', border: '1px solid #444', marginBottom: '32px' }} />
      )}

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>{data.name}</div>
        {age && <div style={{ fontSize: '15px', color: '#bbb' }}>향년 {age}세</div>}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '32px', fontSize: '16px' }}>
        <div>{formatDate(data.deathDate)}{data.deathTime ? ` ${data.deathTime}` : ''}</div>
        <div style={{ color: '#bbb', marginTop: '6px' }}>별세하셨기에 삼가 알려드립니다.</div>
      </div>

      {data.message && (
        <div style={{ textAlign: 'center', color: '#aaa', fontSize: '14px', lineHeight: '1.6', margin: '24px 0', padding: '20px', borderTop: '1px solid #444', borderBottom: '1px solid #444', width: '100%' }}>
          {data.message}
        </div>
      )}

      {data.chiefMourners && data.chiefMourners.length > 0 && (
        <div style={{ margin: '20px 0', width: '100%' }}>
          <div style={{ fontSize: '13px', color: '#888', textAlign: 'center', marginBottom: '12px', letterSpacing: '4px' }}>상 주</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            {data.chiefMourners.map((m, i) => (
              <span key={i} style={{ fontSize: '15px' }}>{m.role} {m.name}</span>
            ))}
          </div>
        </div>
      )}

      {(data.funeralHall || data.departure || data.burial) && (
        <div style={{ margin: '24px 0', width: '100%', fontSize: '15px' }}>
          <div style={{ fontSize: '13px', color: '#888', textAlign: 'center', marginBottom: '12px', letterSpacing: '4px' }}>빈 소</div>
          {data.funeralHall && <div style={{ textAlign: 'center', marginBottom: '4px' }}>{data.funeralHall}</div>}
          {data.departure && <div style={{ textAlign: 'center', color: '#bbb' }}>발인 {data.departure}</div>}
          {data.burial && <div style={{ textAlign: 'center', color: '#bbb' }}>장지 {data.burial}</div>}
        </div>
      )}

      {data.bankAccount && (
        <div style={{ margin: '16px 0', fontSize: '14px', color: '#999', textAlign: 'center' }}>
          조의금 계좌: {data.bankAccount}
        </div>
      )}

      <div style={{ marginTop: 'auto', paddingTop: '48px', fontSize: '13px', color: '#777' }}>
        {data.noticeDate ? formatDate(data.noticeDate) : formatDate(new Date().toISOString().split('T')[0])}
      </div>
    </div>
  )
}
