import { Box, Typography } from "@mui/material";

const ChallengeItem = ({icon, content, carbon, cnt}) => {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                borderRadius: '10px',
                paddingLeft: '15px',
                paddingRight: '25px',
                paddingBottom: '5px',
                paddingTop: '5px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {icon}
                <Box>
                    <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                        {content}
                    </Typography>
                    <Typography sx={{ fontSize: '11px', color: '#4B9460', marginLeft: '10px' }}>
                        탄소 {carbon} gCO₂ 감소 | 금리 + {Number(((cnt)*0.1).toFixed(2))} %
                    </Typography>
                </Box>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {cnt} 회
            </Typography>
        </Box>
    );
}

export default ChallengeItem;