import WithHeaderLayout from '../../component/layout/WithHeaderLayout'
import { IMenu, IMenuFunc, IMyUserInfo } from '../../interfaces'
import { icons } from '../../utilities/constants/header-icons'
import { useRouter } from '../../hooks/useRouter'
import WriteProfileImage from '../../component/UserProfile/WriteProfileInfo/WriteProfileImage'
import WriteProfileName from '../../component/UserProfile/WriteProfileInfo/WriteProfileName'
import { NicknameMsgType } from '../../types/user'
import { useCallback, useMemo, useState } from 'react'
import EditProfileSubmit from './component/EditProfileSubmit'
import { useCurrentUserStore } from '../../stores/currentUserStore'

// 유저 이름 변경하는 기능
// - 유저 이미지 url을 기반으로 File로 만들어서 관리하는 기능

const UserProfileEdit = () => {
	const { userInfo, setUserInfo } = useCurrentUserStore()
	const nickname = useMemo(() => {
		return userInfo?.userNickname || ''
	}, [userInfo])
	const setNickname = useCallback(
		(nickname: string) => {
			setUserInfo({ ...userInfo, userNickname: nickname } as IMyUserInfo)
		},
		[userInfo]
	)
	const [nickNameMsgStatus, setNickNameMsgStatus] = useState<NicknameMsgType>(
		'initial' as NicknameMsgType
	)

	const { routeTo } = useRouter()

	const menu: IMenu = {
		left: icons.BACK,
		center: '프로필 수정',
		right: undefined,
	}

	const func: IMenuFunc = {
		left_func: () => routeTo('/'),
		right_func: undefined,
	}

	return (
		<WithHeaderLayout headerMenu={menu} headerFunc={func}>
			<form className="flex flex-col gap-8 relative grow">
				<WriteProfileImage previousImage={null} />
				<WriteProfileName
					nickname={nickname}
					setNickname={setNickname}
					nicknameMsgStatus={nickNameMsgStatus}
					setNickNameMsgStatus={setNickNameMsgStatus}
				/>
				<EditProfileSubmit nickNameStatus={nickNameMsgStatus} />
			</form>
		</WithHeaderLayout>
	)
}

export default UserProfileEdit
