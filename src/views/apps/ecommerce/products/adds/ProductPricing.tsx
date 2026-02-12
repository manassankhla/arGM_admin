'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'

const ProductPricing = () => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant='h6'>Pricing</Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label='Base Price' type='number' placeholder='0.00' />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label='Discounted Price' type='number' placeholder='0.00' />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ProductPricing
