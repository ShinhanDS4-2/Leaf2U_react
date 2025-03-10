import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

/**
 * 알림 모달 컴포넌트
 *
 * @component
 * @example
 * const alertRef = useRef();               // 참조 ref
 * const handleOpenAlert = () => {          // 모달 open 이벤트 핸들링
        if (alertRef.current) {
            alertRef.current.openModal();
        }
    };
 * return (
 *   <div>
 *      <div onClick={handleOpenAlert}>
            Alert 모달 이벤트
        </div>
        <AlertModal ref={alertRef} text={'<span>Alert 알림 내용 작성<br>Alert 알림 내용 작성</span>'} onClick={() => {}}/>
 *   </div>
 * )
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.title - 모달 제목 (디폴트: '알림')
 * @param {string} props.text - 모달 내용
 * @param {() => void} props.onClick - 확인 클릭 이벤트 핸들러 (디폴트: 그냥 닫기)
 * @returns {JSX.Element} 스타일이 적용된 Alert Modal 컴포넌트
 */

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AlertModal = React.forwardRef(({ title="알림", text="알림 내용", onClick=() => {} }, ref) => {
    const [open, setOpen] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
            openModal() {
                setOpen(true);
            },
            closeModal() {
                setOpen(false);
            },
    }));

    const handleClose = () => {
        onClick();
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            fullWidth 
            maxWidth={false}
            sx={{
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" className='p-2'>
                    <span 
                        dangerouslySetInnerHTML={{ __html: text }} 
                        style={{ whiteSpace: 'pre-line' }}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} 
                    fullWidth
                    sx={{ 
                        backgroundColor: '#5DB075',  
                        color: 'white',   
                        borderRadius: '30px',
                        fontSize: '16px',
                        fontWeight: 'bold',         
                    }}
                >
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default AlertModal;
