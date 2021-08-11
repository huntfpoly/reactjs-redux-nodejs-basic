import React from 'react';
import ProductApi from '../../apis/ProductApi';
//
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  Alert,
  CardActionArea,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Slider,
  Snackbar,
  Toolbar
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addToCard } from '../../feautures/cart/cartSlice';
import CategoryApi from '@/apis/CategoryApi';
import { Box } from '@material-ui/system';
const Product = () => {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);

  const minDistance = 10;
  const [filterPrice, setFilterPrice] = React.useState([0, 0]);
  // const a = useSelector((state) => state.card);
  const dispatch = useDispatch();
  // console.log(a);
  React.useEffect(() => {
    (async function () {
      const { data } = await ProductApi.getAll({});
      const { data: listCategory } = await CategoryApi.getAll();
      setProducts(data.docs);
      setCategories(listCategory);
      const min = data.docs.reduce((acc, shot) => (acc = acc < shot.price ? acc : shot.price), 0);
      const max = data.docs.reduce((acc, shot) => (acc = acc > shot.price ? acc : shot.price), 0);
      setMinPrice(min);
      setMaxPrice(max);
      setFilterPrice([min, max]);
    })();
  }, []);

  // add to card
  const handleAddToCard = async (product) => {
    const action = addToCard(product);
    await dispatch(action);
    setIsOpen(true);
  };

  // filter by category
  const handleSelectCategory = async (id) => {
    const { data } = await ProductApi.getByCategoryId(id);
    setProducts(data);
    // console.log(data);
  };
  // filter by price

  const handleChangeFilterPrice = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setFilterPrice([Math.min(newValue[0], filterPrice[1] - minDistance), filterPrice[1]]);
    } else {
      setFilterPrice([filterPrice[0], Math.max(newValue[1], filterPrice[0] + minDistance)]);
    }
  };

  const handleFilterByPrice = async () => {
    const { data } = await ProductApi.getAll({
      price_lte: filterPrice[1],
      price_gte: filterPrice[0]
    });
    setProducts(data.docs);
    console.log(data.docs);
  };
  return (
    <React.Fragment>
      {!products.length ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Toolbar>
                <Typography variant="h2" color="grey.700">
                  Category
                </Typography>
              </Toolbar>
              <Divider />
              <List>
                {categories &&
                  categories.map((item) => (
                    <ListItem
                      button
                      key={item._id}
                      onClick={() => {
                        handleSelectCategory(item._id);
                      }}
                    >
                      <ListItemText primary={item.name} />
                    </ListItem>
                  ))}
              </List>
              <Toolbar>
                <Typography variant="h2" color="grey.700">
                  Filter By Price
                </Typography>
              </Toolbar>
              <Divider />

              <Box sx={{ width: '100%', display: 'flex' }}>
                <Slider
                  getAriaLabel={() => 'Minimum distance'}
                  value={filterPrice}
                  onChange={handleChangeFilterPrice}
                  min={minPrice}
                  max={maxPrice}
                  valueLabelDisplay="on"
                />
                <Button onClick={() => handleFilterByPrice()}>filter</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                {products.length > 0 &&
                  products.map((product) => (
                    <Grid item xs={4} key={product._id}>
                      <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 4 }}>
                        <CardActionArea>
                          <CardMedia sx={{ height: 140 }} image={product.photo} title={product.name} />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {product.name}
                            </Typography>
                            <Typography variant="body2" color="secondary">
                              {product.price}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              handleAddToCard(product);
                            }}
                          >
                            Add to card
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
      <Snackbar
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        autoHideDuration={6000}
      >
        <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
          Thêm sản phẩm vào giỏ hàng thành công
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Product;
