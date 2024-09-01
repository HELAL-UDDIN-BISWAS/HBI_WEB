import { Modal, Button } from 'react-bootstrap';
import styles from '../index.module.css';
const HBI_Modal = ({ isOpen, title, content, onConfirm, onCancel }) => {
	return (
		<Modal
			show={isOpen}
			onHide={onCancel}
			centered
			dialogClassName={styles['custom-modal-dialog']}>
			<Modal.Header
				closeButton
				style={{ borderBottom: '0' }}>
				<Modal.Title>
					<span style={{ color: '#2F4858', fontSize: '22px', fontWeight: 600 }}>
						{title}
					</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p
					style={{
						textAlign: 'center',
						fontSize: '18px',
						fontWeight: 600,
					}}>
					{content}
				</p>
			</Modal.Body>
			<Modal.Footer
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					borderTop: '0',
				}}>
				<Button
					onClick={onConfirm}
					style={{
						color: '#ffffff',
						backgroundColor: '#3FC9C1',
						border: 'none',
						width: '121px',
						height: '46px',
					}}>
					Confirm
				</Button>

				<Button
					onClick={onCancel}
					style={{
						color: '#3FC9C1',
						backgroundColor: '#DFFFFD',
						border: 'none',
						width: '121px',
						height: '46px',
					}}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default HBI_Modal;
