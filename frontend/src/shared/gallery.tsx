import { Navbar } from "../components/NavBar/Navbar"

export const Gallery = () => {
    return (
        <>
        <div className="bg-[url(/cielo5.jpg)] bg-cover bg-center w-full h-screen bg-no-repeat">
            <header className="px-64 py-1 bg-transparent z-100">
            <Navbar />
            </header>
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div>
                    <h2 className="text-[20px] font medium mb-2">Imagen 1</h2>
                </div>
                <div>
                    <h2 className="text-[20px] font medium mb-2">Imagen 1</h2>
                </div>
                <div>
                    <h2 className="text-[20px] font medium mb-2">Imagen 1</h2>
                </div>
                <div>
                    <h2 className="text-[20px] font medium mb-2">Imagen 1</h2>
                </div>
                <div>
                    <h2 className="text-[20px] font medium mb-2">Imagen 1</h2>
                </div>
                <div>
                    <h2 className="text-[20px] font medium mb-2">Imagen 1</h2>
                </div>
            </div>
        </div>
        </>
    )
}