import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";
import { FaPlus } from "react-icons/fa";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Form = styled.form`
  width: 100%;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px;
  justify-content: center;
`;
const CategoryName = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: bolder;
`;
const Input = styled.input`
  width: 90%;
  border: 0;
  outline: 0;
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  padding: 5px;
  background-color: ${(props) => props.theme.cardBgColor};
  &::placeholder {
    font-family: "Shadows Into Light", cursive;
    color: ${(props) => props.theme.textColor};
  }
`;

const AddBtn = styled.button`
  border: none;
  padding: 6px 5px 5px 0px;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  &:first-child {
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  &:active {
    color: ${(props) => props.theme.bgColor};
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  let category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <CategoryName>{category}</CategoryName>
      <Wrapper>
        <Input
          {...register("toDo", { required: "Please write a To Do" })}
          placeholder="Write a to do"
        />
        <AddBtn>
          <FaPlus />
        </AddBtn>
      </Wrapper>
    </Form>
  );
}

export default CreateToDo;
