import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GamePlay } from "../components/gamePlay";
import "../styles/style.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GamePlay />
  </StrictMode>,
)
