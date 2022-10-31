import React, {useEffect, useState} from 'react';
import cl from './Login.module.css';
import { MDBContainer, MDBRow, MDBCol, MDBSpinner, MDBBtn, MDBInput } from "mdbreact";
import loginIcon from './../../images/user.svg';
import uiImg from './../../images/login.svg';

import Button from 'react-bootstrap/Button';

const LoginForm = (props) => {
    const [uiImgClasses, setUiImgClasses] = useState([cl.uiImg])

    useEffect( ()=>{
      if(props.isFailImgMustShake)
      {
        setUiImgClasses(uiImgClasses => [`${cl.uiImg}`, `${cl.active}`]);
        setTimeout(() => {setUiImgClasses([`${cl.uiImg}`])}, 1000);
        props.setIsFailImgMustShake(false)
      }
    }, [props.isFailImgMustShake] )

    return (
        <MDBContainer className="m-0 pt-3 " fluid>
          <MDBRow>
                          <MDBCol size="1" >  </MDBCol>
                    <MDBCol size="3" className=" mt-5 p-5" >
                    <p className=" text-center ">
                        <img className={ [cl.iconImg, "mt-5"].join(' ') } src={loginIcon} alt="icon"/>
                    </p>

                        <form onSubmit={props.handleSubmit}>

                            <div className="grey-text">
                              <MDBInput label="Введите email" icon="envelope" group type="email" validate error="wrong"
                                success="right" value={props.email}
                                      onChange={(e) => props.setEmail(e.target.value)} />
                              <MDBInput label="Введите пароль" icon="lock" group type="password" validate
                              value={props.password}
                              onChange={(e) => props.setPassword(e.target.value)}  />
                            </div>
                            <div className="text-center">
                              <MDBBtn className={ [cl.primary, "btn-block deep-purple accent-2"].join(' ') } color="deep-purple" type="submit">Login</MDBBtn>
                            </div>


                            { props.isUserFetching ?
                              <div className="text-center">
                              <div className={ [cl.uiSpn, "mt-5 spinner-border text-primary"].join(' ') } role="status">
                                <span className="sr-only">Loading...</span>

                               </div>
                               </div>
                              :
                              null}


                          </form>
                    </MDBCol>

                    <MDBCol className="mt-5"  size="7">
                      <img className={uiImgClasses.join(' ')} src={uiImg} alt=""/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
    );
};

export default LoginForm;
