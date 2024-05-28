import ReactDOM from 'react-dom'
import loaderImg from '/loader.gif'

export default function Loader() {
  return ReactDOM.createPortal(
    <div className='fixed w-full h-screen bg-[rgba(0, 0, 0, 0.9] z-10 '>
        <div className='flex align-middle items-center justify-center z-20'>
            <img src={loaderImg} alt="Loading..." />
        </div>
    </div>,
    document.getElementById('loader')
  )
}

export function SpinnerImg (){
    return (
        <div>
            <img src={loaderImg} alt="Loading..." />
        </div>
    )
} 
