import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";
import { FaPlus } from "react-icons/fa";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
const Form = styled.form``;
const Input = styled.input`
  width: 90%;
  border: 0;
  outline: 0;
  border-bottom: 1px solid ${(props) => props.theme.bgColor};
  padding: 5px;
  background-color: ${(props) => props.theme.cardBgColor}; ;
`;

const AddBtn = styled.button`
  border: none;
  padding: 6px 5px 5px 0px;
  cursor: pointer;
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
