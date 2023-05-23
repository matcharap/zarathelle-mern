import {
  Box,
  Button,
  CardMedia,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../../features/apiSlice";
import { api_base_url } from "../../../app/base_url";

const Title = ({ title }) => (
  <Box>
    <Box m={1}>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
    </Box>
    <Divider />
  </Box>
);
const Info = ({ title, value }) => (
  <Box>
    <Box m={1}>
      <Typography>{title}</Typography>
      <Typography variant="body2" color="gray">
        {value}
      </Typography>
    </Box>
    <Divider />
  </Box>
);

function ProductsDetail() {
  const { id } = useParams();
  const {
    data: product = {},
    isLoading,
    isSuccess,
  } = useGetProductQuery(id);

  let content;
  if (isLoading) {
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
        }}
      >
        <CircularProgress size={150} />
      </Box>
    );
  } else if (isSuccess) {
    content = (
      <Box>
        <Typography variant="h4">Product Detail</Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ alignItems: { xs: "center", sm: "flex-end" } }}
        >
          <Box>
            <Typography variant="overline">Product ID: </Typography>
            <Chip label={id} size="small" />
          </Box>
          <Button
            variant="outlined"
            color="secondary"
            LinkComponent={Link}
            to={`/admin/products/${id}/update`}
          >
            <BorderColorOutlinedIcon sx={{ mr: 1, fontSize: 16 }} />
            Edit
          </Button>
        </Box>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "flex-start" },
          }}
        >
          <Box sx={{ alignSelf: "center" }}>
            <Paper sx={{ width: { xs: 200, md: 300 } }}>
              <CardMedia
                image={`${api_base_url}${product.image_url}`}
                sx={{
                  height: { xs: 200, md: 300 },
                  width: { xs: 200, md: 300 },
                }}
              />
            </Paper>
          </Box>
          <Paper
            elevation={3}
            sx={{ flexGrow: 1, ml: { md: 3 }, mt: { xs: 3, md: 0 } }}
          >
            <Title title="Details" />
            <Info title="Name" value={product.name} />
            <Info title="Description" value={product.description} />
            <Info title="Collection" value={product.collection_id.title} />
            <Info title="Category" value={product.category} />
            <Info title="Stocks" value={product.stocks} />
            <Info title="No. of Sold" value={product.num_sold} />
          </Paper>
        </Box>
      </Box>
    );
  }

  return <Box>{content}</Box>;
}

export default ProductsDetail;
