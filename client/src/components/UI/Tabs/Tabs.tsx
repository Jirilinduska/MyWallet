import { SHOW_CATEGORIES, SHOW_CHARTS, SHOW_TABLE } from "../../../config/globals"


interface TabsProps {
    toggleWantSee: (id: string) => void
    wantSee: string
}

const Tabs = ({ toggleWantSee, wantSee } : TabsProps) => {
  return (
    <div className="border-b border-1 border-black w-[250px] justify-between my-10 flex items-center gap-6 px-4">
        

        <button onClick={ () => toggleWantSee(SHOW_TABLE) } >Tabulka</button>
        <button onClick={ () => toggleWantSee(SHOW_CATEGORIES) }>Kategorie</button>
        <button onClick={ () => toggleWantSee(SHOW_CHARTS) }>Grafy</button>

    </div>

  )
}

export default Tabs