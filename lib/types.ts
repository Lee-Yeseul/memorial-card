export interface ChiefMourner {
  role: string
  name: string
  spouse?: string
}

export interface MemorialData {
  // 필수
  name: string
  deathDate: string
  deathTime?: string

  // 선택
  birthYear?: string
  photo?: string
  message?: string

  // 상주
  chiefMourners?: ChiefMourner[]

  // 빈소 정보
  funeralHall?: string
  departure?: string
  burial?: string

  // 조의금
  bankAccount?: string

  // 연락처
  contact?: string

  // 발송 날짜
  noticeDate?: string
}
