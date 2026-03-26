import T01_WhiteSimple from './T01_WhiteSimple'
import T02_WhiteFlower from './T02_WhiteFlower'
import T03_WhiteRibbon from './T03_WhiteRibbon'
import T04_DarkSimple from './T04_DarkSimple'
import T05_DarkFlower from './T05_DarkFlower'
import T06_DarkElegant from './T06_DarkElegant'
import T07_Ink from './T07_Ink'
import T08_Traditional from './T08_Traditional'
import T09_ModernClean from './T09_ModernClean'
import T10_ModernType from './T10_ModernType'
import { MemorialData } from '@/lib/types'

export const TEMPLATES = [
  { id: 'T01', name: '전통 흰배경 심플', component: T01_WhiteSimple, bgColor: '#ffffff' },
  { id: 'T02', name: '전통 흰배경 국화', component: T02_WhiteFlower, bgColor: '#ffffff' },
  { id: 'T03', name: '검정 리본 코너', component: T03_WhiteRibbon, bgColor: '#ffffff' },
  { id: 'T04', name: '다크 심플', component: T04_DarkSimple, bgColor: '#2a2a2a' },
  { id: 'T05', name: '다크 국화 라인아트', component: T05_DarkFlower, bgColor: '#3a3632' },
  { id: 'T06', name: '다크 골드 엘레강트', component: T06_DarkElegant, bgColor: '#1e1e1e' },
  { id: 'T07', name: '수묵화/먹빛', component: T07_Ink, bgColor: '#faf9f6' },
  { id: 'T08', name: '전통 한국풍', component: T08_Traditional, bgColor: '#f5f0e8' },
  { id: 'T09', name: '모던 미니멀 클린', component: T09_ModernClean, bgColor: '#fcfcfc' },
  { id: 'T10', name: '모던 타이포그래피', component: T10_ModernType, bgColor: '#ffffff' },
]

export type TemplateId = typeof TEMPLATES[number]['id']

export const getTemplateComponent = (id: string) => {
  return TEMPLATES.find(t => t.id === id)?.component || T03_WhiteRibbon
}
