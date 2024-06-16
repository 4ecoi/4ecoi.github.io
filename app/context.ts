import { K_DEFAULT_CHAR_DATA } from "@/components/Constants";
import { CharData } from "@/types/global";
import { createContext, Dispatch, SetStateAction } from "react";

export interface CharContextType {
  charData: CharData, 
  setCharData: Dispatch<SetStateAction<CharData>>
}
export const CharContext = createContext<CharContextType>({charData: K_DEFAULT_CHAR_DATA, setCharData: () => null});
