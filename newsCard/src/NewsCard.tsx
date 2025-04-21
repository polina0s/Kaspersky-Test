import { Card, Tag, Tooltip, Typography } from 'antd'
import './NewsCard.css'
import { IData_SnippetNews } from './types/data'

interface NewsCardProps {
  data: IData_SnippetNews
}

export const NewsCard = ({ data }: NewsCardProps) => {
  const date = new Date(data.DP).toLocaleDateString()
  const topTraffic = data.TRAFFIC[0]

  const renderHighlight = (text: string): React.ReactNode[] => {
    const highlight: React.ReactNode[] = []
    const regex = /<kw>(.*?)<\/kw>/g
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, keyword] = match
      const start = match.index

      if (start > lastIndex) {
        highlight.push(text.slice(lastIndex, start))
      }

      highlight.push(
        <span key={start} className="highlight">
          {keyword}
        </span>,
      )

      lastIndex = start + fullMatch.length
    }

    if (lastIndex < text.length) {
      highlight.push(text.slice(lastIndex))
    }

    return highlight
  }

  return (
    <Card className="card">
      <div className="header">
        <div className="meta">
          <span>{date}</span>
          <span className="reach">{data.REACH.toLocaleString()} Reach</span>
          {topTraffic && (
            <Tooltip
              title={data.TRAFFIC.map(
                (t) => `${t.value}: ${Math.round(t.count * 100)}%`,
              ).join(', ')}
            >
              <span className="traffic">Top Traffic: {topTraffic.value}</span>
            </Tooltip>
          )}
        </div>
        <Tag color="green">{data.SENT}</Tag>
      </div>

      <a href={data.URL} className="title" target="_blank" rel="noreferrer">
        {data.TI}
      </a>

      <div className="info">
        <img src={data.FAV} alt="favicon" className="favicon" />
        <span>{data.DOM}</span>
        <span className="lang">
          {data.CNTR} | {data.LANG.toUpperCase()}
        </span>
        {data.AU.length > 0 && (
          <span className="author">by {data.AU.join(', ')}</span>
        )}
      </div>

      <div className="highlights">
        {data.HIGHLIGHTS.map((highlight, index) => (
          <p key={index}>{renderHighlight(highlight)}</p>
        ))}
      </div>

      <div className="tags">
        {data.KW.slice(0, 6).map((tag) => (
          <Tag key={tag.value}>
            {tag.value} <span className="count">{tag.count}</span>
          </Tag>
        ))}
        {data.KW.length > 6 && (
          <Typography.Link className="show-more">
            Show All +{data.KW.length - 6}
          </Typography.Link>
        )}
      </div>
    </Card>
  )
}
