'use client'
import { MemorialData } from '@/lib/types'

export default function T07_Ink({ data }: { data: MemorialData }) {
  const age = data.birthYear ? new Date(data.deathDate).getFullYear() - parseInt(data.birthYear) + 1 : null
  const formatDate = (d: string) => { const [y,m,day] = d.split('-'); return `${y}년 ${m}월 ${day}일` }

  return (
    <div style={{ width: '600px', minHeight: '800px', backgroundColor: '#faf9f6', backgroundImage: 'radial-gradient(circle at 10% 10%, #e0e0e0 0%, transparent 40%), radial-gradient(circle at 90% 80%, #dcdcdc 0%, transparent 50%)', fontFamily: '"Noto Serif KR", serif', padding: '60px', color: '#1a1a1a', position: 'relative', border: '1px solid #ddd' }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', bottom: '20px', right: '20px', border: '0.5px solid #ccc', pointerEvents: 'none', opacity: 0.5 }} />
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px', letterSpacing: '4px' }}>삼가 조의를 표합니다</div>
        <div style={{ fontSize: '36px', fontWeight: '700', letterSpacing: '16px', color: '#000', marginBottom: '16px' }}>訃 告</div>
        <div style={{ width: '40px', height: '40px', margin: '0 auto', border: '1px solid #333', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#333', transform: 'rotate(-45deg)' }} />
        </div>
      </div>

      {data.photo && (
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img src={data.photo} alt="고인 사진" style={{ width: '130px', height: '160px', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)', border: '2px solid #000', padding: '4px', backgroundColor: '#fff' }} />
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '6px' }}>{data.name} 님</div>
        {age && <div style={{ fontSize: '15px', color: '#555' }}>향년 {age}세</div>}
        <div style={{ marginTop: '20px', fontSize: '16px', color: '#222' }}>{formatDate(data.deathDate)}{data.deathTime ? ` ${data.deathTime}` : ''}</div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '6px' }}>별세하셨기에 삼가 알려드립니다.</div>
      </div>

      {data.message && (
        <div style={{ textAlign: 'center', fontSize: '15px', color: '#444', fontStyle: 'italic', margin: '24px 0', padding: '20px 40px', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', lineHeight: '1.8' }}>
          &ldquo;{data.message}&rdquo;
        </div>
      )}

      <div style={{ textAlign: 'center', flex: 1 }}>
        {data.chiefMourners && data.chiefMourners.length > 0 && (
          <div style={{ margin: '16px 0', fontSize: '15px' }}>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', letterSpacing: '4px' }}>상 주</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
              {data.chiefMourners.map((m, i) => <div key={i}><strong>{m.name}</strong> <span style={{ fontSize: '13px', opacity: 0.7 }}>({m.role})</span></div>)}
            </div>
          </div>
        )}

        {(data.funeralHall || data.departure || data.burial) && (
          <div style={{ margin: '24px 0', textAlign: 'center', fontSize: '15px' }}>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', letterSpacing: '4px' }}>빈 소</div>
            {data.funeralHall && <div style={{ fontWeight: '500', marginBottom: '4px' }}>{data.funeralHall}</div>}
            {data.departure && <div style={{ color: '#555', fontSize: '14px' }}>발인 | {data.departure}</div>}
            {data.burial && <div style={{ color: '#555', fontSize: '14px' }}>장지 | {data.burial}</div>}
          </div>
        )}
      </div>

      <div style={{ textAlign: 'right', marginTop: '40px', fontSize: '12px', color: '#999' }}>
        {data.noticeDate ? formatDate(data.noticeDate) : formatDate(new Date().toISOString().split('T')[0])}
      </div>
    </div>
  )
}
