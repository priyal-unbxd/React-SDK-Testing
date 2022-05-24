import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../context/context.js';
import { CATEGORY_TYPE } from '../constants/index.js';
import unbxdSearchConfig from '../unbxd-search.config.json';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Product(props) {
  const { state, dispatch } = useContext(AppContext);
  let params = useParams();

  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(
      `https://search.unbxd.io/${unbxdSearchConfig.apiKey}/${unbxdSearchConfig.siteKey}/search?q=*&filter=uniqueId:${params.productId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const {
          response: { products },
        } = data;
        setProduct(products[0]);
      });
  }, []);
  
  return (
    <section className="product-wrapper">
      {product ? (
        <Card>
          <CardHeader title={product.title} />
          <CardMedia
            component="img"
            image={product.imageUrl[0]}
            alt={product.description}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Skeleton animation="wave" />
      )}
    </section>
  );
}
