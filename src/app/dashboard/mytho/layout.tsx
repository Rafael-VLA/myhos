
import { CustomNavbarMytho } from '@/dashboard/components/CustomNavbarMytho';
import { Fragment, PropsWithChildren } from 'react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
    return(
        <Fragment>
            <CustomNavbarMytho />

            <main className="container mx-auto max-w-screen-lg">
                { children }
            </main>
        </Fragment>
    )
}

export default DashboardLayout;