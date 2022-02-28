import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";
import { useState, useEffect } from "react";
import { newCart } from "../redux/apiCalls";


const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://wallpaperbat.com/img/455728-free-download-womens-clothing-on-a-white-clothes-hanger-on-pink-pastel-1920x1080-for-your-desktop-mobile-tablet-explore-clothing-background-clothing-wallpaper-clothing-background-palace-clothing-wallpaper.png") center;
display: flex;
align-items: center;
justify-content: center;
`;

const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color: white;
${mobile({ width: "75%"})}

`;

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`;

const Form = styled.form`
display: flex;
flex-wrap: wrap;
`;

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`;

const Agreement = styled.span`
font-size: 12px;
margin: 20px 0px;
`;

const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
`;

const Error = styled.span`
color: red;
`;


const Register = () => {
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const dispatch = useDispatch();

    const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, {
        username,
        email,
        password
    });
    // newCart(dispatch, {
    //     userId: user.currentUser._id,
    //     products: cart.products,
    // });
    };

    useEffect(() => {
        if(confirmPassword !== password) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }, [password, confirmPassword]);

 


    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                     <Input placeholder="First Name"
                            onChange={(e)=>setFirstName(e.target.value)} />
                     <Input placeholder="Last Name"
                            onChange={(e)=>setLastName(e.target.value)} />
                     <Input placeholder="Username"
                            onChange={(e)=>setUsername(e.target.value)} />
                     <Input placeholder="Email"
                            onChange={(e)=>setEmail(e.target.value)} />
                     <Input type="password" placeholder="Password"
                            onChange={(e)=>setPassword(e.target.value)} />
                     <Input type="password" placeholder="Confirm Password"
                            onChange={(e)=>setConfirmPassword(e.target.value)} />
                            {passwordError && <Error>Your password does not match!</Error>}
                     <Agreement>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></Agreement>
                     <Button onClick={handleClick}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
