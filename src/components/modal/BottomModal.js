import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

/**
 * 하단 모달 컴포넌트
 *
 * @component
 * @example
 * const modalRef = useRef();               // 참조 ref
 * const handleOpenAlert = () => {          // 모달 open 이벤트 핸들링
        if (modalRef.current) {
            modalRef.current.openModal();
        }
    };
 * return (
 *   <div>
 *      <div onClick={handleOpenAlert}>
            Bottom 모달 이벤트
        </div>
        <BottomModal ref={modalRef}>
            <div>
                <Typography variant="h6" className="fw-bold mb-2" color="primary">
                    🎉 축하합니다! 출석 완료 🎉
                </Typography>
                <p style={{ color: 'gray', marginBottom: '16px' }}>
                    지금까지 총 5일 연속 출석했어요!
                </p>
                <Button
                    text='확인'
                    onClick={(e) => {
                        handleCloseModal();
                    }}
                />
            </div>
        </BottomModal>
 *   </div>
 * )
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.children - 모달 내 자식 요소
 * @returns {JSX.Element} 하단 Modal 컴포넌트
 */

const drawerBleeding = 80;

const Root = styled('div')(() => ({
    height: '100%',
    backgroundColor: 'transparent',
}));

const StyledBox = styled('div')(() => ({
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
}));

const Puller = styled('div')(() => ({
    width: 30,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const BottomModal = React.forwardRef(({ window, maxHeight = '50%', children }, ref) => {  

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // 🟢 부모 컴포넌트에서 호출 가능한 openModal 메서드 정의
    React.useImperativeHandle(ref, () => ({
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false)
    }));

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `auto`,
                        maxHeight: maxHeight,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={true}
                keepMounted
            >
                <StyledBox sx={{ position: 'relative', pt: 6, pb: 3 }}>
                    <Puller />
                    {children}
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
});

export default BottomModal;