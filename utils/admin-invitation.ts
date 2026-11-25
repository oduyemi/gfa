import { randomInt, randomBytes, createHash } from "crypto";
import bcrypt from "bcryptjs";


export const INVITATION_TTL_MINUTES = 45;
export const MAX_OTP_ATTEMPTS = 5;
export const SETUP_SESSION_MINUTES = 15;
export const BCRYPT_ROUNDS = 12;

const CHARSETS = {
  uppercase: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  lowercase: "abcdefghijkmnopqrstuvwxyz",
  numbers: "23456789",
  special: "!@#$%&*?",
};

const ALL_CHARACTERS = Object.values(CHARSETS).join("");

function secureShuffle(characters: string[]) {
  for (let i = characters.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }

  return characters;
}


export function generateInvitationOtp(): string {
  const characters = [
    CHARSETS.uppercase[randomInt(CHARSETS.uppercase.length)],
    CHARSETS.lowercase[randomInt(CHARSETS.lowercase.length)],
    CHARSETS.numbers[randomInt(CHARSETS.numbers.length)],
    CHARSETS.special[randomInt(CHARSETS.special.length)],
    ...Array.from(
      { length: 2 },
      () => ALL_CHARACTERS[randomInt(ALL_CHARACTERS.length)]
    ),
  ];

  return secureShuffle(characters).join("");
}

export function generateTemporaryPassword(length = 20): string {
  const characters = [
    CHARSETS.uppercase[randomInt(CHARSETS.uppercase.length)],
    CHARSETS.lowercase[randomInt(CHARSETS.lowercase.length)],
    CHARSETS.numbers[randomInt(CHARSETS.numbers.length)],
    CHARSETS.special[randomInt(CHARSETS.special.length)],
  ];

  for (let i = characters.length; i < length; i++) {
    characters.push(
      ALL_CHARACTERS[randomInt(ALL_CHARACTERS.length)]
    );
  }

  return secureShuffle(characters).join("");
}

export async function hashSecret(secret: string) {
  return bcrypt.hash(secret, BCRYPT_ROUNDS);
}

export async function compareSecret(
  secret: string,
  hashedSecret: string
) {
  return bcrypt.compare(secret, hashedSecret);
}

export function generateSetupToken() {
  return randomBytes(32).toString("hex");
}

export function hashSetupToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function getExpiration(minutes: number) {
  return new Date(Date.now() + minutes * 60 * 1000);
}
