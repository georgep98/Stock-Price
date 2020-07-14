import styled from 'styled-components';

export const Button = styled.button<{ hovered: Boolean }>`
    display: inline-block;
    border-radius: 3px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: 11rem;
    height: 40px;
    background: ${props => props.hovered ? 'black' : 'transparent'};
    color: ${props => props.hovered ? 'white' : 'black'};
    border: 2px solid grey;
    cursor: pointer;
`;