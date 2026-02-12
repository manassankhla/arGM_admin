'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Type Imports
import type { InvoiceType } from '@/types/apps/invoiceTypes'

type Props = {
    invoiceData?: InvoiceType[]
}

const AddCard = ({ invoiceData }: Props) => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={6}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant='h5'>Add Invoice</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label='Invoice Number' placeholder='INV-0001' />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label='Client Name' placeholder='Enter client name' />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default AddCard
