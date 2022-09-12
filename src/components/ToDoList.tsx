import React, { useEffect } from "react";
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
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateCategory />
      {/* <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select> */}

      <select value={category} onInput={onInput}>
        {newCategory
          ? Object.keys(newCategory[0] || {}).map((name, index) => (
              <option value={name} key={index}>
                {name}
              </option>
            ))
          : null}
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;
