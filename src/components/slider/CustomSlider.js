import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react/dist/iconify.js';
import heart from '../../image/si--heart-fill.png';

const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 14,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 32,
        width: 32,
        backgroundColor: '#4B9460',
        border: '2px solid #4B9460',
        display: 'flex', // 중앙 정렬 추가
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
        '&::after': {
            width: '22px',
            height: '22px',
            backgroundImage: `url(${heart})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            fontSize: '24px',
            color: 'white',
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 50,
        height: 50,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#4B9460',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&::before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});

const CustomSlider = ({
    min,
    max,
    defalut,
    step,
    minText,
    maxText,
    title,
    subTitle,
    onChange,
    value,
}) => {
    return (
        <Box sx={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                <Icon
                    icon="ri:heart-add-fill"
                    width="20px"
                    height="20px"
                    style={{ color: '#4B9460' }}
                />
                <Typography sx={{ marginLeft: '5px' }}>{title}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                <Typography sx={{ marginLeft: '25px', fontSize: '10px', color: '#999696' }}>
                    {subTitle}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Typography variant="body2" sx={{ cursor: 'pointer', color: '#848688' }}>
                    {minText}
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', color: '#4B9460' }}>
                    {maxText}
                </Typography>
            </Box>
            <Box>
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={defalut}
                    step={step}
                    min={min}
                    max={max}
                    valueLabelFormat={(val) => val.toLocaleString()}
                    onChange={(event, newValue) => onChange(newValue)}
                    value={value}
                />
            </Box>
        </Box>
    );
};

export default CustomSlider;
