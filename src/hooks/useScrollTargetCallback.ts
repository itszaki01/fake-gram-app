import { useEffect, useState } from "react";
export default function useScrollTargetCallback(callBackFunction: CallableFunction, TimeOut = 1000,callBackPixelTarget = 1000) {
    const [ednOfPage, setEdnOfPage] = useState<boolean>(false);
    
    useEffect(() => {
        function paginationScroll() {
            const ScroolTarget: boolean = document.body.scrollHeight - scrollY < callBackPixelTarget;
            if (ScroolTarget && ednOfPage === false) {
                setEdnOfPage((c) => {
                    if (c === false) {
                        callBackFunction();
                        return true;
                    } else {
                        return true;
                    }
                });

                setTimeout(() => {
                    setEdnOfPage(() => false);
                }, TimeOut);
            }
        }
        window.addEventListener("scroll", paginationScroll);
        return () => window.removeEventListener("scroll", paginationScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
