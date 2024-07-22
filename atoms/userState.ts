import { atom } from "recoil";
interface UserState {
	avatar_url: string;
	email: string;
	email_verified: boolean;
	full_name: string;
	iss: string;
	name: string;
	phone_verified: boolean;
	preferred_username: string;
	provider_id: string;
	sub: string;
	user_name: string;
	username: string;
}

export const userid = atom<UserState>({
	key: "userid", 
	default: {
		email: "",
		avatar_url: "",
		email_verified: false,
		full_name: "",
		iss: "",
		name: "",
		phone_verified: false,
		preferred_username: "",
		provider_id: "",
		sub: "",
		user_name: "", 
		username: "",
	}
}
);