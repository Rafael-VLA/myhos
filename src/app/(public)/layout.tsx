
import Link from 'next/link';
import { Fragment, PropsWithChildren } from 'react';
import { CustomNavbar } from '@/shared/components/CustomNavbar';
import { Button } from '@/shared/components/ui/button';
import { NavbarItem } from '@nextui-org/navbar';

const PublicLayout = ({ children }: PropsWithChildren) => {
    return (
        <Fragment>
            <CustomNavbar>
                <Fragment>
                    <NavbarItem className="hidden lg:flex">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/auth/login">
                                Iniciar sesión
                            </Link>
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button variant="default" size="sm" asChild>
                            <Link href="/auth/sign-up">
                                Registrarse
                            </Link>
                        </Button>
                    </NavbarItem>
                </Fragment>
            </CustomNavbar>

            <main className="container mx-auto max-w-screen-lg">
                {children}
            </main>
        </Fragment>
    )
}

export default PublicLayout;