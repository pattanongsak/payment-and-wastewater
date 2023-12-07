import React from "react";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import "../../../css/Footer/Footer.css";

const FooterBox = styled.div`
  bottom: 0;
  background: #303030;
  height: auto;
  padding: 40px 80px;
  display: grid;
  grid-template-columns: auto auto auto;
  max-width: 80%;
  width: 100%;
  margin: 0 auto;

  @media only screen and (max-width: 1300px) {
    grid-template-columns: none;
    width: 100%;
    font-size: 14px;
    padding: 25px;
    max-width: auto;
    width: 100%;
    margin: 0;
  }
`;

const FooterCredit = styled.div`
  bottom: 0;
  background: #303030; //#131616
  height: auto;
  padding: 15px 0;
  justify-content: center;
  align-items: center;
  display: flex;

  @media only screen and (max-width: 1024px) {
    font-size: 14px;
  }
`;

const Box = styled.div`
  height: auto;
  width: 100%;
  padding: 20px;

  @media only screen and (max-width: 1024px) {
    h3,
    p {
      justify-content: left;
      align-items: left;
      display: flex;
    }
  }
`;

const Pd25 = styled.div`
  margin-top: 15px;

  @media only screen and (max-width: 1024px) {
    margin-top: 7px;
  }
`;

const Detail = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: left;
  justify-content: left;
`;

const Contect = styled.div`
  grid-gap: 20px;
  height: auto;
  display: flex;
  margin-top: 25px;
  @media only screen and (max-width: 820px) {
    margin-top: 15px;
    grid-gap: 15px;
  }
`;

const ContectIcon = styled.div`
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  size: 30;
  cursor: pointer;
  color: #fff;

  &#btnPhone {
    background: #fea621;
    &:hover,
    :focus {
      background: #fff;
      color: #fea621;
    }
  }
  &#btnEmail {
    background: #fe330a;
    &:hover,
    :focus {
      background: #fff;
      color: #fe330a;
    }
  }
  &#btnFacebook {
    background: #1e72bb;
    &:hover,
    :focus {
      background: #fff;
      color: #1e72bb;
    }
  }
  &#btnLine {
    background: #81c41d;
    &:hover,
    :focus {
      background: #fff;
      color: #81c41d;
    }
  }
  &#btnWeb {
    background: #82027d;
    &:hover,
    :focus {
      background: #fff;
      color: #82027d;
    }
  }
`;

function Footer() {
  return (
    <footer>
      <div className="centerContainer">
        <FooterBox>
          <Box>
            <h3>สำนักงานเทศบาลตำบลสันผักหวาน </h3>
            <div className="ftContact">
              <Detail>
                <Contect>
                  <ContectIcon id="btnPhone">
                    <FaIcons.FaPhoneAlt />
                  </ContectIcon>
                  <ContectIcon id="btnEmail">
                    <MdIcons.MdEmail size={25} />
                  </ContectIcon>
                  <ContectIcon id="btnFacebook">
                    <FaIcons.FaFacebook size={25} />
                  </ContectIcon>
                  <ContectIcon id="btnLine">
                    <FaIcons.FaLine size={25} />
                  </ContectIcon>
                  <ContectIcon id="btnWeb">
                    <MdIcons.MdWeb size={25} />
                  </ContectIcon>
                </Contect>
              </Detail>
            </div>
          </Box>
          <Box>
            <h3>ที่อยู่</h3>
            <Pd25 />
            <p>
              เลขที่ 258 หมู่ 2 ตำบลสันผักหวาน อำเภอหางดง จังหวัดเชียงใหม่ 50230
            </p>
          </Box>
          <Box>
            <h3>ติดต่อ</h3>
            <Pd25 />

            <p>โทรศัพท์ : 053-131532</p>
            <p>โทรสาร (แฟกซ์): 053-482131</p>
            <p>อีเมล์ : saraban@sunpukwan.go.th</p>
          </Box>
        </FooterBox>
        <hr />
        <FooterCredit>
          <p className="ct">Copyright 2023 © By สำนักงานเทศบาลตำบลสันผักหวาน</p>
        </FooterCredit>
      </div>
    </footer>
  );
}

export default Footer;
