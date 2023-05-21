import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Footer from "../../components/Footer";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

const CollectionCard = ({ id, image, title, description, price }) => (
  <Grid
    xs={12}
    sm={6}
    md={12}
    sx={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Card
      sx={{
        display: "flex",
        maxWidth: { xs: 300, md: "100%" },
        flexDirection: {
          xs: "column",
          md: "row",
        },
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        alignContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          height: "100%",
          justifyContent: "space-start",
          alignContent: "space-between",
        }}
      >
        <CardMedia
          sx={{ height: 200, width: { xs: "100%", md: 200 } }}
          alt="collection sample"
          image={`/images/sample/${image}`}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Box>

      <CardActions sx={{ m: { xs: "auto", md: "0px 15px" } }}>
        <Button
          size="small"
          variant="outlined"
          sx={{
            fontWeight: "bold",
            color: "#e78686",
            borderColor: "#e78686",
          }}
        >
          <Link
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            to={`/collections/${id}`}
          >
            View Items
          </Link>
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

function Collections() {
  return (
    <Box>
      <Box
        sx={{
          background: `url("/images/slider3.png") center center / cover no-repeat`,
          height: "60vh",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&::before": {
            content: '""',
            display: "block",
            width: "100%",
            backgroundColor: "rgba(7,6,29,0.14)",
            top: 0,
            left: 0,
            zIndex: 1,
            height: "100%",
            position: "absolute",
          },
        }}
      />
      <Container>
        <Typography variant="h2" textAlign="center">
          Collections
        </Typography>
        <Grid container spacing={3} mt={5}>
          <CollectionCard
            id={0}
            image={"collection.jpg"}
            title={"Sample Title  Sample Title Sample Title"}
            description={"sample description"}
            price={100}
          />
          <CollectionCard
            id={1}
            image={"collection.jpg"}
            title={"Sample Title  Sample Title Sample Title"}
            description={
              "sample description sample description sample description sample description sample description "
            }
            price={100}
          />
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default Collections;