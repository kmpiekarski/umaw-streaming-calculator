'use client' // This is a client component

import { useState } from 'react'
import Image from 'next/image'
import { sendGAEvent } from '@next/third-parties/google'

export default function Page() {
  // Constants for royalty rates. Adjust these as needed.
  const [value, setValue] = useState('')
  const umawTotalRate = 0.01
  // const umawMonthlyCap = 1000000
  const spotifyTotalRate = 0.00173
  // const spotifyAnnualCap = 1000

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
    <main className="inline-block p-4 text-center align-middle font-serif text-white drop-shadow">
      <section className="mx-auto">
        <div className="pb-3 pt-1 text-lg outline-blue-500">
          #MakeStreamingPay
          <br />
          Streaming Royalty Calculator
        </div>
        <div className="grid grid-cols-1 content-center">
          <input
            aria-label="Enter your monthly US streams"
            className="text-md mb-6 w-full rounded-xl border-4 border-gray-50 p-1 text-center font-sans text-black focus:border-gray-50"
            placeholder="Enter your monthly US streams"
            type="number"
            maxLength={8}
            value={value}
            inputMode="numeric"
            pattern="[0-9]*"
            onClick={() =>
              sendGAEvent({ event: 'calculator_input', value: { value } })
            }
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
        </div>

        <div className="grid grid-cols-2 content-center gap-2">
          <div className="mx-auto">
            <Image
              src="/streaming_companies_icon_white.svg"
              alt="Spotify Logo"
              width={85}
              height={85}
              priority
            />
          </div>
          <div className="mx-auto">
            <Image
              src="/icon.svg"
              alt="Make Streaming Pay logo"
              width={85}
              height={85}
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-2 content-center gap-2 break-words">
          <div className="text-2xl">${spotifyTotal.toFixed(2)}</div>
          <div className="text-2xl">${umawTotal.toFixed(2)}</div>
        </div>

        <div className="mb-2 mt-2 grid grid-cols-2 content-center gap-2 text-sm">
          <div>
            Existing DSP Payment<sup>&#42;</sup>
          </div>
          <div>Living Wage for Musicians Act</div>
        </div>

        <div className="mb-2 mt-2 grid grid-cols-2 content-center gap-2 font-sans text-xs font-thin">
          <div>
            <p>
              Artists may receive 15-50% of this money due to existing label
              partnerships.
            </p>
          </div>
          <div>
            <p>
              Artists will receive all of this money in addition to existing
              payments.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 content-center">
          <div className="text-sm">Your New Total:</div>
          <div className="text-2xl">${finalTotal.toFixed(2)}</div>
        </div>

        <div className="">
          <div className="mt-6 rounded border-2 border-orange-200 p-2 text-left font-sans text-xs font-thin italic">
            <sup>&#42;</sup>Average payout to master rights holders per stream
            across DSPs (including YouTube) as calculated by the Trichordist.
            Estimates of existing payouts are necessarily inexact due to the
            current lack of transparency from streaming platforms.
          </div>
        </div>
      </section>
    </main>
  )
}
