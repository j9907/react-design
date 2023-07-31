import React,{ useState }from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import  { useEffect } from 'react'
import axios from 'axios'
import {useSelector , useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


const App = () => {
    const [userId, setId] = useState('')
    const [userPW, setPw] = useState('')
    const [msg, setMsg] = useState('')
   const navigate  = useNavigate();
    const dispatch = useDispatch();

    const LoginFunc = (e) => {
        //e.preventDefault();
        let body = {
            userId, userPW
        };
        axios.post("/login", body)
        .then((res) => {
            console.log(res.data);
            if(res.status === 200){
                //dispatch(loginUser(res.data));
                setMsg("");
                if (res.data === 1){
                    console.log("실행중")
                    navigate(('/todoList'))
                }
                
            }
            
        })
        
    }
return(
    <div className="Logincontainer">
        <h2>Login</h2>
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={LoginFunc}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
      value={userId}
      onChange={(e) => {setId(e.target.value)}}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
      value={userPW}
      onChange={(e) => {setPw(e.target.value)}}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
);}
export default App;