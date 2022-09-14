import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  addCategoryState,
  Categories,
  categoryState,
  toDoState,
} from "../atoms";
import { FaPlus } from "react-icons/fa";

const Form = styled.form`
  display: flex;
  background-color: ${(props) => props.theme.cardBgColor};
  align-items: center;
  justify-content: space-between;
`;
const Input = styled.input`
  border: 0;
  outline: 0;
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  padding: 5px;
  background-color: ${(props) => props.theme.cardBgColor};
  width: 90%;
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
`;

interface IForm {
  categoryName: string;
}

function CreateCategory() {
  // const setCategory = useSetRecoilState(addCategoryState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [newCategories, setNewCategory] = useRecoilState(addCategoryState);
  const { register, handleSubmit, setValue, setError } = useForm<IForm>();

  const handleValid = ({ categoryName }: IForm) => {
    // 빈문자열 체크
    if (categoryName.replace(/\s/g, "") === "") {
      return setError(
        "categoryName",
        { message: "1글자 이상 입력하세요" },
        { shouldFocus: true }
      );
    }

    // if (newCategories.length > 0) {
    setNewCategory((oldCategories) => {
      // localstorage 저장

      let copy = [...oldCategories];
      copy = copy.map((d) => {
        return (d = { ...d, [categoryName]: categoryName });
      });

      return [...copy] as any;
    });
    setCategory(categoryName as any);
    // setCategory(categoryName);
    // }
    // else {
    //   // setNewCategory((prev) => [{ [categoryName]: categoryName }] as any);
    //   setNewCategory(
    //     () => [{ ...Categories, [categoryName]: categoryName }] as any
    //   );
    // }
    setValue("categoryName", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("categoryName", { required: "Please write a category" })}
        placeholder="Add a category"
      />
      <AddBtn>
        <FaPlus />
      </AddBtn>
    </Form>
  );
}

export default CreateCategory;
