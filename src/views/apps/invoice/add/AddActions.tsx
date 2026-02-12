'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const AddActions = () => {
    return (
        <Card>
            <CardContent className='flex flex-col gap-4'>
                <Typography variant='h6'>Actions</Typography>
                <Button variant='contained' fullWidth>
                    Save Invoice
                </Button>
                <Button variant='outlined' fullWidth>
                    Preview
                </Button>
            </CardContent>
        </Card>
    )
}

export default AddActions
