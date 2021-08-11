export const getCartItems = () => {
	return localStorage.getItem('cartItems')
		? JSON.parse(localStorage.getItem('cartItems'))
		: []
}
export const setCartItems = (cartItems) => {
	localStorage.setItem('cartItems', JSON.stringify(cartItems))
}
export const getToken = () => {
	return localStorage.getItem('accessToken')
		? JSON.parse(localStorage.getItem('accessToken'))
		: { }
}
export const getUserInfo = () => {
	return localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user'))
		: { lastName: '', email: '', password: '' }
}
export const clearUser = () => {
	localStorage.removeItem('user')
}
export const setUserInfo = ({
	_id = '',
	email = '',
	password = '',
	firstName = '',
	lastName = '',
	avatar = '',
	isAdmin = false,
	token = '',
}) => {
	localStorage.setItem(
		'user',
		JSON.stringify({
			_id,
			email,
			password,
			firstName,
			lastName,
			avatar,
			isAdmin,
			token
		})
	)
}
export const cleanCart = () => {
	localStorage.removeItem('cartItems')
}
