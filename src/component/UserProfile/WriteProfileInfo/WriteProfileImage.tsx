import { useEffect, useState } from 'react'
import { isValidImageFile } from '../../../utilities/utils/image'
import { useFileToUrl } from '../../../hooks/useFileToUrl'

const defaultProfileUrl = '/src/assets/svgs/defaultProfile.svg'
const convertUrlToFile = async (url: string) => {
	const response = await fetch(url)
	const blob = await response.blob()
	const file = new File([blob], 'profileImage', { type: blob.type })
	return file
}

interface IWriteProfileImageProps {
	previousImageUrl: string | null
}
// 이미지 파일이 기존에 받아온 정보가 있다면 그 정보를 File로 만들어서 input의 값으로 넣어줘야한다.
const WriteProfileImage = ({ previousImageUrl }: IWriteProfileImageProps) => {
	const [imageFile, setImageFile] = useState<File | null>(null) // 서버 전송용 이미지_imageFile(File type)
	const [imageUrl, setImageUrl] = useState<string>(defaultProfileUrl) // 클라이언트 표시용 이미지_profileUrl(String type)

	const currentImageUrl = useFileToUrl(imageFile)

	const setImageWithPreviousImage = async () => {
		if (previousImageUrl) {
			const file = await convertUrlToFile(previousImageUrl)
			setImageFile(file)
		}
	}

	// Todo: api 테스트 진행하면서 마이 페이지 수정할 때 기존 이미지 정보를 File로 잘 변환하는지 확인 필요
	useEffect(() => {
		setImageWithPreviousImage()
	}, [])

	useEffect(() => {
		if (imageFile !== null) {
			setImageUrl(currentImageUrl)
		} else {
			setImageUrl(defaultProfileUrl)
		}
	}, [imageFile, currentImageUrl])

	const handleChangeImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const fileInput = event.currentTarget
		const selectedFile = (fileInput.files as FileList)[0]
		console.log(selectedFile)

		if (!isValidImageFile(selectedFile)) {
			return
		}

		setImageFile(selectedFile)
	}

	return (
		<fieldset>
			<label className="flex flex-col">
				<p className="mb-4 font-bold text-lg">프로필 사진</p>
				<img src={imageUrl} alt="프로필 이미지" className="w-20 h-20 rounded-full self-center" />
				<input
					type="file"
					name="profileImage"
					onChange={handleChangeImageFile}
					className="hidden"
				/>
			</label>
			<p className="text-xs text-darkGray1 mt-4 flex gap-1">
				<span>&#8251;</span>
				<span className="flex flex-col">
					<span>1MB 용량 제한</span>
					<span>지원 확장자: jpg, jpeg, png, gif</span>
				</span>
			</p>
		</fieldset>
	)
}

export default WriteProfileImage
