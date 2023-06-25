import * as React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchData } from "../features/data/dataSlice";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Point } from "../features/data/Convert";
import { Divider, Stack } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const Control = () => {
  const dispatch = useAppDispatch();
  const points: Point[] = useAppSelector((state) => state.data.points);

  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const [openAllPointDialog, setOpenAllPointDialog] = useState<boolean>(false);

  const handleDialogOpen = () => {
    setOpenAllPointDialog(true);
  };
  const handleClose = () => {
    setOpenAllPointDialog(false);
  };

  return (
    <div className="w-full absolute z-10 bottom-[50px] flex justify-start ml-12">
      <div>
        <button
          className="mr-4 h-8 pl-2 pr-4 bg-slate-900 text-slate-100 border-grey-500 bg-opacity-50 border-[1px] text-sm rounded-2xl hover:text-white transition duration-150 ease-in-out shadow hover: border-white hover:bg-opacity-100 hover:bg-slate-800 hover: ml-1 hover:translate-x-0.5 transition-transform duration-150 ease-in-out"
          value={0}
        >
          Pick-up Map
        </button>
        <button
          className="mr-3 h-8 pl-2 pr-4 bg-slate-900 text-slate-100 border-grey-500 bg-opacity-50 border-[1px] text-sm rounded-2xl hover:text-white transition duration-150 ease-in-out shadow hover: border-white hover:bg-opacity-100 hover:bg-slate-800 hover: ml-1 hover:translate-x-0.5 transition-transform duration-150 ease-in-out"
          value={1}
        >
          Drop-off Map
        </button>
      </div>
      <button
        className="h-8 pl-2 pr-4 bg-slate-900 text-slate-100 border-grey-500 bg-opacity-50 border-[1px] text-sm rounded-2xl hover:text-white transition duration-150 ease-in-out shadow hover: border-white hover:bg-opacity-100 hover:bg-slate-800 hover: ml-1 hover:translate-x-0.5 transition-transform duration-150 ease-in-out"
        onClick={handleDialogOpen}
      >
        Show Points Information
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAllPointDialog}
        fullWidth
        maxWidth="md"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          All Points Infomation
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div>
            {points &&
              points.map((point) => {
                return (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Point ID {point.id}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <Stack direction={"row"} divider={<Divider orientation="vertical" flexItem />} spacing={1}>
                        <Typography>Time: {point.time}</Typography>
                        <Typography>Density: {point.density}</Typography>
                        <Typography>Latitude: {point.lat}</Typography>
                        <Typography>Longitude: {point.long}</Typography>
                        <Typography>Type: {point.type}</Typography>
                        </Stack>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            CLOSE
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default Control;
