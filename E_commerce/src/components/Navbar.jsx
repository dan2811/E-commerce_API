import React from 'react'
import { Search, ShoppingCartOutlined, StarBorderOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core'
import styled from 'styled-components';
import {mobile, tablet, desktop} from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { logOut } from '../redux/userSlice';

const Container = styled.div`
    height: 60px;
    ${mobile({height: "50px"})}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({padding: "10px 0px"})}
`;

const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`;

const Language = styled.span`
    font-size: 14px
    cursor: pointer;   
    ${mobile({display: "none"})} 
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
border: none;
${mobile({width: "50px"})} 
`;

const Center = styled.div`
flex: 1;
text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize: "24px"})}

`;

const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({flex: 2, justifyContent: "center", paddingRight: "5px" })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    ${mobile({fontSize: "12px", marginLeft: "10px"})}
`;

const StyledLink = styled(Link)`
text-decoration: none;
color: black;

&:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
}
`;

const ButtonContainer = styled.div`
border: 0.5px solid black;
border-radius: 20px;
padding: 10px;
margin: 0px 10px;
cursor: pointer;
`;

const IconContainer = styled.div`
margin-left: 10px;
`;



const Navbar = () => {

    const quanity = useSelector(state=>state.cart.quantity);
    const wishlistQuantity = useSelector(state=>state.wishlist.products.length);
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();
    let navigate = useNavigate();


    const handleSignOut = (e) => {
        e.preventDefault();
        dispatch(logOut());
        navigate("/");
    };


    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search'/>
                        <Search style={{color:"gray", fontSize: 16}}/>
                    </SearchContainer>
                </Left>
                <StyledLink to="/">
                <Center><Logo>SHOP.</Logo></Center>
                </StyledLink>
                <Right>
                        {user.currentUser ? `Hello, ${user.currentUser.username}`
                        :
                    <ButtonContainer>
                        <StyledLink to="/register">
                        <MenuItem>REGISTER</MenuItem>
                        </StyledLink> 
                    </ButtonContainer>
                        }
                        {user.currentUser ? 
                            <ButtonContainer>
                        <MenuItem onClick={handleSignOut}>SIGN OUT</MenuItem> 
                        </ButtonContainer>
                        :
                        <StyledLink to="/login">
                            <ButtonContainer>
                        <MenuItem>SIGN IN</MenuItem>
                            </ButtonContainer>
                        </StyledLink>
                        }

                    <StyledLink to="/cart">
                    <MenuItem>
                        <Badge badgeContent={quanity} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                    </StyledLink>
                <IconContainer>
                    <StyledLink to={`/wishlist`}>
                        <MenuItem>
                            <Badge badgeContent={wishlistQuantity} color="primary">
                                <StarBorderOutlined />
                            </Badge>
                        </MenuItem>
                    </StyledLink>
                </IconContainer>
                </Right>
            </Wrapper>
            
        </Container>
    )
}

export default Navbar
