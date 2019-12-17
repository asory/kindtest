import styled from 'styled-components';

const Container = styled.div`
    max-width: 700px;
    background-color: #3198e7;
    background-image: linear-gradient(162deg, #3198e7 33%, #bf5ded 100%);
        border-radius: 4px;
    padding: 30px;
    margin: 80px auto;
    h1 {
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        svg {
            margin-right: 10px;
        }
    }
`;

export default Container;
