import React from 'react';
import messages from '../../services/db/messages/messages';
import IntlMessages from '../../utility/IntlMessages';
import {Button, Dropdown, List, Menu} from 'antd';
import AppScrollbar from '../AppScrollbar';
import './index.style.less';
import {AiOutlineMail} from '@react-icons/all-files/ai/AiOutlineMail';
import PostNewsIco from '../../../assets/icon/postnews.svg';
import Icon from '@ant-design/icons/lib/components/AntdIcon';

const styles = {
  lineHeight: "1",
  position: "relative",
  display: "inline-flex",
  fontWeight: "700",
  whiteSpace: "nowrap",
  textAlign: "center",
  border: "1px solid transparent",
  boxShadow: "0 2px 0 rgb(0 0 0 / 2%)",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)",
  userSelect: "none",
  touchAcction: "manipulation",
  height: "33px",
  padding: "7px 13px",
  fontSize: "15px",
  borderRadius: "17px 5px",
  color: "#ffffff",
  borderColor: "#EE0000",
  background: "#EE0000",
}
const AppPostNews = () => {
  return (
    <>
      <button style={styles}>
        
        <span style={{padding:"0px 0px", lineHeight:'1.2'}}>
        <img src={PostNewsIco} style={{marginRight:"7px"}}/>
        <IntlMessages id="common.postnews"></IntlMessages>
        </span>
       
      </button>
    </>
  );
};

export default AppPostNews;
