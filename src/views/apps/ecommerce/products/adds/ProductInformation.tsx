'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'

const ProductInformation = () => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant='h6'>Product Information</Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label='Product Name' placeholder='Enter product name' />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label='Description'
                            placeholder='Enter product description'
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ProductInformation
