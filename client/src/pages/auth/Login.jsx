import React, { useState } from "react";
import Form from "@/components/custom/Form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slices/authentication";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    dispatch(loginUser({ email, password }))
    .unwrap()
    .then((res) => {
      toast({
        title: `${res.message}`

      })
    })
    .catch((err) => {
      toast({
        variant: "destructive",
        title: `${err}`
      })
    });
  };

  return (
    <>
      <Form
        formType="signIn"
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Login;
