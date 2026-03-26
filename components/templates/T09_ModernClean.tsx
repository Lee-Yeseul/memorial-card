'use client'
import { MemorialData } from '@/lib/types'

export default function T09_ModernClean({ data }: { data: MemorialData }) {
  const age = data.birthYear ? new Date(data.deathDate).getFullYear() - parseInt(data.birthYear) + 1 : null
  const formatDate = (d: string) => { const [y,m,day] = d.split('-'); return `${y}년 ${m}월 ${day}일` }

  return (
    <div style={{ width: '600px', minHeight: '800px', backgroundColor: '#fcfcfc', fontFamily: '"Noto Serif KR", serif', padding: '80px 60px', color: '#222', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', borderBottom: '1px solid #000', paddingBottom: '20px', marginBottom: '40px' }}>
        <div style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-1px' }}>OBITUARY</div>
        <div style={{ marginLeft: 'auto', fontSize: '14px', letterSpacing: '4px' }}>訃 告</div>
      </div>

      <div style={{ display: 'flex', gap: '32px', marginBottom: '40px' }}>
        {data.photo && (
          <img src={data.photo} alt="고인 사진" style={{ width: '200px', height: '260px', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        )}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px' }}>{data.name}</div>
          {age && <div style={{ fontSize: '18px', color: '#666', marginBottom: '24px' }}>향년 {age}세</div>}
          <div style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <div style={{ fontWeight: '600' }}>{formatDate(data.deathDate)}</div>
            <div>{data.deathTime ? data.deathTime : ''} 별세</div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: '15px', color: '#444', marginBottom: '40px', lineHeight: '1.8' }}>
        삼가 알려드립니다. 어른께서 지병으로 별세하셨기에 삼가 알려드립니다.
        {data.message && <div style={{ marginTop: '16px', color: '#222', fontWeight: '500' }}>&ldquo;{data.message}&rdquo;</div>}
      </div>

      <div style={{ borderTop: '0.5px solid #eee', paddingTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', letterSpacing: '1px' }}>CHIEF MOURNERS</div>
          <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
            {data.chiefMourners?.map((m, i) => <div key={i}>{m.role} <strong>{m.name}</strong></div>)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', letterSpacing: '1px' }}>FUNERAL INFO</div>
          <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
            {data.funeralHall && <div><span style={{ color: '#888' }}>빈소 </span>{data.funeralHall}</div>}
            {data.departure && <div><span style={{ color: '#888' }}>발인 </span>{data.departure}</div>}
            {data.burial && <div><span style={{ color: '#888' }}>장지 </span>{data.burial}</div>}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', borderTop: '0.5px solid #eee', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#999' }}>
        <div>{data.contact && `연락처: ${data.contact}`}</div>
        <div>{data.noticeDate ? formatDate(data.noticeDate) : formatDate(new Date().toISOString().split('T')[0])}</div>
      </div>
    </div>
  )
}
