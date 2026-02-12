// React Imports
import { useState, useEffect } from 'react'

import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

// Third-party Imports
import { useForm, Controller, useFieldArray } from 'react-hook-form'

// Local Imports
import type { RelatedContentData } from '../../parts/PartsRelated';
import PartsRelated from '../../parts/PartsRelated'

type FormData = {
    heroTitle: string
    heroImage: string
    heroCtaText: string
    heroCtaLink: string
    secondSectionHeading: string
    secondSectionParagraph: string

    // Metadata
    metaTitle: string
    metaDescription: string

    // Project Details
    area: string
    budget: string
    duration: string
    type: string
    architect: string
    status: string
    specifications: {
        question: string
        answer: string
    }[]

    // Project Descriptions
    conceptDescription: string
    challengeDescription: string
    solutionDescription: string
    visionDescription: string

    // Single Images
    conceptImage: string
    challengeImage: string
    solutionImage: string

    // Testimonial
    testimonialText: string
    testimonialAuthor: string

    // Galleries
    interiorImages: string[]
    exteriorImages: string[]
    plansImages: string[]
    galleryImages: string[]
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

const ProductLandingSettings = () => {
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
            heroCtaText: '',
            heroCtaLink: '',
            secondSectionHeading: '',
            secondSectionParagraph: '',
            metaTitle: '',
            metaDescription: '',
            area: '',
            budget: '',
            duration: '',
            type: '',
            architect: '',
            status: '',
            specifications: [],
            conceptDescription: '',
            challengeDescription: '',
            solutionDescription: '',
            visionDescription: '',
            conceptImage: '',
            challengeImage: '',
            solutionImage: '',
            testimonialText: '',
            testimonialAuthor: '',
            interiorImages: [],
            exteriorImages: [],
            plansImages: [],
            galleryImages: [],
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
        name: 'specifications'
    })

    const relatedContentValue = watch('relatedContent')

    useEffect(() => {
        const savedData = localStorage.getItem('product-landing-settings')

        if (savedData) {
            reset(JSON.parse(savedData))
        }
    }, [reset])

    const onSubmit = (data: FormData) => {
        try {
            localStorage.setItem('product-landing-settings', JSON.stringify(data))
            alert('Project Landing Settings Saved!')
        } catch (error) {
            console.error('Failed to save settings:', error)
            alert('Failed to save settings. Local storage might be full.')
        }
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
                                <div className='flex gap-2'>
                                    <Link href='/apps/ecommerce/projects/add'>
                                        <Button variant='contained' startIcon={<i className='ri-add-line' />}>
                                            Add Project
                                        </Button>
                                    </Link>
                                    <Link href='/apps/ecommerce/projects/all'>
                                        <Button variant='outlined' startIcon={<i className='ri-list-settings-line' />}>
                                            Manage Projects
                                        </Button>
                                    </Link>
                                </div>
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
                                                placeholder='e.g. Discover Our Premium Products'
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
                                                        {isValidImage && <Typography variant='body2' className='font-medium'>Hero Image</Typography>}
                                                        <Button component='label' variant='outlined' htmlFor='product-hero-image'>
                                                            Choose Image
                                                            <input
                                                                hidden
                                                                id='product-hero-image'
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
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name='heroCtaText'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label='CTA Button Text'
                                                placeholder='e.g. Shop Now'
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name='heroCtaLink'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label='CTA Button Link'
                                                placeholder='e.g. /products/all'
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Second Section */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardHeader title='Introduction Section' />
                        <CardContent>
                            <Grid container spacing={5}>
                                <Grid size={{ xs: 12 }}>
                                    <Controller
                                        name='secondSectionHeading'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label='Heading'
                                                placeholder='e.g. Quality You Can Trust'
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Controller
                                        name='secondSectionParagraph'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                multiline
                                                rows={4}
                                                label='Paragraph'
                                                placeholder='Describe your product philosophy...'
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Metadata Section */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardHeader title='SEO Metadata' />
                        <CardContent>
                            <Grid container spacing={5}>
                                <Grid size={{ xs: 12 }}>
                                    <Controller
                                        name='metaTitle'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label='Meta Title'
                                                placeholder='e.g. Luxury Residential Project - Stark Crane'
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Controller
                                        name='metaDescription'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                multiline
                                                rows={4}
                                                label='Meta Description'
                                                placeholder='Enter a description for search engines...'
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Project Details */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardHeader title='Project Details' />
                        <CardContent>
                            <Grid container spacing={5}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name='area'
                                        control={control}
                                        render={({ field }) => <TextField {...field} fullWidth label='Area' placeholder='e.g. 1200 sqft' />}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name='budget'
                                        control={control}
                                        render={({ field }) => <TextField {...field} fullWidth label='Budget' placeholder='e.g. $50,000' />}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name='duration'
                                        control={control}
                                        render={({ field }) => <TextField {...field} fullWidth label='Duration' placeholder='e.g. 6 Months' />}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name='type'
                                        control={control}
                                        render={({ field }) => <TextField {...field} fullWidth label='Type' placeholder='e.g. Residential' />}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name='architect'
                                        control={control}
                                        render={({ field }) => <TextField {...field} fullWidth label='Architect' placeholder='e.g. John Doe' />}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Controller
                                        name='status'
                                        control={control}
                                        render={({ field }) => <TextField {...field} fullWidth label='Status' placeholder='e.g. Completed' />}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Project Descriptions & Images */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardHeader title='Project Descriptions & Images' />
                        <CardContent>
                            <Grid container spacing={5}>
                                {/* Concept Section */}
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant='subtitle1' className='mbe-2'>Concept</Typography>
                                    <div className='flex flex-col gap-4'>
                                        <Controller
                                            name='conceptDescription'
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    label='Description (Press Enter for new bullet point)'
                                                    placeholder='• Type your first point here...'
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault()
                                                            const target = e.currentTarget as unknown as HTMLTextAreaElement
                                                            const cursorPosition = target.selectionStart || 0
                                                            const text = field.value

                                                            // Find the end of the current line
                                                            let lineEnd = text.indexOf('\n', cursorPosition)

                                                            if (lineEnd === -1) lineEnd = text.length

                                                            const textBeforeLineEnd = text.substring(0, lineEnd)
                                                            const textAfterLineEnd = text.substring(lineEnd)
                                                            const newValue = textBeforeLineEnd + '\n• ' + textAfterLineEnd

                                                            field.onChange(newValue)
                                                            setTimeout(() => {
                                                                target.selectionStart = target.selectionEnd = lineEnd + 3
                                                            }, 0)
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        let value = e.target.value

                                                        if (value && !value.startsWith('• ')) {
                                                            value = '• ' + value
                                                        }

                                                        field.onChange(value)
                                                    }}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name='conceptImage'
                                            control={control}
                                            render={({ field }) => {
                                                const isValidImage = field.value && field.value.startsWith('data:image/')

                                                
return (
                                                    <div className='flex flex-col gap-4'>
                                                        <div className='flex items-center gap-4'>
                                                            {isValidImage && <Typography variant='body2' className='font-medium'>Concept Image</Typography>}
                                                            <Button component='label' variant='outlined' htmlFor='file-conceptImage'>
                                                                Choose Image
                                                                <input
                                                                    hidden
                                                                    id='file-conceptImage'
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
                                                                    alt='Concept Preview'
                                                                    className='w-32 h-32 object-cover rounded'
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            }}
                                        />
                                    </div>
                                </Grid>

                                <Divider />

                                {/* Challenge Section */}
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant='subtitle1' className='mbe-2'>Challenge</Typography>
                                    <div className='flex flex-col gap-4'>
                                        <Controller
                                            name='challengeDescription'
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    label='Description (Press Enter for new bullet point)'
                                                    placeholder='• Type your first point here...'
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault()
                                                            const target = e.currentTarget as unknown as HTMLTextAreaElement
                                                            const cursorPosition = target.selectionStart || 0
                                                            const text = field.value

                                                            // Find the end of the current line
                                                            let lineEnd = text.indexOf('\n', cursorPosition)

                                                            if (lineEnd === -1) lineEnd = text.length

                                                            const textBeforeLineEnd = text.substring(0, lineEnd)
                                                            const textAfterLineEnd = text.substring(lineEnd)
                                                            const newValue = textBeforeLineEnd + '\n• ' + textAfterLineEnd

                                                            field.onChange(newValue)
                                                            setTimeout(() => {
                                                                target.selectionStart = target.selectionEnd = lineEnd + 3
                                                            }, 0)
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        let value = e.target.value

                                                        if (value && !value.startsWith('• ')) {
                                                            value = '• ' + value
                                                        }

                                                        field.onChange(value)
                                                    }}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name='challengeImage'
                                            control={control}
                                            render={({ field }) => {
                                                const isValidImage = field.value && field.value.startsWith('data:image/')

                                                
return (
                                                    <div className='flex flex-col gap-4'>
                                                        <div className='flex items-center gap-4'>
                                                            {isValidImage && <Typography variant='body2' className='font-medium'>Challenge Image</Typography>}
                                                            <Button component='label' variant='outlined' htmlFor='file-challengeImage'>
                                                                Choose Image
                                                                <input
                                                                    hidden
                                                                    id='file-challengeImage'
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
                                                                    alt='Challenge Preview'
                                                                    className='w-32 h-32 object-cover rounded'
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            }}
                                        />

                                    </div>
                                </Grid>

                                <Divider />


                                {/* Solution Section */}
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant='subtitle1' className='mbe-2'>Solution</Typography>
                                    <div className='flex flex-col gap-4'>
                                        <Controller
                                            name='solutionDescription'
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    label='Description (Press Enter for new bullet point)'
                                                    placeholder='• Type your first point here...'
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault()
                                                            const target = e.currentTarget as unknown as HTMLTextAreaElement
                                                            const cursorPosition = target.selectionStart || 0
                                                            const text = field.value

                                                            // Find the end of the current line
                                                            let lineEnd = text.indexOf('\n', cursorPosition)

                                                            if (lineEnd === -1) lineEnd = text.length

                                                            const textBeforeLineEnd = text.substring(0, lineEnd)
                                                            const textAfterLineEnd = text.substring(lineEnd)
                                                            const newValue = textBeforeLineEnd + '\n• ' + textAfterLineEnd

                                                            field.onChange(newValue)
                                                            setTimeout(() => {
                                                                target.selectionStart = target.selectionEnd = lineEnd + 3
                                                            }, 0)
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        let value = e.target.value

                                                        if (value && !value.startsWith('• ')) {
                                                            value = '• ' + value
                                                        }

                                                        field.onChange(value)
                                                    }}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name='solutionImage'
                                            control={control}
                                            render={({ field }) => {
                                                const isValidImage = field.value && field.value.startsWith('data:image/')

                                                
return (
                                                    <div className='flex flex-col gap-4'>
                                                        <div className='flex items-center gap-4'>
                                                            {isValidImage && <Typography variant='body2' className='font-medium'>Solution Image</Typography>}
                                                            <Button component='label' variant='outlined' htmlFor='file-solutionImage'>
                                                                Choose Image
                                                                <input
                                                                    hidden
                                                                    id='file-solutionImage'
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
                                                                    alt='Solution Preview'
                                                                    className='w-32 h-32 object-cover rounded'
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            }}
                                        />

                                    </div>
                                </Grid>

                                <Divider />

                                {/* Vision Section */}
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant='subtitle1' className='mbe-2'>Vision</Typography>
                                    <Controller
                                        name='visionDescription'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                multiline
                                                rows={4}
                                                label='Description'
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Galleries */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardHeader title='Image Galleries' />
                        <CardContent>
                            <Grid container spacing={6}>
                                {['interiorImages', 'exteriorImages', 'plansImages', 'galleryImages'].map((fieldName) => (
                                    <Grid size={{ xs: 12 }} key={fieldName}>
                                        <Typography variant='subtitle1' className='mbe-2'>
                                            {fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                        </Typography>
                                        <Controller
                                            name={fieldName as any}
                                            control={control}
                                            render={({ field }) => (
                                                <div className='flex flex-col gap-4'>
                                                    <div className='flex flex-wrap gap-4'>
                                                        {field.value.map((img: string, index: number) => (
                                                            <div key={index} className='relative is-24 bs-24 border rounded'>
                                                                <img
                                                                    src={img}
                                                                    alt={`Gallery ${index}`}
                                                                    className='is-full bs-full object-cover rounded'
                                                                />
                                                                <IconButton
                                                                    size='small'
                                                                    className='absolute -block-2 -inline-end-2 bg-background-paper shadow-md'
                                                                    onClick={() => {
                                                                        const newImages = [...field.value]

                                                                        newImages.splice(index, 1)
                                                                        field.onChange(newImages)
                                                                    }}
                                                                >
                                                                    <i className='ri-close-line' />
                                                                </IconButton>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <Button component='label' variant='outlined' htmlFor={`file-${fieldName}`} className='is-fit'>
                                                        Add Images
                                                        <input
                                                            hidden
                                                            id={`file-${fieldName}`}
                                                            type='file'
                                                            accept='image/*'
                                                            multiple
                                                            onChange={async (event) => {
                                                                const { files } = event.target

                                                                if (files && files.length !== 0) {
                                                                    const newImages = await Promise.all(
                                                                        Array.from(files).map((file) => fileToBase64(file))
                                                                    )

                                                                    field.onChange([...field.value, ...newImages])
                                                                }
                                                            }}
                                                        />
                                                    </Button>
                                                </div>
                                            )}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Specifications Section */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardHeader
                            title='Specifications Q&A'
                            action={
                                <Button
                                    variant='contained'
                                    startIcon={<i className='ri-add-line' />}
                                    onClick={() => append({ question: '', answer: '' })}
                                >
                                    Add Item
                                </Button>
                            }
                        />
                        <CardContent>
                            <div className='flex flex-col gap-4'>
                                {fields.map((item, index) => (
                                    <div key={item.id} className='flex gap-4 items-start'>
                                        <Grid container spacing={5} className='flex-grow'>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <Controller
                                                    name={`specifications.${index}.question`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            fullWidth
                                                            label='Question'
                                                            placeholder='e.g. Material'
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <Controller
                                                    name={`specifications.${index}.answer`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            fullWidth
                                                            label='Answer'
                                                            placeholder='e.g. Concrete'
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                        <IconButton onClick={() => remove(index)} className='mt-2'>
                                            <i className='ri-delete-bin-line' />
                                        </IconButton>
                                    </div>
                                ))}
                                {fields.length === 0 && (
                                    <Typography color='text.secondary' className='text-center'>
                                        No specifications added yet. Click "Add Item" to start.
                                    </Typography>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Testimonial Section */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardHeader title='Testimonial' />
                        <CardContent>
                            <Grid container spacing={5}>
                                <Grid size={{ xs: 12 }}>
                                    <Controller
                                        name='testimonialText'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                multiline
                                                rows={4}
                                                label='Testimonial Text'
                                                placeholder='Enter the client testimonial...'
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Controller
                                        name='testimonialAuthor'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label='Testimonial Writer'
                                                placeholder='e.g. Jane Doe, CEO'
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Related Section */}
                <Grid size={{ xs: 12 }}>
                    <Typography variant='h5' className='mbe-4'>Related Content (Home Landing)</Typography>
                    <PartsRelated
                        partsData={relatedContentValue}
                        onSave={handleRelatedContentSave}
                    />
                </Grid>

                <Grid size={{ xs: 12 }} className='flex justify-end'>
                    <Button variant='contained' type='submit' size='large'>
                        Save Changes
                    </Button>
                </Grid>
            </Grid >

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
        </form >
    )
}

export default ProductLandingSettings
