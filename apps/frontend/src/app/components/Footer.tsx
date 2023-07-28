import { Button, Container, TextField, Typography } from "@mui/material"

function Footer() {
    return (
     <div>
      <Container sx={{display: "flex",
      alignItems: "center",
       background: "#3D537C",
       justifyContent:"space-between",
       height:"155px"}}>


<Container>
<Container sx={{display:"flex"}}>
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

<Typography sx={{color: "#fff"}}> &copy;2023 ЭЛЕКТРОННАЯ РЕГИСТРАТУРА</Typography>
</Container>


<Container>
<Button variant="outlined" sx={{background:"#fff"}}>Подписаться</Button>

        <TextField
          label="Email"
          id="outlined-size-small"
          defaultValue="Email"
          size="small"
sx={{background:"#fff", marginLeft:"37px"}}
        />
      
</Container>



      </Container>
     </div>
    )
}

export default Footer