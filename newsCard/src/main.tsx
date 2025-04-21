import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NewsCard } from './NewsCard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewsCard></NewsCard>
  </StrictMode>,
)
