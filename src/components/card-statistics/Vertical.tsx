// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'


// Third-party Imports

// Types Imports
import type { CardStatsVerticalProps } from '@/types/pages/widgetTypes'


const CardStatVertical = (props: CardStatsVerticalProps) => {
  // Props
  const { title, stats } =
    props

  return (
    <Card>

      <CardContent className='flex flex-col items-start gap-4'>
        <div className='flex flex-col flex-wrap gap-1'>
          <Typography variant='h3'>{stats}</Typography>
          <Typography>{title}</Typography>
        </div>

      </CardContent>
    </Card>
  )
}

export default CardStatVertical
