import Modal from "react-bootstrap/Modal";
import Buttons from "../Buttons/Buttons";
function ModalDelete({ handleDelete, show, handlemodal }) {
  const exclationSign = require("../../assets/exclamation.png");
  return (
    <>
      <Modal show={show} onHide={handlemodal}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body
          style={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={exclationSign}
            alt="exclationSign"
            width={50}
            height={100}
          ></img>
          Are you sure you want to delete all scenario?You can't undo this
          action
        </Modal.Body>
        <Modal.Footer className="border-0">
          <div style={{ display: "flex", gap: "10px" }}>
            <Buttons
              buttonColor="green"
              buttonName="Yes"
              onButtonClicked={() => {
                handleDelete();
                handlemodal();
              }}
            />
            <Buttons
              buttonColor="orange"
              buttonName="No"
              onButtonClicked={handlemodal}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
