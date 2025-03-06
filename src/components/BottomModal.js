import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

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

const BottomModal = React.forwardRef((props, ref) => {  
    const { window } = props;
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
                        maxHeight: '50%',
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
                    {props.children}
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
});

export default BottomModal;