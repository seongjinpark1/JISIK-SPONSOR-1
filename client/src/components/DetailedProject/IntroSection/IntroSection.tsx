import {
  Category,
  MainContent,
  ProjectTitle,
  ProjectWrapper,
  SubContent,
  Funding,
  FundInput,
  HashTag,
  HashTagContainer
} from './styled';
import { StyledButton } from 'components/Button';
import CategoryIcon from '../../../images/icons/category-icon-8.png';
import YellowStar from '../../../images/star-yellow.png';
import Wormhole from '../../../images/wormhole.jpg';
import Gauge from '../../../images/gauge.png';

const IntroSection = () => {
  return (
    <ProjectWrapper>
      <Category>
        <div>
          <img src={CategoryIcon} alt="category-icon" />
          <span>복합학</span>
        </div>
        <a href="">
          <img src={YellowStar} alt="yellow-star" />
        </a>
      </Category>
      <ProjectTitle>
        <h1>외계인은 정말로 존재할까?</h1>
        <span>
          외계인은 정말로 존재하는지에 대한 의문으로 시작된 프로젝트입니다.
        </span>
      </ProjectTitle>
      <MainContent>
        <img src={Wormhole} alt="wormhole" />
        <SubContent>
          <p>1,110,000원</p>
          <p>달성금액</p>
          <img src={Gauge} alt="" />
          <Funding>
            <p>
              <span>37%</span>
              <span>3,000,000원</span>
              <span>12일</span>
            </p>
            <p>
              <span>완료율</span>
              <span>목표액</span>
              <span>남은기간</span>
            </p>
          </Funding>
          <FundInput>
            <div>
              <span>후원금액</span>
              <input type="number" placeholder="후원금액을 입력해주세요." />
            </div>
            <div>
              <span>전화번호</span>
              <input type="number" placeholder="'-'를 제외하고 입력해주세요." />
            </div>
          </FundInput>
          <StyledButton>후원하기</StyledButton>
        </SubContent>
      </MainContent>
      <HashTagContainer>
        <HashTag>외계인</HashTag>
        <HashTag>공상과학</HashTag>
        <HashTag>UFO</HashTag>
      </HashTagContainer>
    </ProjectWrapper>
  );
};

export default IntroSection;