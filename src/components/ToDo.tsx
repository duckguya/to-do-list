import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { addCategoryState, Categories, IToDo, toDoState } from "../atoms";

const Li = styled.li`
  display: flex;
  width: 100%;

  color: ${(props) => props.theme.bgColor};
`;
const Title = styled.div`
  color: ${(props) => props.theme.bgColor};
`;

const Content = styled.div`
  color: ${(props) => props.theme.bgColor};
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.bgColor};
  margin-bottom: 1rem;
`;
const CategoryBtn = styled.button`
  color: ${(props) => props.theme.bgColor};
  border-radius: 20px;
  font-size: xx-small;
  margin-left: 0.3rem;
  margin-bottom: 1rem;
`;

function ToDo({ text, category, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(addCategoryState);

  const onClick = (name: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name };
      oldToDos.slice(0, targetIndex);
      oldToDos.slice(targetIndex + 1);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <Li>
      <Content> {text}</Content>
      {/* <Title>text</Title> */}
      {Object.keys(categories[0] || {}).map((name, index) =>
        category !== name ? (
          <>
            <CategoryBtn key={index} onClick={() => onClick(name)}>
              {name}
            </CategoryBtn>
          </>
        ) : null
      )}

      {/* // {category !== Categories.TO_DO && (
        //   <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
        // )}
      // {category !== Categories.DOING && (
      //   <button onClick={() => onClick(Categories.DOING)}>Doing</button>
      // )}
      // {category !== Categories.DONE && (
      //   <button onClick={() => onClick(Categories.DONE)}>Done</button>
      // )} */}
    </Li>
  );
}

export default ToDo;
