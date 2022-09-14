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

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const SelectWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  width: 25rem;
  font-family: "Shadows Into Light", cursive;
  margin: 0 auto;
`;

const CraeteContentWrapper = styled.div`
  display: flex;
  width: 100%;
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

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Container>
      <Wrapper>
        <Title>To Do List</Title>
        {/* <hr /> */}
        <SelectWrapper>
          {/* <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select> */}

          <Select value={category} onInput={onInput}>
            {addCategory
              ? Object.keys(addCategory[0] || {}).map((name, index) => (
                  <Option value={name} key={name}>
                    {name}
                  </Option>
                ))
              : null}
          </Select>
          <CreateCategory />
        </SelectWrapper>
        <CreateToDo />
        <CraeteContentWrapper>
          {toDos?.map((toDo, index) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </CraeteContentWrapper>
      </Wrapper>
    </Container>
  );
}
export default ToDoList;
