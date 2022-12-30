import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addCategoryState,
  Categories,
  categoryState,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import DarkToggle from "./DarkToggle";
import { Helmet } from "react-helmet-async";

function ToDoList() {
  // const [value, modFn] = useRecoilState(toDoState); // value와 modifier 함수를 반환하다.
  //  setState와 쓰임새가 비슷하다.
  // const value = useRecoilValue(toDoState); //  atom으로부터 값을 불러옴
  // const modFn = useSetRecoilState(toDoState); // atom의 값을 바꿀 수 있음

  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [addCategory, setAddCategory] = useRecoilState(addCategoryState);

  useEffect(() => {
    // 이곳은 렌더링 후 실행
    setAddCategory(() => [{ ...Categories }] as any);
    // return () => {
    //   // 렌더링 전에 실행
    //   // setAddCategory(() => [{ ...Categories }] as any);
    // };
  }, []);

  // const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
  const onClicked = (name: string) => {
    setCategory(name as any);
    // setCategory(event.currentTarget.value as any);
  };

  return (
    <>
      <Helmet>
        <title>ToDo</title>
      </Helmet>
      <Container>
        <Wrapper>
          <TopWrapper>
            <Title>To Do List</Title>
            {/* <hr /> */}
            <SelectWrapper>
              {/* <Select value={category} onInput={onInput}> */}
              {addCategory
                ? Object.keys(addCategory[0] || {}).map((name, index) => (
                    <button onClick={() => onClicked(name)} key={index}>
                      {name}
                    </button>
                    // <Option value={name} key={name}>
                    // {name}
                    // </Option>
                  ))
                : null}
              {/* </Select> */}

              {/* <CreateCategory /> */}
            </SelectWrapper>
          </TopWrapper>

          <CreateWrapper>
            <CreateToDo />
            <CraeteContentWrapper>
              {toDos?.map((toDo, index) => (
                <ToDo key={toDo.id} {...toDo} />
              ))}
            </CraeteContentWrapper>
          </CreateWrapper>
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px;
  align-items: center;
  justify-content: space-around;
  button {
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.textColor};
    cursor: pointer;
    color: ${(props) => props.theme.cardBgColor};
    font-family: "Shadows Into Light", cursive;
    padding-right: 0.3rem;
    padding: 0px 10px;
    box-shadow: 0px 2px 4px 0px gray;
    &:hover {
      color: ${(props) => props.theme.textColor};
      background-color: ${(props) => props.theme.cardBgColor};
    }
    &:active {
      box-shadow: 0px 1px 3px 0px gray;
      padding: 0px 9px;
    }
  }
`;
const Wrapper = styled.div`
  width: 25rem;
  font-family: "Shadows Into Light", cursive;
  margin: 0 auto;
  height: 94vh;
  /* border: 1px solid ${(props) => props.theme.borderColor}; */
`;

const CraeteContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-height: 300px;
  overflow: scroll;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const Title = styled.p`
  font-family: "Shadows Into Light", cursive;
  font-weight: bolder;
  font-size: 2rem;
  text-align: center;
  padding: 1rem;
  color: ${(props) => props.theme.textColor};
  text-decoration: underline;
`;
const Option = styled.option``;

const Select = styled.select`
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.textColor};
  cursor: pointer;
  color: ${(props) => props.theme.cardBgColor};
  font-family: "Shadows Into Light", cursive;
  padding-right: 0.3rem;
  padding: 0px 5px;
`;
const TopWrapper = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 20px 0;
`;
const CreateWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
`;
export default ToDoList;
