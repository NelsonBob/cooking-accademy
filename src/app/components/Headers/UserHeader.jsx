import React from "react";
const UserHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" +
            require("../../../assets/img/theme/profile-cover.jpg") +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
      </div>
    </>
  );
};

export default UserHeader;
