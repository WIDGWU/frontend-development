// import Image from "next/image";
// import moreIcon from "@/assets/moreDark.png";

const DifferenceCard = ({
  text,
  difference,
  percent,
}: {
  text: string;
  difference: string;
  percent: string;
}) => {
  return (
    <div className="rounded-2xl even:bg-fall odd:bg-spring p-6 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="py-1 font-medium rounded-full">{text}</span>
        {/* <Image src={moreIcon} alt="" width={20} height={20} /> */}
      </div>
      <h1 className="text-2xl font-semibold my-4">{difference}</h1>
      <h3 className="text-xl font-semibold my-4">{percent} %</h3>
    </div>
  );
};

export default DifferenceCard;
