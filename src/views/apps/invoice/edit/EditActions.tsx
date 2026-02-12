'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

type Props = {
    id: string
}

const EditActions = ({ id }: Props) => {
    return (
        <Card>
            <CardContent className='flex flex-col gap-4'>
                <Typography variant='h6'>Actions</Typography>
                <Button variant='contained' fullWidth>
                    Update Invoice
                </Button>
                <Button variant='outlined' fullWidth>
                    Preview
                </Button>
                <Button variant='outlined' color='error' fullWidth>
                    Delete
                </Button>
            </CardContent>
        </Card>
    )
}

export default EditActions
