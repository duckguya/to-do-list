import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  addCategoryState,
  Categories,
  categoryState,
  toDoState,
} from "../atoms";

interface IForm {
  categoryName: string;
}

function CreateCategory() {
  // const setCategory = useSetRecoilState(addCategoryState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [newCategories, setNewCategory] = useRecoilState(addCategoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ categoryName }: IForm) => {
    // if (newCategories.length > 0) {
    setNewCategory((oldCategories) => {
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
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("categoryName", { required: "Please write a To Do" })}
        placeholder="Write a category"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
