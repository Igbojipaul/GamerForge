import Form from "@/components/custom/Form";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "@/redux/slices/authentication";

import { useToast } from "@/hooks/use-toast";
import { Description } from "@radix-ui/react-toast";

const signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isMatch, setIsMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setIsMatch(false);
      return;
    }
    setIsMatch(true);

    dispatch(signupUser({ name, email, password }))
      .unwrap()
      .then((res) => {
        toast({
          title: `${res.message}`
          
        })
        navigate("/auth/login");
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Your account was not created",
          description: `${err}`
        })
      });
  };

  return (
    <>
      <Form
        formType="signUp"
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isMatch={isMatch}
      />
    </>
  );
};

export default signup;
