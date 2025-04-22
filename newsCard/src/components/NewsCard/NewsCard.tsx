import { Card, Divider, Tag, Tooltip, Typography } from 'antd'
import { IData_SnippetNews } from '../../types/news'
import { Highlights } from '../Highlights'
import { formatDate, formatReach } from '../../utils'
import './NewsCard.css'

interface NewsCardProps {
  data: IData_SnippetNews
}

export const NewsCard = ({ data }: NewsCardProps) => {
  const date = data.DP
  const topTraffic = data.TRAFFIC[0]
  const reach = data.REACH

  return (
    <Card className="card">
      <div className="header">
        <div className="meta">
          <span>{formatDate(date)}</span>
          <span className="reach">{formatReach(reach)} Reach</span>
          {topTraffic && (
            <Tooltip
              title={data.TRAFFIC.map(
                (t) => `${t.value} ${Math.round(t.count * 100)}%`,
              ).join(', ')}
            >
              <span className="traffic">
                Top Traffic: {topTraffic.value}{' '}
                {Math.round(topTraffic.count * 100)}%
              </span>
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
          <p key={index}>{Highlights(highlight)}</p>
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

      {data.DUPLICATES && data.DUPLICATES.length > 0 && (
        <div className="duplicates">
          <Divider className="duplicates-divider" />
          <Typography.Text className="duplicates-title" strong>
            Duplicates: {data.DUPLICATES.length}
          </Typography.Text>

          {data.DUPLICATES.map((dup, index) => (
            <div key={index} className="duplicate-item">
              <div className="duplicates-header">
                <span className="duplicates-date">{formatDate(dup.DP)}</span>
                <span className="duplicates-reach">
                  {formatReach(dup.REACH)} Top Reach
                </span>
              </div>
              <Typography.Link
                href={dup.URL}
                target="_blank"
                className="duplicates-title"
              >
                {dup.TI}
              </Typography.Link>
              <div className="duplicates-meta">
                <img src={dup.FAV} alt="favicon" className="favicon" />
                <span className="domain">{dup.DOM}</span>
                <span className="country">{dup.CNTR}</span>
                <span className="authors">{dup.AU.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
