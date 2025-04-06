import { settingsFormSchema } from "./validation";
import { expect, test } from "vitest";

test("checks displayName validity", () => {
  const nameOnly = settingsFormSchema.pick({ displayName: true });
  expect(nameOnly.safeParse({ displayName: "" }).success).toBe(false);
  expect(nameOnly.safeParse({ displayName: true }).success).toBe(false);
  expect(nameOnly.safeParse({ displayName: "a" }).success).toBe(false);
  expect(nameOnly.safeParse({ displayName: "aa" }).success).toBe(true);
  expect(
    nameOnly.safeParse({ displayName: "727c*92 3u49$#@% afed" }).success
  ).toBe(true);
  expect(
    nameOnly.safeParse({ displayName: "727c*92 3u49$#@% afed" }).success
  ).toBe(true);
  expect(
    nameOnly.safeParse({ displayName: "727c*92 3u49$#@% afed" }).success
  ).toBe(true);
  expect(
    nameOnly.safeParse({
      displayName: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    }).success
  ).toBe(false);
});

test("checks role validtiy", () => {
  const roleOnly = settingsFormSchema.pick({ role: true });
  expect(roleOnly.safeParse({ role: "learner" }).success).toBe(true);
  expect(roleOnly.safeParse({ role: "teacher" }).success).toBe(true);
  expect(roleOnly.safeParse({ role: "" }).success).toBe(false);
  expect(roleOnly.safeParse({ role: "just here for the vibes" }).success).toBe(
    false
  );
});
