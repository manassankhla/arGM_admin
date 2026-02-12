'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// Type Imports
import type { InvoiceType } from '@/types/apps/invoiceTypes'

type Props = {
    invoiceData: InvoiceType
    id: string
}

const Preview = ({ invoiceData, id }: Props) => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={6}>
                    <Grid size={{ xs: 12 }}>
                        <div className='flex items-center justify-between'>
                            <Typography variant='h5'>Invoice Preview</Typography>
                            <div className='flex gap-4'>
                                <Button variant='outlined'>Edit</Button>
                                <Button variant='contained'>Print</Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant='body2' className='font-medium'>
                            Invoice ID:
                        </Typography>
                        <Typography variant='body1'>{invoiceData.id}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant='body2' className='font-medium'>
                            Client:
                        </Typography>
                        <Typography variant='body1'>{invoiceData.name}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Preview
