'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// Third-party Imports
import { useForm, Controller, useFieldArray } from 'react-hook-form'

// Component Imports
import TextEditor from '@components/TextEditor'
import type { RelatedContentData } from '../../../parts/PartsRelated';
import PartsRelated from '../../../parts/PartsRelated'

// Helper
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })
}

export type ProductItemType = {
    id: string
    categoryId: string
    title: string
    shortDescription: string

    // Hero
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

type Props = {
    dataToEdit?: ProductItemType
    categoryId: string
    onSave: (data: ProductItemType) => void
    onCancel: () => void
}

const ProductPageEditor = ({ dataToEdit, categoryId, onSave, onCancel }: Props) => {
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm<ProductItemType>({
        defaultValues: {
            id: '',
            categoryId: categoryId,
            title: '',
            shortDescription: '',
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

    const [categories, setCategories] = useState<{ id: string, title: string }[]>([])

    useEffect(() => {
        const savedCategories = localStorage.getItem('product-categories')

        if (savedCategories) {
            const parsed = JSON.parse(savedCategories)

            setCategories(parsed.map((c: any) => ({ id: c.id, title: c.title })))
        }
    }, [])

    const populateDummyData = () => {
        reset({
            id: Date.now().toString(),
            categoryId: categoryId,
            title: 'Titan Heavy-Lift Gantry Crane',
            shortDescription: 'Ideally suited for large-scale industrial lifting operations, the Titan Gantry Crane offers unparalleled stability and lifting capacity.',
            heroTitle: 'Titan X-2000 Gantry Crane',
            heroImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070', // Dummy Unsplash Image
            heroCtaText: 'Request Quote',
            heroCtaLink: '/contact',
            secondSectionHeading: 'Engineered for Mega-Scale Operations',
            secondSectionParagraph: 'The Titan X-2000 is built to handle the most demanding lifting tasks in shipyard, construction, and heavy manufacturing environments.',
            metaTitle: 'Titan Heavy-Lift Gantry Crane - Stark Crane',
            metaDescription: 'Discover the Titan X-2000, our flagship gantry crane designed for extreme loads and precision control.',
            area: 'N/A',
            budget: '$2.5M',
            duration: '12 Months',
            type: 'Industrial Heavy Machinery',
            architect: 'Stark Engineering Team',
            status: 'Available to Order',
            specifications: [
                { question: 'Max Lifting Capacity', answer: '2000 Tons' },
                { question: 'Span', answer: '150 Meters' },
                { question: 'Lifting Height', answer: '80 Meters' },
                { question: 'Travel Speed', answer: '30 m/min' }
            ],
            conceptDescription: 'Designed to bridge the gap between static heavy-lift solutions and mobile flexibility, the Titan concept focused on modularity.',
            challengeDescription: 'The primary challenge was maintaining structural rigidity under extreme loads while keeping the overall weight manageable for transport and assembly.',
            solutionDescription: 'We utilized advanced high-tensile steel alloys and a unique lattice structure design to optimize the strength-to-weight ratio.',
            visionDescription: 'To set a new standard in gantry crane efficiency and safety.',
            conceptImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070',
            challengeImage: 'https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?auto=format&fit=crop&q=80&w=2070',
            solutionImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070',
            testimonialText: 'The Titan X-2000 has revolutionized our shipyard operations. Efficiency has increased by 40% since installation.',
            testimonialAuthor: 'Marcus Thorne, Operations Director at Harbor Logistics',
            interiorImages: [
                'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=2070',
                'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070'
            ],
            exteriorImages: [
                'https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80&w=2074',
                'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=2070'
            ],
            plansImages: [
                'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2070' // Blueprint style image
            ],
            galleryImages: [
                'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&q=80&w=2073'
            ],
            relatedContent: {
                sectionTypes: [],
                relatedBlogs: [],
                relatedServices: [],
                relatedParts: [],
                relatedProjects: []
            }
        })
    }

    useEffect(() => {
        if (dataToEdit) {
            reset({
                ...dataToEdit,
                shortDescription: dataToEdit.shortDescription || '',
                specifications: dataToEdit.specifications || []
            })
        } else {
            reset({
                id: Date.now().toString(),
                categoryId: categoryId,
                title: '',
                shortDescription: '',
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
            })
        }
    }, [dataToEdit, reset, categoryId])

    const onSubmit = (data: ProductItemType) => {
        onSave(data)
    }

    const handleRelatedContentSave = (data: RelatedContentData) => {
        setValue('relatedContent', data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader title='Product Page Editor' action={
                    <div className='flex gap-2'>
                        <Button color='info' variant='outlined' onClick={populateDummyData}>Load Dummy Data</Button>
                        <Button startIcon={<i className='ri-arrow-go-back-line' />} onClick={onCancel} variant='outlined'>Back to List</Button>
                    </div>
                } />
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name='categoryId'
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            {...field}
                                            label='Category'
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>Select Category</MenuItem>
                                            {categories.map(cat => (
                                                <MenuItem key={cat.id} value={cat.id}>{cat.title}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        {/* Title */}
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name='title'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label='Company Name'
                                        placeholder='e.g. Stark Crane'
                                        error={Boolean(errors.title)}
                                        helperText={errors.title && 'Title is required'}
                                    />
                                )}
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

                        <Grid size={{ xs: 12 }}> <Divider /> </Grid>

                        {/* Hero Section */}
                        <Grid size={{ xs: 12 }}>
                            <Card className='mbe-4'>
                                <CardHeader title='Hero Section' />
                                <CardContent>
                                    <Grid container spacing={5}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Controller
                                                name='heroTitle'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label='Hero Title'
                                                        placeholder='e.g. Building the Future'
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Controller
                                                name='heroImage'
                                                control={control}
                                                render={({ field }) => {
                                                    const isValidImage = field.value && field.value.startsWith('data:image/')

                                                    
return (
                                                        <div className='flex flex-col gap-4'>
                                                            <div className='flex items-center gap-4'>
                                                                {isValidImage && <Typography variant='body2' className='font-medium'>Hero Image</Typography>}
                                                                <Button component='label' variant='outlined' htmlFor='file-heroImage'>
                                                                    Choose Image
                                                                    <input
                                                                        hidden
                                                                        id='file-heroImage'
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
                                                                <div className='border rounded p-2'>
                                                                    <img
                                                                        src={field.value}
                                                                        alt='Hero Preview'
                                                                        className='w-full max-w-md h-auto object-cover rounded'
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
                                                        label='CTA Text'
                                                        placeholder='e.g. Contact Us'
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
                                                        label='CTA Link'
                                                        placeholder='e.g. /contact'
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
                            <Card className='mbe-4'>
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
                                                        placeholder='Section Heading'
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
                                                        rows={3}
                                                        label='Paragraph'
                                                        placeholder='Description...'
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Metadata */}
                        <Grid size={{ xs: 12 }}>
                            <Card className='mbe-4'>
                                <CardHeader title='SEO Metadata' />
                                <CardContent>
                                    <Grid container spacing={5}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Controller
                                                name='metaTitle'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label='Meta Title'
                                                        placeholder='Browser tab title'
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Controller
                                                name='metaDescription'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label='Meta Description'
                                                        placeholder='SEO Description'
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12 }}> <Divider /> </Grid>

                        {/* Project Details */}
                        <Grid size={{ xs: 12 }}>
                            <Card className='mbe-4'>
                                <CardHeader title='Project Details' />
                                <CardContent>
                                    <Grid container spacing={5}>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                            <Controller
                                                name='area'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth label='Area' placeholder='e.g. 5000 sq ft' />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                            <Controller
                                                name='budget'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth label='Budget' placeholder='e.g. $1M' />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                            <Controller
                                                name='duration'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth label='Duration' placeholder='e.g. 6 Months' />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                            <Controller
                                                name='type'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth label='Type' placeholder='e.g. Commercial' />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                            <Controller
                                                name='architect'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth label='Architect' placeholder='e.g. John Doe' />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                            <Controller
                                                name='status'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth label='Status' placeholder='e.g. Completed' />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Project Descriptions & Images */}
                        <Grid size={{ xs: 12 }}>
                            <Card className='mbe-4'>
                                <CardHeader title='Project Descriptions & Images' />
                                <CardContent>
                                    <Grid container spacing={5}>
                                        {/* Concept */}
                                        <Grid size={{ xs: 12 }}><Typography variant='subtitle1' className='font-bold'>Concept</Typography></Grid>
                                        <Grid size={{ xs: 12, md: 8 }}>
                                            <Controller
                                                name='conceptDescription'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth multiline rows={3} label='Concept Description' />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Controller
                                                name='conceptImage'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth label='Concept Image URL' helperText='Or upload below' />
                                                )}
                                            />
                                        </Grid>

                                        {/* Challenge */}
                                        <Grid size={{ xs: 12 }}><Typography variant='subtitle1' className='font-bold'>Challenge</Typography></Grid>
                                        <Grid size={{ xs: 12, md: 8 }}>
                                            <Controller
                                                name='challengeDescription'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth multiline rows={3} label='Challenge Description' />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Controller
                                                name='challengeImage'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth label='Challenge Image URL' helperText='Or upload below' />
                                                )}
                                            />
                                        </Grid>

                                        {/* Solution */}
                                        <Grid size={{ xs: 12 }}><Typography variant='subtitle1' className='font-bold'>Solution</Typography></Grid>
                                        <Grid size={{ xs: 12, md: 8 }}>
                                            <Controller
                                                name='solutionDescription'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth multiline rows={3} label='Solution Description' />
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Controller
                                                name='solutionImage'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth label='Solution Image URL' helperText='Or upload below' />
                                                )}
                                            />
                                        </Grid>

                                        {/* Vision */}
                                        <Grid size={{ xs: 12 }}><Typography variant='subtitle1' className='font-bold'>Vision</Typography></Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <Controller
                                                name='visionDescription'
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField {...field} fullWidth multiline rows={3} label='Vision Description' />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12 }}> <Divider /> </Grid>

                        {/* Galleries */}
                        <Grid size={{ xs: 12 }}>
                            <Card className='mbe-4'>
                                <CardHeader title='Galleries' />
                                <CardContent>
                                    <Grid container spacing={5}>
                                        {/* Interior Images */}
                                        <Grid size={{ xs: 12 }}>
                                            <Typography variant='subtitle1' className='mbe-2'>Interior Images</Typography>
                                            <Controller
                                                name='interiorImages'
                                                control={control}
                                                render={({ field }) => (
                                                    <div className='flex flex-col gap-4'>
                                                        <Button component='label' variant='outlined' className='is-fit'>
                                                            Upload Interior Images
                                                            <input
                                                                hidden
                                                                type='file'
                                                                multiple
                                                                accept='image/*'
                                                                onChange={async (event) => {
                                                                    const { files } = event.target

                                                                    if (files && files.length > 0) {
                                                                        const newImages = await Promise.all(Array.from(files).map(file => fileToBase64(file)))

                                                                        field.onChange([...(field.value || []), ...newImages])
                                                                    }
                                                                }}
                                                            />
                                                        </Button>
                                                        <div className='flex gap-4 flex-wrap'>
                                                            {(field.value || []).map((img, index) => (
                                                                <div key={index} className='relative is-24 bs-24 border rounded'>
                                                                    <img src={img} alt={`interior-${index}`} className='is-full bs-full object-cover rounded' />
                                                                    <IconButton
                                                                        size='small'
                                                                        color='error'
                                                                        className='absolute -block-2 -inline-end-2 bg-background-paper shadow-md'
                                                                        onClick={() => {
                                                                            const newImages = field.value.filter((_, i) => i !== index)

                                                                            field.onChange(newImages)
                                                                        }}
                                                                    >
                                                                        <i className='ri-close-line' />
                                                                    </IconButton>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}><Divider /></Grid>
                                        {/* Exterior Images */}
                                        <Grid size={{ xs: 12 }}>
                                            <Typography variant='subtitle1' className='mbe-2'>Exterior Images</Typography>
                                            <Controller
                                                name='exteriorImages'
                                                control={control}
                                                render={({ field }) => (
                                                    <div className='flex flex-col gap-4'>
                                                        <Button component='label' variant='outlined' className='is-fit'>
                                                            Upload Exterior Images
                                                            <input
                                                                hidden
                                                                type='file'
                                                                multiple
                                                                accept='image/*'
                                                                onChange={async (event) => {
                                                                    const { files } = event.target

                                                                    if (files && files.length > 0) {
                                                                        const newImages = await Promise.all(Array.from(files).map(file => fileToBase64(file)))

                                                                        field.onChange([...(field.value || []), ...newImages])
                                                                    }
                                                                }}
                                                            />
                                                        </Button>
                                                        <div className='flex gap-4 flex-wrap'>
                                                            {(field.value || []).map((img, index) => (
                                                                <div key={index} className='relative is-24 bs-24 border rounded'>
                                                                    <img src={img} alt={`exterior-${index}`} className='is-full bs-full object-cover rounded' />
                                                                    <IconButton
                                                                        size='small'
                                                                        color='error'
                                                                        className='absolute -block-2 -inline-end-2 bg-background-paper shadow-md'
                                                                        onClick={() => {
                                                                            const newImages = field.value.filter((_, i) => i !== index)

                                                                            field.onChange(newImages)
                                                                        }}
                                                                    >
                                                                        <i className='ri-close-line' />
                                                                    </IconButton>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}><Divider /></Grid>
                                        {/* Plans Images */}
                                        <Grid size={{ xs: 12 }}>
                                            <Typography variant='subtitle1' className='mbe-2'>Plans Images</Typography>
                                            <Controller
                                                name='plansImages'
                                                control={control}
                                                render={({ field }) => (
                                                    <div className='flex flex-col gap-4'>
                                                        <Button component='label' variant='outlined' className='is-fit'>
                                                            Upload Plans Images
                                                            <input
                                                                hidden
                                                                type='file'
                                                                multiple
                                                                accept='image/*'
                                                                onChange={async (event) => {
                                                                    const { files } = event.target

                                                                    if (files && files.length > 0) {
                                                                        const newImages = await Promise.all(Array.from(files).map(file => fileToBase64(file)))

                                                                        field.onChange([...(field.value || []), ...newImages])
                                                                    }
                                                                }}
                                                            />
                                                        </Button>
                                                        <div className='flex gap-4 flex-wrap'>
                                                            {(field.value || []).map((img, index) => (
                                                                <div key={index} className='relative is-24 bs-24 border rounded'>
                                                                    <img src={img} alt={`plans-${index}`} className='is-full bs-full object-cover rounded' />
                                                                    <IconButton
                                                                        size='small'
                                                                        color='error'
                                                                        className='absolute -block-2 -inline-end-2 bg-background-paper shadow-md'
                                                                        onClick={() => {
                                                                            const newImages = field.value.filter((_, i) => i !== index)

                                                                            field.onChange(newImages)
                                                                        }}
                                                                    >
                                                                        <i className='ri-close-line' />
                                                                    </IconButton>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}><Divider /></Grid>
                                        {/* Gallery Images */}
                                        <Grid size={{ xs: 12 }}>
                                            <Typography variant='subtitle1' className='mbe-2'>Gallery Images</Typography>
                                            <Controller
                                                name='galleryImages'
                                                control={control}
                                                render={({ field }) => (
                                                    <div className='flex flex-col gap-4'>
                                                        <Button component='label' variant='outlined' className='is-fit'>
                                                            Upload Gallery Images
                                                            <input
                                                                hidden
                                                                type='file'
                                                                multiple
                                                                accept='image/*'
                                                                onChange={async (event) => {
                                                                    const { files } = event.target

                                                                    if (files && files.length > 0) {
                                                                        const newImages = await Promise.all(Array.from(files).map(file => fileToBase64(file)))

                                                                        field.onChange([...(field.value || []), ...newImages])
                                                                    }
                                                                }}
                                                            />
                                                        </Button>
                                                        <div className='flex gap-4 flex-wrap'>
                                                            {(field.value || []).map((img, index) => (
                                                                <div key={index} className='relative is-24 bs-24 border rounded'>
                                                                    <img src={img} alt={`gallery-${index}`} className='is-full bs-full object-cover rounded' />
                                                                    <IconButton
                                                                        size='small'
                                                                        color='error'
                                                                        className='absolute -block-2 -inline-end-2 bg-background-paper shadow-md'
                                                                        onClick={() => {
                                                                            const newImages = field.value.filter((_, i) => i !== index)

                                                                            field.onChange(newImages)
                                                                        }}
                                                                    >
                                                                        <i className='ri-close-line' />
                                                                    </IconButton>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Specifications Section */}
                        <Grid size={{ xs: 12 }}>
                            <Card className='mbe-4'>
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
                                                No specifications added yet. Click &quot;Add Item&quot; to start.
                                            </Typography>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Testimonial Section */}
                        <Grid size={{ xs: 12 }}>
                            <Card className='mbe-4'>
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
                                                        rows={3}
                                                        label='Testimonial Text'
                                                        placeholder='Enter customer testimonial...'
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
                                                        label='Author'
                                                        placeholder='e.g. John Doe, CEO'
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12 }}> <Divider /> </Grid>

                        {/* Related Content */}
                        <Grid size={{ xs: 12 }}>
                            <Typography variant='h6' className='mbe-2'>Related Content</Typography>
                            <PartsRelated
                                partsData={relatedContentValue}
                                onSave={handleRelatedContentSave}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }} className='flex justify-end pt-5'>
                            <Button variant='contained' size='large' type='submit'>
                                Save Project
                            </Button>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </form>
    )
}

export default ProductPageEditor
