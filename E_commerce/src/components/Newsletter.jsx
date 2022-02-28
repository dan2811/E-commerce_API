import {Send} from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from "../responsive";

const Container = styled.div`
height: 60vh;
background-color: #fcf5f5;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const Title = styled.h1`
font-size: 70px;
margin-bottom: 20px;
`;

const Desc = styled.div`
font-size: 24px;
font-weight: 300;
margin-bottom: 20px;
${mobile({ textAlign: "center"})}
`;

const InputContainer = styled.div`
width: 50%;
height: 40px;
background-color: white;
display: flex;
justify-content: space-between;
border: 1px solid lightgray;
${mobile({ width: "80%"})}
`;

const Input = styled.input`
border: none;
flex: 8;
padding-left: 28px;
`;

const Button = styled.button`
border: none;
flex: 1;
background-color: teal;
color: white;
`;

const Newsletter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc>Get all the latest and greatest offers, as well as entry to exclusion competitions!</Desc>
            <InputContainer>
                <Input placeholder='YourEmail@Email.com'/>
                <Button>
                    <Send/>
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter
