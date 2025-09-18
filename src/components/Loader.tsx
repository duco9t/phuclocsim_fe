'use client';

import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect, useRef } from 'react';

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

export default function Loader() {
    const pathname = usePathname();
    const firstLoad = useRef(true);

    useEffect(() => {
        if (!firstLoad.current) {
            NProgress.start();
            const timeout = setTimeout(() => NProgress.done(), 500);
            return () => clearTimeout(timeout);
        } else {
            firstLoad.current = false;
        }
    }, [pathname]);

    return null;
}
