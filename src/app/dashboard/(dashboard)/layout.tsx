
import { CustomNavbarDashboard } from '@/dashboard/components/CustomNavbarDashboard';
import { Fragment, PropsWithChildren } from 'react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
    return(
        <Fragment>

            <CustomNavbarDashboard />

            <main className="container mx-auto max-w-screen-lg">
                { children }
            </main>
        </Fragment>
    )
}

export default DashboardLayout;