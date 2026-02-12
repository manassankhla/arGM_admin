// React Imports


// Next Imports


// MUI Imports
import Grid from '@mui/material/Grid2'

// Type Imports


// Component Imports
import UserLeftOverview from '@views/apps/user/view/user-left-overview'

// Data Imports


/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/pages/pricing` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getPricingData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/pages/pricing`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
} */

const UserViewTab = async () => {
  // Vars

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, lg: 12, md: 12 }}>
        <UserLeftOverview />
      </Grid>

    </Grid>
  )
}

export default UserViewTab
