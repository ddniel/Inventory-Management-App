
export default function Card({children}) {
  return (
    <div className="flex flex-col items-center w-80 lg:w-96 bg-slate-50 py-10 px-8 rounded-md shadow-md">
        {children}
    </div>
  )
}
