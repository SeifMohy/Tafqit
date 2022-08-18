import React from "react";
import "./App.css";
import { useState } from "react";
import * as local from "./ar.json";
import * as arr from "./ararr.json";

export const App = () => {
  const [inputNumber, setInputNumber] = useState("0");
  console.log(Object.values(arr.default[0][0])[0]);
  const prefix = "فقط";
  const suffix = "جنيه مصري لا غير";

  const getNumberInArabicWArr = (array, number, xPosition) => {
    return Object.values(array.default[parseInt(number)][xPosition])[0];
  };
  const chunkToNumber = (chunk) => {
    return parseInt(chunk.reverse().join(""));
  };

  const tafqit = (inputNumber) => {
    let result = local.zero;
    let chunks = [];
    let arrOfStrings = [];

    const numberArr = inputNumber.split("").reverse();

    for (let i = 0; i < numberArr.length; i += 3) {
      let chunk = numberArr.slice(i, i + 3);
      chunks.push(chunk);
    }

    for (let i = 0; i < chunks.length; i++) {
      let strings = [];
      for (let j = 0; j < chunks[i].length; j++) {
        console.log(getNumberInArabicWArr(arr, parseInt(chunks[i][j]), j));
        strings.push(getNumberInArabicWArr(arr, parseInt(chunks[i][j]), j));
      }
      arrOfStrings.push(strings);
    }
    console.log(arrOfStrings, "strings");
    console.log(chunks, "chunks");

    // console.log(parseInt(chunks[0].reverse().join("")), "number");
    // console.log(chunkToNumber(chunks[0]), "chunk");
    for (let i = 0; i < arrOfStrings.length; i++) {
      if (arrOfStrings[i].length === 1) {
        return (result = arrOfStrings[i][0]);
      }
      if (arrOfStrings[i].length === 2) {
        let and = "";
        if (chunkToNumber(chunks[i]) > 19 && parseInt(chunks[i][1]) !== 0) {
          and = "و";
        }
        let first = "";
        if (parseInt(chunks[i][0]) > 0) {
          first = arrOfStrings[i][1];
        }
        let second = "";
        if (parseInt(chunks[i][1]) > 0) {
          second = arrOfStrings[i][0];
        }
        let end = "";
        if (parseInt(chunks[i][0]) === 1 && parseInt(chunks[i][1]) === 0)
          end = local.teh;
        return (result = `${second} ${and} ${first}${end}`);
      }
      if (arrOfStrings[i].length === 3) {
        let and = "";
        if (chunkToNumber(chunks[i]) > 19 && parseInt(chunks[i][1]) !== 0) {
          and = "و";
        }
        let first = "";
        if (parseInt(chunks[i][2]) > 0) {
          first = arrOfStrings[i][2];
        }
        let second = "";
        if (parseInt(chunks[i][1]) > 0) {
          second = arrOfStrings[i][1];
        }
        let third = arrOfStrings[i][0];
        let end = "";
        if (parseInt(chunks[i][0]) === 1 && parseInt(chunks[i][1]) === 0)
          end = local.teh;
        console.log(chunks[i][2], first, "first");
        console.log(chunks[i][1], second, "second");
        console.log(third, "third");
        return (result = `${third} ${and} ${second} ${and} ${first}${end}`);
      }
    }
    //TODO: X0X
    //TODO: 100 teh 
    //TODO: 2 w 1 

    return result;
  };

  return (
    <>
      <label for="arabicNumber">Write a number:</label>

      <input
        type="number"
        id="arabicNumber"
        name="arabicNumber"
        value={inputNumber}
        onChange={(e) => {
          setInputNumber(e.target.value);
        }}
      />

      <h1>{`${prefix} ${tafqit(inputNumber)}
      ${suffix}`}</h1>
    </>
  );
};
