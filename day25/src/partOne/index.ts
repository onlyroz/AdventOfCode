import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  const locks: number[][] = [];
  const keys: number[][] = [];

  let isLock = false;
  let isKey = false;

  for (const line of input) {
    if (!isLock && !isKey && line === "#####") {
      isLock = true; // Found start of lock sequence
      locks.push([0,0,0,0,0]);
      continue;
    }

    if (isLock && !isKey && line === "") {
      isLock = false; // Found end of lock sequence
      continue;
    }

    if (!isKey && !isLock && line === ".....") {
      isKey = true; // Found start of key sequence
      keys.push([0,0,0,0,0])
      continue;
    }

    if (isKey && !isLock && line === '') {
      isKey = false; // Found end of key sequence
      continue;
    }

    const items = line.split("");
  //  console.log(`isLock: ${isLock}, isKey: ${isKey}, items: ${items}`)
    items.forEach((item, index) => {
      if (isLock && item === '#') {
        locks[locks.length - 1][index]++;
      }

      if (isKey && item === '#') {
        keys[keys.length - 1][index]++;
      }
    });
  }

  console.log('Locks:', locks.length)
  console.log('Keys:', keys.length)

  let fits = 0;
  locks.forEach((lock) => {
    keys.forEach((key) => {
      if (lock.every((value, index) => value + key[index] <= 6)) {
        fits++;
      }
    })
  })

  shout(`Lock fits: ${fits}`)
};
