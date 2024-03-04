'use client' // This is a client component

import { useState } from 'react'
import Image from 'next/image'

export default function Form() {
  // Constants for royalty rates. Adjust these as needed.
  const [value, setValue] = useState('')
  const umawTotalRate = 0.01
  const umawMonthlyCap = 290000
  const spotifyTotalRate = 0.0173
  const spotifyAnnualCap = 1000

  const plays = Number(value)

  // Calculate royalties for each type
  const spotifyRoyalty = (x: number) => {
    let payout: number = 0
    payout = x >= spotifyAnnualCap ? x * spotifyTotalRate : 0
    return payout
  }

  const umawRoyalty = (x: number) => {
    let payout: number = 0
    payout = umawTotalRate * x
    return payout
  }

  const spotifyTotal: any = spotifyRoyalty(plays).toFixed(2)
  const umawTotal: any = Math.min(umawRoyalty(plays), umawMonthlyCap).toFixed(2)
  const difference: any = (umawTotal - spotifyTotal).toFixed(2)

  return (
    <main className="text-white text-center font-serif p-10 drop-shadow">
      <div className="text-3xl pt-2 pb-2 outline-blue-500">
        #MakeStreamingPay Royalty Calculator
      </div>
      <div className="grid grid-cols-1 content-center">
        <label className="text-2xl pt-4 pb-4 italic">
          Your Number of Streams:
        </label>
        <input
          className="rounded-xl text-2xl p-3 mb-6 text-black w-full border-4 border-gray-50 focus:border-gray-50"
          placeholder="100000???"
          type="number"
          max="11"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault()
            }
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 content-center">
        <div className="mx-auto">
          <Image
            src="/Spotify_icon.svg"
            alt="Spotify Logo"
            className="m6"
            width={100}
            height={100}
            priority
          />
        </div>
        <div className="mx-auto">
          <Image
            src="/make_streaming_pay_480.png"
            alt="Make Streaming Pay logo"
            className="m6"
            width={125}
            height={100}
            priority
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 content-center">
        <div>
          <div className="card-title">Spotify Pays:</div>
          <div className="text-3xl">${spotifyTotal}</div>
        </div>
        <div>
          <div className="card-title">Living Wage for Musicians Act:</div>
          <div className="text-3xl">${umawTotal}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 content-center mt-10">
        <div className="card-title">Difference:</div>
        <div className="text-3xl">${difference}</div>
        <div className="text-sm mt-10 italic font-sans border-orange-200 border-2 p-5 rounded">
          Disclosure: due to special arrangements between Streaming services,
          DSPs and Labels, this is an estimate of current payout per stream.
        </div>
      </div>
    </main>
  )
}
