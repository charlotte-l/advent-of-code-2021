import { createReadStream } from 'fs'
import { readFileSync as read } from 'fs'
import { createInterface } from 'readline'
import path from 'path'

export async function Solution(): Promise<number> {
  // read in the puzzle input
  const puzzleInput: Array<number> = []

  let colCount = 0
  let rowCount = 0

  const rl = createInterface({
    input: createReadStream(path.resolve(__dirname, 'input.txt')),
  })

  for await (const line of rl) {
    const input = line.split('') // split binary string into an array
    input.forEach((el, i) => {
      if (typeof puzzleInput[i] == 'undefined') {
        puzzleInput[i] = 0
        colCount++
      }
      puzzleInput[i] += parseInt(el) // tally up number of 1s in each slot in array
    })
    rowCount++
  }

  const gamma = Array(colCount).fill(0)
  const epsilon = Array(colCount).fill(0)

  puzzleInput.forEach((el, i) => {
    if (el >= rowCount / 2) {
      gamma[i] = 1
    } else {
      epsilon[i] = 1
    }
  })

  const gammaValue = parseInt(gamma.join(''), 2)
  const epsilonValue = parseInt(epsilon.join(''), 2)

  return Math.floor(gammaValue * epsilonValue)
}

export function SolutionPartTwo(): number {
  const input: Array<string> = read(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8' })
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  // oxygenGenerator uses most common value, keeps 1 for equal
  const oxygenGeneratorRating = reduce(input, 0, (counts: Array<number>) => {
    if (counts[1] > counts[0]) {
      return 1
    } else if (counts[1] < counts[0]) {
      return 0
    } else {
      return 1
    }
  })

  // co2scrubber uses least common value, keeps 0 for equal
  const co2ScrubberRating = reduce(input, 0, (counts: Array<number>) => {
    if (counts[0] > counts[1]) {
      return 1
    } else if (counts[0] < counts[1]) {
      return 0
    } else {
      return 0
    }
  })

  return parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2)

  function reduce(input: Array<string>, place: number, comparator: (counts: Array<number>) => number): string {
    const counts = [0, 0]
    if (input.length === 1) {
      // stop if only one number is left
      return input[0]
    } else {
      for (const value of input) {
        const bit = +value[place] // cast to number
        counts[bit]++ // increment 0/1 counter
      }
      const bit = comparator(counts)
      
      // iterate to next signficant bit
      return reduce(
        input.filter((value) => +value[place] === bit),
        place + 1,
        comparator,
      )
    }
  }
}
