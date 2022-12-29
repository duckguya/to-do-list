import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { addCategoryState, Categories, IToDo, toDoState } from "../atoms";

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

  const delToDo = (delId: number) => {
    setToDos((ToDos) => {
      let copy = [...ToDos];
      const index = copy.findIndex((e) => e.id === id);
      copy.splice(index, 1);

      return [...copy];
    });
  };

  return (
    <Li key={id}>
      <Content>
        {text}
        <DelBtn onClick={() => delToDo(id)}>x</DelBtn>
      </Content>

      {/* <Title>text</Title> */}
      {Object.keys(categories[0] || {}).map((name, index) =>
        category !== name ? (
          <CategoryBtn key={name} onClick={() => onClick(name)}>
            {name}
          </CategoryBtn>
        ) : null
      )}
    </Li>
  );
}

const Li = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  /* color: ${(props) => props.theme.bgColor}; */
`;
const Title = styled.div`
  color: ${(props) => props.theme.bgColor};
`;

const Content = styled.div`
  color: ${(props) => props.theme.textColor};
  width: 100%;
  border-bottom: 1px dashed ${(props) => props.theme.textColor};
  margin-bottom: 1rem;
  padding: 0 0 5px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DelBtn = styled.button`
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 5px;
  width: 20px;
  height: 17px;
  color: ${(props) => props.theme.accentColor};
  background-color: ${(props) => props.theme.cardBgColor};
  line-height: 10px;
  margin-left: 0.2rem;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    border: 1px solid ${(props) => props.theme.accentColor};
  }
  &:active {
    height: 16px;
  }
`;
const CategoryBtn = styled.button`
  /* width: 40%; */
  height: 1.3rem;
  /* max-height: 1.3rem; */
  white-space: nowrap; // 한글 텍스트가 세로로 표기되는 것 방지
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.cardBgColor};
  /* border: 1px solid ${(props) => props.theme.textColor}; */
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 20px;
  font-size: xx-small;
  margin-left: 0.3rem;
  margin-bottom: 1rem;
  font-family: "Shadows Into Light", cursive;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    border: 1px solid ${(props) => props.theme.accentColor};
  }
  &:active {
    height: 1.2rem;
  }
`;
export default ToDo;
