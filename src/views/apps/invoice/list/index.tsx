'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Type Imports
import type { InvoiceType } from '@/types/apps/invoiceTypes'

// Component Imports
import InvoiceListTable from '@/views/apps/user/view/user-right/overview/InvoiceListTable'

type Props = {
    invoiceData?: InvoiceType[]
}

const InvoiceList = ({ invoiceData }: Props) => {
    return (
        <Card>
            <CardContent className='flex flex-col gap-6'>
                <div className='flex items-center justify-between'>
                    <Typography variant='h5'>Invoice List</Typography>
                    <Button variant='contained'>Create Invoice</Button>
                </div>
                <InvoiceListTable invoiceData={invoiceData} />
            </CardContent>
        </Card>
    )
}

export default InvoiceList
