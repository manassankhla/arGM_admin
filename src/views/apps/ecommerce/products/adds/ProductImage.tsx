'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const ProductImage = () => {
    return (
        <Card>
            <CardContent className='flex flex-col gap-4'>
                <Typography variant='h6'>Product Image</Typography>
                <Button variant='outlined' component='label'>
                    Upload Image
                    <input type='file' hidden accept='image/*' />
                </Button>
            </CardContent>
        </Card>
    )
}

export default ProductImage
