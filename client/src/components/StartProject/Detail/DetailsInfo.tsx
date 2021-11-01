import React, { useState, useRef } from 'react';
import {
  Container,
  ProjectBody,
  FocusMemo,
  TextareaCss,
  SaveButton,
  EditButton,
  ErrorMessage
} from '../commonStyled';
import {
  ProjectMotive,
  ProjectProgress,
  ProjectGoal,
  ProjectAddOptions,
  ProjectTimeLine,
  ProjectTimeLineDetail,
  AddTimeLineButton,
  TimeLineListContainer,
  DateInput
} from './styled';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

interface DetailMemoProps {
  motiveMemo: boolean;
  progressMemo: boolean;
  goalMemo: boolean;
  optionsMemo: boolean;
  timelineMemo: boolean;
  detailMemo: boolean;
}

function DetailsInfo() {
  const ulElement = useRef<HTMLUListElement>(null);
  const [timelineList, setTimeLineList] = useState<number[]>([0]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [showMemo, setShowMemo] = useState<DetailMemoProps>({
    motiveMemo: false,
    progressMemo: false,
    goalMemo: false,
    optionsMemo: false,
    timelineMemo: false,
    detailMemo: false
  });
  const [timelineContent, setTimeLineContent] = useState<string>('');
  const [isVaild, setIsVaild] = useState(false);
  console.log(timelineContent);

  const addTimeLineList = () => {
    if (!timelineContent) {
      setIsVaild(true);
      return;
    }
    setTimeLineList([
      ...timelineList,
      timelineList[timelineList.length - 1] + 1
    ]);
    handleDisable();
    setTimeLineContent('');
    setIsVaild(false);
  };

  const removeTimelineList = (idx: number) => {
    if (timelineList.length === 1) return;
    const filter = timelineList.filter((list) => list !== idx);
    setTimeLineList(filter);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeLineContent(e.target.value);
  };

  const editButton = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    // textContent === '수정'이라면 disable해제 후 textContent를 '완료'로 변경
    if (e.currentTarget.textContent === '수정') {
      let length = ulElement.current?.children.length;
      if (!length) return;
      for (let i = 0; i < length; i++) {
        let content = ulElement.current?.children[i].children[0].children[1];
        if (!content) return;
        if (Number(content.getAttribute('id')) === idx) {
          content.removeAttribute('disabled');
          e.currentTarget.textContent = '완료';
          return;
        }
      }
    } else {
      // textContent === '완료'라면 textContent를 '수정'로 변경 하고 disable할함수실행
      e.currentTarget.textContent = '수정';
      handleDisable(idx);
    }
  };

  const handleDisable = (idx?: number) => {
    // 버튼이 '완료'일때 누르면 input창을 다시 disable상태로 변경
    if (idx || idx === 0) {
      ulElement.current?.children[idx].children[0].children[1].setAttribute(
        'disabled',
        ''
      );
      ulElement.current?.children[idx].children[1].children[1].setAttribute(
        'disabled',
        ''
      );
      return;
    }

    // 항목을 추가 했을 때 추가한걸 제외한 나머지 input을 disable로 변경
    let length = ulElement.current?.children.length;
    console.log(ulElement.current?.children[0].children[0].children[1]);
    console.log(length);
    if (!length) return;
    for (let i = 0; i < length - 1; i++) {
      ulElement.current?.children[i].children[0].children[1].setAttribute(
        'disabled',
        ''
      );
      ulElement.current?.children[
        i
      ].children[1].children[1].children[0].children[0].setAttribute(
        'disabled',
        ''
      );
    }
  };
  return (
    <Container>
      <ProjectBody>
        <h2>프로젝트 상세 내용</h2>
        <p>프로젝트에 대한 내용을 후원자에게 상세하게 작성합니다.</p>

        <ProjectMotive
          showMemo={showMemo.motiveMemo}
          onFocus={() => setShowMemo({ ...showMemo, motiveMemo: true })}
          onBlur={() => setShowMemo({ ...showMemo, motiveMemo: false })}
        >
          <h3>프로젝트 배경</h3>
          <TextareaCss />
          <FocusMemo>이 프로젝트르 진행하게 된 계기를 작성해주세요.</FocusMemo>
        </ProjectMotive>

        <ProjectProgress
          showMemo={showMemo.progressMemo}
          onFocus={() => setShowMemo({ ...showMemo, progressMemo: true })}
          onBlur={() => setShowMemo({ ...showMemo, progressMemo: false })}
        >
          <h3>프로젝트 진행 상황</h3>
          <TextareaCss />
          <FocusMemo>
            현재 프로젝트의 진행상황이 어디까지 진행되었는지 후원자들에게
            알려주세요.
          </FocusMemo>
        </ProjectProgress>

        <ProjectGoal
          showMemo={showMemo.goalMemo}
          onFocus={() => setShowMemo({ ...showMemo, goalMemo: true })}
          onBlur={() => setShowMemo({ ...showMemo, goalMemo: false })}
        >
          <h3>프로젝트 목표</h3>
          <TextareaCss />
          <FocusMemo>
            이 프로젝트가 하고자하는 것, 목표를 작성해주세요.
          </FocusMemo>
        </ProjectGoal>

        <ProjectAddOptions
          showMemo={showMemo.optionsMemo}
          onFocus={() => setShowMemo({ ...showMemo, optionsMemo: true })}
          onBlur={() => setShowMemo({ ...showMemo, optionsMemo: false })}
        >
          <h3>추가 정보(OPTIONS)</h3>
          <TextareaCss />
          <FocusMemo>
            위 질문이외에 추가로 후원자들에게 알려주고 싶은 것들을 작성해주세요.
          </FocusMemo>
        </ProjectAddOptions>

        <ProjectTimeLine
          showMemo={showMemo.timelineMemo}
          onFocus={() => setShowMemo({ ...showMemo, timelineMemo: true })}
          onBlur={() => setShowMemo({ ...showMemo, timelineMemo: false })}
        >
          <h3>프로젝트 타임라인</h3>
          <TimeLineListContainer ref={ulElement}>
            {timelineList.map((el) => (
              <li key={el}>
                <div>
                  <label>일정 내용</label>
                  <input type="text" id={String(el)} onChange={handleInput} />
                </div>
                <div>
                  <span>목표 날짜</span>
                  <DateInput
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일"
                    minDate={new Date()}
                  />
                </div>
                <EditButton onClick={(e) => editButton(el, e)}>수정</EditButton>
                <EditButton onClick={() => removeTimelineList(el)}>
                  삭제
                </EditButton>
              </li>
            ))}
            <FocusMemo>
              프로젝트가 어떻게 진행할지 일정 계획을 간단하게 작성해주세요.
            </FocusMemo>
          </TimeLineListContainer>
          {isVaild && (
            <ErrorMessage>
              빈칸을 채워야 일정 항목을 추가하실 수 있습니다.
            </ErrorMessage>
          )}
          <AddTimeLineButton onClick={addTimeLineList}>
            일정 항목 추가
          </AddTimeLineButton>
        </ProjectTimeLine>

        <ProjectTimeLineDetail
          showMemo={showMemo.detailMemo}
          onFocus={() => setShowMemo({ ...showMemo, detailMemo: true })}
          onBlur={() => setShowMemo({ ...showMemo, detailMemo: false })}
        >
          <h3>프로젝트 타임라인 설명</h3>
          <TextareaCss />
          <FocusMemo>
            후원자가 일정을 보면서, 어떤 작업이 진행될 수 있을지 알 수 있도록
            작성해주세요.
          </FocusMemo>
        </ProjectTimeLineDetail>
        <SaveButton>저장하고 계속하기</SaveButton>
      </ProjectBody>
    </Container>
  );
}

export default DetailsInfo;
