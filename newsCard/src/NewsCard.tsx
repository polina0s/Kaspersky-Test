import { Card, Tag, Tooltip } from 'antd'
import './NewsCard.css'
import { IData_SnippetNews } from './types/data'

interface NewsCardProps {
  data: IData_SnippetNews
}

export const NewsCard = ({ data }: NewsCardProps) => {
  const date = new Date(data.DP).toLocaleDateString()
  const topTraffic = data.TRAFFIC[0]

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

      <div className="description"></div>
    </Card>
  )
}
