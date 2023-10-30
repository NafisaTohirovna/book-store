import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { instance } from "@/utils/use-request";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSignUp = async () => {
    setIsLoading(true);
    try {
      const data = await instance.post("/signup", formData);
      if (data?.status == 200) {
        navigate("/login");
        return;
      }
      throw Error();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setFormData({
        userEmail: "",
        userPassword: "",
      });
    }
    setIsLoading(false);
  };
  return (
    <div className='mt-5 flex gap-5 flex-col w-[800px] mx-auto p-14 rounded text-center bg-[url("public/registar.png")]'>
      <h2 className=" text-white text-lg">Welcome back!</h2>
      <h2 className=" text-white text-4xl  font-bold">
        Signup to your account
      </h2>
      <div className="w-1/2 mx-auto flex gap-5 flex-col mt-12">
        <Input
          name="userName"
          placeholder={"Name"}
          type=" text"
          value={formData.userName}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
        <Input
          name="userEmail"
          placeholder={"Email"}
          type="email"
          value={formData.userEmail}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
        <Input
          name="userPassword"
          placeholder={"Password"}
          type="password"
          value={formData.userPassword}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
        <Button
          onClick={onSignUp}
          disabled={isLoading}
          className=" bg-[#6251DD]"
        >
          Register
        </Button>
      </div>
      <Link
        to={"/login"}
        className="  text-white mt-10 text-lg w-[100px] mx-auto"
      >
        Login
      </Link>
    </div>
  );
}
export default SignUp;
