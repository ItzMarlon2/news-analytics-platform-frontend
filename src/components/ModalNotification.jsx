import React, { useEffect } from "react";

const ModalNotification = (props) => {
  console.log(props);

  useEffect(() => {
    const modal = document.querySelector(".modal");
    if (props.notification[0] !== "") {
      modal.classList.add("translate-y-14");
      modal.classList.remove("-translate-y-full");
      setTimeout(() => {
        modal.classList.add("-translate-y-full");
        modal.classList.remove("translate-y-14");
      }, 5000);
    }
  }, [props.notification[0]]);

  return (
    <div
      className={`modal mt-4 p-2 rounded absolute -top-4 left-1/2 -translate-x-1/2  -translate-y-full z-10 transition-all ease-in duration-300 ${
        props.notification[0]?.includes("attention is required")
          ? "bg-red-200 text-red-700"
          : "bg-green-200 text-green-700"
      }`}
    >
      {props.notification[0]}
    </div>
  );
};

export default ModalNotification;
