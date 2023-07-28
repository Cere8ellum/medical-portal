import { AppBar, Container, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material"
import BlueLine from "./BlueLine";
const navItems = ['Запись на приём', 'Список врачей', 'Контакты'];
function Header() {
    return (
        <div>
        <AppBar position="static" sx={{background:"#fff"}}>
            <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
                <Container sx={{display: "flex", cursor:"pointer"}}>
                <Typography sx={{
                    color: "#8095BD",
                    fontFamily: "Inter",
                    fontSize: "40px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal" 
                }}>
Medical
                </Typography>
                <Typography sx={{
                    background:"#8095BD",
                    color: "#fff",
                    fontFamily: "Inter",
                    fontSize: "40px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal" 
                }}>
 online
                </Typography>

                </Container>

                <List sx={{display:"flex"}}>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} sx={{whiteSpace:"nowrap",
              color: "#0A1C3E",
fontFamily: "Inter",
fontSize: "20px",
fontStyle: "normal",
fontWeight: "200",
lineHeight: "normal"
 }}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

            </Toolbar>
        </AppBar>
        <BlueLine></BlueLine>
        </div>
    )
}

export default Header