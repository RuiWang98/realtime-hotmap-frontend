import * as React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchData } from "../features/data/dataSlice";

const Control = () => {
    const dispatch = useAppDispatch();
    const points = useAppSelector((state) => state.data.points);

    React.useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const [openAllPointDialog, setOpenAllPointDialog] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpenAllPointDialog(true);
    };

    const handleClose = () => {
        setOpenAllPointDialog(false);
    };

    return (
        <div className="w-full absolute z-10 bottom-[50px] flex justify-start ml-12">
            <div>
                <button className="mr-4 h-8 pl-2 pr-4 bg-slate-900 text-slate-100 border-grey-500 bg-opacity-50 border-[1px] text-sm rounded-2xl hover:text-white transition duration-150 ease-in-out shadow hover: border-white hover:bg-opacity-100 hover:bg-slate-800 hover: ml-1 hover:translate-x-0.5 transition-transform duration-150 ease-in-out" value={0}>Pick-up Map</button>
                <button className="mr-3 h-8 pl-2 pr-4 bg-slate-900 text-slate-100 border-grey-500 bg-opacity-50 border-[1px] text-sm rounded-2xl hover:text-white transition duration-150 ease-in-out shadow hover: border-white hover:bg-opacity-100 hover:bg-slate-800 hover: ml-1 hover:translate-x-0.5 transition-transform duration-150 ease-in-out" value={1}>Drop-off Map</button>
            </div>
            <button className="h-8 pl-2 pr-4 bg-slate-900 text-slate-100 border-grey-500 bg-opacity-50 border-[1px] text-sm rounded-2xl hover:text-white transition duration-150 ease-in-out shadow hover: border-white hover:bg-opacity-100 hover:bg-slate-800 hover: ml-1 hover:translate-x-0.5 transition-transform duration-150 ease-in-out" onClick={handleClickOpen}>
                Show Points Information
            </button>
        </div >
    );
};

export default Control;
