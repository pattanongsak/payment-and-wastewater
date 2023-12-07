import React, { Fragment } from "react";
import { Stepper, Step } from "@material-ui/core";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";

import "../../css/Order/CheckoutStep.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "ข้อมูลการชำระเงิน",
      icon: <FaIcons.FaMoneyBillAlt size={22} />,
    },
    {
      label: "ยืนยันรายการ",
      icon: <FaIcons.FaList size={22} />,
    },
    {
      label: "ส่งข้อมูลเรียบร้อยแล้ว",
      icon: <BsIcons.BsClock size={22} />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper
        className="alternativeLabel"
        activeStep={activeStep}
        style={stepStyles}
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <div
              className="StepLabel"
              style={{
                color: activeStep >= index ? "#3187c3" : "rgba(0, 0, 0, 0.649)",
              }}
            >
              <div className="StepLabelBlock">{item.icon}</div>
              <div className="StepLabelBlock">{item.label}</div>
            </div>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
