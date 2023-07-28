import { Button, Container, Typography } from "@mui/material"

function Content() {
    return (
     <div>
      <Container>

    <Container sx={{display:'flex'}}>
        <Container>
<Typography>ЭЛЕКТРОННАЯ РЕГИСТРАТУРА</Typography>
<Typography>Сервис позволяет записаться на приём к врачу в поликлинику, перенести и отменить запись к врачу, просматривать направления, записаться на приём по направлению, просматривать рецепты.</Typography>
       <Container>
        <Button variant="outlined">АВТОРИЗОВАТЬСЯ</Button>
        <Button variant="outlined">ЗАРЕГИСТРИРОВАТЬСЯ</Button>
       </Container>
       <Button variant="outlined">Записаться на приём</Button>
       </Container>
       <Container sx={{
            backgroundImage: `url("../assets/images/main-image.png")`,
    backgroundSize: "cover",
    backgroundPosition: "right",
     height: "400px",
     width: "100%"
            }}>
        </Container>
        </Container>

{/* Вторая часть сonteta */}
        <Container sx={{display:"flex"}}>
<Container sx={{width:"293px"}}>
    <Typography>НАШИ ВРАЧИ</Typography>
    <Typography>Специализация, опыт работы, образование</Typography>
    <Container sx={{
            backgroundImage: `url("../assets/images/main-doctor.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
     height: "405px",
     width: "100%"
            }}></Container>
</Container>

<Container sx={{width:"293px"}}>
    <Typography>ОТЗЫВЫ</Typography>
    <Typography>Рейтинг, отзывы, стоимость приема</Typography>
    <Container sx={{
            backgroundImage: `url("../assets/images/main-doctor-women.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
     height: "405px",
     width: "100%"
            }}></Container>
</Container>


<Container sx={{width:"293px"}}>
    <Typography>ИНФОРМАЦИЯ О КЛИНИКИ</Typography>
    <Typography>Адрес клиники, фотографии, схема проезда</Typography>
    <Container sx={{
            backgroundImage: `url("../assets/images/main-flat.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
     height: "405px",
     width: "100%"
            }}></Container>
</Container>

        </Container>


      </Container>
     </div>
    )
}

export default Content