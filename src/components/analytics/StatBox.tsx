import './StatBox.sass'

interface StatBoxProps {
    icon: string
    header: string
    value: number | string
    change: number | string
    bgColor: string
    color: string
  }
  
  const StatBox: React.FC<StatBoxProps> = ({ icon, header, value, change, bgColor, color }) => {
    return (
      <div className="dashboard__grid-total-views dashboard__grid-item" draggable="false">
        <div className="dashboard__grid-item__icon" style={{ backgroundColor: bgColor, color: color }}>
          <i className={icon}></i>
        </div>
        <div className="dashboard__grid-item__views">{value}</div>
        <div className="dashboard__grid-item__header">
          <span>{header}:</span>
        </div>
        <div className="dashboard__grid-item__description">
          <span>{change}&nbsp;</span>
          <span>compared to yesterday</span>
        </div>
      </div>
    )
  }
  
  export default StatBox