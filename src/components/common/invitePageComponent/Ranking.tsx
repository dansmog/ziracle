export default function Ranking({ rank }: { rank: string }) {
  return (
    <section className="bg-z-navyblue w-full p-6 rounded-[20px] flex flex-col gap-10">
      <div className="flex flex-col gap-3 w-full justify-center items-center">
        <h1 className="font-z-epilogue tracking-tighter text-5xl font-medium text-[#C09FFF]">
          #{rank}
        </h1>
        <span className="font-z-epilogue tracking-tighter text-lg text-[#C09FFF]">
          Ranking
        </span>
      </div>
      <div className="bg-[#C09FFF] w-full p-[28px] rounded-xl flex flex-col gap-4">
        <p className="font-z-epilogue font-normal text-sm tracking-tighter max-w-2xl">
          We’re building a platform where users get rewarded for growing the
          community. Start early and grow your Circles — every time someone in
          your Circle spends, a Ripple of Zaps flows back to you. The more
          people you connect, the more Zaps you’ll earn.
        </p>
        <p className="font-z-epilogue font-normal text-sm tracking-tighter max-w-2xl">
          Each person can only join one Circle — once they’re in, they’re in.
          Invite your friends early so the Ripple flows back to you.
        </p>
        <p className="font-z-epilogue font-normal text-sm tracking-tighter max-w-2xl">
          Zaps can be redeemed for coffees and lunches soon, and over time for
          Bitcoin and even a share in Ziracle itself. Build your Circle now and
          be part of value that comes full circle.
        </p>
      </div>
    </section>
  );
}
