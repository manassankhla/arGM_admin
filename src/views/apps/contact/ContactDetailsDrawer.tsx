// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Type Imports
import type { ContactType } from '@/types/apps/ecommerceTypes'

type Props = {
    open: boolean
    handleClose: () => void
    data: ContactType | null
}

const ContactDetailsDrawer = ({ open, handleClose, data }: Props) => {
    if (!data) return null

    return (
        <Drawer
            open={open}
            anchor='right'
            variant='temporary'
            onClose={handleClose}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
        >
            <div className='flex items-center justify-between pli-5 plb-4'>
                <Typography variant='h5'>Contact Details</Typography>
                <IconButton size='small' onClick={handleClose}>
                    <i className='ri-close-line text-2xl' />
                </IconButton>
            </div>
            <Divider />
            <div className='p-5 flex flex-col gap-6'>

                {/* Contact Information */}
                <div className='flex flex-col gap-4'>
                    <div>
                        <Typography variant='caption' className='uppercase' color='text.disabled'>Name</Typography>
                        <Typography variant='body1' color='text.primary'>
                            {data.title} {data.firstName} {data.surname}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant='caption' className='uppercase' color='text.disabled'>Email</Typography>
                        <Typography variant='body1' color='text.primary'>{data.email}</Typography>
                    </div>

                    <Divider />

                    <div>
                        <Typography variant='caption' className='uppercase' color='text.disabled'>Subject</Typography>
                        <Typography variant='body1' color='text.primary'>{data.subject}</Typography>
                    </div>

                    <div>
                        <Typography variant='caption' className='uppercase' color='text.disabled'>Message</Typography>
                        <Typography variant='body1' color='text.primary' className='whitespace-pre-wrap'>{data.message}</Typography>
                    </div>
                </div>

            </div>
        </Drawer>
    )
}

export default ContactDetailsDrawer
