import { CategoryContainer } from './styled';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { REACT_APP_API_URL } from 'config';
import { useSelector } from 'react-redux';
import { BasicObject } from './type';
import { RootState } from 'index';
import { truncate } from 'fs';
interface ParentsProps {
  setCategoryValue: any;
  categoryValue?: string;
}
function Category({ setCategoryValue }: ParentsProps) {
  const projectId = useSelector((state: RootState) => state.projectSt.id);
  const checkInput = useRef<any>([]);

  useEffect(() => {
    axios
      .get<BasicObject>(`${REACT_APP_API_URL}/projects/${projectId}`, {
        withCredentials: true
      })
      .then((res) => {
        if (res.data.projects.category !== null) {
          const {
            category: { name }
          } = res.data.projects;

          checkInput.current.forEach((el: HTMLInputElement) => {
            if (el.id === name) {
              el.checked = true;
            }
          });
        }
      });
  }, []);

  const checkOnlyOne = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    checkInput.current.forEach((el: HTMLInputElement) => {
      el.checked = false;
    });
    target.checked = true;
    setCategoryValue(target.id);
  };

  return (
    <CategoryContainer>
      <div>
        <input
          type="checkbox"
          id="인문학"
          onClick={(e) => checkOnlyOne(e)}
          ref={(el) => (checkInput.current[0] = el)}
        />
        <label htmlFor="인문학">인문학</label>
        <input
          type="checkbox"
          id="사회과학"
          onClick={(e) => checkOnlyOne(e)}
          ref={(el) => (checkInput.current[1] = el)}
        />
        <label htmlFor="사회과학">사회과학</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="자연과학"
          onClick={(e) => checkOnlyOne(e)}
          ref={(el) => (checkInput.current[2] = el)}
        />
        <label htmlFor="자연과학">자연과학</label>
        <input
          type="checkbox"
          id="공학"
          onClick={(e) => checkOnlyOne(e)}
          ref={(el) => (checkInput.current[3] = el)}
        />
        <label htmlFor="공학">공학</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="의약학"
          onClick={(e) => checkOnlyOne(e)}
          ref={(el) => (checkInput.current[4] = el)}
        />
        <label htmlFor="의약학">의약학</label>
        <input
          type="checkbox"
          id="농수해양학"
          onClick={(e) => checkOnlyOne(e)}
          ref={(el) => (checkInput.current[5] = el)}
        />
        <label htmlFor="농수해양학">농수해양학</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="예술체육학"
          onClick={(e) => checkOnlyOne(e)}
          ref={(el) => (checkInput.current[6] = el)}
        />
        <label htmlFor="예술체육학">예술체육학</label>
        <input
          type="checkbox"
          id="복합학"
          onClick={(e) => checkOnlyOne(e)}
          ref={(el) => (checkInput.current[7] = el)}
        />
        <label htmlFor="복합학">복합학</label>
      </div>
    </CategoryContainer>
  );
}

export default Category;
