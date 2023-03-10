import './Home.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { ContextFunction } from '../../Context/Context'
import CategoryCard from '../../Components/Category_Card/CategoryCard';
import BannerData from '../../Helpers/HomePageBanner';
import Carousel from '../../Components/Carousel/Carousel'
const HomePage = () => {
    const { setCart } = useContext(ContextFunction)
    let authToken = localStorage.getItem('Authorization')
    useEffect(() => {
        getCart()
        window.scroll(0, 0)
    }, [])
    const getCart = async () => {
        if (authToken !== null) {
            const { data } = await axios.get(`${process.env.REACT_APP_GET_CART}`,
                {
                    headers: {
                        'Authorization': authToken
                    }
                })
            setCart(data);
        }

    }

    return (
        <>
            <Container maxWidth='xl' style={{ display: 'flex', justifyContent: "center", padding: 0, flexDirection: "column",marginBottom:70 }}>
                <Box padding={1}>
                    <Carousel />
                </Box>
                <Typography variant='h3' sx={{textAlign:'center',marginTop:10,color:'#1976d2',fontWeight:'bold'}}>Categories</Typography>
                <Container maxWidth='xl' style={{ marginTop: 90, display: "flex", justifyContent: 'center', flexGrow: 1, flexWrap: 'wrap',  gap: 20, }}>
                    {
                        BannerData.map(data => (
                            <CategoryCard data={data} key={data.img} />
                        ))
                    }
                </Container>
            </Container>
        </ >
    )
}

export default HomePage