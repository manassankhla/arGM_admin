'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const ProductVariants = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant='h6'>Product Variants</Typography>
                <Typography variant='body2' className='mt-2'>
                    Add product variants here...
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ProductVariants
