import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PAGE_INFO } from "../constants/pageInfo";
import { RootState } from "../app/store";
import { getLocalStorage, setLocalStorage } from "../utils";

const initialState = {
  pageInfo: getLocalStorage("pageInfo", {}) || PAGE_INFO,
};

export const counterSlice = createSlice({
  name: "pageInfo",
  initialState,
  reducers: {
    updateBookmark: (state: RootState, action: PayloadAction<number>) => {
      const toggleBookmark = (pages: any, id: string | number) => {
        const toggle = (items: any) => {
          return items.map((item: any) => {
            if (item.id === +id) {
              return { ...item, isBookMark: !item.isBookMark };
            } else if (item.children) {
              return { ...item, children: toggle(item.children) };
            }
            return item;
          });
        };

        return toggle(pages);
      };

      state.pageInfo = [
        ...toggleBookmark(current(state.pageInfo), action.payload),
      ];

      setLocalStorage("pageInfo", JSON.stringify(state.pageInfo));

      console.log(state.pageInfo);
      //   console.log(state.pageInfo, current(state.pageInfo));
    },
  },
});
export const { updateBookmark } = counterSlice.actions;
export default counterSlice.reducer;
