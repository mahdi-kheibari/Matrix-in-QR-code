import React from "react";
import { Box, Button } from "@mui/material";

const AppFooter = () => {
  return (
    <Box sx={{ py: 1, borderTop: "1px solid", borderColor: "grey.500", display: "flex", justifyContent: "center" }}>
      <Button component='a' href="https://github.com/mahdi-kheibari/Matrix-in-QR-code" variant="text" color="secondary" sx={{ textTransform: "initial" }}>
        View on GitHub
      </Button>
    </Box>
  );
};

export default AppFooter;