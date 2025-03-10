import React from 'react';
import TumblrImg from '../../image/Tumblr.jpg';
import BicycleImg from '../../image/Bicycle.jpg';
import ReceiptImg from '../../image/Receipt.jpg';

const styles = {
    container: {
        padding: '1.5rem',
        backgroundColor: '#f3f4f6',
        minHeight: '100vh',
        paddingBottom: '4rem',
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        fontSize: '0.875rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '1.5rem',
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '1rem',
    },
    cardImage: {
        width: '4rem',
        height: '4rem',
        marginRight: '1rem',
        borderRadius: '0.5rem',
    },
    highlight: {
        color: '#499D40',
        fontWeight: 'bold',
    },
};

const challenges = [
    {
        img: TumblrImg,
        title: '일회용컵 대신 텀블러',
        description: `일회용컵 한 개 사용 탄소 <span class="highlight">137gCO2 eq</span> 배출<br />텀블러 1개 사용 탄소 <span class="highlight">127gCO2 eq</span> 배출`,
    },
    {
        img: BicycleImg,
        title: '따릉이 사용',
        description: `공공자전거 대중이 사용으로 줄이는 온실가스 배출량 약 <span class="highlight">96g</span>`,
    },
    {
        img: ReceiptImg,
        title: '종이 영수증 대신 전자 영수증',
        description: `종이 영수증 발행을 위해 소모되는 원목량은 <span class="highlight">334,400그루</span>`,
    },
];

const ChallengeCard = ({ img, title, description }) => (
    <div style={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={img} alt={title} style={styles.cardImage} />
            <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>{title}</h3>
                <p style={styles.text} dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </div>
    </div>
);

const ChallengeList = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>오늘의 챌린지</h2>
            <p style={styles.description}>
                챌린지를 선택해 주세요.
                <br />
                인증 및 확인 후 납입이 완료됩니다.
            </p>
            {challenges.map((challenge, index) => (
                <ChallengeCard key={index} {...challenge} />
            ))}
        </div>
    );
};

export default ChallengeList;
