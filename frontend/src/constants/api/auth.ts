type Auth = {
	Authorization: string;
	Bearer: string;
};

const auth: Auth = {
	Authorization: "Authorization",
	Bearer: "Bearer"
};

export const AUTHORIZATION = auth;
