'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

type FormData = {
    galleryImages: string[]
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })
}

const GalleryLandingSettings = () => {
    // Modal state for image preview
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')

    // Hooks
    const {
        control,
        handleSubmit,
        reset,
        setValue
    } = useForm<FormData>({
        defaultValues: {
            galleryImages: []
        }
    })

    // Load saved data
    useEffect(() => {
        const savedData = localStorage.getItem('gallery-landing-settings')
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            reset(parsedData)
        }
    }, [reset])

    const onSubmit = (data: FormData) => {
        localStorage.setItem('gallery-landing-settings', JSON.stringify(data))
        alert('Gallery settings saved successfully!')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardHeader title='Gallery Images' />
                        <CardContent>
                            <Grid container spacing={5}>
                                <Grid size={{ xs: 12 }}>
                                    <Controller
                                        name='galleryImages'
                                        control={control}
                                        render={({ field }) => (
                                            <div className='flex flex-col gap-4'>
                                                <div className='flex items-center gap-4'>
                                                    <Button component='label' variant='outlined' htmlFor='gallery-images-upload'>
                                                        Upload Images
                                                        <input
                                                            hidden
                                                            id='gallery-images-upload'
                                                            type='file'
                                                            accept='image/*'
                                                            multiple
                                                            onChange={async (event) => {
                                                                const { files } = event.target
                                                                if (files && files.length !== 0) {
                                                                    const base64Promises = Array.from(files).map(file => fileToBase64(file))
                                                                    const base64Images = await Promise.all(base64Promises)
                                                                    field.onChange([...field.value, ...base64Images])
                                                                }
                                                            }}
                                                        />
                                                    </Button>
                                                    {field.value.length > 0 && (
                                                        <Typography variant='body2' color='text.secondary'>
                                                            {field.value.length} image{field.value.length > 1 ? 's' : ''} uploaded
                                                        </Typography>
                                                    )}
                                                </div>

                                                {/* Image Grid */}
                                                {field.value.length > 0 && (
                                                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                                                        {field.value.map((img, index) => (
                                                            <div key={index} className='relative group'>
                                                                <div
                                                                    className='border rounded p-2 cursor-pointer hover:opacity-80 transition-opacity'
                                                                    onClick={() => {
                                                                        setSelectedImage(img)
                                                                        setImageModalOpen(true)
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={img}
                                                                        alt={`Gallery ${index + 1}`}
                                                                        className='w-32 h-32 object-cover rounded'
                                                                    />
                                                                </div>
                                                                <IconButton
                                                                    size='small'
                                                                    color='error'
                                                                    className='absolute top-0 right-0 bg-white hover:bg-gray-100'
                                                                    onClick={() => {
                                                                        const newImages = field.value.filter((_, i) => i !== index)
                                                                        field.onChange(newImages)
                                                                    }}
                                                                >
                                                                    <i className='ri-delete-bin-line' />
                                                                </IconButton>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {field.value.length === 0 && (
                                                    <Typography variant='body2' color='text.secondary' className='text-center py-8'>
                                                        No images uploaded yet. Click "Upload Images" to add images to the gallery.
                                                    </Typography>
                                                )}
                                            </div>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12 }} className='flex justify-end'>
                    <Button variant='contained' type='submit' size='large'>
                        Save Changes
                    </Button>
                </Grid>
            </Grid>

            {/* Image Preview Modal */}
            <Dialog
                open={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent className='relative p-0'>
                    <IconButton
                        className='absolute top-2 right-2 z-10 bg-white hover:bg-gray-100'
                        onClick={() => setImageModalOpen(false)}
                        size='small'
                    >
                        <i className='ri-close-line text-xl' />
                    </IconButton>
                    <img
                        src={selectedImage}
                        alt='Full Size Preview'
                        className='w-full h-auto'
                    />
                </DialogContent>
            </Dialog>
        </form>
    )
}

export default GalleryLandingSettings
