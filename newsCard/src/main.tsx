import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NewsCard } from './NewsCard'
import { news } from './mocks/news'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewsCard data={news}></NewsCard>
  </StrictMode>,
)
