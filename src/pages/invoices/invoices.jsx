import AddAlertIcon from '@mui/icons-material/AddAlert';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DescriptionIcon from '@mui/icons-material/Description';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import Box from '@mui/joy/Box';
import { Breadcrumbs, Button, Container, Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from '../../components/iconify';
import InvoicesTable from '../../components/invoices/invoicestable';
import './invoices.css';

export default function InvoicesPage() {
  const TotalInvoice = 20;
  const TotalInvoicePaid = 10;
  const TotalInvoicePending = 6;
  const TotalInvoiceOverdue = 2;
  const TotalInvoiceDraft = 2;
  return (
    <Container>
     
      <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <h1 className="text-2xl font-bold">
        Invoices
      </h1>
          </Box>

          <Box sx={{
            display: 'flex',
            mb: 5,
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
                        <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="./"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="primary"
                href="./analytics"
                sx={{ fontSize: 12, fontWeight: 500 }}
              >
                Invoices
              </Link>
              
            </Breadcrumbs>

      <Link to="/newProduct" style={{ textDecoration: 'none' }}>
      <Button variant="contained" className="new-product-button" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Invoice
          </Button>
      </Link>
       
          </Box>


          <Box sx={{ padding: 2 }}>
  <Stack direction="row" spacing={3} justifyContent="space-between" sx={{ mt: 5 }}>
    {/* Total Invoices */}
    <Box sx={{ display: 'flex', alignItems: 'center', borderRight: '1px solid rgba(255,255,255)', pr: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '2px solid #EB0101', // Matching border color with icon
          mr: 2,
        }}
      >
        <DescriptionIcon fontSize="large" sx={{ color: "#EB0101" }} />
      </Box>
      <Box>
        <Typography variant="h6">Total</Typography>
        <Typography variant="body1" color="grey">{TotalInvoice} Invoices</Typography>
        <Typography variant="h6">$46,218.04</Typography>
      </Box>
    </Box>

    {/* Paid Invoices */}
    <Box sx={{ display: 'flex', alignItems: 'center', borderRight: '1px solid rgba(255,255,255)', pr: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '2px solid #26710F', // Matching border color with icon
          mr: 2,
        }}
      >
        <AttachMoneyIcon fontSize="large" sx={{ color: "#26710F" }} />
      </Box>
      <Box>
        <Typography variant="h6">Paid</Typography>
        <Typography variant="body1" color="grey">{TotalInvoicePaid} Invoices</Typography>
        <Typography variant="h6">$23,110.23</Typography>
      </Box>
    </Box>

    {/* Pending Invoices */}
    <Box sx={{ display: 'flex', alignItems: 'center', borderRight: '1px solid rgba(255,255,255)', pr: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '2px solid #966638', // Matching border color with icon
          mr: 2,
        }}
      >
        <WorkHistoryIcon fontSize="large" sx={{ color: "#966638" }} />
      </Box>
      <Box>
        <Typography variant="h6">Pending</Typography>
        <Typography variant="body1" color="grey">{TotalInvoicePending} Invoices</Typography>
        <Typography variant="h6">$13,825.05</Typography>
      </Box>
    </Box>

    {/* Overdue Invoices */}
    <Box sx={{ display: 'flex', alignItems: 'center', borderRight: '1px solid rgba(255,255,255)', pr: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '2px solid #DFC729', // Matching border color with icon
          mr: 2,
        }}
      >
        <AddAlertIcon fontSize="large" sx={{ color: "#DFC729" }} />
      </Box>
      <Box>
        <Typography variant="h6">Overdue</Typography>
        <Typography variant="body1" color="grey">{TotalInvoiceOverdue} Invoices</Typography>
        <Typography variant="h6">$4,655.63</Typography>
      </Box>
    </Box>

    {/* Draft Invoices */}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '2px solid #074d8b', // Matching border color with icon
          mr: 2,
        }}
      >
        <DriveFileMoveIcon fontSize="large" sx={{ color: "#074d8b" }} />
      </Box>
      <Box>
        <Typography variant="h6">Draft</Typography>
        <Typography variant="body1" color="grey">{TotalInvoiceDraft} Invoices</Typography>
        <Typography variant="h6">$4,627.13</Typography>
      </Box>
    </Box>
  </Stack>
</Box>

      {/* Products View */}
      <div className="grid lg:grid-cols-1 md:grid-cols-4 gap-7 lg:gap-4 mt-10">
      <InvoicesTable />
      </div>
    </Container>
  );
}
