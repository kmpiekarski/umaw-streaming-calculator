'use client' // This is a client component

import { useState } from 'react'
import Image from 'next/image'

export default function Form() {
  // Constants for royalty rates. Adjust these as needed.
  const [value, setValue] = useState('')
  const umawTotalRate = 0.01
  const umawMonthlyCap = 290000
  const spotifyTotalRate = 0.00173
  const spotifyAnnualCap = 1000

  const plays = Number(value)

  // Calculate royalties for each type
  const spotifyRoyalty = (x: number) => {
    let payout: number = 0
    // payout = x >= spotifyAnnualCap ? x * spotifyTotalRate : 0
    payout = spotifyTotalRate * x
    return payout
  }

  const umawRoyalty = (x: number) => {
    let payout: number = 0
    payout = umawTotalRate * x
    return payout
  }

  const spotifyTotal: number = spotifyRoyalty(plays)
  // const umawTotal: number = Math.min(umawRoyalty(plays), umawMonthlyCap)
  const umawTotal: number = umawRoyalty(plays)
  const finalTotal: number = umawTotal + spotifyTotal

  return (
    <main className="text-white text-center font-serif p-4 drop-shadow">
      <section className="mx-auto">
        <div className="text-xl pt-1 pb-1 outline-blue-500">
          #MakeStreamingPay
          <br />
          Royalty Calculator
        </div>
        <div className="grid grid-cols-1 content-center">
          <label className="text-xl pt-2 pb-2 italic">
            Your US streams per month:
          </label>
          <input
            className="rounded-xl text-2xl p-3 mb-6 w-full border-4 border-gray-50 focus:border-gray-50 text-center text-black font-sans"
            placeholder="1000"
            type="number"
            maxLength={11}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 content-center">
          <div className="mx-auto">
            <Image
              src="/Spotify_icon.svg"
              alt="Spotify Logo"
              width={85}
              height={85}
              priority
            />
          </div>
          <div className="mx-auto">
            <Image
              src="/make_streaming_pay_480.png"
              alt="Make Streaming Pay logo"
              width={85}
              height={85}
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 content-center text-sm mt-2 mb-2">
          <div>
            Existing DSP Payment<sup>1</sup>
          </div>
          <div>
            Artists will receive all of this money!<sup>2</sup>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 content-center">
          <div className="text-2xl">${spotifyTotal.toFixed(2)}</div>
          <div className="text-2xl">${umawTotal.toFixed(2)}</div>
        </div>

        <div className="grid grid-cols-1 content-center mt-10">
          <div className="text-sm">Your New Total:</div>
          <div className="text-2xl">${finalTotal.toFixed(2)}</div>
          <div className="text-xs mt-10 italic font-sans border-orange-200 border-2 p-2 rounded text-left font-thin">
            <ol className="list-decimal pl-4 leading-tight">
              <li>
                Artists may receive 15-50% of this money due to existinglabel
                partnerships.
              </li>
              <li>
                Artists will receive all of this money in addition to existing
                payments.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  )
}
