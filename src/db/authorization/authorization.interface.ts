export interface IAuthorization {
	username: string,
	password: string,
}

export interface IAuthenticateResponse<T> {
	user: T,
	token:string
    
}
