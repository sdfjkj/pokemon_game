import React, { useState, useEffect } from "react";
import axios from "axios";
import "./aboutUs.css";

export const AboutUs = () =>{
  return(
    <div style={{width:"1080px"}}>
      <div class="US_body">
        <div class="US_container">
          <img src="https://avatars.githubusercontent.com/u/91386811?v=4" alt="About Us" />
          <p class="US_name">강제구</p>
          <div style={{padding:"30px"}}>
            <p>
              학교 : 동국대학교<br/>
              학과 :  정보통신공학과<br/>
              관심분야 : 프론트엔드 웹 개발<br/>
              GIthub : https://github.com/jekoo123<br/>
              e-mail :　wprn1116@gmail.com
            </p>
          </div>
        </div>
        <div class="US_container">
          <img src="https://avatars.githubusercontent.com/u/95211829?v=4" alt="About Us" /> 
          <p class="US_name">윤영서</p>
          <div style={{padding:"30px"}}>
            <p>
              학교 : 동국대학교<br/>
              학과 :  정보통신공학과<br/>
              관심분야 : 프론트엔드 웹 개발<br/>
              GIthub : https://github.com/sdfjkj<br/>
              e-mail :　dbsys1120@naver.com
            </p>
          </div>
        </div>
        <div class="US_container">
          <img src="https://avatars.githubusercontent.com/u/100748980?v=4" alt="About Us" />
          <p class="US_name">전현정</p>
          <div style={{padding:"30px"}}>
            <p>
              학교 : 동국대학교<br/>
              학과 :  정보통신공학과<br/>
              관심분야 : 자연어처리, 웹 프로그래밍(back-end)<br/>
              GIthub : https://github.com/hjyeeoonng<br/>
              e-mail :　j10123@naver.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
