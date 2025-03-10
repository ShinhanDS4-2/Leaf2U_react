import React from 'react';
import './Deposit.css';
import TumblrImg from '../../image/Tumblr.jpg';
import BicycleImg from '../../image/Bicycle.jpg';
import ReceiptImg from '../../image/Receipt.jpg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
    <div className="challenge-card">
        <div className="card-content">
            <img src={img} alt={title} className="card-image" />
            <div>
                <h3 className="card-title">{title}</h3>
                <p className="card-text" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </div>
    </div>
);

const ChallengeList = () => {
    return (
        <div>
            <Header title="오늘의 챌린지" />
            <div className="challenge-container">
                <p className="challenge-description">
                    챌린지를 선택해 주세요.
                    <br />
                    인증 및 확인 후 납입이 완료됩니다.
                </p>
                {challenges.map((challenge, index) => (
                    <ChallengeCard key={index} {...challenge} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default ChallengeList;
