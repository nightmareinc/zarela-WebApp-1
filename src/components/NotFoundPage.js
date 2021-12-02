import React from 'react';
import styled from 'styled-components';
import bg from '../assets/images/error-bg.png';
import spacewalking from '../assets/images/spacewalking.svg';

const Wrapper = styled.div`
	box-sizing: border-box;
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 86vh;
	background-image: url(${bg});
	background-repeat: no-repeat;
	background-size: cover;
	padding: 20px 0 50px;
	margin-top: -130px;
	margin-bottom: -50px;
	overflow: hidden;

	@media only screen and (max-width: 768px) {
		padding: 20px 40px 50px;
		background-size: auto;
		height: calc(100vh - 50px);
	}

	& * {
		font-family: krub;
	}
`;

const Title = styled.h1`
	font-style: normal;
	font-weight: bold;
	font-size: 72px;
	line-height: 94px;
	color: ${props => props.theme.colors.textLabel};
	margin: 0;
	margin-bottom: 10px;
	white-space: nowrap;

	@media only screen and (max-width: 768px) {
		font-weight: bold;
		font-size: 32px;
		line-height: 42px;
		color: ${props => props.theme.colors.textLabel};
	}
`;

const Message = styled.h6`
	font-style: normal;
	font-weight: normal;
	font-size: 36px;
	line-height: 47px;
	margin: 0;
	color: ${props => props.theme.colors.textLabel};

	@media only screen and (max-width: 768px) {
		font-size: 18px;
		line-height: 23px;
		text-align: center;
	}
`;

const Header = styled.div`
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Body = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	flex: 1;
`;

const Spacewalking = styled.div`
	flex: 1 0 50%;
	background-image: url(${spacewalking});
	background-size: 100% auto;
	background-position: center;
	background-repeat: no-repeat;

	@media only screen and (min-width: 768px) {
		background-size: auto 100%;
	}
`;

const NotFound = () => {
	return (
		<Wrapper>
			<Header>
				<Title>404 - Not Found </Title>
				<Message>we can't find what you are looking for!</Message>
			</Header>
			<Body>
				<Spacewalking />
			</Body>
		</Wrapper>
	);
};

export default NotFound;
