import React from 'react';
import { EditButton } from '../commonStyled';
function BudgetAddItems({ handleInput, removeBudgetList, list, idx }: any) {
  return (
    <li id={list.id}>
      <div>
        <label>예산 내용</label>
        <input
          type="text"
          onChange={handleInput('content')}
          value={list.content}
          disabled
        />
      </div>
      <div>
        <label>금액</label>
        <input
          type="number"
          onChange={handleInput('amount')}
          value={list.amount}
          disabled
        />
      </div>

      <EditButton onClick={() => removeBudgetList(idx, list.id)}>
        삭제
      </EditButton>
    </li>
  );
}

export default BudgetAddItems;
