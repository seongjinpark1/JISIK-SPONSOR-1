import styled from 'styled-components';

export const SponsorsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: pink;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 60px 30px;
`;

export const SponsorTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  & div {
    display: flex;
    align-items: center;
    font-size: 32px;
    line-height: 1.4;
    font-weight: 700;
    color: #343a40;
  }

  & div img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }

  & > span {
    font-size: 12.8px;
    font-weight: 500;
    line-height: 1.4;
    color: #495057;
  }
`;

export const SponsorsList = styled.div`
  display: flex;
  gap: 10px;

  img {
    width: 50px;
    height: 50px;
  }
`;
