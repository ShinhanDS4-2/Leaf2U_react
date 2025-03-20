import Hangul from 'hangul-js';

/** 카드 번호 포맷 */
export const formatCardNumber = (num) => {
    // 숫자만 남기고 최대 16자리까지만 허용
    let digits = num.replace(/\D/g, '').slice(0, 16);

    // 4자리마다 '-' 추가
    return digits.replace(/(\d{4})(?=\d)/g, '$1-');
};

/** 전화번호 포맷 */
export const formatPhoneNumber = (value) => {
    // 숫자 이외의 문자 제거
    const cleaned = value.replace(/\D/g, '');

    // xxx-xxxx-xxxx 형식으로 변환
    if (cleaned.length <= 3) {
        return cleaned;
    } else if (cleaned.length <= 7) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }
};

/** 한글 분리 */
export const koreanSeperate = (name) => {
    return name.split('');
};

/** 로마자 표기법으로 변환 */
export const koreanToRomanization = (text) => {
    const initialConsonantsArray = [
        'g',
        'kk',
        'n',
        'd',
        'tt',
        'r',
        'm',
        'b',
        'pp',
        's',
        'ss',
        '',
        'j',
        'jj',
        'ch',
        'k',
        't',
        'p',
        'h',
    ];
    const vowelsArray = [
        'a',
        'ae',
        'ya',
        'yae',
        'eo',
        'e',
        'yeo',
        'ye',
        'o',
        'wa',
        'wae',
        'oe',
        'yo',
        'u',
        'wo',
        'we',
        'wi',
        'yu',
        'eu',
        'ui',
        'i',
    ];
    const finalConsonantsArray = [
        '',
        'k',
        'k',
        'ks',
        'n',
        'nj',
        'nh',
        't',
        'l',
        'lk',
        'lm',
        'lp',
        'ls',
        'lt',
        'lp',
        'lh',
        'm',
        'p',
        'ps',
        't',
        't',
        'ng',
        't',
        't',
        'k',
        't',
        'p',
        't',
    ];

    let result = '';

    const separated = text.split('');

    for (let i = 0; i < separated.length; i++) {
        const char = separated[i];

        // **성이 "이"인 경우 "Lee"로 변환**
        if (char === '이' && i === 0) {
            result += 'Lee';
            continue;
        }

        const syllableCode = char.charCodeAt(0) - 0xac00;

        if (syllableCode >= 0 && syllableCode <= 11171) {
            // 한글 음절인지 확인
            const initialIndex = Math.floor(syllableCode / 588);
            const vowelIndex = Math.floor((syllableCode % 588) / 28);
            const finalIndex = syllableCode % 28;

            console.log(
                `초성 index: ${initialIndex}, 중성 index: ${vowelIndex}, 종성 index: ${finalIndex}`,
            );

            const initial = initialConsonantsArray[initialIndex] || '';
            const vowel = vowelsArray[vowelIndex] || '';
            const final = finalIndex > 0 ? finalConsonantsArray[finalIndex] : '';

            result += initial + vowel + final;
        } else {
            result += char; // 한글이 아닌 문자는 그대로 유지
        }
    }

    return result.toUpperCase();
};
