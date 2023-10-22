import { useState } from "react";
import "./accordion.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";

const CustomAccordion = ({
  heading,
  onClick,
  addButton,
  toggle = true,
  children,
}) => {
  const [isActive, setIsActive] = useState(true);
  return (
    <li className="accordion-item w-100">
      <div
        className={`accordion-toggle d-flex w-100 ${isActive ? "active" : ""}`}
      >
        {heading}
        <div className="d-flex align-items-center">
          {addButton && (
            <button
              type="button"
              className="btn border-0 text-primary d-flex align-items-center px-1"
              style={{ fontSize: "1.4rem", marginInlineStart: "5px" }}
              onClick={onClick}
            >
              <GrAddCircle />
            </button>
          )}

          {toggle && (
            <button
              type="button"
              className="btn border-0 d-flex align-items-center px-1 "
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>
          )}
        </div>
      </div>

      {toggle && (
        <div className={`accordion-content ${isActive ? "active" : ""}`}>
          {children}
        </div>
      )}
    </li>
  );
};

export default CustomAccordion;
