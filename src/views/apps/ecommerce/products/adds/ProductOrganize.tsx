'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'

const ProductOrganize = () => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant='h6'>Organize</Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label='Category' placeholder='Select category' />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label='Tags' placeholder='Enter tags' />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ProductOrganize
