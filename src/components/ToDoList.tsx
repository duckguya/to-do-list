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
  width: 25rem;
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
  width: 100%;
  margin: 10px;
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
  /* padding: 2rem; */

  @import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");
  font-family: "Anton", sans-serif;

  /* @import url("https://fonts.googleapis.com/css2?family=Anton&family=Noto+Serif:ital,wght@0,700;1,700&family=Permanent+Marker&family=Source+Sans+Pro:wght@300;400&family=Ubuntu:wght@700&display=swap");
  font-family: "Permanent Marker", cursive; */
`;

const Select = styled.select`
  /* border-radius: 10px; */
  border: none;
  /* padding: 5px; */
  background-color: ${(props) => props.theme.cardBgColor};
  cursor: pointer;
  color: ${(props) => props.theme.bgColor};
`;

function ToDoList() {
  // const [value, modFn] = useRecoilState(toDoState); // value와 modifier 함수를 반환하다.
  //  setState와 쓰임새가 비슷하다.
  // const value = useRecoilValue(toDoState); //  atom으로부터 값을 불러옴
  // const modFn = useSetRecoilState(toDoState); // atom의 값을 바꿀 수 있음

  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [newCategory, setNewCategory] = useRecoilState(addCategoryState);

  useEffect(() => {
    // 이곳은 렌더링 후 실행
    return () => {
      // 렌더링 전에 실행
      setNewCategory(() => [{ ...Categories }] as any);
    };
  }, []);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Container>
      <Title>To Do List</Title>
      <hr />
      <Wrapper>
        <SelectWrapper>
          {/* <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select> */}

          <Select value={category} onInput={onInput}>
            {newCategory
              ? Object.keys(newCategory[0] || {}).map((name, index) => (
                  <option value={name} key={index}>
                    {name}
                  </option>
                ))
              : null}
          </Select>
          <CreateCategory />
        </SelectWrapper>
        <CreateToDo />
        <CraeteContentWrapper>
          {toDos?.map((toDo, index) => (
            <ToDo key={index} {...toDo} />
          ))}
        </CraeteContentWrapper>
      </Wrapper>
    </Container>
  );
}
export default ToDoList;
