import { atom, selector } from "recoil";
//  상태관리를 유지하기 위한 라이브러리. localstorage에 저장한다.
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

// interface
export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export interface IAddCategory {
  name: string;
}

// atom
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
  effects_UNSTABLE: [persistAtom],
});

export const addCategoryState = atom<IAddCategory[]>({
  key: "addCategory",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

// export const categorySelector = selector({
//   key: "toDoSelector",
//   get: ({ get }) => {
//     const toDos = get(toDoState);
//     const category = get(categoryState);
//     return toDos.filter((toDo) => toDo.category === category);
//   },
//   set: ({ set }) => {

//     const category = get(categoryState);

//   },
// });
