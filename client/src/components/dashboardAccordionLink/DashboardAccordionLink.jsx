/* eslint-disable react/prop-types */
// import React from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

export default function DashboardAccordionLink({ title, titleIcon, linkList }) {
  const { pathname } = useLocation();
  return (
    <div className="text-primaryColor">
      <Accordion
        sx={{
          backgroundColor: "transparent", // Set the background color of the accordion
          boxShadow: "none", // Optional: Remove the default shadow
          height: "auto",
          padding: 0,
          margin: 0,
        }}
      >
        <AccordionSummary
          expandIcon={<MdKeyboardArrowDown className="text-xl text-gray-100" />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            padding: "0px",
            paddingRight: "20px",
            paddingLeft: "20px",
            margin: "0px",
            fontWeight: 500,
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "#1f2937", // Change background on hover
            },
            minHeight: "0px", // Set minimum height
            "&.Mui-expanded": {
              minHeight: "0px", // Ensure consistency when expanded
            },
            ".MuiAccordionSummary-content": {
              height: "auto",
              margin: 0, // Remove default margin
              padding: 0,
            },
            ".MuiAccordionSummary-content.Mui-expanded": {
              margin: "0px", // Remove margin in expanded state
            },
          }}
        >
          <div className="flex flex-row gap-2 items-center py-[10px] text-primaryColor">
            <span className="text-lg">{titleIcon}</span>
            {title}
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "0px", // Adjust padding for details
            paddingLeft: "20px",
            marginTop: "0px", // Space between summary and details
          }}
        >
          <div className="ps-2 flex flex-col text-gray-300">
            {linkList.map((link, index) => (
              <NavLink
                key={index}
                to={link.linkPath}
                className={`${
                  pathname === link.linkPath
                    ? " bg-accentColor bg-opacity-10 border-r-[5px] border-accentColor"
                    : "hover:bg-gray-800 "
                } flex items-center gap-2 font-light ps-2 py-[6px] hover:no-underline text-sm`}
              >
                <span className="text-lg">{link.linkIcon}</span>
                {link.linkName}
              </NavLink>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
