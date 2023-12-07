import React from "react";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";

export const SidebarAdminData = [
  {
    title: "ชำระค่าธรรมเนียมขยะ",
    path: null,
    icon: <RiIcons.RiDeleteBin6Line />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "รอตรวจสอบยอดชำระ",
        path: "/allorder",
        icon: <MdIcons.MdPendingActions />,
        cName: "sub-nav",
      },
      {
        title: "เพิ่มที่อยู่",
        path: "/createaddress",
        icon: <MdIcons.MdAddBusiness />,
        cName: "sub-nav",
      },
      {
        title: "ค้นหาที่อยู่",
        path: "/alladdress",
        icon: <FaIcons.FaHouseUser />,
        cName: "sub-nav",
      },
      {
        title: "ค้นหาลูกหนี้",
        path: "/user-dashboard",
        icon: <MdIcons.MdPersonSearch />,
        cName: "sub-nav",
      },
      {
        title: "เพิ่มข้อมูลลูกหนี้",
        path: "/register",
        icon: <IoIcons.IoMdPersonAdd />,
      },
    ],
  },
  {
    title: "จัดการข้อมูลผู้ใช้งาน",
    path: null,
    icon: <FaIcons.FaUsersCog />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "ผู้ใช้ระบบทั้งหมด",
        path: "/admin-dashboards",
        icon: <FaIcons.FaUsers />,
        cName: "sub-nav",
      },
      {
        title: "เพิ่มเจ้าหน้าที่",
        path: "/register",
        icon: <FaIcons.FaUserPlus />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "ตั้งค่าจ่ายค่าธรรมเนียม",
    path: null,
    icon: <MdIcons.MdSettingsSuggest />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "เพิ่มสลิปการชำระเงิน",
        path: "/create/payment",
        icon: <FaIcons.FaCoins />,
        cName: "sub-nav",
      },
      {
        title: "รายการสลิปการชำระเงิน",
        path: "/list-slip/payment",
        icon: <BsIcons.BsCashCoin />,
        cName: "sub-nav",
      },
      {
        title: "ตั้งค่าปีงบประมาณ",
        path: "/admin/create-year",
        icon: <BsIcons.BsCalendarCheckFill />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "สรุปรายงานลูกหนี้",
    path: null,
    icon: <TbIcons.TbReport />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "สรุปรายงานลูกหนี้",
        path: "/datauser-dashboards",
        icon: <TbIcons.TbReportAnalytics />,
        cName: "sub-nav",
      },
    ],
  },
];

export const SidebarEmployeeData = [
  {
    title: "ชำระค่าธรรมเนียมขยะ",
    path: null,
    icon: <RiIcons.RiDeleteBin6Line />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "รอตรวจสอบยอดชำระ",
        path: "/allorder",
        icon: <MdIcons.MdPendingActions />,
        cName: "sub-nav",
      },
      {
        title: "เพิ่มที่อยู่",
        path: "/createaddress",
        icon: <MdIcons.MdAddBusiness />,
        cName: "sub-nav",
      },
      {
        title: "ค้นหาที่อยู่",
        path: "/alladdress",
        icon: <FaIcons.FaHouseUser />,
        cName: "sub-nav",
      },
      {
        title: "ค้นหาลูกหนี้",
        path: "/user-dashboard",
        icon: <MdIcons.MdPersonSearch />,
        cName: "sub-nav",
      },
      {
        title: "เพิ่มข้อมูลลูกหนี้",
        path: "/register",
        icon: <IoIcons.IoMdPersonAdd />,
      },
    ],
  },
  {
    title: "สรุปรายงานลูกหนี้",
    path: null,
    icon: <TbIcons.TbReport />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "สรุปรายงานลูกหนี้",
        path: "/datauser-dashboards",
        icon: <TbIcons.TbReportAnalytics />,
        cName: "sub-nav",
      },
    ],
  },
];

export const SidebarUserData = [
  {
    title: "ชำระค่าธรรมเนียมขยะ",
    path: null,
    icon: <RiIcons.RiDeleteBin6Line />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "ที่อยู่ชำระค่าธรรมเนียม",
        path: "/address/me",
        icon: <FaIcons.FaHouseUser />,
      },
      {
        title: "รายการที่ต้องชำระ",
        path: "/cart",
        icon: <FaIcons.FaMoneyBillAlt />,
      },
    ],
  },
];
