'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'

const ProductInventory = () => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant='h6'>Inventory</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label='SKU' placeholder='Enter SKU' />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label='Quantity' type='number' placeholder='0' />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ProductInventory
