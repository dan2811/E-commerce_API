import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeProductFromWishlist } from "../redux/wishlistSlice";

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

const PriceDetail = styled.div`
flex: 2;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;

const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
${mobile({ marginBottom: "20px"})}

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


const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist);
    const dispatch = useDispatch();
    const handleRemove = (idx) => {
        dispatch(removeProductFromWishlist(idx));
    }
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>{ wishlist.products.length > 0 ? "YOUR WISHLIST" : "YOUR WISHLIST IS EMPTY!" } </Title>
                <Top>
                    <StyledLink to={'/'}>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    </StyledLink>
                    <TopTexts>
                        <StyledLink to={`/basket`}>
                        <TopButton>BASKET</TopButton>
                        </StyledLink>
                    </TopTexts>
                </Top>
                {wishlist.products.length > 0 ? 
                <Bottom>
                    <Info>
                    {wishlist.products?.map((product, idx)=>(
                        <Product key={idx}>
                            <ProductDetail>
                                <Image src={product.img} />
                                <Details>
                                    <ProductName>{product.title}</ProductName>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductPrice>£ {product.price}</ProductPrice>
                                <StyledLink to={`/product/${product._id}`}>
                                <DeleteButton>PRODUCT DETAILS</DeleteButton>
                                </StyledLink>
                                <DeleteButton onClick={() => handleRemove(idx)} id={product._id}>REMOVE</DeleteButton>
                            </PriceDetail>
                        </Product>
                    ))}
                    </Info>
                </Bottom> : "" }
            </Wrapper>
            <Footer />
        </Container>
    );
};

export default Wishlist;
