import { getElapsedTime, addZero } from "../utils/getElapsedTime";
import { expect, test } from "@jest/globals";

test("get elapsed time: 1 minute or less", () => {
  const now = Date.now();
  const result = getElapsedTime(now);
  return expect(result).toMatch(/^1 минуту назад$/g);
});

test("get elapsed time: from 1 up to 5 minutes", () => {
  const now = new Date();
  const testTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes() - 2
  );
  const result = getElapsedTime(testTime.getTime());
  return expect(result).toMatch(/^5 минут назад$/g);
});

test("get elapsed time: from 5 up to 10 minutes", () => {
  const now = new Date();
  const testTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes() - 6
  );
  const result = getElapsedTime(testTime.getTime());
  return expect(result).toMatch(/^10 минут назад$/g);
});

test("get elapsed time: from 10 up to 30 minutes", () => {
  const now = new Date();
  const testTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes() - 11
  );
  const result = getElapsedTime(testTime.getTime());
  return expect(result).toMatch(/^30 минут назад$/g);
});

test("get elapsed time: from 30 minutes up to one day", () => {
  const now = new Date();
  const testTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours() - 1,
    now.getMinutes()
  );
  const result = getElapsedTime(testTime.getTime());
  const correctValue = [testTime.getHours(), testTime.getMinutes()]
    .map(addZero)
    .join("\\:");
  const regex = new RegExp("^" + correctValue + "$", "g");
  return expect(result).toMatch(regex);
});

test("get elapsed time: from one day up to one year", () => {
  const now = new Date();
  const testTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
    now.getHours(),
    now.getMinutes()
  );
  const result = getElapsedTime(testTime.getTime());
  const correctValue = [testTime.getDate(), testTime.getMonth() + 1]
    .map(addZero)
    .join("\\.");
  const regex = new RegExp("^" + correctValue + "$", "g");
  return expect(result).toMatch(regex);
});

test("get elapsed time: later than one year", () => {
  const now = new Date();
  const testTime = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes()
  );
  const result = getElapsedTime(testTime.getTime());
  const correctValue = [
    testTime.getDate(),
    testTime.getMonth() + 1,
    testTime.getFullYear()
  ]
    .map(addZero)
    .join("\\.");
  const regex = new RegExp("^" + correctValue + "$", "g");
  return expect(result).toMatch(regex);
});
