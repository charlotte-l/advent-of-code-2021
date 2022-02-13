import { Solution, SolutionPartTwo } from './index'

describe('Solution', () => {
  it('should return a number greater than 0', async () => {
    const value = await Solution()
    expect(value).toBeGreaterThan(0)
  })
})

describe('Solution part 2', () => {
  it('should return a number greater than 0', async () => {
    const value = SolutionPartTwo()
    expect(value).toBeGreaterThan(0)
  })
})
