import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Box from '@mui/joy/Box';
import { Breadcrumbs, Container, Link } from '@mui/material';
import UserReports from '../../components/default/index';
import './analytics.css';

export default function Home() {
  return (
    <Container>
       
            {/* Page Title */}
            <h1 className="text-2xl font-bold">Analytics</h1>


            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                Analytics
              </Link>
              
            </Breadcrumbs>
          </Box>

      {/* Products View */}
      <UserReports />
    </Container>
  );
}
