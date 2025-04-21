import { Card } from 'antd'
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
      <div className="header"></div>
      <div className="description"></div>
    </Card>
  )
}
