import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate, Link } from "react-router-dom";
import { decrementQuantity, incrementQuantity, removeProduct } from "../redux/cartRedux";


const KEY = process.env.REACT_APP_STRIPE_KEY;

const Container = styled.div``;

const Wrapper = styled.div`
padding: 20px;
${mobile({ padding: "10px"})}

`;

const Title = styled.h1`
font-weight: 300;
text-align: center;
`;

const Top = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 20px;
`;

const TopButton = styled.button`
padding: 10px;
margin: 20px;
font-weight: 600;
cursor: pointer;
border: ${props=>props.type === "filled" && "none"};
background-color: ${props=>
    props.type === "filled" ? "black" : "transparent"};
color: ${props=>props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
${mobile({ display: "none"})}

`;
const TopText = styled.span`
text-decoration: underline;
cursor: pointer;
margin: 0px 10px;
`;


const Bottom = styled.div`
display: flex;
justify-content: space-between;
${mobile({ flexDirection: "column"})}

`;

const Info = styled.div`
flex: 3;
`;

const Product = styled.div`
border-bottom: 3px solid #eee;
margin-bottom: 30px;
padding-bottom: 30px;
display: flex;
justify-content: space-between;
${mobile({ flexDirection: "column"})}
`;

const ProductDetail = styled.div`
flex: 2;
display: flex;
`;

const Image = styled.img`
width: 150px;
`;

const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props=>props.color};
border: 1px solid black;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
flex: 2;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;

const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`;

const ProductAmount = styled.div`
font-size: 24px;
margin: 5px;
${mobile({ margin: "5px 15px"})}

`;

const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
${mobile({ marginBottom: "20px"})}

`;

const Summary = styled.div`
flex: 1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;
height: 50vh;
`;

const SummaryTitle = styled.h1`
font-weight: 200;
`;

const SummaryItem = styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between;
font-weight: ${props=>props.type === "total" && "500"};
font-size: ${props=>props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`

`;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
width: 100%;
padding: 10px;
background-color: black;
color: white;
font-weight: 600;
`;

const DeleteButton = styled.button`
padding: 10px;
background-color: black;
margin-top: 10px;
color: white;
font-weight: 600;
`;

const StyledLink = styled(Link)`
text-decoration: none;
color: black;

&:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
}
`;


const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onToken = (token) =>{
        setStripeToken(token);
    };

        const handleRemove = (idx) => {
            dispatch(removeProduct(idx));
        };    

        const handleIncrement = (idx) => {
            dispatch(incrementQuantity(idx));
        };

        const handleDecrement = (idx) => {
            if(cart.products[idx].quantity === 1) {
                dispatch(removeProduct(idx));
            } else {
                dispatch(decrementQuantity(idx));
            }
        };

    useEffect(()=>{
        const makeRequest = async ()=>{
            try{
                const res = await userRequest.post("/checkout/payment", {
                tokenId: stripeToken.id,
                amount: cart.total*100,
            });
            navigate("/success", {state:{
                stripeData: res.data,
                cart: cart
        }});
            }catch{}
        };
        stripeToken && cart.total >= 1 && makeRequest();
    }, [stripeToken, cart, navigate]);


    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>{ cart.products.length > 0 ? "YOUR BASKET" : "YOUR BASKET IS EMPTY!" } </Title>
                <Top>
                    <StyledLink to={'/'}>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    </StyledLink>
                    <TopTexts>
                        <StyledLink to={`/wishlist`}>
                        <TopButton>WISH LIST</TopButton>
                        </StyledLink>
                    </TopTexts>
                </Top>
                {cart.products.length > 0 ? 
                <Bottom>
                    <Info>
                    {cart.products?.map((product, idx)=>(
                        <Product key={idx}>
                            <ProductDetail>
                                <Image src={product.img} />
                                <Details>
                                    <ProductName><b>Item: </b>{product.title}</ProductName>
                                    <ProductId><b>ID: </b>{product._id}</ProductId>
                                    <ProductColor color={product.color}/>
                                    <ProductSize><b>Size: </b>{product.size}</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Remove onClick={() => handleDecrement(idx)}/>
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                    <Add onClick={() => handleIncrement(idx)}/>
                                </ProductAmountContainer>
                                <ProductPrice>£ {product.price*product.quantity}</ProductPrice>
                                <DeleteButton onClick={() => handleRemove(idx)} id={product._id}>REMOVE</DeleteButton>
                            </PriceDetail>
                        </Product>
                    ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>£ {cart.total}</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>£ 5.99</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>£ -5.99</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>£ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="SHOP."
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}.`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey={KEY}
                            currency="GBP"
                        >
                            <Button>CHECKOUT</Button>
                            </StripeCheckout> 
                    </Summary>
                </Bottom> : "" }
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
