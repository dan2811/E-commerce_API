import styled from 'styled-components';
import { Facebook, Instagram, Twitter, Room, Phone, MailOutline } from '@mui/icons-material';
import { mobile } from '../responsive';


const Container = styled.div`
display: flex;
${mobile({ flexDirection: "column"})}

`;

const Left = styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
margin: 20px 0px;
`;

const SocialContainer = styled.div`
display: flex;
`;

const SocialIcon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
color: white;
background-color: #${props=>props.color};
display: flex;
justify-content: center;
align-items: center;
margin-right: 20px; `;



const Center = styled.div`
flex: 1;
padding: 20px;
${mobile({display: "none"})}
`;

const Title = styled.h3`
margin-bottom: 30px;
`;

const List = styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
flex-wrap: wrap;
`;

const ListItem = styled.li`
width: 50%;
margin-bottom: 10px;
`;

const Right = styled.div`
flex: 1;
padding: 20px;
${mobile({ backgroundColor: "#eee"})}

`;

const ContactItem = styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;
`;

const Payment = styled.img`
width: 50%;
`;


const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo> SHOP. </Logo>
                <Desc>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi vero illo laudantium laborum iusto accusamus porro sit cum ab officiis ipsum animi repellendus temporibus, beatae eaque reiciendis est nulla aut.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3b5999">
                        <Facebook />
                    </SocialIcon >
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon >
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon >
                </SocialContainer>
            </Left>
            <Center>
                <Title>
                    Useful Links
                </Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wish List</ListItem>
                    <ListItem>Terms & Conditions</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem><Room style={{marginRight: "10px"}}/>101 Address Road Madeupville London QU33 N13</ContactItem>
                <ContactItem><Phone style={{marginRight: "10px"}}/> 0788376537</ContactItem>
                <ContactItem><MailOutline style={{marginRight: "10px"}}/>contact@shop.com</ContactItem>
                <Payment src="https://thetudorhouse.gallery/wp-content/uploads/2020/11/stripe-cc-payments1.png"/>
            </Right>    
        </Container>
    )
}

export default Footer