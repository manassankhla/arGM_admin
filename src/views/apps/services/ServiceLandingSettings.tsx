'use client'


// Next Imports
import Link from 'next/link'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

// Third-party Imports
import { useForm, Controller, useFieldArray } from 'react-hook-form'

// Local Imports
import ServiceRelated, { RelatedContentData } from './ServiceRelated'

type DetailSection = {
    title: string
    description: string
}

type FormData = {
    heroTitle: string
    heroImage: string
    shortDescription: string
    heroCtaText: string
    heroCtaLink: string
    detailSections: DetailSection[]
    relatedContent: RelatedContentData
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })
}

const ServiceLandingSettings = () => {
    // Modal state for image preview
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')

    // Hooks
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            heroTitle: '',
            heroImage: '',
            shortDescription: '',
            heroCtaText: '',
            heroCtaLink: '',
            detailSections: [{ title: '', description: '' }],
            relatedContent: {
                sectionTypes: [],
                relatedBlogs: [],
                relatedServices: [],
                relatedParts: [],
                relatedProjects: []
            }
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'detailSections'
    })

    const relatedContentValue = watch('relatedContent')

    useEffect(() => {
        const savedData = localStorage.getItem('service-landing-settings')
        if (savedData) {
            reset(JSON.parse(savedData))
        }
    }, [reset])

    const onSubmit = (data: FormData) => {
        localStorage.setItem('service-landing-settings', JSON.stringify(data))
        alert('Service Landing Settings Saved!')
    }

    const handleRelatedContentSave = (data: RelatedContentData) => {
        setValue('relatedContent', data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
                {/* Hero Section */}
                <Grid size={{ xs: 12 }}>
                    <Card>


                        <CardHeader
                            title='Hero Section'
                            action={
                                <Link href='/apps/services/category/list' className='no-underline'>
                                    <Button variant='outlined' startIcon={<i className='ri-list-settings-line' />}>
                                        Manage Categories
                                    </Button>
                                </Link>
                            }
                        />
                        <CardContent>
                            <Grid container spacing={5}>
                                <Grid size={{ xs: 12 }}>
                                    <Controller
                                        name='heroTitle'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label='Hero Title'
                                                placeholder='e.g. Professional Services'
                                                error={Boolean(errors.heroTitle)}
                                                helperText={errors.heroTitle && 'This field is required'}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Controller
                                        name='heroImage'
                                        control={control}
                                        render={({ field }) => {
                                            const isValidImage = field.value && field.value.startsWith('data:image/')
                                            return (
                                                <div className='flex flex-col gap-4'>
                                                    <div className='flex items-center gap-4'>
                                                        {isValidImage && <Typography variant='body1' className='font-medium'>Hero Image</Typography>}
                                                        <Button component='label' variant='outlined' htmlFor='service-hero-image'>
                                                            Choose Image
                                                            <input
                                                                hidden
                                                                id='service-hero-image'
                                                                type='file'
                                                                accept='image/*'
                                                                onChange={async (event) => {
                                                                    const { files } = event.target
                                                                    if (files && files.length !== 0) {
                                                                        const base64 = await fileToBase64(files[0])
                                                                        field.onChange(base64)
                                                                    }
                                                                }}
                                                            />
                                                        </Button>
                                                        {isValidImage && (
                                                            <IconButton size='small' color='error' onClick={() => field.onChange('')}>
                                                                <i className='ri-delete-bin-line' />
                                                            </IconButton>
                                                        )}
                                                    </div>
                                                    {isValidImage && (
                                                        <div
                                                            className='border rounded p-2 cursor-pointer hover:opacity-80 transition-opacity'
                                                            onClick={() => {
                                                                setSelectedImage(field.value)
                                                                setImageModalOpen(true)
                                                            }}
                                                        >
                                                            <img
                                                                src={field.value}
                                                                alt='Hero Preview'
                                                                className='w-32 h-32 object-cover rounded'
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Controller
                                        name='shortDescription'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                multiline
                                                rows={2}
                                                label='Short Description'
                                                placeholder='Brief overview...'
                                            />
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

export default ServiceLandingSettings
