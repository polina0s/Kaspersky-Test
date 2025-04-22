import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { news } from './mocks/news'
import { NewsCard } from './components/NewsCard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewsCard data={news}></NewsCard>
  </StrictMode>,
)
