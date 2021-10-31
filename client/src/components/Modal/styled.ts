import styled from 'styled-components';

export const ModalBackup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const ModalContainer = styled.div`
  width: 485px;
  background: #fff;
  border-radius: 10px;
  padding: 60px 80px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

export const ModalHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: yellow; */

  > h2 {
    color: ${({ theme }) => theme.colors.violetWord};
    font-weight: 700;
    font-size: 39.06px;
  }

  > p {
    font-weight: 400;
    font-size: 12.8px;
    line-height: 1.45em;
    margin-top: 15px;
    color: #868e96;

    > button {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.violetWord};
      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.violetWord};
      background: none;
      cursor: pointer;
    }
  }
`;

export const ModalBody = styled.div`
  margin-top: 25px;

  > form {
    display: flex;
    flex-direction: column;

    > label {
      color: #212529;
      font-size: 12.8px;
      font-weight: 500;
      line-height: 1.45em;

      &:nth-child(3) {
        margin-top: 10px;
      }
      &:nth-child(5) {
        margin-top: 10px;
      }
      &:nth-child(7) {
        margin-top: 10px;
      }
    }

    > input {
      margin-top: 10px;
      border: 2px solid #e9ecef;
      border-radius: 5px;
      height: 35px;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export const LoginButton = styled.button`
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4em;
  padding: 15px 0 15px 0;
  color: #495057;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  &:first-child {
    background: ${({ theme }) => theme.colors.violet};
    border: 1px solid ${({ theme }) => theme.colors.violet};
    color: #fff;
  }
  &:nth-child(2) {
    background: #fff;
    border: none;
  }
  &:last-child {
    background: #ffe710;
    border: 1px solid #ffe710;
  }
  & + & {
    margin-top: 10px;
  }

  > img {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 10px;
  }
`;
export const CheckBoxConainter = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  > div {
    &:nth-child(2) {
      margin-top: 10px;
    }
    &:nth-child(3) {
      margin-top: 10px;
    }
  }
  input {
    display: none;
  }

  input + label {
    cursor: pointer;
  }

  input + label::before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 1px solid #868e96;
    vertical-align: middle;
    margin-right: 10px;
  }

  input:checked + label::before {
    content: '\f00c';
    font-family: 'Font Awesome 5 free';
    font-weight: 900;
    color: #ffffff;
    background-color: #0dbd7e;
    font-size: 13px;
    text-align: center;
  }

  label {
    font-size: 12.8px;
    font-weight: 400;
    line-height: 1.45em;
    color: ${({ theme }) => theme.colors.suppotWord};
  }
  a {
    font-size: 12.8px;
    line-height: 1.45em;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.violetWord};
  }
`;

export const SignupButton = styled.button`
  margin-top: 30px;
  padding: 20px 0 20px 0;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4em;
  color: #fff;
  background: ${({ theme }) => theme.colors.violet};
  border: 1px solid #7950f2;
  cursor: pointer;
`;