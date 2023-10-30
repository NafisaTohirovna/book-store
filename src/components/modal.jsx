import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal-content relative rounded-lg p-[30px] text-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className="close cursor-pointer text-4xl absolute top-0 right-3 hover:text-red-600" onClick={onClose}>
          &times;
        </span>
        <p className=" text-center text-2xl">You are not registered</p>
        <Link to={'/login' }> <Button onClick={onClose} className=" w-[200px] mt-5 bg-green-600 hover:bg-green-400">Login</Button></Link>
        <Link to={'/sign-up' }> <Button onClick={onClose} className=" w-[200px] mt-5 bg-green-600 hover:bg-green-400">SignUp</Button></Link>
        <Link to={'/' }> <Button onClick={onClose} className=" w-[200px] mt-5 bg-green-600 hover:bg-green-400">Home</Button></Link>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.any,
  onClose: PropTypes.any,
  message: PropTypes.any,
};
