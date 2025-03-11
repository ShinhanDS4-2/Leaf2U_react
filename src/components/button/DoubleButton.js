import { Button as MuiButton } from '@mui/material';

/**
 * 확인/취소 버튼 컴포넌트
 *
 * @component
 * @example
 * return (
 *   <DoubleButton
        confirmOnClick={() => {
            handleCloseModal();
        }}
        cancelOnClick={() => {
            handleCloseModal();
        }}
    />
 * )
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.confirmText - 확인 버튼 텍스트
 * @param {string} props.confirmBgColor - 확인 버튼 배경 색
 * @param {string} props.confirmColor - 확인 버튼 텍스트 색
 * @param {() => void} props.confirmOnClick - 확인 버튼 클릭 이벤트 핸들러
 * @param {string} props.cancelText - 취소 버튼 텍스트
 * @param {string} props.cancelBgColor - 취소 버튼 배경 색
 * @param {string} props.cancelColor - ㅍ 버튼 텍스트 색
 * @param {() => void} props.cancelOnClick - 취소 버튼 클릭 이벤트 핸들러
 * @returns {JSX.Element} 확인/취소 버튼 컴포넌트
 */
const DoubleButton = ({
    confirmText = '확인',
    confirmBgColor = '#5DB075',
    confirmColor = 'white',
    confirmOnClick = () => {},
    cancelText = '취소',
    cancelBgColor = '#A2A5A7',
    cancelColor = 'white',
    cancelOnClick = () => {},
}) => {
    return (
        <div>
            <div className="d-flex ps-3 pe-3 row">
                <div className="col">
                    <MuiButton
                        disableElevation
                        onClick={confirmOnClick}
                        sx={{
                            backgroundColor: confirmBgColor,
                            color: confirmColor,
                            borderRadius: '30px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            height: '50px',
                            boxShadow: 'none',
                            width: '100%',
                            marginLeft: '0px',
                        }}
                    >
                        {confirmText}
                    </MuiButton>
                </div>
                <div className="col">
                    <MuiButton
                        disableElevation
                        onClick={cancelOnClick}
                        sx={{
                            backgroundColor: cancelBgColor,
                            color: cancelColor,
                            borderRadius: '30px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            height: '50px',
                            boxShadow: 'none',
                            width: '100%',
                            marginRight: '0px',
                        }}
                    >
                        {cancelText}
                    </MuiButton>
                </div>
            </div>
        </div>
    );
};

export default DoubleButton;
