/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useMemo, useEffect } from 'react';
import { AiOutlineClose, AiFillInfoCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

const NotificationBox = ({ message, timeout, label, isVisible }) => {
	const [internalVisible, setInternalVisible] = useState(isVisible);
	const router = useRouter();

	useMemo(() => {
		let timer;
		if (internalVisible) {
			timer = setTimeout(() => {
				setInternalVisible(false);
			}, timeout);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [internalVisible, timeout]);

	useEffect(() => {
		setInternalVisible(isVisible);
	}, [isVisible]);

	return (
		<div
			className={`notification-box ${internalVisible ? 'visible' : 'hidden'}`}
			css={styles.notiBoxWrapper}>
			{internalVisible && message && (
				<>
					<div css={styles.notiBox}>
						<div>
							{message === 'Success!' ? (
								<BsFillCheckCircleFill
									color={'rgba(95, 164, 82, 1)'}
									size={20}
								/>
							) : message === 'Info' ? (
								<AiFillInfoCircle
									color={'rgba(89, 156, 255, 1)'}
									size={25}
								/>
							) : (
								<AiFillInfoCircle
									color={'rgba(235, 86, 86, 1)'}
									size={25}
								/>
							)}
						</div>
						<div
							className="d-flex"
							style={{ flexDirection: 'column' }}>
							{message}
							<label>{label}</label>
						</div>
						<div css={styles.closeIcon}>
							<AiOutlineClose
								color={'rgba(123, 123, 123, 1)'}
								size={16}
								onClick={() => setInternalVisible(false)}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default NotificationBox;

const styles = {
	notiBoxWrapper: css`
		z-index: 1;
		position: absolute;
		top: -80px;
		border-radius: 4px;
		background: var(--white);
		width: 100%;
		box-shadow:
			-1px 1px 4px 0px rgba(0, 0, 0, 0.08),
			1px -1px 10px 0px rgba(0, 0, 0, 0.1);
		color: var(--primary-font);
		.modal-content {
			border: none;
		}
	`,
	notiBox: css`
		display: flex;
		padding: 7px 10px;
		gap: 7px;
		font-style: normal;
		font-weight: 400;
		line-height: 30px;
		font-size: 16px;
		label {
			font-size: 14px;
			line-height: normal;
		}
	`,
	closeIcon: css`
		display: flex;
		cursor: pointer;
		margin-left: auto;
	`,
};
