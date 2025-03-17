import Hangul from 'hangul-js';

/** 카드 번호 포맷 */
export const formatCardNumber = (num) => {
    // 숫자만 남기고 최대 16자리까지만 허용
    let digits = num.replace(/\D/g, '').slice(0, 16);

    // 4자리마다 '-' 추가
    return digits.replace(/(\d{4})(?=\d)/g, '$1-');
};

/** 한글 분리 */
export const koreanSeperate = (name) => {
    return Hangul.disassemble(name)
        .map((char) => Hangul.assemble([char]))
        .join('');
};
