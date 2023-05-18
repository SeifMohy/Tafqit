import React from "react";
import "./App.css";
import { useState } from "react";
import * as arr from "./ararr.json";

export const App = () => {
  const [inputNumber, setInputNumber] = useState("0");
  const prefix = "فقط";
  const suffix = "جنيه مصري لا غير";

  const getNumberInArabicWArr = (array, number, xPosition) => {
    return Object.values(array.default[parseInt(number)][xPosition])[0];
  };

  const chunkToNumber = (chunk) => {
    return parseInt(chunk.reverse().join(""));
  };

  const tafqit = (inputNumber) => {
    let result = "صفر";
    let chunks = [];
    let arrOfStrings = [];
    let tafqit = [];

    const numberArr = inputNumber.split("").reverse();

    // tafqit 3 digits by three
    for (let i = 0; i < numberArr.length; i += 3) {
      let chunk = numberArr.slice(i, i + 3);
      chunks.push(chunk);
    }

    console.log(chunks, "chunks");

    for (let i = 0; i < chunks.length; i++) {
      let strings = [];
      for (let j = 0; j < chunks[i].length; j++) {
        strings.push(getNumberInArabicWArr(arr, parseInt(chunks[i][j]), j));
      }
      arrOfStrings.push(strings);
    }

    for (let i = 0; i < arrOfStrings.length; i++) {
      if (arrOfStrings[i].length === 1) {
        tafqit.push(arrOfStrings[i][0]);
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
        if (chunks[i][0] === "1" && chunks[i][1] === "0") end = "ة";
        if (chunks[i][0] === "1" && chunks[i][1] === "1") second = "إحدى";
        if (chunks[i][0] === "1" && chunks[i][1] === "2") second = "إثنا";

        tafqit.push(`${second} ${and} ${first}${end}`);
      }
      if (arrOfStrings[i].length === 3) {
        let andTens = "";
        if (
          chunkToNumber(chunks[i].slice(0, 2)) > 19 &&
          parseInt(chunks[i][0]) !== 0
        ) {
          andTens = "و";
        }
        let first = "";
        if (parseInt(chunks[i][0]) > 0) first = arrOfStrings[i][0];

        let second = "";
        if (parseInt(chunks[i][1]) > 0) second = arrOfStrings[i][1];

        let third = arrOfStrings[i][2];
        let end = "";
        let andHunds = "و";
        if (chunks[i][0] === "0" && chunks[i][1] === "0") andHunds = "";
        if (chunkToNumber(chunks[i]) < 100) andHunds = "";
        if (chunks[i][0] === "0" && chunks[i][1] === "1") end = "ة";
        if (chunks[i][0] === "1" && chunks[i][1] === "1") first = "إحدى";
        if (chunks[i][0] === "2" && chunks[i][1] === "1") first = "إثنا";
        tafqit.push(`${third} ${andHunds} ${first} ${andTens} ${second}${end}`);
      }
    }

    console.log("tafqit", tafqit);
    if (tafqit.length === 1) result = `${tafqit[0]}`;
    if (tafqit.length === 2) {
      let thousand = "ألف";
      let w = "و";
      let first = tafqit[1];
      let second = tafqit[0];
      if (chunkToNumber(chunks[0]) < 1) {
        w = "";
      }
      if (chunkToNumber(chunks[1]) <= 10) {
        thousand = "آلاف";
      }
      if (chunkToNumber(chunks[1]) === 1 && chunks[1].length < 2) {
        first = "";
        thousand = "ألف";
      }
      if (chunkToNumber(chunks[1]) === 2 && chunks[1].length < 2) {
        first = "";
        thousand = "ألفين";
      }
      result = `${first} ${thousand} ${w} ${second}`;
    }

    if (tafqit.length === 3) {
      let million = "مليون";
      let thousand = "ألف";
      let w = "و";
      let w2 = "و";
      let first = tafqit[2];
      let second = tafqit[1];
      let third = tafqit[0];

      if (chunkToNumber(chunks[2]) === 2 && chunks[2].length < 2) {
        million = "مليونان";
        first = "";
      }

      if (chunkToNumber(chunks[2]) === 1 && chunks[2].length < 2) {
        first = "";
      }
      if (chunkToNumber(chunks[1]) === 0) {
        thousand = "";
        w2 = "";
        w = "";
      }
      if (chunkToNumber(chunks[0]) === 0) {
        w = "";
      }
      if (chunkToNumber(chunks[1]) === 0 && chunkToNumber(chunks[0]) !== 0) {
        w = "و";
      }
      // if (chunkToNumber(chunks[0]) === 0) {
      //   w = "و";
      // }
      // if (chunkToNumber(chunks[1]) === 0 && chunkToNumber(chunks[0]) === 0) {
      //   w = "";
      //   w2 = "";
      //   thousand = "";
      // }
      // if (chunkToNumber(chunks[1]) <= 10 && chunkToNumber(chunks[1]) !== 0) {
      //   thousand = "آلاف";
      //   w2 = "";
      // }
      console.log(chunks, "chunks");
      result = `${first} ${million} ${w2} ${second} ${thousand} ${w} ${third}`;
    }

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
