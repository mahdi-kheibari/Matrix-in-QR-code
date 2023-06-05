import { Helmet } from 'react-helmet-async';
// @mui
import Container from '@mui/material/Container';
import { Box } from '@mui/material';


export default function ScanPage() {
  return (
    <>
      <Helmet>
        <title> QR code | Scan </title>
      </Helmet>
      <Container sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {/*  */}
      </Container>
    </>
  );
}
