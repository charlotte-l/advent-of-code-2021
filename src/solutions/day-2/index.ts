import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import path from 'path'

interface Command {
  direction: string
  units: number
}

export async function Solution(): Promise<number> {
  // read in the puzzle input
  const puzzleInput: Command[] = []
  const currentPosition = {
    horizontal: 0,
    depth: 0,
  }

  const rl = createInterface({
    input: createReadStream(path.resolve(__dirname, 'input.txt')),
  })

  for await (const line of rl) {
    const input = line.split(' ')
    puzzleInput.push({
      direction: input[0],
      units: parseInt(input[1]),
    })
  }

  const commandCount = puzzleInput.length

  for (let i = 0; i < commandCount; i++) {
    switch (puzzleInput[i].direction) {
      case 'forward':
        currentPosition.horizontal += puzzleInput[i].units
        break
      case 'up':
        currentPosition.depth -= puzzleInput[i].units
        break
      case 'down':
        currentPosition.depth += puzzleInput[i].units
        break
    }
  }

  return currentPosition.horizontal * currentPosition.depth
}

export async function SolutionPartTwo(): Promise<number> {
  // read in the puzzle input
  const puzzleInput: Command[] = []
  const currentPosition = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  }

  const rl = createInterface({
    input: createReadStream(path.resolve(__dirname, 'input.txt')),
  })

  for await (const line of rl) {
    const input = line.split(' ')
    puzzleInput.push({
      direction: input[0],
      units: parseInt(input[1])
    })
  }

  const commandCount = puzzleInput.length

  for (let i = 0; i < commandCount; i++) {
    switch (puzzleInput[i].direction) {
      case 'forward':
        currentPosition.horizontal += puzzleInput[i].units
        currentPosition.depth += (currentPosition.aim * puzzleInput[i].units)
        break
      case 'up':
        currentPosition.aim -= puzzleInput[i].units
        break
      case 'down':
        currentPosition.aim += puzzleInput[i].units
        break
    }
  }

  return currentPosition.horizontal * currentPosition.depth
}
