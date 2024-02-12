import { QueryFunctionContext } from '@tanstack/react-query'
import { instance } from '../../api'

export const getUserSearch = async ({ queryKey }: QueryFunctionContext) => {
	const [, word, page, size] = queryKey
	return instance
		.get(`user/search?word=${word}&page=${page}&size=${size}`)
		.then((response) => response.data.userSearchList)
		.catch((e) => console.log(`[Error] ${e}`))
}