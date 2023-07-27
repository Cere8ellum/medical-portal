import { AppBar, Toolbar, Typography } from "@mui/material"

function Header() {
    return (
        <AppBar>
            <Toolbar>
                <Typography sx={{color: "red"}}>
Medical online
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header