import { Fragment, useState } from 'react'
import DatePicker from './DatePicker'
import { startOfToday } from 'date-fns'
import { Dialog, Transition } from '@headlessui/react'

// createdDate로 이름 변경 필요
const StartDate = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [startDate, setStartDate] = useState<Date>(startOfToday)

	const handleCloseDatePicker = () => {
		setIsOpen(false)
	}

	const handleClickStartDate = () => {
		setIsOpen(true)
	}

	// padStart : 빈 문자열을 채워주는 메서드
	const formatDate = (date: Date): string => {
		const year = date.getFullYear()
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const day = date.getDate().toString().padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	return (
		<div>
			{/* //Todo : 설명 글자 관련 css도 설정 필요 */}
			<p>버킷 시작일</p>
			{/* //Todo : 버튼 글자 관련 css도 설정 필요 */}
			<button
				onClick={handleClickStartDate}
				className="
					relative w-full px-2 py-2 text-left border-[0.5px] rounded-[5px]
					after:content-calendarImage after:inline-block after:h-[19px] after:absolute after:right-2 after:translate-y-1/2 after:bottom-1/2
				"
			>
				{startDate instanceof Date ? formatDate(startDate) : '날짜 선택'}
			</button>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={handleCloseDatePicker}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
									<DatePicker
										startDate={startDate}
										setStartDate={setStartDate}
										setIsOpen={setIsOpen}
									/>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	)
}

export default StartDate
