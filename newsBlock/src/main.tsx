import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SnippetNewsCard } from './App.tsx'
import { news } from './mocks/news.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnippetNewsCard data={news} />
  </StrictMode>,
)
