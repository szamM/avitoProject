import {Routes, Route, Navigate} from "react-router-dom";
import './App.css'
import ListPage from "./pages/ListPage";
import ItemPage from "./pages/ItemPage";
import StatsPage from "./pages/StatsPage";

function App() {
    return (
        <div className="App">
            <header>
                {/*<nav style={{ display: 'flex', gap: '12px', padding: '12px' }}>*/}
                {/*    <Link to="/list">Список объявлений</Link>*/}
                {/*    <Link to="/stats">Статистика</Link>*/}
                {/*</nav>*/}
            </header>

            <main style={{ padding: '12px' }}>
                <Routes>
                    <Route path="/" element={<Navigate to="/list" replace />} />
                    <Route path="/list" element={<ListPage />} />
                    <Route path="/item/:id" element={<ItemPage />} />
                    <Route path="/stats" element={<StatsPage />} />
                </Routes>
            </main>
        </div>
  )
}

export default App
