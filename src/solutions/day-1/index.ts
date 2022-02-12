import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import path from 'path'

export async function Solution() {
    // read in the puzzle input
    const puzzleInput:number[] = []
    let increaseCount = 0
    let prevValue = 0;

    const rl = createInterface({
        input: createReadStream(path.resolve(__dirname, 'input.txt'))
    })

    for await (const line of rl) {
        puzzleInput.push(parseInt(line))
    }

    const depthCount = puzzleInput.length;
    prevValue = puzzleInput[0];

    // start at 1 as there's no initial depth measurement
    for (let i = 1; i < depthCount; i++) {
        if (puzzleInput[i] > prevValue) increaseCount++
        prevValue = puzzleInput[i]
    }

    return increaseCount
}

export async function SolutionPartTwo() {
    // read in the puzzle input
    const puzzleInput:number[] = []
    let increaseCount = 0
    let prevValue = 0;

    const rl = createInterface({
        input: createReadStream(path.resolve(__dirname, 'input.txt'))
    })

    for await (const line of rl) {
        puzzleInput.push(parseInt(line))
    }

    const depthCount = puzzleInput.length;
    prevValue = puzzleInput[0] + puzzleInput[1] + puzzleInput[2];

    // start at 1 as there's no initial depth measurement
    for (let i = 1; i < depthCount; i++) {
        const newValue = puzzleInput[i] + puzzleInput[i + 1] + puzzleInput[i + 2]
        if (newValue > prevValue) increaseCount++
        prevValue = newValue
    }
    
    return increaseCount
}