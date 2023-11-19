import {ListType} from "./App";
import {Dispatch, SetStateAction} from "react";

const getNum = (num: number, index: number) => {
    const strNum = String(num);
    let end = strNum.length - 1;
    const foundNum = strNum[end - index];

    if (foundNum === undefined) return 0;
    else return foundNum;
};

const largestNum = (arr: Array<ListType>) => {
    let largest = "0";

    arr.forEach(num => {
        const strNum = String(num);

        if (strNum.length > largest.length) largest = strNum;
    });

    return largest.length;
};

export const DigitSort = (arr: Array<ListType>, setSteps?:  Dispatch<SetStateAction<any[]>>): Array<ListType> => {
    let maxLength = largestNum(arr);

    for (let i = 0; i < maxLength; i++) {
        if (setSteps) {
            setSteps((prevValue: any) => [...prevValue, "Создаём пустой массив buckets"])
        }
        let buckets = Array.from({ length: 10 }, () => []);

        for (let j = 0; j < arr.length; j++) {
            let num = getNum(arr[j].data, i);

            if (setSteps) {
                setSteps((prevValue) => [...prevValue, `Из этого числа ${arr[j].data} берём конец ${num} и удаляем последний символ`])
            }

            if (num !== undefined) buckets[num]?.push(arr[j]);
            if (setSteps) {
                setSteps((prevValue) => [...prevValue, `Далеe проверяем если число есть то пушим его в массив buckets`])
            }
        };
        arr = buckets.flat();
    };
    return arr;
};