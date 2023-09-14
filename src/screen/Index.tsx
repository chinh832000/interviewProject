import {
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IProductItem } from "../services/@type";
import product from "../services/product";

function Index() {
  const [productRender, setProductRender] = useState<IProductItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFiler] = useState({
    skip: 0,
    limit: 20,
  });
  const [valueSearch, setValueSearch] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [filter]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
    } else {
      const newFilter = { ...filter, skip: filter.skip + filter.limit, limit: 20 };
      setFiler(newFilter);
    }
  };

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await product.getListProduct(filter);
      const productList = [...productRender, ...response.data.products];
      setIsLoading(false);
      setProductRender(productList);
    } catch (error) {
      // TypeError: Failed to fetch
      console.log("There was an error", error);
    }
  };
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await product.searchProduct(valueSearch);
      setIsLoading(false);
      setProductRender(response.data.products);
    } catch (error) {
      setIsLoading(false);
      // TypeError: Failed to fetch
      console.log("There was an error", error);
    }
  };

  const renderItem = (item: IProductItem) => {
    return (
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <Card elevation={20}>
          <CardContent sx={{ display: "flex", flexDirection: "column", height: 450 }}>
            <Typography fontWeight={"bold"} marginBottom={5}>
              {item.title}
            </Typography>
            <img
              src={`${item.images[0]}`}
              alt={item.title}
              loading="lazy"
              style={{ height: "160px", width: "160px", alignSelf: "center" }}
            />
            <Typography marginTop={5}>{item.description}</Typography>
            <Grid display={"flex"}>
              <Typography fontStyle={"600"}>Price:</Typography>
              <Typography marginX={1}>{item.price}</Typography>
            </Grid>
            <Rating name="read-only" value={item.rating} readOnly precision={0.5} />
          </CardContent>
        </Card>
      </Grid>
    );
  };
  return (
    <>
      {isLoading && <LinearProgress sx={{ width: "100%", position: "fixed", top: 0 }} />}
      <Grid
        container
        sx={{
          padding: "2em 11em",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TextField
          sx={{ flex: 1, marginRight: 1 }}
          hiddenLabel
          id="filled-hidden-label-normal"
          placeholder="Find your product"
          variant="filled"
          value={valueSearch}
          onChange={(e) => setValueSearch(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            handleSearch();
          }}
        >
          Search
        </Button>
      </Grid>
      <Grid container spacing={2} sx={{ width: "100%", padding: "5em 10em" }}>
        {productRender.map((el) => renderItem(el))}
      </Grid>
    </>
  );
}

export default Index;
