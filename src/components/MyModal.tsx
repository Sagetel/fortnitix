import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
interface Props {
  children: React.ReactNode;
  isOpenPopup: boolean;
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}
function MyModal(props: Props) {
  const { children, isOpenPopup, setIsOpenPopup } = props;
  const handleClose = () => setIsOpenPopup(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
  };
  return (
    <div>
      <Modal
        open={isOpenPopup}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}

export default MyModal;
