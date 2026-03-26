import { domToPng, domToBlob } from 'modern-screenshot'

export async function downloadAsPng(elementId: string, filename: string) {
  const el = document.getElementById(elementId)
  if (!el) return

  try {
    const dataUrl = await domToPng(el, { scale: 2 })
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = filename
    a.click()
  } catch (error) {
    console.error('Download failed', error)
    alert('이미지 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
  }
}

export async function shareToKakao(elementId: string) {
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_KEY
  if (!kakaoKey) {
    alert('카카오 공유 기능을 사용하려면 NEXT_PUBLIC_KAKAO_KEY를 설정해주세요.')
    return
  }

  const el = document.getElementById(elementId)
  if (!el) return

  try {
    const blob = await domToBlob(el, { scale: 2 })
    if (!blob) return

    const win = window as unknown as { Kakao?: { isInitialized: () => boolean; init: (key: string) => void; Share: { uploadImage: (opts: { blob: Blob }) => Promise<{ infos: { original: { url: string } } }>; sendDefault: (opts: Record<string, unknown>) => void } } }
    const Kakao = win.Kakao
    if (!Kakao) {
      alert('카카오 SDK가 로드되지 않았습니다. PNG 저장 후 직접 공유해주세요.')
      return
    }

    if (!Kakao.isInitialized()) Kakao.init(kakaoKey)

    const result = await Kakao.Share.uploadImage({ blob })
    const imageUrl = result.infos.original.url

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '부고장',
        description: '삼가 고인의 명복을 빕니다.',
        imageUrl,
        link: { mobileWebUrl: window.location.href, webUrl: window.location.href },
      },
    })
  } catch (error) {
    console.error('Kakao share failed', error)
    alert('카카오 공유 중 오류가 발생했습니다. PNG로 저장 후 직접 공유해주세요.')
  }
}
