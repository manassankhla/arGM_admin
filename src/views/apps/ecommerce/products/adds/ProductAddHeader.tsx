'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const ProductAddHeader = () => {
    return (
        <div className='flex items-center justify-between'>
            <Typography variant='h4'>Add Product</Typography>
            <div className='flex gap-4'>
                <Button variant='outlined'>Discard</Button>
                <Button variant='contained'>Publish Product</Button>
            </div>
        </div>
    )
}

export default ProductAddHeader
