'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'

const ProductCard = () => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant='body2' color='text.secondary'>
                            Total Products
                        </Typography>
                        <Typography variant='h5'>0</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant='body2' color='text.secondary'>
                            In Stock
                        </Typography>
                        <Typography variant='h5'>0</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant='body2' color='text.secondary'>
                            Out of Stock
                        </Typography>
                        <Typography variant='h5'>0</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant='body2' color='text.secondary'>
                            Categories
                        </Typography>
                        <Typography variant='h5'>0</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ProductCard
