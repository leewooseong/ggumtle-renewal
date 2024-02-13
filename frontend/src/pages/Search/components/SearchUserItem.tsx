import { useEffect, useState } from 'react'
import UserProfile from '../../../components/UserProfile'
import { UserInfoType } from '../../../interfaces'
import { IUserSearch } from '../../../store/searchUserStore'
import { updateFollow } from '../../UserPage/api'
import { useMutation } from '@tanstack/react-query'

const SearchUserItem = ({ user }: { user: UserInfoType }) => {
	const mutation = useMutation({ mutationFn: updateFollow })
	const [isFollow, setIsFollow] = useState(user.isFollowing)

	const handleFollowButton = () => {
		console.log('handle')
		mutation.mutate({ userId: user.userId, isFollowing: !isFollow })
		setIsFollow(!isFollow)
	}

	return (
		<div className="flex justify-between items-center px-1 py-1">
			<UserProfile type="follow" userInfo={user} />
			<button
				onClick={handleFollowButton}
				className={`${isFollow ? 'bg-lightGray text-subText' : 'bg-point1 text-white'}  inline-flex h-[22px] flex-shrink-0 items-center justify-center text-xs rounded-md px-4`}
			>
				{isFollow ? '팔로잉' : '팔로우'}
			</button>
		</div>
	)
}

export default SearchUserItem
