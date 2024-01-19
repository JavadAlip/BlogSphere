import {describe, expect, it, should, } from "vitest"
describe("example suite",()=>{
    it("should pass",()=>{
        const sum=2+2
        expect (sum).toEqual(4)
    })
})