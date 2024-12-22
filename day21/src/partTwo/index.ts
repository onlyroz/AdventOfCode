import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  const codes = input.map((line) => line.split(''));

  const pad1map = {
    '0,0': '',
    '0,1': '^<',
    '0,2': '^',
    '0,3': '^>',
    '0,4': '^^<',
    '0,5': '^^',
    '0,6': '^^>',
    '0,7': '^^^<',
    '0,8': '^^^',
    '0,9': '^^^>',
    '0,A': '>',
    '1,0': '>v',
    '1,1': '',
    '1,2': '>',
    '1,3': '>>',
    '1,4': '^',
    '1,5': '^>',
    '1,6': '^>>',
    '1,7': '^^',
    '1,8': '^^>',
    '1,9': '^^>>',
    '1,A': '>>v',
    '2,0': 'v',
    '2,1': '<',
    '2,2': '',
    '2,3': '>',
    '2,4': '<^',
    '2,5': '^',
    '2,6': '^>',
    '2,7': '<^^',
    '2,8': '^^',
    '2,9': '^^>',
    '2,A': 'v>',
    '3,0': '<v',
    '3,1': '<<',
    '3,2': '<',
    '3,3': '',
    '3,4': '<<^',
    '3,5': '<^',
    '3,6': '^',
    '3,7': '<<^^',
    '3,8': '<^^',
    '3,9': '^^',
    '3,A': 'v',
    '4,0': '>vv',
    '4,1': 'v',
    '4,2': 'v>',
    '4,3': 'v>>',
    '4,4': '',
    '4,5': '>',
    '4,6': '>>',
    '4,7': '^',
    '4,8': '^>',
    '4,A': '>>vv',
    '5,0': 'vv',
    '5,1': '<v',
    '5,2': 'v',
    '5,3': 'v>',
    '5,4': '<',
    '5,5': '',
    '5,6': '>',
    '5,7': '<^',
    '5,8': '^',
    '5,9': '^>',
    '5,A': 'vv>',
    '6,0': '<vv',
    '6,1': '<<v',
    '6,2': '<v',
    '6,3': 'v',
    '6,4': '<<',
    '6,5': '<',
    '6,6': '',
    '6,7': '<<^',
    '6,8': '<^',
    '6,9': '^',
    '6,A': 'vv',
    '7,0': '>vvv',
    '7,1': 'vv',
    '7,2': 'vv>',
    '7,3': 'vv>>',
    '7,4': 'v',
    '7,5': 'v>',
    '7,6': 'v>>',
    '7,7': '',
    '7,8': '>',
    '7,9': '>>',
    '7,A': '>>vvv',
    '8,0': 'vvv',
    '8,1': '<vv',
    '8,2': 'vv',
    '8,3': 'vv>',
    '8,4': '<v',
    '8,5': 'v',
    '8,6': 'v>',
    '8,7': '<',
    '8,8': '',
    '8,9': '>',
    '8,A': 'vvv>',
    '9,0': '<vvv',
    '9,1': '<<vv',
    '9,2': '<vv',
    '9,3': 'vv',
    '9,4': '<<v',
    '9,5': '<v',
    '9,6': 'v',
    '9,7': '<<',
    '9,8': '<',
    '9,9': '',
    '9,A': 'vvv',
    'A,0': '<',
    'A,1': '^<<',
    'A,2': '<^',
    'A,3': '^',
    'A,4': '^^<<',
    'A,5': '<^^',
    'A,6': '^^',
    'A,7': '^^^<<',
    'A,8': '<^^^',
    'A,9': '^^^',
    'A,A': '',
  };

  const pad2map = {
    '^,A': '>',
    '^,<': 'v<',
    '^,v': 'v',
    '^,>': 'v>',
    '^,^': '',
    'A,^': '<',
    'A,<': 'v<<',
    'A,v': '<v',
    'A,>': 'v',
    'A,A': '',
    '<,^': '>^',
    '<,A': '>>^',
    '<,v': '>',
    '<,>': '>>',
    '<,<': '',
    'v,^': '^',
    'v,A': '^>',
    'v,<': '<',
    'v,>': '>',
    'v,v': '',
    '>,^': '<^',
    '>,A': '^',
    '>,<': '<<',
    '>,v': '<',
    '>,>': '',
  }; 

  type Pad1MapKey = keyof typeof pad1map;
  type Pad2MapKey = keyof typeof pad2map;

  const processSequence = (sequence: string, map: Record<string, string>) => {
    let current = 'A';
    let result: string[] = [];

    for (let i = 0; i < sequence.length; i++) {
      const item = sequence[i];
      const mapKey = `${current},${item}` as Pad1MapKey | Pad2MapKey;
      const mapValue = map[mapKey];
      if (mapValue === undefined) {
        throw new Error(`Undefined mapping for ${mapKey}`);
      }
      result.push(mapValue + 'A');
      current = item;
    } 

    return result.join('');
  };

  let result = BigInt(0);
  codes.forEach((code) => {
    let numCode = code.join('').replaceAll('A', '');
    if (numCode.startsWith('0')) {
      numCode = numCode.slice(1);
    }

    // Process for robot 1 using pad1map
    let seqRobot = processSequence(code.join(''), pad1map);

    // Process for robots 2 onwards using pad2map
    for (let robotNumber = 2; robotNumber <= 3; robotNumber++) {
      seqRobot = processSequence(seqRobot, pad2map);
    }

    const length = BigInt(seqRobot.length);
    result += BigInt(numCode) * length;
  });

  shout(`result: ${result.toString()}`);
}; 
