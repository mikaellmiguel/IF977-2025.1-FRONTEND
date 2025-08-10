import styled from 'styled-components';
import theme from '../../styles/theme';

export const Container = styled.div`
	min-height: 100vh;
	background: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const Logo = styled.img`
	width: 15rem;
	margin-bottom: 32px;
`;

export const ErrorCode = styled.h1`
	font-size: 6rem;
	color: ${theme.COLORS.PRIMARY || '#1976d2'};
	margin: 0;
	font-weight: bold;
`;

export const Message = styled.p`
	font-size: 1.5rem;
	color: #333333;
	margin-top: 16px;
`;
