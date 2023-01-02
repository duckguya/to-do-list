import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { addCategoryState, Categories, IToDo, toDoState } from "../atoms";
import { FaEdit, FaPlus, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
  toDoId: number;
}

function ToDo({ text, category, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(addCategoryState);
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IForm>();

  const onClicked = (name: IToDo["category"]) => {
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
      const index = copy.findIndex((d) => d.id === id);
      copy.splice(index, 1);

      return [...copy];
    });
  };
  const returnClicked = () => {
    setIsEdit(false);
  };
  // function handleSubmit(handleValid: any): import("react").FormEventHandler<HTMLFormElement> | undefined {
  //   throw new Error('Function not implemented.');
  // }

  // todo 수정
  const handleValid = ({ toDo }: IForm) => {
    setToDos((ToDos) => {
      let copy = [...ToDos];
      const index = copy.findIndex((d) => d.id === id);
      copy.splice(index, 1);

      return [...copy];
    });

    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);

    setValue("toDo", "");
  };

  return (
    <Li key={id}>
      <Content>
        {!isEdit ? (
          <>
            <div>{text}</div>
            <BtnWrapper>
              <FaEdit className="EditBtn" onClick={() => setIsEdit(true)} />
              <DelBtn onClick={() => delToDo(id)}>x</DelBtn>
            </BtnWrapper>
          </>
        ) : (
          <Form onSubmit={handleSubmit(handleValid)}>
            <Input
              {...register("toDo", { required: "Please write a To Do" })}
              placeholder="Write a to do"
              defaultValue={text}
            />
            {errors.toDo?.type === "required" && (
              <Error>Please write a To Do</Error>
            )}
            <AddBtn>
              <FaPlus />
            </AddBtn>
            <FaArrowRight className="arrowBtn" onClick={returnClicked} />
          </Form>
        )}
      </Content>

      {/* <Title>text</Title> */}
      {Object.keys(categories[0] || {}).map((name, index) =>
        category !== name ? (
          <CategoryBtn key={name} onClick={() => onClicked(name)}>
            {name}
          </CategoryBtn>
        ) : null
      )}
    </Li>
  );
}

// styled-component

const Form = styled.form`
  width: 100%;
  display: flex;
  background-color: ${(props) => props.theme.cardBgColor};
  align-items: center;
  justify-content: space-between;
  .arrowBtn {
    cursor: pointer;
  }
  .arrowBtn:hover {
    color: ${(props) => props.theme.accentColor};
  }
  .arrowBtn:active {
    color: gray;
  }
`;
const Input = styled.input`
  border: 0;
  outline: 0;
  background-color: ${(props) => props.theme.cardBgColor};
  width: 100%;
  font-family: "Shadows Into Light", cursive;
  color: ${(props) => props.theme.textColor};
  &::placeholder {
    font-family: "Shadows Into Light", cursive;
    color: ${(props) => props.theme.textColor};
  }
`;

const AddBtn = styled.button`
  border: none;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  &:active {
  }
`;
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
  /* margin-bottom: 1rem; */
  margin: 0 5px 18px 0;
  padding: 0 0 5px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BtnWrapper = styled.div`
  display: flex;
  cursor: pointer;
  .EditBtn {
    color: gray;
  }
  .EditBtn:first-child:hover {
    color: ${(props) => props.theme.textColor};
  }
  .EditBtn:first-child:active {
    color: gray;
  }
`;
const DelBtn = styled.div`
  border-radius: 5px;
  height: 17px;
  line-height: 10px;
  margin-left: 0.5rem;
  background-color: ${(props) => props.theme.cardBgColor};
  border: none;
  color: ${(props) => props.theme.accentColor};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.textColor};
  }
  &:active {
    color: gray;
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

const Error = styled.div`
  color: ${(props) => props.theme.accentColor};
  font-size: 12px;
  width: 200px;
`;

export default ToDo;
