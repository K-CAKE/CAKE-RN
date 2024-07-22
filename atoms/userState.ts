import { atom } from "recoil";

export const userid = atom<string>({
	key: "userid", 
	default: "", 
});