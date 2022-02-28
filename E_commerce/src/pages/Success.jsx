import React from 'react'
import styled from "styled-components";
import Footer from "../components/Footer";
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import { userRequest } from '../requestMethods';
import ReactLoading from 'react-loading';
import Product from '../components/Product';

const Container = styled.div`
postion: relative;
`;

const LoadingWrapper = styled.div`
height: 50vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;

const Title = styled.h1`
flex: 1;
align-self: center;
padding: 10px 0px;
`;

const OrderDetails = styled.div`
padding: 20px;
`;

const Middle = styled.div`
padding: 20px;
display: flex;
flex-direction: column;`;

const ProductsContainer = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
border-bottom: 3px solid #eee;

`;

const Item = styled.span`
display: flex;
flex-direction: row;`;

const ProductDetails = styled.span`
display: flex;
flex: 4;
flex-direction: column;
line-height: 3;
padding: 20px;
`;

const ProductName = styled.span`

`;

const Color = styled.div`

`;

const Price = styled.div``;

const Quantity = styled.div``;

const Bottom = styled.div`
padding: 20px;
`;

const AddressHeading = styled.div`
font-weight: 600;
padding: 20px;
`;

const AddressDetails = styled.div`
padding-left: 40px;
`;

const StyledLink = styled(Link)`
text-decoration: none;
color: black;
align-self: center;

&:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
}
`;

const Button = styled.button`
padding: 10px;
margin: 20px;
font-weight: 600;
cursor: pointer;
border: none;
background-color: black;
color: white;
`;


const Success = () => {
    const location = useLocation();
    const data = location.state.stripeData;
    const cart = location.state.cart;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("/orders", {
                    userId: currentUser._id,
                    products: cart.products.map((item) => ({
                        productId: item._id,
                        quantity: item._quantity,
                    })),
                    amount: cart.total,
                    address: data.billing_details.address,
                });
                setOrderId(res.data._id);
            } catch (err) {
                console.log(err);
            }
        };
        data && createOrder();
    }, [cart, data, currentUser]);


    return (
        <Container>
            <Navbar />
            <Announcement />
            {orderId ? 
            <Wrapper>
                <Title>        
                    Order Received!
                </Title> 
                <OrderDetails>
                <b>Order Number:</b> {orderId}
                </OrderDetails>
                <OrderDetails>
                <b>Order Total:</b> £ {cart.total}
                </OrderDetails>
                <Middle>
                    <b>Products:</b>
                    {cart.products.map((item, idx) => (
                    <ProductsContainer key={idx} >
                        <Item>
                        <Product item={item} /> 
                        <ProductDetails>
                            <ProductName>
                                <b>Item:</b> {item.title}
                            </ProductName>
                            <Color>
                                <b>Color:</b> {item.color ? item.color : "N/A"}
                            </Color>
                            <Quantity>
                                <b>Quantity:</b> {item.quantity}
                            </Quantity>
                            <Price>
                                <b>Price:</b> {item.price}
                            </Price>
                        </ProductDetails>
                        </Item>
                    </ProductsContainer>
                    ))
                    }
                </Middle>
                <Bottom>
                    <b>Delivery Address:</b>
                    <AddressHeading>
                    Line 1:
                    </AddressHeading>
                <AddressDetails>
                    {data.billing_details.address.line1}
                </AddressDetails>
                    <AddressHeading>
                    Line 2:
                    </AddressHeading>
                <AddressDetails>
                    {data.billing_details.address.line2}
                </AddressDetails>
                    <AddressHeading>
                    Post Code:
                    </AddressHeading>
                <AddressDetails>
                    {data.billing_details.address.postal_code}
                </AddressDetails>
                    <AddressHeading>
                    City:
                    </AddressHeading>
                <AddressDetails>
                    {data.billing_details.address.city}
                </AddressDetails>
                    <AddressHeading>
                    Country: 
                    </AddressHeading>
                <AddressDetails>
                    {data.billing_details.address.country}
                </AddressDetails>

                </Bottom>
                <StyledLink to={'/'}>
                <Button>CONTINUE SHOPPING</Button>
                </StyledLink>
            </Wrapper>
            :
            <LoadingWrapper>
                Your order is being created, please wait...
                <ReactLoading type={'spin'} color={'#0d0d0d'} delay={10} />
            </LoadingWrapper>
            }
            <Footer />
        </Container>
    )
}

export default Success
