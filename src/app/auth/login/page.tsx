import { NextPage } from 'next'
import Link from 'next/link'

const LoginPage: NextPage = () => {
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="mb-4">Página en construcción...</h1>

            <Link href="/" className="underline text-blue-400">Click para volver al inicio</Link>
        </div>
    )
}

export default LoginPage 