import React, { useState, useEffect } from 'react';
import {
  MainContent,
  ProjectTitle,
  ProjectWrapper,
  SubContentFinished,
  FinishedButton
} from './styled';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { REACT_APP_API_URL } from 'config';
import axios from 'axios';
import Wormhole from '../../../images/wormhole.jpg';
import { Data, Tags, Tag } from '../type';
import { RootState } from 'index';
import IntroTitle from './IntroTitle';
import IntroTag from './IntroTag';

const IntroFinished = () => {
  const [projectId, setProjectId] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [goal, setGoal] = useState<number>(0);
  const [pledged, setPledged] = useState<number>(0);
  const [tags, setTags] = useState<Tag[]>([]);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [category, setCategory] = useState<string>('');

  const history = useHistory();
  const TagsUrl = `${REACT_APP_API_URL}/projects/${projectId}/tags`;
  const config = { withCredentials: true };

  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  const percentage = Number((pledged / goal).toFixed(2)) * 100;

  //금액 숫자에 3단위로 콤마를 추가해주는 함수
  const numWithCommas = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  //단위가 나뉘어진 숫자
  const goalWithCommas = numWithCommas(goal);
  const pledgedWithCommas = numWithCommas(pledged);

  // 특정 프로젝트 인트로 섹션에 대한 정보를 불러오는 함수
  const getProjects = async () => {
    try {
      const url = window.location.pathname.slice(18);
      const response = await axios.get<Data>(
        `${REACT_APP_API_URL}/projects/single?slug=${url}`,
        { withCredentials: true }
      );

      const { id, title, description, category, goal, category_id, pledged } =
        response.data.projects;

      const { name } = category;
      setTitle(title);
      setDescription(description);
      setProjectId(id);
      setCategory(name);
      setGoal(Number(goal));
      setCategoryId(category_id);
      setPledged(Number(pledged));
    } catch (err) {
      console.log(err);
      history.push('/404');
    }
  };

  // 특정 프로젝트의 모든 태그를 조회하는 함수
  const getTags = async () => {
    try {
      const response = await axios.get<Tags>(TagsUrl, config);
      // console.log(response);
      const tagGroup = response.data.tags;
      // console.log(tagGroup);
      setTags(tagGroup);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(getTags);

  // 최초 렌더링 시 즐겨찾기, 태그, 그리고 전체 프로젝트 데이터를 실행
  useEffect(() => {
    getProjects();
    getTags();
  }, []);

  return (
    <ProjectWrapper>
      <IntroTitle
        isLogin={isLogin}
        projectId={projectId}
        categoryId={categoryId}
        category={category}
      />
      <ProjectTitle>
        <h1>{title}</h1>
        <span>{description}</span>
      </ProjectTitle>
      <MainContent>
        <img src={Wormhole} alt="wormhole" />
        <SubContentFinished>
          <p>{pledgedWithCommas}원</p>
          <p>{goalWithCommas} 달성금액</p>
          <p>{percentage}%</p>
          <p>달성 성공!</p>
          <FinishedButton>프로젝트 후원완료</FinishedButton>
          <div>
            * 본 프로젝트 후원하기 기능은 개발자 모드로써 &nbsp;&nbsp;결제하신
            금액은 다음날 환불처리 됩니다.
          </div>
        </SubContentFinished>
      </MainContent>
      <IntroTag tags={tags} noDisplay={true} />
    </ProjectWrapper>
  );
};

export default IntroFinished;