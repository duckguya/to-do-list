import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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

  return (
    <li>
      <span> {text}</span>
      {Object.keys(categories[0] || {}).map((name, index) =>
        category !== name ? (
          <button key={index} onClick={() => onClick(name)}>
            {name}
          </button>
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
    </li>
  );
}

export default ToDo;
