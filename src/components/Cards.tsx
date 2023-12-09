import React from 'react';
import CardPhoto from './images/cardmockphoto.jpg';
import { LinearGradient } from 'react-text-gradients';
import Storage from './images/storage.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: #fff;
  background: linear-gradient(to left, #17acff, #ff68f0);
  padding: 10px;
  border-radius: 8px;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const Card = styled.div`
  background-color: #233;
  border-radius: 12px;
  margin: 20px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  max-width: 300px;
  width: 100%;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled(Image)`
  border-radius: 12px;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  color: white;
  margin-top: 16px;
`;

const Button = styled.button`
  height: 40px;
  width: 150px;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  background-color: #17acff;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ff68f0;
  }
`;

export default function Cards() {
  const router = useRouter();

  return (
    <Container>
      <Title>
        <LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>
          What We Offer
        </LinearGradient>
      </Title>
      <CardsContainer>
        <Card onClick={() => router.push('/dao')}>
          <CardImage src={Storage} width={300} height={200}></CardImage>
          <CardTitle>DAO</CardTitle>
          <Button>Explore DAO</Button>
        </Card>
        <Card onClick={() => router.push('/room')}>
          <CardImage src={CardPhoto} width={300} height={200}></CardImage>
          <CardTitle>1-1 Interaction</CardTitle>
          <Button>Join Room</Button>
        </Card>
        <Card>
          <CardImage src={CardPhoto} width={300} height={200}></CardImage>
          <CardTitle>Sex</CardTitle>
          <Button>Explore</Button>
        </Card>
      </CardsContainer>
    </Container>
  );
}
