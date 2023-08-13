import { Box, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";

const Footer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box >
            <Typography>
                © 2019-{new Date().getFullYear()}{" "}
            </Typography>
        </Box>
    )
}
export default Footer;