import styled from "styled-components";
import {FavoriteBorderOutlined, SearchOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductToWishlist } from "../redux/wishlistSlice"; 

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:all 0.4s ease;

`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fafd;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`;


const Image = styled.img`
height: 75%;
z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition:all 0.3s ease;

    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
        
    }
`;

const Product = ({item}) => {
    const dispatch = useDispatch();
    const handleClick = (item) => {
        dispatch(addProductToWishlist(item));
        console.log(item);
    };
    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                    <SearchOutlined/>
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined onClick={() => handleClick(item)}/>
                </Icon>
            </Info>
        </Container>
    )
}

export default Product
