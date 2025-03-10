import { Button as MuiButton } from '@mui/material';

/**
 * 일반 버튼 컴포넌트
 *
 * @component
 * @example
 * return (
 *   <Button text="확인" onClick={() => { alert("클릭"); }} />
 * )
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.text - 버튼에 표시할 텍스트
 * @param {() => void} props.onClick - 버튼 클릭 이벤트 핸들러
 * @returns {JSX.Element} 스타일이 적용된 버튼 컴포넌트
 */
const Button = ({ text, bgColor = '#5DB075', textColor = 'white', onClick }) => {
    return (
        <div className="p-3">
            <MuiButton
                variant="contained"
                disableElevation
                onClick={onClick}
                sx={{
                    backgroundColor: bgColor,
                    color: textColor,
                    borderRadius: '30px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    height: '50px',
                    boxShadow: 'none',
                    width: '100%',
                }}
            >
                {text}
            </MuiButton>
        </div>
    );
};

export default Button;
