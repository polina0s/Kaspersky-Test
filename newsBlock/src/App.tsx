import React from 'react'
import { Card, Tag, Tooltip, Button } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import './App.css'
import { IData_SnippetNews } from './types/data'

export const SnippetNewsCard: React.FC<{ data: IData_SnippetNews }> = ({
  data,
}) => {
  const date = new Date(data.DP).toLocaleDateString()
  const sentimentColor =
    {
      positive: 'green',
      negative: 'red',
      neutral: 'grey',
    }[data.SENT] || 'blue'

  const renderHighlights = () =>
    data.HIGHLIGHTS.map((highlight, index) => (
      <p
        key={index}
        dangerouslySetInnerHTML={{
          __html: highlight.replace(
            /<kw>(.*?)<\/kw>/g,
            '<span class="highlight">$1</span>',
          ),
        }}
      />
    ))

  return (
    <Card className="snippet-news-card" variant="bordered">
      <div className="header">
        <div className="meta">
          <span>{date}</span>
          <span className="reach">{data.REACH.toLocaleString()} Reach</span>
          {data.TRAFFIC.length > 0 && (
            <Tooltip
              title={data.TRAFFIC.map(
                (t) => `${t.value}: ${Math.round(t.count * 100)}%`,
              ).join(', ')}
            >
              <span className="traffic">
                Top Traffic: {data.TRAFFIC[0].value}
              </span>
            </Tooltip>
          )}
        </div>
        <Tag color={sentimentColor}>{data.SENT}</Tag>
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

      <div className="highlights">{renderHighlights()}</div>

      <div className="tags">
        {data.KW.map((tag) => (
          <Tag key={tag.value}>
            {tag.value} {tag.count > 1 && `(${tag.count})`}
          </Tag>
        ))}
      </div>

      <Button type="link" size="small" icon={<GlobalOutlined />}>
        Original Source
      </Button>
    </Card>
  )
}
