"use client"; // This is a client component

import { useState } from 'react';
import Image from "next/image";

export default function Form() {

  // Constants for royalty rates. Adjust these as needed.
  const [value, setValue] = useState('');
  const umawTotalRate = 0.0056;
  const umawMonthlyCap = 290000;
  const spotifyTotalRate = 0.0051446772;
  const spotifyMonthlyCap = 1000;
  
  const plays = Number(value)  

  // Calculate royalties for each type
  const spotifyRoyalty = (x: number) => {
    let payout:number = 0;
    payout = x >= spotifyMonthlyCap ? x * spotifyTotalRate : 0;
    return payout;
  }

  const umawRoyalty = (x: number) => {
    let payout:number = 0;
    payout = umawTotalRate * x;
    return payout;
  }

  const spotifyTotal:any = spotifyRoyalty(plays).toFixed(2);
  const umawTotal:any = Math.min(umawRoyalty(plays), umawMonthlyCap).toFixed(2);
  const difference:any = (spotifyTotal - umawTotal).toFixed(2);;

  
  return (
    <main>
      <div className="title">Music Streaming Royalty Calculator</div>
      <div className="plays-total">

      <label>
      Number of Streams:
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          type="number"
          placeholder="Enter streams here"
          max="11"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </label>

      </div>
      <div className="royalty-card-group">
        <Image
          src="/Spotify_icon.svg"
          alt="Spotify Logo"
          className=""
          width={100}
          height={100}
          priority
        />
        <div className="card-title">Spotify Pays:</div>
        <div id="spotify-total-result">${spotifyTotal}</div>
      </div>

      <Image
        src="/make_streaming_pay_480.png"
        alt="Make Streaming Pay logo"
        className=""
        width={100}
        height={100}
        priority
      />

      <div className="card-title">UMAW Bill Pays:</div>
      <div id="umaw-total-result">{umawTotal}</div>
      <div className="card-title">Difference:</div>
      {difference}
    </main>
  );
}
