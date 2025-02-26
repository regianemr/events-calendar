import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { capitalize } from "../../../Utils/capitalize"

import './CustomToolbar.css'

const CustomToolbar = ({ label, onView, onNavigate, views }) => {
  const [itemText, setItemText] = useState('Month')
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    navigate('/')
  }

  return (
    <div className="toolbar-container">
      <h1 className="mesAno">{label}</h1>
      <div className="toolbar-navegation">
        <div className="dropdown" style={{ display: 'flex' }}>
          <button className="btn btn-secondary dropdown-toggle" type="button" id='dropdownMenuButton' data-bs-toggle="dropdown" aria-expanded="false">
            {itemText}
          </button>
          <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
            {views.map((view, index) => (
              <div key={index}>
                <li>
                  <button className='dropdown-item' onClick={() => onView(view) + setItemText(capitalize(view))}>{capitalize(view)}</button>
                </li>
                {/* linha para dividir mês, ano e dia da agenda */}
                {index === 2 && <hr className='dropdown-divider'></hr>}
              </div>
            ))}
          </ul>
        </div>
        <button className='btn btn-secondary' onClick={() => onNavigate('TODAY')}>Hoje</button>
        <button className='btn btn-sm mr-2 text-secondary arrow-left' onClick={() => onNavigate('PREV')} ><i className="bi bi-caret-left"></i></button>
        <button className='btn btn-sm mr-2 text-secondary' onClick={() => onNavigate('NEXT')}><i className="bi bi-caret-right"></i></button>
        <button className='btn btn-secondary' type="button" onClick={handleLogout}>Sair</button>
      </div>
    </div>
  )
}
export default CustomToolbar