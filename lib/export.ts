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
    alert('이미지 저장 중 오류가 발생했습니다.')
  }
}

export async function shareCard(elementId: string, name?: string) {
  const el = document.getElementById(elementId)
  if (!el) return

  try {
    const blob = await domToBlob(el, { scale: 2 })
    if (!blob) return

    const filename = `부고_${name || '알림'}.png`
    const file = new File([blob], filename, { type: 'image/png' })

    // 1순위: Web Share API (모바일)
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: '부고 알림' })
      return
    }

    // 2순위: 카카오 공유
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_KEY
    if (kakaoKey) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Kakao = (window as any).Kakao
      if (Kakao) {
        if (!Kakao.isInitialized()) Kakao.init(kakaoKey)
        try {
          const result = await Kakao.Share.uploadImage({ blob })
          const imageUrl = result.infos.original.url
          Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
              title: '부고 알림',
              description: '삼가 고인의 명복을 빕니다.',
              imageUrl,
              link: { mobileWebUrl: window.location.href, webUrl: window.location.href },
            },
          })
          return
        } catch {
          // 카카오 실패 시 다운로드로 대체
        }
      }
    }

    // 3순위: PNG 다운로드 후 안내
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename
    a.click()
    alert('PNG가 저장되었습니다. 카카오톡에서 직접 공유해주세요.')
  } catch (error) {
    console.error('Share failed', error)
    alert('공유 중 오류가 발생했습니다. PNG 저장을 이용해주세요.')
  }
}
