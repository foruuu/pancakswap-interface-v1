import React from "react";
import styled from "styled-components";
import {LogoProps} from "../../../../components/Logo";


const LogoSvg = styled.img`
  height:40px;
  margin-left:10px;
  cursor: pointer;
`

const Logo: React.FC<any> = (props:any) => {
  const textColor = props.isDark ? "#FFFFFF" : "#000000";
  return (
     <LogoSvg src={require('../../../../assets/images/logo.svg').default}/>
  );
};

export default React.memo(Logo);
