import { useNavigate } from "react-router-dom"

function Header() {
  let navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <>
      <div className="bg-slate-100 text-white text-center w-screen">
        <img onClick={() => handleLogoClick()} className="cursor-pointer h-36 pl-14 " src="/logo.png" alt="Exscientia Logo" id="app-header-logo"></img>
      </div>
      <div className="p-1 bg-slate-400 w-screen"></div>
    </>
  )
}

export default Header;