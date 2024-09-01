export default function InfoCard({ title, count, icon }) {
  return (
    <div className="bg-blue-500 w-[300px] h-[70px] flex p-2 items-center text-white shadow-lg cursor-pointer hover:scale-105">
      <span className="w-[20%]">{icon}</span>
      <span>
        <p>{title}</p>
        <h4 className="text-xl">{count}</h4>
      </span>
    </div>
  );
}
